<template>
  <zoom-y-transition group>
    <page-header key="header" />
    <base-card key="item">
      <div class="w-1/2">
        <form-group label="Report Type">
          <select class="input-group" v-model="type">
            <option value="">Choose Report Type</option>
            <option v-for="type in types" :key="type" :value="type">
              {{ type | capitalize }}
            </option>
          </select>
        </form-group>
      </div>
      <button class="dark-btn" @click="download">
        Download
      </button>
    </base-card>
  </zoom-y-transition>
</template>

<script>
import http from '../../plugins/http'
import { ZoomYTransition } from 'vue2-transitions'
export default {
  components: {
    ZoomYTransition
  },
  data: () => ({
    types: ['all', 'in', 'out'],
    type: ''
  }),
  methods: {
    async download() {
      this.$Progress.start()
      try {
        await http.get('print?type=' + this.type)
        this.$Progress.finish()
      } catch (error) {
        this.$Progress.fail()
        this.$swal(
          'Error',
          'Failed download report file',
          'error'
        )
      }
    }
  },
  mounted() {
    this.$store.commit('setShowSidebar', false)
  }
}
</script>
