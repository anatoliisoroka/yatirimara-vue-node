const { retError } = require('../utils')
const {
   getMe,
   getToken,
   isAuthenticated,
   isUserEditor, isUserEditor1
} = require('../utils/auth')

const { combineResolvers } = require('graphql-resolvers');


// Admin can generate_user_token 
const generate_user_token = combineResolvers(
   isAuthenticated,
   isUserEditor,
   async (_, args, { me }) => {
      const access_token = await getToken({
         _id: args._id,
         admin: me._id,
      }, '5h')
      return access_token
   }
);

// Admin Can login with token, and navigate user profile as user
async function login_by_admin(_, args, {
   models
}) {
   const hashedToken = await getMe(args.token)
   if (!hashedToken) return retError('no_active', 'Token')
   if (!hashedToken.admin) return retError('no', 'Token')

   let user = await models.User.findById(hashedToken._id)
   if (!user) return retError('no', 'User')
   user = user.toObject()
   user.admin = hashedToken.admin
   return {
      access_token: args.token,
      user
   }
}

// Get users with user editor role 
const admin_users = combineResolvers(
   isAuthenticated,
   isUserEditor,
   async (_, args, {
      models
   }) => {
      const limit = args.limit || 10
      const offset = args.page ? limit * (args.page - 1) : 0
      let sort = {
         'updatedAt': -1
      }
      if (args.sortBy) {
         sort = {}
         sort[args.sortBy] = args.sortDesc ? -1 : 1
         if (args.sortBy != 'updatedAt') sort['updatedAt'] = -1
      }
      let map = {}
      switch (args.role_id) {
         case 1:
         case 2:
            // Investor or Enterpreneur
            map.role = args.role_id
            break
         case 3:
            // Investor & Enterpreneur
            // map.role = { $all: [1, 2] }
            map.role = { $size: 2 }
            break;
         case 4:
            // Investor & Enterpreneur
            map.role = [1]
            map.qualified_investor = true
            break;

      }
      if (args.keyword) {
         map["$or"] = [{
            name: new RegExp(`.*${args.keyword}.*`, 'i')
         },
         {
            phone: new RegExp(`.*${args.keyword}.*`, 'i')
         },
         {
            email: new RegExp(`.*${args.keyword}.*`, 'i')
         },
         {
            TC: new RegExp(`.*${args.keyword}.*`, 'i')
         },
         ]
      }

      const total = await models.User.countDocuments(map)
      const items = await models.User.aggregate([{
         $match: map,
      },
      {
         $sort: sort
      },
      {
         $skip: offset
      },
      {
         $limit: limit
      },
      ])
      return {
         total,
         items
      }
   }
);
// ============================================================================================================
// Qualify/UnQualify Toggle, return updated status
// ============================================================================================================
const qualify = combineResolvers(
   isAuthenticated,
   isUserEditor1,
   async (_, args, { me, models }) => {
      let user = await models.User.findById(me._id)
      const qualified_investor = !user.qualified_investor
      await models.User.findByIdAndUpdate(me._id, { $set: { qualified_investor } })
      return qualified_investor;
   }
);
module.exports = {

   Query: {
      login_by_admin,
      admin_users
   },

   Mutation: {
      generate_user_token,
      qualify
   },
};