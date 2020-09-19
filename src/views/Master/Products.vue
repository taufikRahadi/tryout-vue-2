<template>
  <div>
    <crud-layout
      :columns="columns"
      :moduleName="moduleName"
      :formComponent="formComponent"
      :formRecord="formRecord"
      :customSubmitAction="submitProduct"
      @reset-data="resetFormData"
      :data="products"
      :errors="errors"
    >
      <tr class="hover:bg-gray-700" v-for="(product, index) in products.data" :key="product.id">
        <td>
          {{ index + 1 }}
        </td>
        <td>
          {{ product.name | capitalize }}
        </td>
        <td>
          {{ product.stock }} Pcs
        </td>
        <td>
          {{ product.price | currency }}
        </td>
        <td>
          {{ product.supplier.full_name | capitalize }}
        </td>
        <td>
          <action-button @fill-data="updateData" :moduleName="moduleName" :formRecord="formRecord" :record="product"/>
        </td>
      </tr>
    </crud-layout>
  </div>
</template>

<script>
import CrudLayout from '@/layouts/CrudLayout.vue'
import ActionButton from '@/components/ActionButton.vue'
import ProductForm from '@/forms/ProductForm.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    'crud-layout': CrudLayout,
    ActionButton
  },
  computed: {
    ...mapGetters({
      products: 'products/products',
      showModal: 'showModal',
      isEditing: 'isEditing'
    })
  },
  data: () => ({
    columns: ['Name', 'Stock', 'Price', 'Supplier'],
    formComponent: ProductForm,
    moduleName: 'products',
    formRecord: {
    },
    errors: {}
  }),
  methods: {
    validateData() {
      const name = this.formRecord.name.length < 5
      const stock = this.formRecord.stock.match([0-9]) || this.formRecord.stock === ''
      const price = this.formRecord.price.match([0-9]) || this.formRecord.price === ''
      const photo = this.formRecord.photo
      let state = true
      if (name) {
        this.$set(this.errors, 'name', 'minimal 5 characters for product name')
        state = false
      }

      if (stock) {
        this.$set(this.errors, 'stock', 'product stock must be a number')
        state = false
      }

      if (price) {
        this.$set(this.errors, 'price', 'product price must be a number')
        state = false
      }

      if (!photo) {
        this.$set(this.errors, 'photo', 'photo cannot be null')
        state = false
      }
      return state
    },
    ...mapMutations({
      setShowModal: 'setShowModal',
    }),
    resetFormData() {
      this.formRecord = {
        name: '',
        stock: '',
        price: '',
        photo: null,
      }
    },
    updateData(record) {
      this.formRecord = {
        ...record,
        photo: null
      }
    },
    fillData() {
      const formData = new FormData()
      for (let k in this.formRecord) {
        formData.append(k, this.formRecord[k])
      }
      return formData
    },
    async editData() {
      try {
        await this.$store.dispatch('products/updateData', { id: this.formRecord.id, data: this.formRecord })
        this.setShowModal()
        this.$Progress.finish()
        this.$swal(
          'Succes',
          'Data updated',
          'success'
        )
      } catch (error) {
        this.$Progress.fail()
        this.$swal(
          'Failed',
          'Error Updating Data',
          'error'
        )
      }
    },
    async createData(formData) {
      try {
        await this.$store.dispatch('products/storeData', formData)
        this.setShowModal()
        this.$Progress.finish()
        this.$swal(
          'Success',
          'Data Created',
          'success'
        )
      } catch (error) {
        this.$Progress.fail()
        this.$swal(
          'Failed',
          'Error Creating Data',
          'error'
        )
      }
    },
    async submitProduct() {
      this.$Progress.start()
      if (this.validateData()) {
        if(this.isEditing) {
          await this.editData()
        } else {
          const formData = this.fillData()
          await this.createData(formData)
        }
      }
    }
  }
}
</script>
