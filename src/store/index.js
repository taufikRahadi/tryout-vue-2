import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import products from './products'
import users from './users'
import productsIncome from './productsIncome'
import productsOutcome from './productsOutcome'
import http from '../plugins/http'
import '../plugins/plugins'
import { toast, alert } from '../plugins/swal'

http.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`

Vue.use(Vuex)

const getMutationName = moduleName => `${moduleName}/set${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}`

export default new Vuex.Store({
  state: {
    showModal: false,
    isEditing: false,
    showSidebar: false,
  },
  mutations: {
    setShowModal(state, val) {
      state.showModal = val != undefined ? val : !state.showModal
    },
    setIsEditing(state, val) {
      state.isEditing = val != undefined ? val : !state.isEditing
    },
    setShowSidebar(state, val) {
      state.showSidebar = val != undefined ? val: !state.showSidebar
    }
  },
  actions: {
    async fetchAll({ commit }, payload) {
      try {
        const { data } = await http.get(payload.url)
        commit(getMutationName(payload.moduleName), data.data)
        return data
      } catch (error) {
        toast('Failed getting data :(', 'error')
      }
    },
    async storeData({ dispatch, commit }, payload) {
      try {
        const { data } = await http.post(payload.url, payload.data)
        await dispatch('fetchAll', { url: payload.url, moduleName: payload.moduleName })
        commit('setShowModal')
        toast('Success Created Data', 'success')
        return data
      } catch ({ response }) {
        alert('Failed Creating Data', 'error', 'Error')
      }
    },
    async updateData({ dispatch, commit }, payload) {
      try {
        const { data } = await http.put(`${payload.url}/${payload.id}`, payload.data)
        await dispatch('fetchAll', { url: payload.url, moduleName: payload.moduleName })
        commit('setShowModal')
        toast('Data Updated', 'success')
        return data
      } catch (error) {
        toast('Failed Updating Data :(', 'error')
      }
    },
    async destroyData({ dispatch }, payload) {
      try {
        const { data } = await http.delete(`${payload.url}/${payload.id}`)
        await dispatch('fetchAll', { url: payload.url, moduleName: payload.moduleName })
        toast('Success Delete Data', 'success')
        return data
      } catch (error) {
        toast('Delete Data Failed :(', 'error')
      }

    }
  },
  modules: {
    auth,
    products,
    users,
    productsIncome,
    productsOutcome
  },
  getters: {
    showModal: state => state.showModal,
    isEditing: state => state.isEditing
  }
})
