<template>
  <div>
    <form-group
      label="Product Name"
    >
      <input type="text" class="input-group" placeholder="Name" v-model="formRecord.name">
    </form-group>
    <form-group
      label="Product Stock"
    >
      <input type="number" placeholder="Stock" class="input-group" v-model="formRecord.stock">
    </form-group>
    <form-group
      label="Price"
    >
      <input type="number" placeholder="Price" class="input-group" v-model="formRecord.price">
    </form-group>
    <form-group
      label="Photo"
    >
      <input type="file" class="input-group" @change="getImage">
    </form-group>
  </div>
</template>

<script>
  export default {
    props: ['formRecord'],
    methods: {
      getImage(e) {
        this.formRecord.photo = e.target.files[0]
      }
    }
  }
</script>
