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
    },
    async storeData({ dispatch }, payload) {
      try {
          const { data } = await http.post('out', { data: payload })
          dispatch('fetchAll')
          return data
      } catch ({ response }) {
          throw new Error(response.data.message)
      }
    },

    async updateData({ dispatch }, payload) {
        try {
            const { data } = await http.put('out/' + payload.id, { data: payload })
            dispatch('fetchAll')
            return data
        } catch ({ response }) {
            throw new Error(response.data.message)
        }
    },

    async destroyData({ dispatch }, payload) {
        try {
            const { data } = await http.delete('out/' + payload.id)
            dispatch('fetchAll')
            return data
        } catch ({ response }) {
            throw new Error(response.data.message)
        }
    }
  },
  getters: {
    productsOut: state => state.productsOut
  }
}
