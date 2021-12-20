const moment = require('moment')

const { getToken, isAuthenticated, } = require('../utils/auth')
const { retError, retCode } = require('../utils');


const { combineResolvers } = require('graphql-resolvers');



// ====================================================================
// Temporary transaction
// ====================================================================
const make_payment = combineResolvers(
   isAuthenticated,
   async (_, args, { me, models }) => {
      // role check
      const me_data = await models.User.findById(me._id)
      if (!me_data.role) retError('no', 'User')
      if (!me_data.role.includes(1)) retError('per', 'ROLE')
      // event_data
      const event_data = await models.Campaign.findById(args.campaign_id)
      if (!event_data) return retError('', 'CAMPAIGN')
      // event status check
      if (event_data.status == 4) return retError('finish', 'CAMPAIGN')
      else if (event_data.status != 3) return retError('', 'CAMPAIGN is not published or rejected')
      // event_start check
      const cur_date = moment().format('YYYY-MM-DD')
      const now_time = new Date()
      if (event_data.event_start > cur_date || event_data.published_at > now_time) return retError('no_active', 'CAMPAIGN')
      // event_end check
      if (now_time > new Date(event_data.event_end + ' 23:59:59')) return retError('ex', 'CAMPAIGN')

      const ddd = await models.Transaction.create({ ...args, user_id: me._id })
      // update campaign completion ststus
      const transactions = await models.Transaction.find({ campaign_id: args.campaign_id })
      const cur_amount = transactions.reduce((rr, el) => rr + parseInt(el.amount), 0)
      const target_amount = parseInt(event_data.fund?.amount || 0) * (event_data.fund?.want_20_percent_addtional_funding ? 1.2 : 1)
      if (cur_amount >= target_amount) {
         await models.Campaign.findByIdAndUpdate(args.campaign_id, { status: 4 })
      }
      return retCode(ddd)
   }
);

// ====================================================================
// Get My transactions
// ====================================================================
const my_transactions = combineResolvers(
   isAuthenticated,
   async (_, args, { me, models }) => {
      const limit = args.limit || 10
      const offset = args.page ? limit * (args.page - 1) : 0
      let sort = {
         'createdAt': -1
      }
      const total = await models.Transaction.countDocuments({ user_id: me._id })
      const items = await models.Transaction.aggregate([{
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
      {
         $lookup: {
            from: "campaign",

            let: {
               client_id: { "$toObjectId": "$campaign_id" }
            },
            pipeline: [
               {
                  $match: {
                     $expr: {
                        $eq: ['$_id', "$$client_id"]
                     }
                  }
               },
            ],
            as: 'campaign'
         }
      },
      {
         $addFields: {
            campaign: { $first: '$campaign' },
         }
      },
      ])
      return {
         total,
         items
      }
   }
);

// ====================================================================
// Get My transaction statistics
// ====================================================================
const my_transaction_chart = combineResolvers(
   isAuthenticated,
   async (_, args, { me, models }) => {

      const data = await models.Transaction.aggregate([{
         $match: {
            user_id: me._id
         },
      },
      {
         $group: {
            _id: "$campaign_id",
            paid: { $sum: '$amount' },
         }
      },
      {
         $lookup: {
            from: "campaign",
            let: {
               client_id: { "$toObjectId": "$_id" }
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
                     name: 1,
                     name_enterprise: 1,
                  }
               }
            ],
            as: 'campaign'
         }
      },
      {
         $addFields: {
            campaign: { $first: '$campaign' },
         }
      },
      ])
      return data
   }
);

module.exports = {
   Query: {
      my_transactions,
      my_transaction_chart
   },
   Mutation: {
      make_payment,
   },

};