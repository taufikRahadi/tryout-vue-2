import http from '../plugins/http'

export default {
  namespaced: true,
  state: {
    productsOut: []
  },
  mutations: {
    setProductsOut(state, data) {
      state.productsOut = data
    }
  },
  actions: {
    async fetchAll({ commit }, payload = '?limit=10&1') {
      try {
        const { data } = await http.get('out' + payload)
        commit('setProductsOut', data.data)
      } catch (error) {
        throw new Error(error)
      }
    }
  },
  getters: {
    productsOut: state => state.productsOut
  }
}
