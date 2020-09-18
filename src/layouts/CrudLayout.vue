<template>
  <div>
    <zoom-y-transition group>
      <div key="head" class="flex py-3 items-center justify-between w-full font-nunito">
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

      <base-card
        key="table-card"
        :cardTitle="`${$route.name} Page`"
      >
        <template v-slot:card-header>
          <div class="flex justify-between items-center">
            <h3 class="text-2xl font-semibold">
              List of {{ $route.name }}            
            </h3>
            <button class="rounded hover:shadow-lg font-bold px-5 py-2 font-nunito bg-half flex items-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              Add New
            </button>
          </div>
        </template>
        <table class="table-auto w-full">
          <thead>
            <tr class="border-b-2 border-b-gray-100">
              <th class="w-10 py-1 pr-3">#</th>
              <th class="py-1 px-3 capitalize" v-for="column in columns" :key="column">
                {{ column }}
              </th>
            </tr>
          </thead>
          <tbody>
            <slot name="table-rows"></slot>
          </tbody>
        </table>
      </base-card>
    </zoom-y-transition>
  </div>
</template>

<script>
import { ZoomYTransition } from 'vue2-transitions'
export default {
  components: {
    ZoomYTransition
  },
  props: {
    columns: {
      type: Array
    }
  }
}
</script>
