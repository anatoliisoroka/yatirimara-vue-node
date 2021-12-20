
const { isAuthenticated, } = require('../utils/auth')
const { retError, retCode, upload_file, delete_file } = require('../utils');
const { combineResolvers } = require('graphql-resolvers');
// ============================================================================================================
// create document of campaign
// ============================================================================================================
const document_create = combineResolvers(
   isAuthenticated,
   async (_, args, { me, models }) => {
      const cur_campaign = await models.Campaign.findOne({ _id: args.campaign_id, user_id: me._id })
      if (!cur_campaign) retError('no', "Campaign")
      const path = `/files/${cur_campaign._id}/${args.type}`

      const rr = await upload_file(args.file, path, args.name)
      if (!rr.url) retError('', rr.error)
      const new_da = {
         campaign_id: args.campaign_id,
         name: args.name,
         type: args.type,
         url: rr.url
      }
      const doc = await models.Document.findOneAndUpdate(new_da, new_da, { upsert: true })
      return doc;
   }
);
// ============================================================================================================
// delete
// ============================================================================================================
const document_delete = combineResolvers(
   isAuthenticated,
   async (_, args, { me, models }) => {
      const cur_doc = await models.Document.findById(args._id)
      if (!cur_doc) retError('no', "Document")
      const cur_campaign = await models.Campaign.findOne({ _id: cur_doc.campaign_id, user_id: me._id })
      if (!cur_campaign) retError('per', "Campaign")
      
      await models.Document.findByIdAndDelete(args._id)
 
      delete_file(cur_doc.url)

      return retCode('success');
   }
);

module.exports = {

   Query: {
      documents: async (_, args, { models }) => {
         let map = { campaign_id: args.campaign_id }
         if (args.type) map.type = args.type;
         return await models.Document.find(map)
      },
   },
   Mutation: {
      document_create,
      document_delete,
   },
};