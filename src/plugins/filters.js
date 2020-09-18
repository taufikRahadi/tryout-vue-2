import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('capitalize', val => {
  return val.split(' ').map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(' ')
})
Vue.filter('currency', val => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(val))
Vue.filter('readableDate', val => dayjs(val).format('DD MMMM, YYYY'))
