import Vue from 'vue'

Vue.component('base-card', () => import(/* webpackChunkName: 'card-component' */'../components/Card.vue'))
Vue.component('form-group', () => import(/* webpackChunkName: 'form-group' */'../components/FormGroup.vue'))
