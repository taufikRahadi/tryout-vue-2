import http from '../plugins/http'
export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('access_token') | null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {
    async login({ commit, state }, payload) {
      try {
        const { data } = await http.post('auth/login', { data: payload })
        const { token } = data.data
        localStorage.setItem('access_token', token)
        commit('setToken', token)
        http.defaults.headers['Authorization'] = `Bearer ${state.token}`
      } catch ({ response }) {
        throw Error(response.data.message)
      }
    },
    async logout({ commit }) {
      try {
        commit('setToken', null)
        localStorage.removeItem('access_token')
        return true
      } catch (error) {
        throw Error(error)
      }
    },
  },

  getters: {
    isLoggedIn: state => {
      if (state.token || localStorage.getItem('access_token')) {
        return true
      }

      return false
    }
  }
}