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
    },
    async storeData({ dispatch }, payload) {
        try {
          const { data } = await http.post('product', payload)
          await dispatch('fetchAll')
          return data
      } catch ({ response }) {
          throw new Error(response.data.message)
      }
    },
    async updateData({ dispatch }, payload) {
      try {
        const { data } = await http.put('product/' + payload.id, payload.data)
        dispatch('fetchAll')
        return data
      } catch ({ response }) {
          throw new Error(response.data.message)
      }
    },
    async destroyData({ dispatch }, payload) {
      try {
        const { data } = await http.delete('product/' + payload.id)
        await dispatch('fetchAll')
        return data
      } catch ({ response }) {
          throw new Error(response.data.message)
      }
    }
  },
  getters: {
    products: state => state.products
  }
}
