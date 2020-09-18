<template>
  <div>
    <crud-layout
      :columns="columns"
      :moduleName="`products`"
    >
      <tr class="hover:bg-gray-700" v-for="(product, index) in products.data" :key="product.id">
        <td class="px-4 py-3 font-bold text-center">
          {{ index + 1 }}
        </td>
        <td class="px-4 py-3">
          {{ product.name | capitalize }}
        </td>
        <td class="px-4 py-3">
          {{ product.stock }}
        </td>
        <td class="px-4 py-3">
          {{ product.price | currency }}
        </td>
        <td class="px-4 py-3">
          {{ product.supplier.full_name | capitalize }}
        </td>
        <td>
          <action-button />
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
      products: 'products/products'
    })
  },
  data: () => ({
    columns: ['Name', 'Stock', 'Price', 'Supplier']
  }),
}
</script>
