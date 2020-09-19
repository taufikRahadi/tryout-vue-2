<template>
  <div>
    <form-group
      label="Product Name"
    >
      <input type="text" :class="errors.name ? 'input-error' : 'input-group'" placeholder="Name" v-model="formRecord.name">
      <p class="text-error">
        {{ errors.name }}
      </p>
    </form-group>
    <form-group
      label="Product Stock"
    >
      <input type="number" placeholder="Stock" :class="errors.stock ? 'input-error' : 'input-group'" v-model="formRecord.stock">
      <p class="text-error">
        {{ errors.stock }}
      </p>
    </form-group>
    <form-group
      label="Price"
    >
      <input type="number" placeholder="Price" :class="errors.price ? 'input-error' : 'input-group'" v-model="formRecord.price">
      <p class="text-error">
        {{ errors.price }}
      </p>
    </form-group>
    <form-group
      label="Photo"
    >
      <input type="file" :class="errors.photo ? 'input-error' : 'input-group'" @change="getImage">
      <p class="text-error">
        {{ errors.photo }}
      </p>
    </form-group>
  </div>
</template>

<script>
  export default {
    props: ['formRecord', 'errors'],
    methods: {
      getImage(e) {
        this.formRecord.photo = e.target.files[0]
      }
    }
  }
</script>
