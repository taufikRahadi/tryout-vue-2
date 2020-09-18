<template>
  <div>
    <crud-layout
      :columns="columns"
      :moduleName="moduleName"
      :formRecord="formRecord"
      :formComponent="formComponent"
      @reset-data="resetData"
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
          {{ product.Product.name | capitalize }}
        </td>
        <td>
          <action-button @fill-data="fillData" :record="product" :formRecord="formRecord" :moduleName="moduleName" />
        </td>
      </tr>
    </crud-layout>
  </div>
</template>

<script>
import CrudLayout from '@/layouts/CrudLayout.vue'
import ActionButton from '@/components/ActionButton.vue'
import ProductOutcomeForm from '@/forms/ProductOutcomeForm.vue'
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
    columns: ['date', 'total', 'product name', ''],
    formRecord: {},
    formComponent: ProductOutcomeForm,
    moduleName: 'productsOutcome'
  }),
  methods: {
    resetData() {
      this.formRecord = {
        date: "",
        total: '',
        productId: ''
      }
    },
    fillData(record) {
      this.formRecord = { ...record, productId: record.Product.id }
    }
  }
}
</script>
