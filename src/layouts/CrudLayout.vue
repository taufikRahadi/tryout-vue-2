<template>
  <div>
    <zoom-y-transition group>
      <div key="head" class="flex py-3 items-center justify-between w-full font-nunito">
        <h3 class="text-3xl font-black text-gray-100 capitalize">
          {{ $route.name }}
        </h3>
        <div class="flex text-white font-nunito text-light">
          <router-link class="text-gray-300 hover:text-gray-100" to="/">
            Dashboard
          </router-link>
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          <span class="capitalize">
            {{ $route.name }}
          </span>
        </div>
      </div>

      <base-card
        key="table-card"
        :cardTitle="`${$route.name} Page`"
      >
        <template v-slot:card-header>
          <div class="flex justify-between items-center">
            <h3 class="text-2xl font-semibold">
              List of {{ $route.name }}            
            </h3>
            <button @click="showModal" class="dark-btn">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              Add New
            </button>
          </div>
        </template>
        <table class="table-auto w-full">
          <thead>
            <tr class="border-b-2 border-b-gray-100">
              <th class="py-1 px-3">
                #
              </th>
              <th class="py-1 px-3 capitalize" v-for="column in columns" :key="column">
                {{ column }}
              </th>
              <th class="py-1 px-3 w-10">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <slot></slot>
          </tbody>
        </table>
        <base-pagination 
          class="px-3" 
          :totalPages="data.totalPages"
          :totalItems="data.totalItems"
          :currentPage="currentPage"
          @click-page="fetchDataPage"
        />
      </base-card>

    </zoom-y-transition>
    <form @submit.prevent="submitAction">
      <t-modal
        :header="$route.name"
        v-model="$store.state.showModal"
      >
        <component :is="formComponent" :formRecord="formRecord"></component>
        <template v-slot:footer>
          <div class="flex justify-between">
            <button type="submit" class="dark-btn">
              Submit
            </button>
          </div>
        </template>
      </t-modal>
    </form>
  </div>
</template>

<script>
import { ZoomYTransition } from 'vue2-transitions'
import { mapMutations, mapGetters } from 'vuex'
export default {
  components: {
    ZoomYTransition
  },
  props: {
    data: {
      default: {}
    },
    columns: {
      type: Array
    },
    moduleName: {
      type: String
    },
    formComponent: Object,
    formRecord: Object,
    customSubmitAction: Function
  },
  computed: {
    ...mapGetters(['isEditing'])
  },
  data: () => ({
    currentPage: 1,
  }),
  methods: {
    ...mapMutations(['setShowModal', 'setIsEditing']),
    showModal() {
      this.$emit('reset-data')
      this.setShowModal()
      this.setIsEditing(false)
    },
    async fetchDataPage(page) {
      try {
        await this.fetchData('?limit=10&page=' + page)
      } catch (error) {
        this.$Progress.fail()
      }
    },

    async fetchData(payload = '?limit=10&page=1') {
      this.$Progress.start()
      try {
        await this.$store.dispatch(`${this.moduleName}/fetchAll`, payload)
        this.$Progress.finish()
      } catch (error) {
        console.error(error)
      }
    },

    async submitAction() {
      this.$Progress.start()
      if (this.customSubmitAction) {
        await this.customSubmitAction()
        this.$Progress.finish()
      } else {
        if (this.isEditing) {
          try {
            await this.$store.dispatch(`${this.moduleName}/updateData`, this.formRecord)
            this.$Progress.finish()
            this.setShowModal()
            this.$swal(
              'Success',
              'Data Updated',
              'success'
            )
          } catch (error) {
            this.$Progress.fail()
            this.$swal(
              'Failed',
              'Fail Updating Data',
              'error'
            )
          }
        } else {
          try {
            console.log(this.isEditing)
            await this.$store.dispatch(`${this.moduleName}/storeData`, this.formRecord)
            this.$Progress.finish()
            this.setShowModal()
            this.$swal(
              'Success',
              'Data Created',
              'success'
            )
          } catch (error) {
            this.$Progress.fail()
            this.$swal(
              'Failed',
              'Fail Creating Data',
              'error'
            )
          }
        }
      }
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>
