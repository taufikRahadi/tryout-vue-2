<template>
  <div class="flex items-center">
    <slot 
      name="before" 
      :record="record"
      :formRecord="formRecord"
      :moduleName="moduleName"
    />
    <button @click="showEditModal" class="mr-2 mt-2 sm-btn-warning">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
    </button>
    <button @click="deleteData" class="mt-2 sm-btn-danger">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
    </button>
    <slot 
      name="before"
      :record="record"
      :formRecord="formRecord"
      :moduleName="moduleName"
    />
  </div>
</template>

<script>
export default {
  name: 'action-button',
  props: ['record', 'formRecord', 'moduleName'],
  methods: {
    showEditModal() {
      this.$store.commit('setIsEditing', true)
      this.$store.commit('setShowModal')
      this.$emit('fill-data', this.record)
    },
    deleteData() {
      this.$swal.fire({
        title: 'Are you sure?',
        text: "Deleted data cant be retrieved",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async ({ value }) => {
        if (value) {
          this.$Progress.start()
          try {
            await this.$store.dispatch(`${this.moduleName}/destroyData`, this.record)
            this.$Progress.finish()
            this.$swal(
              'Success',
              'Data deleted',
              'success'
            )
          } catch (error) {
            this.$Progress.fail()
            this.$swal(
              'Error',
              'Fail deleting data',
              'error'
            )
          }
        }
      })
    }
  }
}
</script>
