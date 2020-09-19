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
    async fetchAll({ commit }, payload = '?limit=10&page=1') {
      try {
        const { data } = await http.get('in' + payload)
        commit('setProductsIn', data.data)
      } catch (error) {
        throw new Error(error)
      }
    },
    async storeData({ dispatch }, payload) {
      try {
          const { data } = await http.post('in', { data: payload })
          await dispatch('fetchAll')
          return data
      } catch ({ response }) {
          throw new Error(response.data.message)
      }
    },

    async updateData({ dispatch }, payload) {
        try {
            const { data } = await http.put('in/' + payload.id, { data: payload})
            await dispatch('fetchAll')
            return data
        } catch ({ response }) {
            throw new Error(response.data.message)
        }
    },

    async destroyData({ dispatch }, payload) {
        try {
            const { data } = await http.delete('in/' + payload.id)
            await dispatch('fetchAll')
            return data
        } catch ({ response }) {
            throw new Error(response.data.message)
        }
    }
  },
  getters: {
    productsIn: state => state.productsIn
  }
}
