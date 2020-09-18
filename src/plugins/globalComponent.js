import Vue from 'vue'

Vue.component('base-card', () => import(/* webpackChunkName: 'card-component' */'../components/Card.vue'))
