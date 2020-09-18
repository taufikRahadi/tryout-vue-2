import Vue from 'vue'
import VueTailwind from 'vue-tailwind'
import Transitions from 'vue2-transitions'
import VueSweetAlert2 from 'vue-sweetalert2'
import VueProgressBar from 'vue-progressbar'

const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

const tailwindSetting = {}

Vue.use(VueProgressBar, options)
Vue.use(VueTailwind, tailwindSetting)
Vue.use(Transitions)
Vue.use(VueSweetAlert2)
