import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/plugins'
import './assets/styles.css'
import './plugins/globalComponent'
import './plugins/filters'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
