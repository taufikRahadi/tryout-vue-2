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
          <input v-model="form.username" type="text" class="bg-dark appearance-none rounded w-full py-2 px-4 text-gray-100 leading-tight focus:outline-none" placeholder="Username">
        </form-group>
        <form-group
          label="Password"
        >
          <input v-model="form.password" type="password" class="bg-dark appearance-none rounded w-full py-2 px-4 text-gray-100 leading-tight focus:outline-none" placeholder="Password">
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
    }
  }),
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    async submitLogin() {
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
    }
  }
}
</script>
