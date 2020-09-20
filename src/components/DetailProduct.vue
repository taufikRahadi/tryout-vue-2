<template>
  <div>
    <t-modal
      :header="String(product.id)"
      v-model="showPhotoModal"
    >
      <img :src="product.photo_url" class="w-full" alt="">
    </t-modal>
  </div>
</template>

<script>
  export default {
    name: 'detail-product',
    props: ['product', 'showPhotoModal']
  }
</script>
