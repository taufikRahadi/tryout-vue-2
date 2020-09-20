<template>
  <div>
    <zoom-y-transition group>
      <page-header key="header"/>

      <base-card
        key="table-card"
        :cardTitle="`${$route.name} Page`"
        v-if="data.totalItems > 0"
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

      <base-card key="img" v-else>
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
        <div class="flex justify-center items-center">
          <img src="@/assets/empty-content.svg" alt="" class="w-64">
        </div>
        <h3 class="text-2xl text-center font-bold text-gray-100">
          Empty ~
        </h3>
      </base-card>

    </zoom-y-transition>
    <form @submit.prevent="submitAction">
      <t-modal
        :header="$route.name"
        v-model="$store.state.showModal"
      >
        <component :is="formComponent" :errors="errors" :formRecord="formRecord"></component>
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
    errors: {
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
        this.currentPage = page
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
        this.$Progress.fail()
        this.$swal({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: 'error',
          title: 'Failed getting data',
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', this.$swal.stopTimer)
            toast.addEventListener('mouseleave', this.$swal.resumeTimer)
          }
        })
      }
    },

    async submitAction() {
      this.$Progress.start()
      if (this.customSubmitAction) {
        await this.customSubmitAction()
        this.$Progress.finish()
      } else {
        if (this.$emit('validate-data')) {
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
    }
  },
  beforeMount() {
    this.fetchData()
    this.$store.commit('setShowSidebar', false)
  }
}
</script>
