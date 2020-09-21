<template>
  <div>
    <crud-layout
      :columns="columns"
      :moduleName="moduleName"
      :formComponent="formComponent"
      :formRecord="formRecord"
      @reset-data="resetData"
      :data="products"
      :errors="errors"
      @validate-data="validateData"
      :url="url"
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
          <action-button 
            @fill-data="fillData" 
            :record="product" 
            :formRecord="formRecord" 
            :moduleName="moduleName"
            :url="url"
          />
        </td>
      </tr>
    </crud-layout>
  </div>
</template>

<script>
import CrudLayout from '@/layouts/CrudLayout.vue'
import ActionButton from '@/components/ActionButton.vue'
import ProductIncomeForm from '@/forms/ProductIncomeForm.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    'crud-layout': CrudLayout,
    ActionButton
  },
  computed: {
    ...mapGetters({
      products: 'productsIncome/productsIn'
    })
  },
  data: () => ({
    columns: ['date', 'total', 'product name'],
    formRecord: {},
    formComponent: ProductIncomeForm,
    moduleName: 'productsIncome',
    errors: {},
    url: 'in',
  }),
  methods: {
    validateData() {
      const date = this.formRecord.date.length < 8
      const total = /^[0-9]/.test(this.formRecord.total) | this.formRecord.total == 0
      const product_id = this.formRecord.product_id.length < 1
      let state = true
      if (date) {
        this.$set(this.errors, 'date', 'date cant be null')
        state = false
      }

      if (total) {
        this.$set(this.errors, 'total', 'invalid total')
        state = false
      }

      if (product_id) {
        this.$set(this.errors, 'product_id', 'invalid product')
        state = false
      }
      return state
    },
    resetData() {
      this.formRecord = {
        date: "",
        total: '',
        product_id: ''
      }
    },
    fillData(record) {
      this.formRecord = { ...record, product_id: record.Product.id }
    }
  }
}
</script>
