<template>
  <div
    class="container mx-auto my-0 h-screen w-full rounded-none bg-white p-3 shadow-none md:my-5 lg:my-10 lg:h-[92vh] lg:w-1/2"
  >
    <CommonLoader v-if="loading" />
    <div v-else class="flex items-start gap-20">
      <div class="min-w-full md:rounded-xl md:border lg:rounded-xl lg:border">
        <slot name="main"></slot>
      </div>
      <div v-if="userToken" class="min-w-[350px]">
        <slot name="sidebar"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const loading = ref(true)
const userToken = ref(null)

onMounted(() => {
  userToken.value = localStorage.getItem('userToken')
  setTimeout(() => {
    loading.value = false
  }, 200)
})
</script>
