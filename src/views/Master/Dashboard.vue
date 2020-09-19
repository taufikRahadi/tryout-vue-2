<template>
  <div>
    <fade-transition group>
      <div key="prod" class="grid grid-cols-3 gap-5 mb-5">
        <base-card
          cardTitle="Products"
          cardBg="bg-half"
        >
          <div class="flex items-center justify-between py-5">
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
          <div class="flex items-center justify-between py-5">
            <svg class="mr-5 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            <h3 class="text-2xl font-bold">
              {{ userLength }}
            </h3>
          </div>
        </base-card>
      </div>
      <base-card key="las" cardTitle="Last Income Product">
      </base-card>
    </fade-transition>
  </div>
</template>

<script>
import { FadeTransition } from 'vue2-transitions'
import { mapActions, mapGetters } from 'vuex'
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
    ...mapActions({
      fetchProducts: 'products/fetchAll',
      fetchUser: 'users/fetchAll'
    }),
    async fetchData() {
      this.$Progress.start()
      try {
        await this.fetchProducts()
        await this.fetchUser()
        this.userLength = this.$store.state.users.users.totalItems
        this.productsLength = this.$store.state.products.products.totalItems
        this.$Progress.finish()
      } catch (error) {
        this.$Progress.fail()
      }
    }
  },
  async created() {
    this.fetchData()
  }
}
</script>
