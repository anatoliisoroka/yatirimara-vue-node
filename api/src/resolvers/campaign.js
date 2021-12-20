const mongoose = require('mongoose');
const moment = require('moment')

const { isAuthenticated, isEventEditor, isPublisher } = require('../utils/auth')
const { retError, retCode, upload_file, delete_file, upload_base64 } = require('../utils');
const { combineResolvers } = require('graphql-resolvers');

// ============================================================================================================
// create campaign
// ============================================================================================================
const create_campaign = combineResolvers(
   isAuthenticated,
   async (_, args, {
      me,
      models
   }) => {
      // console.log(args.form.logo, typeof args.form.logo);
      const _id = new mongoose.mongo.ObjectId()
      const file_dir = '/files/' + _id
      if (args.form.logo) {
         const logo = await upload_base64(args.form.logo, file_dir)
         await models.Campaign.create({
            _id,
            user_id: me._id,
            ...args.form,
            logo
         })
      }
      return retCode(_id);
   }
);

// Update
const update_campaign = combineResolvers(
   isAuthenticated,
   async (_, args, {
      me,
      models
   }) => {
      let data = await models.Campaign.findOne({
         _id: args._id,
         user_id: me._id
      })
      if (!data) retError('no', 'Campaign')
      // Logo
      data = data.toObject()
      const file_dir = '/files/' + args._id
      if (args.form.logo) {
         if (data.logo) {
            delete_file(data.logo)
         }
         args.form.logo = await upload_base64(args.form.logo, file_dir)
      }
      // Idea Media
      if (args.form.idea_file) {
         const rr = await upload_file(args.form.idea_file, file_dir)

         if (data.bg) {
            delete_file(data.bg)
         }
         if (rr?.url) {
            args.form.bg = rr.url
         }
      }
      const new_data = {
         ...data,
         ...args.form
      }
      data = await models.Campaign.findByIdAndUpdate(args._id, new_data)
      return data;
   }
);

// Reject
const reject_campaign = combineResolvers(
   isAuthenticated,
   async (_, args, {
      me,
      models
   }) => {
      let data = await models.Campaign.findById(args._id)
      if (!data) retError('no', 'Campaign')

      if (![1, 2].includes(data.status)) return retError('no_active', 'STATUS')

      let permission_allowed = false

      if (!me.role_id) return retError('per', 'ROLE')
      else if (me.role_id == 'super') permission_allowed = true
      else {
         const roles = await models.Role.findById(me.role_id)
         const permissions = roles?.permission || []
         // Investment Committe
         if (data.status == 1 && permissions.includes('INVESTMENT')) permission_allowed = true
         else if (data.status == 2 && permissions.includes('PUBLISH')) permission_allowed = true
      }
      if (!permission_allowed) return retError('per', 'ROLE')

      // Logo
      data = data.toObject()

      const new_data = {
         status: data.status + 4,
         rejected: {
            createdAt: new Date(),
            user_id: me._id,
            reason: args.reason
         }
      }
      data = await models.Campaign.findByIdAndUpdate(args._id, new_data)
      await models.LogStatus.create({
         admin_id: me._id,
         status: new_data.status,
         campaign_id: args._id,
         description: args.reason
      })
      return data;
   }
);
// Accept(Approve and Publish)
const accept_campaign = combineResolvers(
   isAuthenticated,
   async (_, args, {
      me,
      models
   }) => {
      let data = await models.Campaign.findById(args._id)
      if (!data) retError('no', 'Campaign')

      if (![1, 2].includes(data.status)) return retError('no_active', 'STATUS')

      let permission_allowed = false

      if (!me.role_id) return retError('per', 'ROLE')
      else if (me.role_id == 'super') permission_allowed = true
      else {
         const roles = await models.Role.findById(me.role_id)
         const permissions = roles?.permission || []
         // Investment Committe
         if (data.status == 1 && permissions.includes('INVESTMENT')) permission_allowed = true
         else if (data.status == 2 && permissions.includes('PUBLISH')) permission_allowed = true
      }
      if (!permission_allowed) return retError('per', 'ROLE')

      let new_data = {
         status: data.status + 1,
      }
      if (data.status == 1) {
         new_data.approved_by = me._id
         new_data.approved_at = new Date()
      } else {
         new_data.published_by = me._id
         new_data.published_at = args.published_at ? new Date(args.published_at) : new Date()
      }
      data = await models.Campaign.findByIdAndUpdate(args._id, new_data)
      await models.LogStatus.create({
         admin_id: me._id,
         status: new_data.status,
         campaign_id: args._id
      })
      return data;
   }
);
// Unpublish
const unpublish_campaign = combineResolvers(
   isAuthenticated,
   isPublisher,
   async (_, args, {
      me,
      models
   }) => {
      let data = await models.Campaign.findById(args._id)
      if (!data) retError('no', 'Campaign')

      if (data.status != 3) return retError('no_active', 'STATUS')
      const new_data = {
         status: 2,
         published_by: me._id,
         published_at: new Date()
      }
      data = await models.Campaign.findByIdAndUpdate(args._id, new_data)
      await models.LogStatus.create({
         admin_id: me._id,
         status: 2,
         campaign_id: args._id,
         description: 'UNPUBLISH'
      })
      return data;
   }
);

