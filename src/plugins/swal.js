import Vue from 'vue'
import VueSweetAlert2 from 'vue-sweetalert2'

Vue.use(VueSweetAlert2)

const toast = (message, icon) => {
  Vue.swal({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    icon: icon,
    title: message,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Vue.swal.stopTimer)
      toast.addEventListener('mouseleave', Vue.swal.resumeTimer)
    }
  })
}

const alert = (text, icon, title) => {
  Vue.swal({
    icon,
    title,
    text
  })
}

export {
  toast, alert
}
