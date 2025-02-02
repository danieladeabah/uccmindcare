<template>
  <div v-if="userData" class="flex flex-col items-center justify-center">
    <img
      class="h-[250px] w-[250px] rounded-full border-2 border-blue-200"
      :src="userData?.picture"
      alt=""
    />
    <h1 class="mt-2 text-3xl font-semibold text-gray-600">
      {{ userData?.given_name }} {{ userData?.family_name }}
    </h1>
    <p class="text-xs text-gray-500">{{ userData?.email }}</p>

    <div
      class="mt-4 flex h-[35vh] flex-col gap-2 overflow-y-auto overflow-x-hidden p-4"
    >
      <div class="flex flex-col gap-2 rounded-2xl border p-2">
        <div
          @click="handleExploredTopicSelection('Self-Assessment Tools')"
          class="flex cursor-pointer items-center gap-2 rounded-3xl border border-gray-200 p-2"
        >
          <img src="/assets/icons/self-asses.svg" alt="self-asses" />
          Self-Assessment Tools
        </div>
        <p>
          Questionnaires to help students evaluate their mental health condition
          (e.g.,
          <span
            @click="handleExploredTopicSelection('Depression')"
            class="cursor-pointer text-blue-600"
            >Depression</span
          >,
          <span
            @click="handleExploredTopicSelection('Anxiety')"
            class="cursor-pointer text-blue-600"
            >Anxiety</span
          >,
          <span
            @click="handleExploredTopicSelection('Stress')"
            class="cursor-pointer text-blue-600"
            >Stress</span
          >, etc.)
        </p>
      </div>

      <div class="flex flex-col gap-2 rounded-2xl border p-2">
        <div
          @click="handleExploredTopicSelection('Resource Library')"
          class="flex cursor-pointer items-center gap-2 rounded-3xl border border-gray-200 p-2"
        >
          <img src="/assets/icons/media.svg" alt="media" />
          Resource Library
        </div>
        <p>
          Articles, videos, and podcasts to support your mental health (e.g.
          <span
            @click="handleExploredTopicSelection('Stress Management')"
            class="cursor-pointer text-blue-600"
            >Stress Management</span
          >,
          <span
            @click="handleExploredTopicSelection('coping strategies')"
            class="cursor-pointer text-blue-600"
            >coping strategies</span
          >)
        </p>
      </div>
      <div
        @click="handleExploredTopicSelection('Guided Relaxation')"
        class="flex cursor-pointer flex-col gap-2 rounded-2xl border p-2"
      >
        <div
          class="flex items-center gap-2 rounded-3xl border border-gray-200 p-2"
        >
          <img
            src="/assets/icons/guided-relaxation.svg"
            alt="Guided Relaxation"
          />
          Guided Relaxation
        </div>
        <p>Audio-guided meditation, breathing exercises, and mindfulness.</p>
      </div>
      <div
        @click="handleExploredTopicSelection('Emergency Support')"
        class="flex cursor-pointer flex-col gap-2 rounded-2xl border p-2"
      >
        <div
          class="flex items-center gap-2 rounded-3xl border border-gray-200 p-2"
        >
          <img
            src="/assets/icons/emergency-support.svg"
            alt="emergency-support"
          />
          Emergency Support
        </div>
        <p>
          Direct links to UCC counselling services, hotlines, or emergency
          contacts.
        </p>
      </div>
    </div>

    <div>
      <ChatbotAlarm />
    </div>
  </div>
</template>

<script setup>
defineProps(['userData', 'handleExploredTopicSelection'])
</script>
