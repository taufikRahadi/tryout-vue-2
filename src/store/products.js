import http from '../plugins/http'
http.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`

export default {
  namespaced: true,
  state: {
    products: [],
  },
  mutations: {
    setProducts(state, data) {
      state.products = data
    }
  },
  actions: {
    async fetchAll({ commit }, payload = '?limit=10&page=1') {
      try {
        const { data } = await http.get('product' + payload)
        commit('setProducts', data.data)
      } catch (error) {
        throw Error(error)        
      }
    }
  },
  getters: {
    products: state => state.products
  }
}
