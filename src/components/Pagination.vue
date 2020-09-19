<template>
  <div class="mt-5 flex justify-end w-full">
    <button class="dark-btn" @click="prevPage">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path></svg>
    </button>
    <button
      class="dark-btn"
      v-for="i in totalPages"
      :key="i"
      @click="goTo(i)"
    >
      {{ i }}
    </button>
    <button
      class="dark-btn"
      @click="nextPage"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    totalPages: {
      default: 1,
      type: Number,
    },
    totalItems: {
      default: 10,
      type: Number,
    },
    currentPage: {
      default: 1,
      type: Number
    }
  },
  methods: {
    prevPage() {
      const to = this.currentPage - 1
      this.$emit('click-page', to)
    },
    goTo(number) {
      this.$emit('click-page', number)
    },
    nextPage() {
      const to = this.currentPage + 1
      this.$emit('click-page', to)
    }
  },
}
</script>
