<template>
  <div>
    <crud-layout
      :columns="columns"
      :moduleName="moduleName"
      :formRecord="formRecord"
      :formComponent="formComponent"
      @reset-data="resetData"
      :data="products"
    >
      <tr v-for="(product, index) in products.data" :key="product.id">
        <td>
          {{ index + 1 }}
        </td>
        <td>
          {{ product.date | readableDate }}
        </td>
        <td>
          {{ product.total }}
        </td>
        <td>
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
    columns: ['date', 'total', 'product name'],
    formRecord: {},
    formComponent: ProductOutcomeForm,
    moduleName: 'productsOutcome'
  }),
  methods: {
    resetData() {
      this.formRecord = {
        date: "",
        total: '',
        product_id: ''
      }
    },
    fillData(record) {
      this.formRecord = {  ...record, product_id: record.Product.id }
    }
  }
}
</script>
