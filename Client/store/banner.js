import { BANNERS } from '@/api/campaign'
export const state = () => ({
  home: [{
    id: 1,
    title: "SENSIBALL VR",
    description: "Sanal Futbol Antrenman Platformu Kampanyadan pay alarak şirkete ortak olabilirsiniz.",
    linkTitle: "Yatırım Yap",
    link: "",
    bg: '/images/banner/1.png'
  },
  {
    id: 2,
    title: "HAMURLA",
    description: "Kampanya Başarılı şekilde kapandı. ",
    linkTitle: "BAŞARDI",
    link: "",
    bg: '/images/banner/2.png'
  },
  ],
  active: {
    total: 0,
    items: []
  },
  soon: {
    total: 0,
    items: []
  },
  banners: []

})
export const mutations = {
  setState(state, data) {
    Object.keys(data).forEach(kk => {
      state[kk] = data[kk]
    });
  },
}


export const actions = {
  async getBanner({ commit }) {
    // 
    const apolloClient = this.app.apolloProvider.defaultClient
    try {
      const { data } = await apolloClient.query({
        query: BANNERS,
        variables: { limit: 5 },
        fetchPolicy: 'no-cache'
      })
      commit('setState', data)
      return true
    } catch (error) {
      return false
    }
  },

}
