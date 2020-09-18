import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'dashboard' },
    component: () => import(/* webpackChunkName: 'Master layout' */'../views/Master.vue'),
    children: [
      {
        name: 'dashboard',
        path: '',
        component: () => import(/* webpackChunkName: 'Dashboard layout' */'../views/Master/Dashboard.vue')
      },
      {
        name: 'products',
        path: 'products',
        component: () => import(/* webpackChunkName: 'Products layout' */'../views/Master/Products.vue')
      },
      {
        name: 'product income',
        path: 'product-income',
        component: () => import(/* webpackChunkName: 'Product Income Layout' */'../views/Master/ProductsIncome.vue')
      },
      {
        name: 'product outcome',
        path: 'product-outcome',
        component: () => import(/* webpackChunkName: 'Product Outcome Layout' */'../views/Master/ProductsOutcome.vue')
      },
      {
        name: 'users',
        path: 'users',
        component: () => import(/* webpackChunkName: 'Users Layout' */'../views/Master/Users.vue')
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName: 'Auth Layout' */'../views/Auth/Login.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
