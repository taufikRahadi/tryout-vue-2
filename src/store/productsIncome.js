import http from '../plugins/http'
http.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`

export default {
  namespaced: true,
  state: {
    productsIn: [],
  },
  mutations: {
    setProductsIn(state, data) {
      state.productsIn = data
    }
  },
  actions: {
    async fetchAll({ commit }, payload = '?limit=10&page=10') {
      try {
        const { data } = await http.get('in' + payload)
        commit('setProductsIn', data.data)
      } catch (error) {
        throw new Error(error)
      }
    }
  },
  getters: {
    productsIn: state => state.productsIn
  }
}
