<template>
  <div>
    <fade-transition group>
      <div key="prod" class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <base-card
          cardTitle="Products"
          cardBg="bg-half"
        >
          <div class="flex items-center justify-between py-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"></path></svg>
            <h3 class="text-2xl font-bold">
              {{ productsLength }}
            </h3>
          </div>
        </base-card>
        <base-card
          cardTitle="Users"
          cardBg="bg-half"
        >
          <div class="flex items-center justify-between py-3">
            <svg class="mr-5 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            <h3 class="text-2xl font-bold">
              {{ userLength }}
            </h3>
          </div>
        </base-card>
      </div>
      <div class="grid grid-cols-1 md:gap-5 md:grid-cols-2" key="last">
        <base-card cardTitle="Latest Income Product">
        </base-card>
        <base-card cardTitle="Latest Outcome Product">
        </base-card>
      </div>
      <div class="grid grid-cols-1 mt-5" key="lowstock">
        <base-card cardTitle="Product With Low Stock" cardBg="bg-half"></base-card>
      </div>
    </fade-transition>
  </div>
</template>

<script>
import { FadeTransition } from 'vue2-transitions'
import { mapGetters } from 'vuex'
import http from '@/plugins/http'
export default {
  components: {
    FadeTransition
  },
  computed: {
    ...mapGetters({
      products: 'products/products',
      users: 'users/users'
    })
  },
  data: () => ({
    userLength: 0,
    productsLength: 0
  }),
  methods: {
    // ...mapActions({
    //   fetchProducts: 'products/fetchAll',
    //   fetchUser: 'users/fetchAll'
    // }),
    async fetchProducts() {
      try {
        const { data } = await http.get('product')
        this.productsLength = data.data.totalItems
        this.$Progress.finish()
      } catch (error) {
        console.error(error)
        this.$Progress.fail()
      }
    },
    async fetchUser() {
      try {
        const { data } = await http.get('user')
        this.userLength = data.data.totalItems
        this.$Progress.finish()
      } catch (error) {
        console.error(error)
        this.$Progress.fail()
      }
    },
    async fetchData() {
      this.$Progress.start()
      this.fetchUser()
      this.fetchProducts()
    }
  },
  beforeMount() {
    this.fetchData()
    this.$store.commit('setShowSidebar', false)
  }
}
</script>
