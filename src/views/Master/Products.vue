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
    >
      <tr class="hover:bg-gray-700" v-for="(product, index) in products.data" :key="product.id">
        <td class="px-4 py-3 font-bold text-center">
          {{ index + 1 }}
        </td>
        <td class="px-4 py-3">
          {{ product.name | capitalize }}
        </td>
        <td class="px-4 py-3">
          {{ product.stock }} Pcs
        </td>
        <td class="px-4 py-3">
          {{ product.price | currency }}
        </td>
        <td class="px-4 py-3">
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
    }
  }),
  methods: {
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
      if(this.isEditing) {
        await this.editData()
      } else {
        const formData = this.fillData()
        await this.createData(formData)
      }
    }
  }
}
</script>
