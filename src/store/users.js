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
    }
  },
  getters: {
    users: state => state.users
  }
}
