<script setup>
import { marked } from 'marked'

// Props
const props = defineProps(['chat'])
</script>

<template>
  <div
    v-if="!props.chat.hideInChat"
    :class="[
      'flex w-fit items-start space-x-3 rounded-lg border border-gray-200 px-4 py-3',
      props.chat.role === 'model' ? 'bg-blue-50' : 'bg-white',
      props.chat.isError ? 'bg-red-500' : '',
      props.chat.role === 'model' ? 'mr-auto' : 'ml-auto'
    ]"
  >
    <div class="flex flex-col">
      <p
        class="break-words text-sm leading-snug"
        v-html="`${marked(props.chat.text)}`"
      />
    </div>
  </div>
</template>
