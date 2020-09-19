<template>
  <div>
    <div class="form-group">
      <label class="form-label">{{ label }}</label>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['label']
}
</script>
