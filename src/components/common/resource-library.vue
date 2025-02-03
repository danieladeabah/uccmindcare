<template>
  <div v-if="userToken">
    <div v-if="showResourceLibrary" class="flex gap-2 overflow-auto p-2">
      <a
        v-for="(resource, index) in resources"
        :key="index"
        :href="resource.link"
        target="_blank"
        :title="resource.title"
        class="flex w-fit items-center gap-2 rounded-3xl border bg-blue-50 p-1"
      >
        <img :src="resource.icon" alt="link" class="h-4 w-4 rounded-full" />
        <span class="truncate">{{ resource.label }}</span>
      </a>

      <div
        @click="toggleResourceLibrary"
        class="flex w-fit cursor-pointer items-center gap-2 rounded-md px-1 text-red-500"
      >
        Hide
      </div>
    </div>
  </div>
</template>

<script setup>
import { resources } from '@/constants/index'

defineProps({
  userToken: Boolean,
  showResourceLibrary: Boolean,
  toggleResourceLibrary: Function
})
</script>
