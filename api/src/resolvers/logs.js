const moment = require('moment')

const {
   getToken,
   isAuthenticated,
} = require('../utils/auth')
const {
   retError,
   retCode
} = require('../utils');
const {
   userVerify
} = require('../utils/firebase.js');

const {
   combineResolvers
} = require('graphql-resolvers');

const {
   google
} = require('googleapis');


// ====================================================================
// Get My logs
// ====================================================================
const logs = combineResolvers(
   isAuthenticated,
   async (_, args, {
      me,
      models
   }) => {
      const limit = args.limit || 10
      const offset = args.page ? limit * (args.page - 1) : 0
      let sort = {
         'createdAt': -1
      }
      const total = await models.Log.countDocuments({ user_id: me._id })
      const items = await models.Log.aggregate([{
         $match: {
            user_id: me._id
         },
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

// ====================================================================
// Get My logs
// ====================================================================
const status_logs = combineResolvers(
   isAuthenticated,
   async (_, args, {
      me,
      models
   }) => {
      const items = await models.LogStatus.aggregate([{
         $match: {
            campaign_id: args._id
         },
      },
      {
         $lookup: {
            from: "admin",
            let: {
               client_id: { "$toObjectId": "$admin_id" }
            },
            pipeline: [
               {
                  $match: {
                     $expr: {
                        $eq: ['$_id', "$$client_id"]
                     }
                  }
               },
               {
                  $project: {
                     _id: 1,
                     name: 1,
                  }
               }
            ],
            as: 'admin'
         }
      },
      {
         $project: {
            _id: 1,
            campaign_id: 1,
            status: 1,
            admin: { $arrayElemAt: ['$admin', 0] },
            description: 1,
            createdAt: 1,
         }
      },
      {
         $sort: {
            'createdAt': 1
         }
      },
      ])
      return items
   }
);

module.exports = {

   Query: {
      logs,
      status_logs
   },
};