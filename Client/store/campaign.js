import { CAMPAIGNS, EVENTS, EVENT, FOLLOWS } from '@/api/campaign'
import { DOCUMENTS } from '@/api/docs'
export const state = () => {
  return {
    mine: {
      total: 0,
      items: [],
    },
    docs: {
      production: [],
      market: [],
      analystics: [],
      financial: [],
      trademark: [],
      awards: [],
      permissions: [],
    },
    events: {
      total: 0,
      items: []
    },
    event: null,
    loading: false,
    _id: null,
    follows: []
  }
}

export const mutations = {
  setState(state, data) {
    Object.keys(data).forEach(kk => {
      state[kk] = data[kk]
    });
  },
  setStateEvent(state, data) {
    Object.keys(data).forEach(kk => {
      state.event[kk] = data[kk]
    });
  },
  setDataMine(state, data) {
    state.mine = {
      total: data.total,
      items: data.items
    }
  },
  setDoc(state, data) {
    if (data.type)
      state.docs[data.type] = data.documents
    else {
      Object.keys(state.docs).forEach(el => {
        state.docs[el] = data.documents.filter(doc => doc.type == el)
      });
    }
  },
  setEvent(state, data) {
    if (!data) {
      state.events = {
        total: 0,
        items: []
      }
    } else {
      state.events['total'] = data.total
      state.events.items.push(...data.items)
    }
  },
  SET_FOLLOWS(state, data) {
    state.follows = data || []    
  },
}

export const actions = {

  // Get Logs
  async getMyCampaigns({
    commit
  }, variables) {
    // 
    const apolloClient = this.app.apolloProvider.defaultClient
    try {
      const {
        data
      } = await apolloClient.query({
        query: CAMPAIGNS,
        variables,
        fetchPolicy: 'no-cache'
      })
      commit('setDataMine', data.campaigns)
      return true
    } catch (error) {
      return false
    }
  },
  async getDocument({ commit }, variables) {
    // 
    const apolloClient = this.app.apolloProvider.defaultClient
    try {
      commit('setState', { _id: variables.campaign_id })
      const { data } = await apolloClient.query({
        query: DOCUMENTS,
        variables,
        fetchPolicy: 'no-cache'
      })
      data.type = variables.type
      commit('setDoc', data)
      return true
    } catch (error) {
      return false
    }
  },
  async getEvents({ commit }, variables) {
    // 
    const apolloClient = this.app.apolloProvider.defaultClient
    try {
      if (variables.page == 1) commit('setEvent')
      commit('setState', { loading: true })
      if (!variables.status) delete variables.status
      const { data } = await apolloClient.query({
        query: EVENTS,
        variables,
        fetchPolicy: 'no-cache'
      })
      commit('setEvent', data.events)
      commit('setState', { loading: false })
      return true
    } catch (error) {
      console.log(error);
      commit('setState', { loading: false })
      return false
    }
  },
  async getEvent({ commit }, _id) {
    // 
    const apolloClient = this.app.apolloProvider.defaultClient
    try {
      commit('setState', { loading: true })
      const { data } = await apolloClient.query({
        query: EVENT,
        variables: { _id },
        fetchPolicy: 'no-cache'
      })
      commit('setState', data)
      commit('setState', { loading: false })
      return true
    } catch (error) {
      console.log(error);
      commit('setState', { loading: false })
      return false
    }
  },
  async getFollows({ commit }, _id) {
    // 
    const apolloClient = this.app.apolloProvider.defaultClient
    try {
      commit('setState', { loading: true })
      const { data } = await apolloClient.query({
        query: FOLLOWS,
        fetchPolicy: 'no-cache'
      })
      commit('SET_FOLLOWS', data.follows)
      commit('setState', { loading: false })
      return true
    } catch (error) {
      commit('setState', { loading: false })
      return false
    }
  },

}
