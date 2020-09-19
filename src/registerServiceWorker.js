/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    offline () {
      alert('No internet connection found. App is running in offline mode')
    },
    error () {
      alert('We are sorry to inform you but there is an error in last request :(, please try again later')
    }
  })
}
