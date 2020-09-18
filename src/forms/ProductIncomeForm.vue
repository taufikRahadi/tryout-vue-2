<template>
  <div>
    <form-group label="Date In (Y-m-d)">
      <t-datepicker
        v-model="formRecord.date"
        placeholder="Select a date"
        date-format="Y-m-d"
        user-format="m/d/Y"
      />
    </form-group>
    <form-group label="Total In">
      <input type="number" class="input-group" v-model="formRecord.total">
    </form-group>
    <form-group label="Choose Product">
      <select v-model="formRecord.productId" class="input-group">
        <option value="">Pick a Product</option>
        <option v-for="product in $store.state.products.products.data" :key="product.id" :value="product.id">
          {{ product.name }}
        </option>
      </select>
    </form-group>
  </div>
</template>

<script>
export default {
  props: ['formRecord'],
  async mounted() {
    try {
      await this.$store.dispatch('products/fetchAll')
    } catch (error) {
      this.$swal.fire(
        'Error',
        "There's an error while fetching products",
        'error'
      )
    }
  }
}
</script>
