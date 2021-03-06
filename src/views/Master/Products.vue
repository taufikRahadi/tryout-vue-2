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
      :url="url"
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
          <img :src="product.photo_url" alt="" width="45">
        </td>
        <td>
          {{ product.supplier.full_name | capitalize }}
        </td>
        <td>
          <action-button 
            @fill-data="updateData" 
            :moduleName="moduleName" 
            :formRecord="formRecord" 
            :record="product"
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
import ProductForm from '@/forms/ProductForm.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    'crud-layout': CrudLayout,
    ActionButton,
  },
  computed: {
    ...mapGetters({
      products: 'products/products',
      showModal: 'showModal',
      isEditing: 'isEditing'
    })
  },
  data: () => ({
    columns: ['Name', 'Stock', 'Price', 'Photo', 'Supplier'],
    formComponent: ProductForm,
    moduleName: 'products',
    url: 'product',
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
        await this.$store.dispatch('updateData', {
          url: this.url,
          moduleName: this.moduleName,
          data: this.formRecord,
          id: this.formRecord.id
        })
        this.$Progress.finish()
      } catch (error) {
        this.$Progress.fail()
      }
    },
    async createData(formData) {
      try {
        this.$store.dispatch('storeData', {
          url: this.url,
          moduleName: this.moduleName,
          data: formData
        })
        this.$Progress.finish()
      } catch (error) {
        this.$Progress.fail()
      }
    },
    submitProduct() {
      this.$Progress.start()
      if (this.validateData()) {
        if(this.isEditing) {
          this.editData()
        } else {
          const formData = this.fillData()
          this.createData(formData)
        }
      }
    }
  }
}
</script>
