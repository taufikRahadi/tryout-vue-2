<template>
<div>
  <form-group label="Full Name">
    <input type="text" placeholder="Full Name" :class="errors.full_name ? 'input-error' : 'input-group'" v-model="formRecord.full_name">
    <p class="text-error">
      {{ errors.full_name }}
    </p>
  </form-group>
  <form-group label="Username">
    <input type="text" placeholder="Username" :class="errors.username ? 'input-error' : 'input-group'" v-model="formRecord.username">
    <p class="text-error">
      {{ errors.username }}
    </p>
  </form-group>
  <form-group label="Email Address">
    <input type="email" placeholder="Email" v-model="formRecord.email" :class="errors.email ? 'input-error' : 'input-group'">
    <p class="text-error">
      {{ errors.email }}
    </p>
  </form-group>
  <form-group label="Password">
    <input type="password" placeholder="Password" v-model="formRecord.password" :class="errors.password ? 'input-error' : 'input-group'">
    <p class="text-error">
      {{ errors.password }}
    </p>
  </form-group>
  <form-group label="Phone Number">
    <input type="text" placeholder="Phone Number" v-model="formRecord.phone_number" :class="errors.phone_number ? 'input-error' : 'input-group'">
    <p class="text-error">
      {{ errors.phone_number }}
    </p>
  </form-group>
</div>
</template>

<script>
export default {
  props: ['formRecord', 'errors']
}
</script>
