const bcrypt = require('bcrypt');
const { retError, upload_file, delete_file } = require('../utils')
const { isAuthenticated, isBannerEditor } = require('../utils/auth')

const { combineResolvers } = require('graphql-resolvers');

// get
const banners = async (_, args, { models }) => {
   const roles = await models.Banner.find({ active: true })
   return roles
}
const admin_banners = combineResolvers(
   isAuthenticated, isBannerEditor,
   async (_, args, { models }) => {
      const roles = await models.Banner.find()
      return roles
   }
);
// create or update
const banner_upsert = combineResolvers(
   isAuthenticated, isBannerEditor,
   async (_, args, { models }) => {
      // 
      let da = {
         campaign_id: args.campaign_id,
         title: args.title,
         description: args.description,
      }
      const file_dir = '/files/banner'
      if (args.bg_file) {
         const rr = await upload_file(args.bg_file, file_dir)
         if (rr?.url) {
            da.bg = rr.url
         }
      } else da.bg = args.bg
      let res = null
      if (args._id) {
         const curDa = await models.Banner.findById(args._id)
         if (curDa.bg.indexOf('/banner') > -1) {
            if (curDa.bg != args.bg) delete_file(curDa.bg)
         }
         res = await models.Banner.findByIdAndUpdate(args._id, da)
      } else {
         res = await models.Banner.create(da)
      }
      return res
   }
);
// delete
const banner_delete = combineResolvers(
   isAuthenticated, isBannerEditor,
   async (_, args, { models }) => {
      const curDa = await models.Banner.findById(args._id)
      if (!curDa) retError('no')
      if (curDa.bg.indexOf('/banner') > -1) {
         delete_file(curDa.bg)
      }
      return await models.Banner.findByIdAndDelete(args._id)
   }
);
// toggle active
const banner_toggle = combineResolvers(
   isAuthenticated, isBannerEditor,
   async (_, args, { models }) => {
      const curDa = await models.Banner.findById(args._id)
      if (!curDa) retError('no')
      await models.Banner.findByIdAndUpdate(args._id, { $set: { active: !curDa.active } })
      return !curDa.active
   }
);

module.exports = {

   Query: {
      banners,
      admin_banners,
   },

   Mutation: {
      banner_upsert,
      banner_toggle,
      banner_delete,
   },
};