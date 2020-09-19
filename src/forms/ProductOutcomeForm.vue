<template>
  <div>
    <form-group label="Date In (Y-m-d)">
      <t-datepicker
        v-model="formRecord.date"
        placeholder="Select a date"
        date-format="Y-m-d"
        user-format="m/d/Y"
        :class="errors.date ? 'input-error' : 'input-group'"
      />
      <p class="text-error">
        {{ errors.date }}
      </p>
    </form-group>
    <form-group label="Total In">
      <input type="number" placeholder="Total" :class="errors.total ? 'input-error' : 'input-group'" @change="total" v-model="formRecord.total">
      <p class="text-error">
        {{ errors.total }}
      </p>
    </form-group>
    <form-group label="Choose Product">
      <select v-model="formRecord.product_id" :class="errors.product_id ? 'input-error' : 'input-group'">
        <option value="">Pick a Product</option>
        <option :selected="product.id == formRecord.product_id" v-for="product in $store.state.products.products.data" :key="product.id" :value="product.id">
          {{ product.name }}
        </option>
      </select>
      <p class="text-error">
        {{ errors.product_id }}
      </p>
    </form-group>
  </div>
</template>

<script>
export default {
  props: ['formRecord', 'errors'],
  methods: {
    total() {
      this.formRecord.total = parseInt(this.formRecord.total)
    }
  },
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
