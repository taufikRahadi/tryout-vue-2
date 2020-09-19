<template>
  <div class="pb-5">
    <base-header />
    <div class="flex">
      <slide-x-left-transition>
        <base-sidebar v-show="$store.state.showSidebar" class="transition-all duration-400 max-w-md"/>
      </slide-x-left-transition>
      <div class="px-10 w-full">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
import { SlideXLeftTransition } from 'vue2-transitions'
export default {
  components: {
    'base-sidebar': Sidebar,
    'base-header': Header,
    SlideXLeftTransition,
  }
}
</script>
