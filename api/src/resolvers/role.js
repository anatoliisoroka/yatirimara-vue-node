const bcrypt = require('bcrypt');
const {
   retError
} = require('../utils')
const {
   getToken, isAuthenticated, isRoleEditor
} = require('../utils/auth')

const {
   combineResolvers
} = require('graphql-resolvers');

// get
const roles = combineResolvers(
   isAuthenticated, isRoleEditor,
   async (_, args, { models }) => {
      const roles = await models.Role.find()
      return roles
   }
);
// create
const role_add = combineResolvers(
   isAuthenticated, isRoleEditor,
   async (_, args, { models }) => {
      return await models.Role.create(args)
   }
);
// update
const role_update = combineResolvers(
   isAuthenticated, isRoleEditor,
   async (_, args, { models }) => {
      return await models.Role.findByIdAndUpdate(args._id, args)
   }
);
// delete
const role_delete = combineResolvers(
   isAuthenticated, isRoleEditor,
   async (_, args, { models }) => {
      return await models.Role.findByIdAndDelete(args._id)
   }
);

module.exports = {

   Query: {
      roles,
   },

   Mutation: {
      role_add,
      role_update,
      role_delete,
   },
};