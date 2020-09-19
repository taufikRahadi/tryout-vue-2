<template>
  <div>
    <div class="bg-transparent py-5 px-10" id="nav">
      <div class="flex justify-between text-white font-bold font-nunito">
        <div class="flex items-center">
          <router-link to="/" class="h-full text-2xl font-black flex items-center hover:cursor-pointer">
            {{ appName }}
          </router-link>
          <svg class="cursor-pointer ml-10 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"></path></svg>
        </div>
        <button @click="logoutButton()" class="rounded hover:shadow-lg font-bold px-5 py-2 font-nunito bg-half flex items-center">
          <svg class="mr-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  computed: {
    appName() {
      return process.env.VUE_APP_NAME
    }
  },

  methods: {
    ...mapActions({
      logout: 'auth/logout'
    }),
    logoutButton() {
      this.$swal.fire({
        title: 'Are you sure?',
        text: "Your Session Will Be Ended!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if(result.value) {
                if(this.logout()) {
                    this.$swal.fire(
                        "Success",
                        "Logout Success",
                        "success"
                    )
                    window.location.href = '/login'
                } else {
                    this.$swal.fire(
                        "Failed",
                        "Logout Fail",
                        "error"
                    )
                }
            } 
        })
    }
  }
}
</script>