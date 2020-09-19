<template>
  <div>
    <page-header />
    <base-card>
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
  </div>
</template>

<script>
import http from '../../plugins/http'
export default {
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
  }
}
</script>
