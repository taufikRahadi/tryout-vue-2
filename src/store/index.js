import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import products from './products'
import users from './users'
import productsIncome from './productsIncome'
import productsOutcome from './productsOutcome'

Vue.use(Vuex)

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
