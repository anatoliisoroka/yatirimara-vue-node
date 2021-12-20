const moment = require('moment')

const { getToken, isAuthenticated, } = require('../utils/auth')
const { retError, retCode, delete_file, upload_base64, upload_file } = require('../utils');
const { userVerify } = require('../utils/firebase.js');

const { combineResolvers } = require('graphql-resolvers');

const { google } = require('googleapis');
const identityToolkit = google.identitytoolkit({
   auth: process.env.G_API_KEY,
   version: 'v3',
});
const myCache = require('../utils/cache')

// ====================================================================
// Get My user info
// ====================================================================
const me = combineResolvers(
   isAuthenticated,
   async (_, args, { me, models }) => {
      let user = await models.User.findById(me._id)
      if (user) user = user.toObject()
      else retError('no', 'User')
      user.admin = me.admin
      return user
   }
);

// ====================================================================
// Login or Register by Firebase token
// ====================================================================
async function login(_, args, {
   models, ip, browser
}) {

   const data = await userVerify(args.token)
   if (!data.email) {
      if (data.uid)
         await models.Log.create({ user_id: data.uid, ip, browser, status: 0 })
      return retError('no', 'email')
   }
   if (!data.email_verified) {
      if (data.uid)
         await models.Log.create({ user_id: data.uid, ip, browser, status: 0 })
      return retError('no_active', 'email')
   }
   let user = await models.User.findById(data.uid)
   if (!user) {
      // duplicated user can recover his old data, when removed on filebase delete
      let cur_data_w_email = await models.User.findOne({ email: data.email })
      if (cur_data_w_email) {
         if (cur_data_w_email._id != data.uid) {
            await models.User.findByIdAndDelete(cur_data_w_email._id)
            await models.Campaign.updateMany({ user_id: cur_data_w_email._id }, { user_id: data.uid })
            await models.Discuss.updateMany({ user_id: cur_data_w_email._id }, { user_id: data.uid })
            await models.Log.updateMany({ user_id: cur_data_w_email._id }, { user_id: data.uid })
            // recover user
            cur_data_w_email = cur_data_w_email.toObject()
            cur_data_w_email._id = data.uid
            await models.User.create(cur_data_w_email)
         }
      } else {

         const name_arr = data.name ? data.name.split(' ') : data.email.split('@')
         user = {
            _id: data.uid,
            email: data.email,
            name_first: name_arr[0],
            name_last: name_arr[1],
            pic: data.picture
         }
         await models.User.create(user)
      }
   }
   const access_token = await getToken({
      _id: data.uid,
   })

   await models.Log.create({ user_id: data.uid, ip, browser, status: 1 })

   return {
      data,
      user: await models.User.findById(data.uid),
      access_token
   }
}

const sendSMS = combineResolvers(
   isAuthenticated,
   async (_, args) => {
      const phoneNumber = args.phone_code + args.phone
      const recaptchaToken = args.token

      const response = await identityToolkit.relyingparty.sendVerificationCode({
         phoneNumber,
         recaptchaToken,
      })
      let sessionInfo = ''
      try {
         sessionInfo = response.data.sessionInfo;
         myCache.set(phoneNumber, sessionInfo, 600);
      } catch (err) {
         retCode('', response.error)
      }
      return retCode(sessionInfo)
   }
);

const complete_profile = combineResolvers(
   isAuthenticated,
   async (_, args, {
      me,
      models
   }) => {
      const phoneNumber = args.phone_code + args.phone
      const sessionInfo = await myCache.get(phoneNumber);
      if (!sessionInfo) return retError('ex', 'SMS')

      try {
         await identityToolkit.relyingparty.verifyPhoneNumber({
            code: args.code,
            sessionInfo,
         })
      } catch (error) {
         return retError('', error)
      }

      let user = await models.User.findByIdAndUpdate(me._id, {
         phone_code: args.phone_code,
         phone: args.phone,
         name_last: args.name_last,
         name_first: args.name_first,
         role: args.role,
         individual: args.individual
      })
      return retCode(user);
   }
);

// ============================================================================================================
// Update profile
// ============================================================================================================
const update_profile = combineResolvers(
   isAuthenticated,
   async (_, args, {
      me,
      models
   }) => {
      const curUser = await models.User.findById(me._id)
      // income_statement_file upload
      const file_dir = '/files/invest_state'
      if (args.form.income_statement_file) {
         const rrr = await upload_file(args.form.income_statement_file, file_dir)
         args.form.income_statement_url = rrr.url
         if (curUser.income_statement_url) await delete_file(curUser.income_statement_url)
         delete args.form.income_statement_file
      } else {
         args.form.income_statement_url = curUser.income_statement_url
      }
      const user = await models.User.findByIdAndUpdate(me._id, args.form)
      return user;
   }
);
// ============================================================================================================
// Update profile
// ============================================================================================================
const update_pic = combineResolvers(
   isAuthenticated,
   async (_, args, { me, models }) => {
      let user = await models.User.findById(me._id)
      if (user.pic) {
         if (user.pic.indexOf('/files/') != -1) delete_file(user.pic)
      }
      const file_dir = '/files/1'
      const pic = await upload_base64(args.pic, file_dir)
      user = await models.User.findByIdAndUpdate(me._id, { $set: { pic } })
      return user;
   }
);

module.exports = {

   Query: {
      me,
   },

   Mutation: {
      login,
      sendSMS,
      complete_profile,
      update_profile,
      update_pic,
   },
};