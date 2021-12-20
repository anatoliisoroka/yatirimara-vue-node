const { isAuthenticated } = require('../utils/auth')
const { retError, retCode } = require('../utils');
const { combineResolvers } = require('graphql-resolvers');


// ====================================================================
// create Thread
// ====================================================================
const discuss_thread_create = combineResolvers(
   isAuthenticated,
   async (_, args, {
      me,
      models
   }) => {
      const createdDa = await models.Discuss.create({ ...args, user_id: me._id })
      return createdDa
   }
);

const threads = async (_, args, { models }) => {

   let sort = {
      'createdAt': -1,
   }
   const items = await models.Discuss.aggregate([{
      $match: {
         campaign_id: args.campaign_id
      },
   },
   {
      $sort: sort
   },
   {
      $project: {
         title: 1,
         content: 1,
         answer_count: { $size: '$answers' },
         createdAt: 1
      }
   }
   ])
   return items
};

const thread = async (_, args, { models }) => {
   let thread = await models.Discuss.findById(args._id)
   if (!thread) retError('no', 'Thread')
   thread = thread.toObject()
   thread.user = await models.User.findById(thread.user_id)

   for (let index = 0; index < thread.answers.length; index++) {
      const element = thread.answers[index];
      element.user = await models.User.findById(element.user_id);
   }
   return thread
};

const discuss_answer_create = combineResolvers(
   isAuthenticated,
   async (_, args, { me, models }) => {
      const createdDa = await models.Discuss.findByIdAndUpdate(args.thread_id, {
         $push: { answers: { user_id: me._id, content: args.content } }
      })
      return createdDa
   }
);

module.exports = {

   Query: {
      threads,
      thread
   },
   Mutation: {
      discuss_thread_create,
      discuss_answer_create
   }
};