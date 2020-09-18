import http from '../plugins/http'
http.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`

export default {
  namespaced: true,
  state: {
    users: []
  },
  mutations: {
    setUsers(state, users) {
      state.users = users
    }
  },
  actions: {
    async fetchAll({ commit }, payload = '?limit=10&page=1') {
      try {
        const { data } = await http.get('user' + payload)
        commit('setUsers', data.data)
      } catch (error) {
        throw new Error(error)
      }
    },

    async storeData({ dispatch }, payload) {
      try {
          const { data } = await http.post('user', { data: payload })
          dispatch('fetchAll')
          return data
      } catch ({ response }) {
          throw new Error(response.data.message)
      }
    },

    async updateData({ dispatch }, payload) {
        try {
            const { data } = await http.put('user/' + payload.id, { data: payload})
            dispatch('fetchAll')
            return data
        } catch ({ response }) {
            throw new Error(response.data.message)
        }
    },

    async destroyData({ dispatch }, payload) {
        try {
            const { data } = await http.delete('user/' + payload.id)
            dispatch('fetchAll')
            return data
        } catch ({ response }) {
            throw new Error(response.data.message)
        }
    }
  },
  getters: {
    users: state => state.users
  }
}
