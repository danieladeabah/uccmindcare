<template>
  <div v-if="userData" class="flex flex-col items-center justify-center">
    <img
      class="h-64 w-64 rounded-full border-2 border-blue-200"
      :src="userData.picture"
      alt="User Profile"
    />
    <h1 class="mt-2 text-3xl font-semibold text-gray-600">
      {{ userData.given_name }} {{ userData.family_name }}
    </h1>
    <p class="text-xs text-gray-500">{{ userData.email }}</p>

    <div class="mt-4 flex h-[35vh] flex-col gap-2 overflow-y-auto p-4">
      <div
        v-for="(section, index) in sectionLists"
        :key="index"
        class="flex flex-col gap-2 rounded-2xl border p-2"
      >
        <div
          @click="handleExploredTopicSelection(section.title)"
          class="flex cursor-pointer items-center gap-2 rounded-3xl border border-gray-200 p-2"
        >
          <img :src="section.icon" :alt="section.title" class="h-6 w-6" />
          {{ section.title }}
        </div>
        <p v-html="section.description"></p>
      </div>
    </div>

    <div>
      <ChatbotAlarm />
    </div>
  </div>
</template>

<script setup>
import { sectionLists } from '@/constants/index'

defineProps(['userData', 'handleExploredTopicSelection'])
</script>
