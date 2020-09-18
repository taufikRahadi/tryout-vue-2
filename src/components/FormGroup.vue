<template>
  <div>
    <div class="flex flex-col mb-5 justify-start items-center w-full">
      <label class="w-full mb-3">{{ label }}</label>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['label']
}
</script>
