<template>
  <div>
    <crud-layout
      :columns="columns"
    ></crud-layout>
  </div>
</template>

<script>
import CrudLayout from '@/layouts/CrudLayout.vue'
export default {
  components: {
    'crud-layout': CrudLayout
  },
  data: () => ({
    columns: ['date', 'total', 'product name', '']
  })
}
</script>
