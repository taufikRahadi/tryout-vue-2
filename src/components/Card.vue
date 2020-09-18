<template>
  <div :class="`card ${cardBg} text-${textColor}`">
    <div class="card-header capitalize">
      <slot name="card-header">
        {{ cardTitle }}
      </slot>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      textColor: {
        type: String,
        default: 'white'
      },
      cardBg: {
        type: String,
        default: 'bg-transparent'
      },
      cardTitle: {
        type: String
      }
    }
  }
</script>
