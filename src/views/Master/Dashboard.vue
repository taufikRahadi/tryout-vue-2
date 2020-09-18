<template>
  <div>
    <fade-transition group>
      <div key="prod" class="grid grid-cols-3 gap-5 mb-5">
        <base-card
          cardTitle="Products"
          cardBg="bg-half"
        >
          <div class="flex items-center justify-between py-5">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"></path></svg>
            <h3 class="text-2xl font-bold">10</h3>
          </div>
        </base-card>
        <base-card
          cardTitle="Products"
          cardBg="bg-half"
        >
          <div class="flex items-center justify-between py-5">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"></path></svg>
            <h3 class="text-2xl font-bold">10</h3>
          </div>
        </base-card>
        <base-card
          cardTitle="Products"
          cardBg="bg-half"
        >
          <div class="flex items-center justify-between py-5">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"></path></svg>
            <h3 class="text-2xl font-bold">10</h3>
          </div>
        </base-card>
      </div>
      <base-card key="las" cardTitle="Last Income Product">
      </base-card>
    </fade-transition>
  </div>
</template>

<script>
import { FadeTransition } from 'vue2-transitions'
export default {
  components: {
    FadeTransition
  }
}
</script>
