<template>
  <div class="flex py-3 items-center justify-between w-full font-nunito">
    <h3 class="text-3xl font-black text-gray-100 capitalize">
      {{ $route.name }}
    </h3>
    <div class="flex text-white font-nunito text-light">
      <router-link class="text-gray-300 hover:text-gray-100" to="/">
        Dashboard
      </router-link>
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      <span class="capitalize">
        {{ $route.name }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>
