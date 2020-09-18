<template>
  <div>
    <crud-layout
      :columns="columns"
      :moduleName="`productsOutcome`"
    >
      <tr class="hover:bg-gray-700" v-for="(product, index) in products.data" :key="product.id">
        <td class="px-4 py-3">
          {{ index + 1 }}
        </td>
        <td class="px-4 py-3">
          {{ product.date }}
        </td>
        <td class="px-4 py-3">
          {{ product.total }}
        </td>
        <td class="px-4 py-3">
          {{ product.Product.name }}
        </td>
        <td>
          <action-button></action-button>
        </td>
      </tr>
    </crud-layout>
  </div>
</template>

<script>
import CrudLayout from '@/layouts/CrudLayout.vue'
import ActionButton from '@/components/ActionButton.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    'crud-layout': CrudLayout,
    ActionButton
  },
  computed: {
    ...mapGetters({
      products: 'productsOutcome/productsOut'
    })
  },
  data: () => ({
    columns: ['date', 'total', 'product name', '']
  })
}
</script>
