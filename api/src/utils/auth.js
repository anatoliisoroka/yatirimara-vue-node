const jwt = require('jsonwebtoken')
const { ForbiddenError, AuthenticationError, UserInputError } = require('apollo-server');
const secret = process.env.SECRET_TOKEN
const { skip, combineResolvers } = require('graphql-resolvers');

const getMe = async token => {
  if (token) {
    try {
      return await jwt.verify(token, secret);
    } catch (e) {
      return false
    }
  } else return false
};

/* 
data: {
  _id: ID,
  role_id: String
}
*/
const getToken = async (data, expiresIn = '100h') => {
  return jwt.sign(data, secret, { expiresIn });
};

const isAuthenticated = (parent, args, { me }) => me ? skip : new AuthenticationError('Not authenticated');

const isRoleEditor = async (_, args, { me, models }) => {
  if (me.role_id == 'super') skip
  else {
    const user = await models.Admin.findById(me._id)
    if (user && user.active) {
      const Role = await models.Role.findById(me.role_id)
      if (Role.permission.includes('ROLE')) skip;
      else throw new ForbiddenError('ROLE')

    } else {
      new AuthenticationError('ADMIN_DELETED_OR_DEACTIVATED')
    }
  }
};
const isUserEditor = async (_, args, { me, models }) => {
  if (me.role_id == 'super') skip
  else {
    const user = await models.Admin.findById(me._id)
    if (user && user.active) {
      const Role = await models.Role.findById(me.role_id)
      if (Role.permission.includes('USER')) skip;
      else throw new ForbiddenError('USER')

    } else {
      new AuthenticationError('ADMIN_DELETED_OR_DEACTIVATED')
    }
  }
};
const isBannerEditor = async (_, args, { me, models }) => {
  if (me.role_id == 'super') skip
  else {
    const user = await models.Admin.findById(me._id)
    if (user && user.active) {
      const Role = await models.Role.findById(me.role_id)
      if (Role.permission.includes('BANNER')) skip;
      else throw new ForbiddenError('BANNER')

    } else {
      new AuthenticationError('ADMIN_DELETED_OR_DEACTIVATED')
    }
  }
};
const isUserEditor1 = async (_, args, { me, models }) => {
  const admin = await models.Admin.findById(me.admin)
  if (admin && admin.active) {
    if (admin.role_id == 'super') skip
    else {
      const Role = await models.Role.findById(admin.role_id)
      if (Role.permission.includes('USER')) skip;
      else throw new ForbiddenError('USER')
    }
  } else {
    new AuthenticationError('ADMIN_DELETED_OR_DEACTIVATED')
  }
};
const isPublisher = async (_, args, { me, models }) => {
  if (me.role_id == 'super') skip
  else {
    const user = await models.Admin.findById(me._id)
    if (user && user.active) {
      const Role = await models.Role.findById(me.role_id)
      if (Role.permission.includes('PUBLISH')) skip;
      else throw new ForbiddenError('PUBLISH')

    } else {
      new AuthenticationError('ADMIN_DELETED_OR_DEACTIVATED')
    }
  }
};
const isEventEditor = async (_, args, { me, models }) => {
  if (me.role_id == 'super') skip
  else {
    const user = await models.Admin.findById(me._id)
    if (user && user.active) {
      const Role = await models.Role.findById(me.role_id)
      //  INVESTMENT=>  1: request, 2: pending(approved)                    5: rejected
      //  PUBLISH=>                 2: pending,           3: published,     6: rejected
      //  CAMPAIGN =>   1: request, 2: pending,           3: published, 
      let enabled = false
      switch (args.status) {
        case 0:
          if (Role.permission.includes('INVESTMENT')) enabled = true;
          break;
        case 1:
          if (Role.permission.includes('INVESTMENT') || Role.permission.includes('CAMPAIGN')) enabled = true;
          break;
        case 2:
          enabled = true;
          break;
        case 3:
          if (Role.permission.includes('PUBLISH') || Role.permission.includes('CAMPAIGN')) enabled = true;
          break;
        case 5:
          if (Role.permission.includes('INVESTMENT')) enabled = true;
          break;
        case 6:
          if (Role.permission.includes('PUBLISH')) enabled = true;
          break;
      }

      if (enabled) skip
      else throw new ForbiddenError('ROLE')

    } else {
      new AuthenticationError('ADMIN_DELETED_OR_DEACTIVATED')
    }
  }
};

module.exports = {
  getMe,
  getToken,
  isAuthenticated,
  isRoleEditor,
  isUserEditor,
  isEventEditor,
  isPublisher,
  isUserEditor1,
  isBannerEditor,
}
