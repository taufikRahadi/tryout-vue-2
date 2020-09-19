<template>
  <div class="flex justify-center items-center h-screen">
    <base-card
      cardBg="bg-half"
      class="w-1/2"
    >
      <template v-slot:card-header>
        <h2 class="text-2xl font-black text-gray-900 uppercase">
          Login
        </h2>
      </template>
      <form @submit.prevent="submitLogin">
        <form-group
          label="Username"
        >
          <input v-model="form.username" type="text" :class="`bg-dark appearance-none rounded w-full py-2 px-4 text-gray-100 leading-tight ${errors.username ? 'focus:outline-red-400' : 'focus:outline-none'}`" placeholder="Username">
          <p class="text-red-400 w-full text-xs italic" v-show="errors.username">
            {{ errors.username }}
          </p>
        </form-group>
        <form-group
          label="Password"
        >
          <input v-model="form.password" type="password" :class="`bg-dark appearance-none rounded w-full py-2 px-4 text-gray-100 leading-tight ${errors.password ? 'focus:outline-red' : 'focus:outline-none'}`" placeholder="Password">
          <p class="text-red-400 w-full text-xs italic" v-show="errors.username">
            {{ errors.password }}
          </p>
        </form-group>
        <button class="rounded hover:shadow-lg font-bold px-5 py-2 font-nunito bg-dark flex items-center">
          Login
        </button>
      </form>
    </base-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    form: {
      username: '',
      password: '',
    },
    errors: {}
  }),
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    validate() {
      let state = false
      if (this.form.username.length <= 6) {
        this.$set(this.errors, 'username', 'Minimal 6 characters for username !')
      } else if (this.form.password <= 8) {
        this.$set(this.errors, 'password', 'Minimal 8 characters for password !')
      } else {
        state = true
      }
      return state
    },
    async submitLogin() {
      if (this.validate()) {
        try {
          await this.login({ username: this.form.username, password: this.form.password })
          this.$swal(
            'Success',
            'Login Success',
            'success'
          )
          this.$router.push({ name: 'dashboard' })
        } catch (error) {
          this.$swal(
            'Error',
            'Login Failed',
            'error'
          )
        }
      } else {
        this.$swal(
            'Error',
            'Login Failed',
            'error'
          )
      }
    }
  }
}
</script>
