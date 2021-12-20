import { LOGS } from '@/api/logs'
export const state = () => {
  return {
    total: 0,
    items: []
  }
}

export const mutations = {  
  setData(state, data){
    state.total= data.total
    state.items= data.items
  }
}

export const actions = {

  // Get Logs
  async get_logs({
    commit
  }, variables) {
    // 
    const apolloClient = this.app.apolloProvider.defaultClient
    try {
      const {
        data
      } = await apolloClient.query({
        query: LOGS,
        variables,
        fetchPolicy: 'no-cache'
      })
      commit('setData', data.logs)
      return true
    } catch (error) {
      return false
    }
  },

}
