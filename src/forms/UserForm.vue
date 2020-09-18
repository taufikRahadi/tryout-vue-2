<template>
<div>
  <form-group label="Full Name">
    <input type="text" class="input-group" v-model="formRecord.full_name">
  </form-group>
  <form-group label="Username">
    <input type="text" class="input-group" v-model="formRecord.username">
  </form-group>
  <form-group label="Email Address">
    <input type="email" v-model="formRecord.email" class="input-group">
  </form-group>
  <form-group label="Password">
    <input type="password" v-model="formRecord.password" class="input-group">
  </form-group>
  <form-group label="Phone Number">
    <input type="text" v-model="formRecord.phone_number" class="input-group">
  </form-group>
</div>
</template>

<script>
export default {
  props: ['formRecord']
}
</script>
