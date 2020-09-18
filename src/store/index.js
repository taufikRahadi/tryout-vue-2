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
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    products,
    users,
    productsIncome,
    productsOutcome
  }
})
