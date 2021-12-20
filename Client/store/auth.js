import { LOGIN, LOGIN_BY_ADMIN, ME } from '@/api/auth'
import { FOLLOW } from '@/api/campaign'
import { QUALIFY } from '@/api/user'
import { getUserCookie, setUserCookie, removeUserCookie } from "@/utils/cookie"
export const state = () => {
   return {
      // _id,
      // pic,
      // email,
      user: getUserCookie()
   }
}

export const mutations = {
   setAuth(state, data) {
      state.user = data
   },
   setFollow(state, data) {
      state.user.follows = data
   },
   SET_QUALIFY(state, data) {
      state.user.qualified_investor = data
   },
}
export const getters = {
   follows(state) {
      return state.user?.follows || []
   }
}

export const actions = {
   // store with USer
   setUser({ commit }, user) {
      commit('setAuth', user)
      const cookie_data = {
         _id: user._id,
         pic: user.pic,
         email: user.email,
         phone_code: user.phone_code,
         phone: user.phone,
         role: user.role,
         admin: user.admin
      }
      setUserCookie(JSON.stringify(cookie_data))
   },
   // Login
   async login({ dispatch }, variables) {
      // 
      const apolloClient = this.app.apolloProvider.defaultClient
      try {
         const { data } = await apolloClient.query({
            query: LOGIN,
            variables,
            fetchPolicy: 'no-cache'
         })
         await this.$apolloHelpers.onLogin(data.login.access_token)

         dispatch('setUser', data.login.user)

         return true

      } catch (error) {
         return false
      }
   },
   // Login By Admin
   async loginAdmin({ dispatch }, token) {
      // 
      const apolloClient = this.app.apolloProvider.defaultClient
      try {
         const { data } = await apolloClient.query({
            query: LOGIN_BY_ADMIN,
            variables: { token },
            fetchPolicy: 'no-cache'
         })
         if (data?.login_by_admin?.access_token) {
            await this.$apolloHelpers.onLogin(data.login_by_admin.access_token)
            dispatch('setUser', data.login_by_admin.user)
         }
         return true

      } catch (error) {
         return false
      }
   },
   async me({ dispatch }) {
      const apolloClient = this.app.apolloProvider.defaultClient
      try {
         const { data } = await apolloClient.query({
            query: ME,
            fetchPolicy: 'no-cache'
         })
         dispatch('setUser', data.me)
         return data.me

      } catch (error) {
         dispatch('logout')
         return false
      }
   },
   async logout({ commit }) {
      await this.$apolloHelpers.onLogout()
      commit('setAuth', {})
      removeUserCookie()
      return true
   },
   async follow({ commit }, _id) {
      const apolloClient = this.app.apolloProvider.defaultClient
      try {
         const { data } = await apolloClient.mutate({
            mutation: FOLLOW,
            variables: { _id },
            fetchPolicy: 'no-cache'
         })
         commit('setFollow', data.follow)

      } catch (error) {
         return false
      }
   },
   async qualify({ commit }, _id) {
      const apolloClient = this.app.apolloProvider.defaultClient
      try {
         const { data } = await apolloClient.mutate({
            mutation: QUALIFY,
            fetchPolicy: 'no-cache'
         })
         commit('SET_QUALIFY', data.qualify)

      } catch (error) {
         return false
      }
   },
}
