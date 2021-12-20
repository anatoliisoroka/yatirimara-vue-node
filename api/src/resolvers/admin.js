const bcrypt = require('bcrypt');
const {
   retError
} = require('../utils')
const {
   getToken,
   isAuthenticated,
   isUserEditor
} = require('../utils/auth')

const {
   combineResolvers
} = require('graphql-resolvers');

// Admin login with email or phone
async function admin_login(_, args, {
   models
}) {
   let user = await models.Admin.findOne({
      $or: [{
         email: args.email_phone
      },
      {
         phone: args.email_phone
      }
      ]
   })
   if (!user) retError('auth', 'user')

   const passwordMatch = await bcrypt.compare(args.password, user.password);
   if (!passwordMatch) retError('auth', 'password')

   const access_token = await getToken({
      _id: user._id,
      role_id: user.role_id
   })
   user = user.toObject()
   if (user.role_id == 'super') user.permission = ['USER', 'ROLE', 'INVESTMENT', 'PUBLISH', 'ACCOUNTING', 'CAMPAIGN', 'BANNER']
   else {
      const roles = await models.Role.findById(user.role_id)
      user.permission = roles?.permission || []
   }
   return {
      access_token,
      user
   }
}
// Get profile
const admin_me = combineResolvers(
   isAuthenticated,
   async (_, args, {
      me,
      models
   }) => {
      let user = await models.Admin.findById(me._id)
      if (!user) retError('auth', 'user')
      user = user.toObject()
      if (user.role_id == 'super') user.permission = ['USER', 'ROLE', 'INVESTMENT', 'PUBLISH', 'ACCOUNTING', 'CAMPAIGN', 'BANNER']
      else {
         const roles = await models.Role.findById(user.role_id)
         user.permission = roles?.permission || []
      }
      return user
   }
);
// Update profile
const admin_me_update = combineResolvers(
   isAuthenticated,
   async (_, args, {
      me,
      models
   }) => {
      return await models.Admin.findByIdAndUpdate(me._id, args)
   }
);

// Get admin list except for super 
const admin_get = combineResolvers(
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
      if (args.role_id) map.role_id = args.role_id;
      else map.role_id = { $ne: 'super' }

      const total = await models.Admin.countDocuments(map)
      const items = await models.Admin.aggregate([{
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

// ==================================== Manage Admin ====================================================
// Add new admin
const admin_add = combineResolvers(
   isAuthenticated,
   isUserEditor,
   async (_, args, {
      models
   }) => {
      return await models.Admin.create(args)
   }
);
// Update admin
const admin_update = combineResolvers(
   isAuthenticated,
   isUserEditor,
   async (_, args, {
      models
   }) => {
      return await models.Admin.findByIdAndUpdate(args._id, args)
   }
);



module.exports = {

   Query: {
      admin_login,
      admin_me,
      admin_get,
   },

   Mutation: {
      admin_add,
      admin_update,
      admin_me_update
   },
};