// Update
const update_team = combineResolvers(
   isAuthenticated,
   async (_, args, {
      me,
      models
   }) => {
      let data = await models.Campaign.findOne({
         _id: args._id,
         user_id: me._id
      })
      if (!data) retError('no', 'Campaign')
      data = await models.Campaign.findByIdAndUpdate(args._id, { team: { ...args.form, members: data.team?.members || [] } })
      return data;
   }
);

const campaign = combineResolvers(
   isAuthenticated,
   async (_, args, {
      me,
      models
   }) => {
      // console.log(args.form.logo, typeof args.form.logo);
      const data = await models.Campaign.findOne({
         _id: args._id,
         user_id: me._id
      })
      if (!data) retError('no', "campaign")
      return data;
   }
);
const event = async (_, args, { me, models }) => {
   let data = await models.Campaign.findById(args._id)
   // result
   /* 
   total_investors
   ratio_offer
   ratio_qualified
   */
   if (!data) retError('no', "campaign")
   data = data.toObject()
   if (data?.fund?.events_additonal) {
      if (data.fund.events_additonal.length)
         data.fund.amount_additonal = data.fund.events_additonal.reduce((xs, x) => xs + parseInt(x.amount), 0)
   }
   const map = {
      campaign_id: args._id
   }
   const total_investors_t = await models.Transaction.aggregate([
      {
         $match: map
      },
      {
         $group: {
            _id: "$user_id",
            // paid count
            paid: { $sum: '$amount' },
            paid_at: { "$last": '$createdAt' },
         }
      },
      {
         $lookup: {
            from: "user",

            let: {
               client_id: '$_id'
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
                     name_first: 1,
                     name_last: 1,
                     pic: 1,
                     qualified_investor: 1,
                  }
               }
            ],
            as: 'user'
         }
      },
      {
         $project: {
            paid: 1,
            paid_at: 1,
            user: { $arrayElemAt: ['$user', 0] },
         }
      }

   ])
   const total_investors = total_investors_t
   const total_amount = await models.Transaction.aggregate([
      {
         $match: map
      },
      {
         $group: {
            _id: "$campaign_id",
            t_amount: { $sum: '$amount' }
         }
      }
   ])
   const result_total_investors_q = total_investors.filter(ee => ee.user?.qualified_investor) || []
   data.result_total_investors = total_investors.length
   data.result_total_investors_q = result_total_investors_q.length
   data.result_total_amount = total_amount.length ? total_amount[0].t_amount : 0
   data.total_investors = total_investors
   data.investors = total_investors
   data.progress = data.fund?.amount ? (data.result_total_amount / data.fund.amount) : null

   return data;
}
const upsert_team_member = combineResolvers(
   isAuthenticated,
   async (_, args, {
      me,
      models
   }) => {
      let data = await models.Campaign.findOne({
         _id: args._id,
         user_id: me._id
      })
      if (!data) retError('no', "campaign")

      const file_dir = '/files/' + args._id
      let members = data.team || []
      let curMemberIndex = -1
      // edit mode
      if (args.form._id) {
         curMemberIndex = members.findIndex(ee => ee._id == args.form._id)
         if (curMemberIndex == -1) return retError('no', 'Team Member')
      }
      // avatar
      if (args.form.file) {
         args.form.pic = await upload_base64(args.form.file, file_dir)

         // Delete pic when edit
         if (curMemberIndex != -1) {
            delete_file(members[curMemberIndex].pic)
         }
      } else if (args.form._id) {
         args.form.pic = members[curMemberIndex].pic
      }
      // resume
      if (args.form.resume_file) {

         const rr = await upload_file(args.form.resume_file, file_dir)
         if (rr?.url)
            args.form.resume = rr.url
         // Delete resume when edit
         if (curMemberIndex != -1) {
            delete_file(members[curMemberIndex].resume)
         }
      }
      delete args.form.file
      delete args.form.resume_file

      // edit mode
      if (args.form._id) {
         if (!args.form.resume && args.form.resume != undefined && members[curMemberIndex].resume) {
            delete_file(members[curMemberIndex].resume)
         }
         else if (args.form.resume == undefined) {
            args.form.resume = members[curMemberIndex].resume
         }
         members[curMemberIndex] = args.form
      }
      else {
         members.push(args.form)
      }
      data = await models.Campaign.findByIdAndUpdate(args._id, { "team": members })
      return data;
   }
);
// Teamember Delete
const team_member_delete = combineResolvers(
   isAuthenticated,
   async (_, args, {
      me,
      models
   }) => {
      let data = await models.Campaign.findOne({
         _id: args.campaign_id,
         user_id: me._id
      })
      if (!data) retError('no', "campaign")

      let member = data.team.find(ee => ee._id == args._id)
      if (!member) retError('no', "Member")

      if (member.pic) await delete_file(member.pic)
      if (member.resume) await delete_file(member.resume)

      data = await models.Campaign.findByIdAndUpdate(args.campaign_id, { $pull: { "team": { _id: args._id } } })
      return retCode(data);
   }
);
// Teamember Order
const team_member_orders = combineResolvers(
   isAuthenticated,
   async (_, args, {
      me,
      models
   }) => {
      let data = await models.Campaign.findOne({
         _id: args.campaign_id,
         user_id: me._id
      })
      if (!data) retError('no', "campaign")
      let new_order = []
      args.order_ids.forEach(order_id => {
         const member = data.team.find(ee => ee._id == order_id)
         if (member) new_order.push(member)
      });

      data = await models.Campaign.findByIdAndUpdate(args.campaign_id, { $set: { "team": new_order } })
      return retCode(data);
   }
);
// Fund
const fund_update = combineResolvers(
   isAuthenticated,
   async (_, args, {
      me,
      models
   }) => {
      let data = await models.Campaign.findOne({
         _id: args._id,
         user_id: me._id
      })
      if (!data) retError('no', "campaign")

      const file_dir = '/files/' + args._id
      // file_period
      if (args.form.file_period) {
         const rrr = await upload_file(args.form.file_period, file_dir)
         if (rrr?.url) args.form.period_url = rrr.url
         if (data.fund?.period_url) await delete_file(data.fund.period_url)
         delete args.form.file_period
      } else {
         args.form.period_url = data.fund?.period_url || ''
      }
      // file_period
      if (args.form.file_report) {
         const rrr = await upload_file(args.form.file_report, file_dir)
         if (rrr?.url) args.form.report_url = rrr.url
         if (data.fund?.report_url) await delete_file(data.fund.report_url)
         delete args.form.file_report
      } else {
         args.form.report_url = data.fund?.report_url || ''
      }
      // file_post_funding_capital
      if (args.form.file_post_funding_capital) {
         const rrr = await upload_file(args.form.file_post_funding_capital, file_dir)
         if (rrr?.url) args.form.post_funding_capital_url = rrr.url
         if (data.fund?.post_funding_capital_url) await delete_file(data.fund.post_funding_capital_url)
         delete args.form.file_post_funding_capital
      } else {
         args.form.post_funding_capital_url = data.fund?.post_funding_capital_url || ''
      }
      // file_unit_sale_price_shares
      if (args.form.file_unit_sale_price_shares) {
         const rrr = await upload_file(args.form.file_unit_sale_price_shares, file_dir)
         if (rrr?.url) args.form.unit_sale_price_shares_url = rrr.url
         if (data.fund?.unit_sale_price_shares_url) await delete_file(data.fund.unit_sale_price_shares_url)
         delete args.form.file_unit_sale_price_shares
      } else {
         args.form.unit_sale_price_shares_url = data.fund?.unit_sale_price_shares_url || ''
      }
      // computed event_end
      const event_start = args.form.events[0]['date_start']
      let event_end = ''
      const mmm = args.form.events.map((ee) => ee.date_end);
      if (mmm.length) {
         event_end = mmm.reduce(function (a, b) {
            return a > b ? a : b;
         });
      }
      // complete profile, and sent the requested
      data = await models.Campaign.findByIdAndUpdate(args._id, { fund: args.form, status: 1, event_start, event_end })
      await models.LogStatus.create({
         status: 1,
         campaign_id: args._id,
      })
      return data;
   }
);
// ====================================================================
// Admin api, admin with invest commit role can filter all campaign
// ====================================================================
const activities = combineResolvers(
   isAuthenticated,
   isEventEditor,
   async (_, args, {
      me,
      models
   }) => {
      const limit = args.limit || 10
      const offset = args.page ? limit * (args.page - 1) : 0
      let sort = { 'updatedAt': -1 }
      let map = { status: args.status }
      if (args.keyword) {
         map["$or"] = [{
            name: new RegExp(`.*${args.keyword}.*`, 'i')
         },
         {
            name_enterprise: new RegExp(`.*${args.keyword}.*`, 'i')
         },
         {
            description: new RegExp(`.*${args.keyword}.*`, 'i')
         },
         {
            description1: new RegExp(`.*${args.keyword}.*`, 'i')
         },
         {
            stage: new RegExp(`.*${args.keyword}.*`, 'i')
         },
         ]
      }
      const total = await models.Campaign.countDocuments(map)
      const items = await models.Campaign.aggregate([{
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
      {
         $lookup: {
            from: "user",
            localField: 'user_id',
            foreignField: '_id',
            as: 'user'
         }
      },
      {
         $lookup: {
            from: "admin",

            let: {
               // client_id: "$approved_by"
               client_id: { "$toObjectId": "$approved_by" }
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
            as: 'approved_admin'
         }
      },
      {
         $lookup: {
            from: "admin",

            let: {
               client_id: { "$toObjectId": "$published_by" }
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
            as: 'published_admin'
         }
      },
      {
         $project: {
            _id: 1,
            logo: 1,
            bg: 1,
            name: 1,
            description: 1,
            event_start: 1,
            event_end: 1,
            user: { $arrayElemAt: ['$user', 0] },
            status: 1,
            approved_admin: { $arrayElemAt: ['$approved_admin', 0] },
            published_admin: { $arrayElemAt: ['$published_admin', 0] },
            approved_at: 1,
            published_at: 1,
            createdAt: 1,
            updatedAt: 1,
         }
      }
      ])
      return {
         total,
         items
      }
   }
);
// ====================================================================
// Admin api, admin with invest commit role can filter all campaign
// ====================================================================
const follows = combineResolvers(
   isAuthenticated,
   async (_, args, {
      me,
      models
   }) => {
      const meDa = await models.User.findById(me._id)
      let followIds = meDa.follows || []
      console.log(followIds, "followIds")
      let items = []
      if (followIds.length) {
         followIds = followIds.map(el => mongoose.Types.ObjectId(el))
         items = await models.Campaign.aggregate([{
            $match: {
               _id: { $in: followIds }
            },
         },
         {
            $lookup: {
               from: "user",
               localField: 'user_id',
               foreignField: '_id',
               as: 'user'
            }
         },
         {
            $lookup: {
               from: "admin",

               let: {
                  // client_id: "$approved_by"
                  client_id: { "$toObjectId": "$approved_by" }
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
               as: 'approved_admin'
            }
         },
         {
            $lookup: {
               from: "admin",

               let: {
                  client_id: { "$toObjectId": "$published_by" }
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
               as: 'published_admin'
            }
         },
         {
            $project: {
               _id: 1,
               logo: 1,
               bg: 1,
               name: 1,
               description: 1,
               event_start: 1,
               event_end: 1,
               user: { $arrayElemAt: ['$user', 0] },
               status: 1,
               approved_admin: { $arrayElemAt: ['$approved_admin', 0] },
               published_admin: { $arrayElemAt: ['$published_admin', 0] },
               approved_at: 1,
               published_at: 1,
               createdAt: 1,
               updatedAt: 1,
            }
         }
         ])

      }
      return items

   }
);
// ====================================================================
// Get campaigns for authenticated user
// ====================================================================
const campaigns = combineResolvers(
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
      let map = {
         user_id: me._id
      }
      if (args.keyword) {
         map["$or"] = [{
            name: new RegExp(`.*${args.keyword}.*`, 'i')
         },
         {
            name_enterprise: new RegExp(`.*${args.keyword}.*`, 'i')
         },
         {
            description: new RegExp(`.*${args.keyword}.*`, 'i')
         },
         {
            description1: new RegExp(`.*${args.keyword}.*`, 'i')
         },
         {
            stage: new RegExp(`.*${args.keyword}.*`, 'i')
         },
         ]
      }
      const total = await models.Campaign.countDocuments(map)
      const items = await models.Campaign.aggregate([{
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
      {
         $lookup: {
            from: "transaction",
            let: {
               client_id: { $toString: "$_id" }
            },
            pipeline: [
               {
                  $match: {
                     $expr: {
                        $eq: ['$campaign_id', "$$client_id"]
                     }
                  }
               },
               {
                  $group: {
                     _id: "$campaign_id",
                     // paid count
                     paid: { $sum: '$amount' },
                  }
               },
            ],
            as: 'transaction'
         }
      },
      {
         $addFields: {
            transaction: { $first: '$transaction' },
         }
      },
      {
         $addFields: {
            result_total_amount: '$transaction.paid',
         }
      },
      {
         $addFields: {
            progress: { $divide: ['$transaction.paid', '$fund.amount'] },
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
// Get all campaigns, public
// ====================================================================
const events = async (_, args, {
   me,
   models
}) => {
   const limit = args.limit || 10
   const offset = args.page ? limit * (args.page - 1) : 0
   let sort = {
      'createdAt': -1
   }
   let map = {
      status: { $nin: [0, 1, 2, 5, 6] }
   }
   if (args.keyword) {
      map["$or"] = [{
         name: new RegExp(`.*${args.keyword}.*`, 'i')
      },
      {
         name_enterprise: new RegExp(`.*${args.keyword}.*`, 'i')
      },
      {
         description: new RegExp(`.*${args.keyword}.*`, 'i')
      },
      {
         description1: new RegExp(`.*${args.keyword}.*`, 'i')
      },
      {
         stage: new RegExp(`.*${args.keyword}.*`, 'i')
      },

      ]
   }
   if (args.status != undefined) map.status = args.status
   const cur_date = moment().format('YYYY-MM-DD')
   const now_time = new Date()
   switch (args.status) {
      case 2:
         // comming soon, start-date less than now
         map.status = 3
         const map1 = [
            { event_start: { $gt: cur_date } },
            { published_at: { $gt: now_time } }
         ]
         if (map["$or"]) map["$or"].push(...map1)
         else map["$or"] = map1
         break
      case 3:
         // in funding, started
         map.status = 3
         map.event_start = { $lte: cur_date }
         map.published_at = { $lte: now_time }
         break
      case 4:
      case 7:
         map.status = args.status
         break
   }
   const total = await models.Campaign.countDocuments(map)
   const items = await models.Campaign.aggregate([{
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
   {
      $lookup: {
         from: "transaction",
         let: {
            client_id: { $toString: "$_id" }
         },
         pipeline: [
            {
               $match: {
                  $expr: {
                     $eq: ['$campaign_id', "$$client_id"]
                  }
               }
            },
            {
               $group: {
                  _id: "$campaign_id",
                  // paid count
                  paid: { $sum: '$amount' },
               }
            },
         ],
         as: 'transaction'
      }
   },
   {
      $addFields: {
         transaction: { $first: '$transaction' },
      }
   },
   {
      $addFields: {
         result_total_amount: '$transaction.paid',
      }
   },
   {
      $addFields: {
         progress: { $divide: ['$transaction.paid', '$fund.amount'] },
      }
   },
   ])
   console.log(items, "items")
   return {
      total,
      items
   }
}
// Follow / UnFollow Toggle
const follow = combineResolvers(
   isAuthenticated,
   async (_, args, {
      me,
      models
   }) => {

      let data = await models.Campaign.findOne({ _id: args._id })
      if (!data) retError('no', "campaign")
      if (data.user_id == me._id) retError('per', 'campaign')

      let me_da = await models.User.findById(me._id)
      let newFollows = []
      const curFollows = me_da.follows || []

      if (curFollows.includes(args._id)) newFollows = curFollows.filter(el => el != args._id)
      else newFollows = [...curFollows, args._id]

      await models.User.findByIdAndUpdate(me._id, { $set: { follows: newFollows } })

      return newFollows;
   }
);
module.exports = {

   Query: {
      campaign,
      campaigns,
      activities,
      follows,
      events,
      event,
   },

   Mutation: {
      create_campaign,
      update_campaign,
      update_team,
      upsert_team_member,
      team_member_delete,
      team_member_orders,
      fund_update,
      reject_campaign,
      accept_campaign,
      unpublish_campaign,
      follow,
   },
};