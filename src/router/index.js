import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'Home' }
  },
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'dashboard' },
    component: () => import(/* webpackChunkName: 'Master layout' */'../views/Master.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        name: 'dashboard',
        path: '',
        component: () => import(/* webpackChunkName: 'Dashboard layout' */'../views/Master/Dashboard.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        name: 'products',
        path: 'products',
        component: () => import(/* webpackChunkName: 'Products layout' */'../views/Master/Products.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        name: 'product income',
        path: 'product-income',
        component: () => import(/* webpackChunkName: 'Product Income Layout' */'../views/Master/ProductsIncome.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        name: 'product outcome',
        path: 'product-outcome',
        component: () => import(/* webpackChunkName: 'Product Outcome Layout' */'../views/Master/ProductsOutcome.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        name: 'users',
        path: 'users',
        component: () => import(/* webpackChunkName: 'Users Layout' */'../views/Master/Users.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        name: 'print report',
        path: 'print-report',
        component: () => import(/* webpackChunkName: 'Print Layout' */'../views/Master/PrintReport.vue'),
        meta: {
          requiresAuth: true
        }
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

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.getters['auth/isLoggedIn']) {
      return next()
    } else {
      return next({
        name: 'login'
      })
    }
  } else if(to.name === 'login') {
    if (store.getters['auth/isLoggedIn']) {
      return next({
        name: 'Home'
      })
    } else {
      return next()
    }
  } else {
    return next()
  }
})

export default router
