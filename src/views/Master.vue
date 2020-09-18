<template>
  <div class="pb-5">
    <base-header />
    <div class="grid grid-cols-12">
      <div class="col-span-2">
        <base-sidebar />
      </div>
      <div class="col-span-10 px-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
export default {
  components: {
    'base-sidebar': Sidebar,
    'base-header': Header
  }
}
</script>
