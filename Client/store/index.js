import { MY_TRANSACTIONS, MY_TRANSACTION_CHART } from '@/api/transaction'
export const state = () => {
  return {
    transaction: {
      total: 0,
      items: []
    },
    loading: false,
    transaction_chart: []
  }
}

export const mutations = {
  SET_TRANSACTION(state, data) {
    state.transaction = data
  },
  SET_LOADING(state, data) {
    state.loading = data
  },
  SET_TRANSACTION_CHART(state, data) {
    state.transaction_chart = data
  }
}

export const getters = {

}
export const actions = {
  nuxtServerInit({ commit }, { app, req }) {
    console.log("server intialized--------------->")
  },
  async getTransaction({ commit }, variables) {
    const apolloClient = this.app.apolloProvider.defaultClient
    try {
      commit('SET_LOADING', true)
      const { data } = await apolloClient.query({
        query: MY_TRANSACTIONS,
        variables,
        fetchPolicy: 'no-cache'
      })
      commit('SET_LOADING', false)
      commit('SET_TRANSACTION', data.my_transactions)
      return true
    } catch (error) {
      commit('SET_LOADING', false)
      console.log(error);
      return false
    }
  },
  async getTransactionChart({ commit }) {
    const apolloClient = this.app.apolloProvider.defaultClient
    try {
      commit('SET_LOADING', true)
      const { data } = await apolloClient.query({
        query: MY_TRANSACTION_CHART,
        fetchPolicy: 'no-cache'
      })
      commit('SET_LOADING', false)
      commit('SET_TRANSACTION_CHART', data.my_transaction_chart)
      return true
    } catch (error) {
      console.log(error);
      commit('SET_LOADING', false)
      return false
    }
  }
}
