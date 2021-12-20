import { THREADS } from '@/api/discuss'
export const state = () => {
  return {
    threads: [],
    loading: false,
    _id: null
  }
}

export const mutations = {
  setState(state, data) {
    Object.keys(data).forEach(kk => {
      state[kk] = data[kk]
    });
  },
  pushThread(state, data) {
    state.threads.push(data)
  },
}

export const actions = {

  async getThreads({ commit }, _id) {
    // 
    const apolloClient = this.app.apolloProvider.defaultClient
    try {
      commit('setState', { _id })
      const { data } = await apolloClient.query({
        query: THREADS,
        variables: { campaign_id: _id },
        fetchPolicy: 'no-cache'
      })
      commit('setState', data)
      return true
    } catch (error) {
      console.log(error);
      return false
    }
  },

}
