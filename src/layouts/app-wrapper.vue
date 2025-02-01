<template>
  <div
    class="container mx-auto my-0 h-screen w-full rounded-none bg-white p-3 shadow-none md:my-5 md:rounded-xl md:border lg:my-10 lg:h-[92vh] lg:w-1/2 lg:rounded-xl lg:border"
  >
    <CommonLoader v-if="loading" />
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 200)
})
</script>
