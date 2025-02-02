<template>
  <NuxtLayout :name="'app-wrapper'">
    <template #main>
      <div class="flex h-screen flex-col lg:h-[92vh]">
        <div class="flex items-center justify-center py-4 lg:shadow-sm">
          <Logo class="h-6 w-6" />
          <h2 class="ml-4 text-xl font-bold">UCC MindCare</h2>
        </div>

        <div
          v-if="!userToken"
          class="m-4 flex w-fit items-center justify-center rounded-3xl bg-blue-200 px-4 py-3"
        >
          <p class="message-text">
            <strong>Quote:</strong> {{ quoteOfTheDay }}
          </p>
        </div>

        <div v-if="userToken" class="block lg:hidden">
          <ChatbotAlarm />
        </div>

        <div
          v-if="userToken"
          ref="chatBodyRef"
          class="chat-body flex-1 overflow-y-auto px-2 py-4"
        >
          <div
            class="mt-2 flex w-fit items-start space-x-3 rounded-lg border border-gray-200 bg-blue-50 px-4 py-3"
          >
            <p class="message-text">
              <strong>Hello! {{ userData?.given_name }}.</strong> <br />
              How can I assist you in your mental wellness journey today?
            </p>
          </div>
          <div class="mt-4 flex h-[10vh] flex-col gap-4">
            <LazyChatbotMessage
              v-for="(chat, index) in chatHistory"
              :key="index"
              :chat="chat"
            />
          </div>
        </div>

        <div
          v-else
          class="flex h-full flex-col items-center justify-center gap-2"
        >
          <img
            src="https://img.freepik.com/free-vector/doctor-hospital-healthcare-staff-work-front-side-rear-view-medic-male-character-white-robe-with-stethoscope-neck-take-gloves-hold-xray-cartoon-linear-flat-vector-illustration-set_107791-11919.jpg?t=st=1738385166~exp=1738388766~hmac=fc4d88a9d35f98046c1d499b871fe0489601dd62201c5eb1aca4d2bdeb9dbd6f&w=1380"
            alt=""
          />
          <h1 class="text-md font-bold text-black">
            Mental Health | Support | Counseling
          </h1>
          <p>Sign in with Google to start a conversation</p>
          <GoogleAuth />
          <p class="py-10 text-sm text-black">
            © 2025, Group 5, UCC MindCare.
          </p>
        </div>

        <div
          v-if="userToken"
          class="mb-4 flex flex-col items-center justify-center gap-4 bg-white p-4"
        >
          <form
            @submit.prevent="handleSubmit"
            class="flex w-full max-w-3xl items-center gap-4"
          >
            <UDropdown
              :items="exploredTopics"
              :ui="{ item: { disabled: 'cursor-text select-text' } }"
              :popper="{ arrow: true }"
            >
              <img
                src="/assets/icons/menu.svg"
                alt="menu"
                class="block cursor-pointer lg:hidden"
              />
            </UDropdown>

            <input
              v-model="inputRef"
              placeholder="Message..."
              class="w-full rounded-3xl border border-gray-200 p-2 outline-none"
              required
            />
            <button type="submit">
              <img src="/assets/icons/send-msg.svg" alt="Send" />
            </button>
          </form>
          <p class="text-sm text-gray-500">
            Type "clear" for new chat or "logout" to sign out
          </p>
        </div>
      </div>
    </template>

    <template #sidebar>
      <div class="flex flex-col items-center justify-center">
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
              Questionnaires to help students evaluate their mental health
              condition (e.g.,
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
            <p>
              Audio-guided meditation, breathing exercises, and mindfulness.
            </p>
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
              contacts
            </p>
          </div>
        </div>

        <div>
          <ChatbotAlarm />
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { generateBotResponse } from '@/utils/botResponse'
import { companyInfo } from '@/prompts/chatbot'
import Logo from '@/assets/icons/ChatbotIcon.vue'
import GoogleAuth from '@/pages/auth/index.vue'
import { quotes } from '@/constants/index'

// Refs
const chatBodyRef = ref(null)
const inputRef = ref('')
const userToken = ref(null)
const userData = ref(null)
const chatHistory = ref([])
const quoteOfTheDay = ref(quotes[0])
let quoteInterval = null

// Load user data and chat history from localStorage
onMounted(() => {
  userToken.value = localStorage.getItem('userToken')
  userData.value = JSON.parse(localStorage.getItem('userData')) || null

  if (userData.value?.email) {
    const savedChatHistory = localStorage.getItem(
      `chatHistory_${userData.value.email}`
    )
    chatHistory.value = savedChatHistory
      ? JSON.parse(savedChatHistory)
      : [{ hideInChat: true, role: 'model', text: companyInfo }]
  }

  setTimeout(() => {
    chatBodyRef.value?.scrollTo({
      top: chatBodyRef.value.scrollHeight,
      behavior: 'smooth'
    })
  }, 100)

  // Rotate quotes every 30 seconds
  let index = 0
  quoteInterval = setInterval(() => {
    index = (index + 1) % quotes.length
    quoteOfTheDay.value = quotes[index]
  }, 10000)
})

// Save chat history to localStorage
const saveChatHistory = () => {
  if (!userData.value?.email) return
  localStorage.setItem(
    `chatHistory_${userData.value.email}`,
    JSON.stringify(chatHistory.value)
  )
}

// Update chat history
const setChatHistory = fn => {
  chatHistory.value = fn(chatHistory.value)
  saveChatHistory()
}

// Handle form submission
const handleSubmit = () => {
  if (!inputRef.value.trim()) return
  if (!userData.value?.email) return

  const userMessage = inputRef.value
  const userEmail = userData.value.email

  if (userMessage.toLowerCase() === 'clear') {
    localStorage.removeItem('chatHistory')
    chatHistory.value = [{ hideInChat: true, role: 'model', text: companyInfo }]
    inputRef.value = ''
    return
  } else if (userMessage.toLowerCase() === 'logout') {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userData')
    window.location.reload()
    return
  }

  inputRef.value = ''

  setChatHistory(history => {
    const updatedHistory = [
      ...history,
      { role: 'user', text: userMessage, email: userEmail }
    ]
    const thinkingHistory = [
      ...updatedHistory,
      { role: 'model', text: 'Thinking...', email: userEmail }
    ]

    setTimeout(() => {
      generateBotResponse(
        [
          ...thinkingHistory.filter(msg => msg.text !== 'Thinking...'),
          {
            role: 'user',
            text: `Using the details provided above, please address this query: ${userMessage}. 
            If user asked for thier own name: ${userData.value?.given_name} ${userData.value?.family_name}.`
          }
        ],
        chatHistory
      )
    }, 600)

    return thinkingHistory
  })
}

// Handle selection of explored topics
const handleExploredTopicSelection = topic => {
  if (!userToken.value) return // Prevent sending if user is not logged in

  setChatHistory(history => {
    const updatedHistory = [...history, { role: 'user', text: topic }]
    const thinkingHistory = [
      ...updatedHistory,
      { role: 'model', text: 'Thinking...' }
    ]

    setTimeout(() => {
      generateBotResponse(
        [
          ...thinkingHistory.filter(msg => msg.text !== 'Thinking...'),
          {
            role: 'user',
            text: `Use information in ${companyInfo} to answer ${topic} for the support and service you provide on mental health`
          }
        ],
        chatHistory
      )
    }, 600)

    return thinkingHistory
  })
}

// Updated exploredTopics with click handlers
const exploredTopics = [
  [
    {
      label: 'Self-Assessment Tools',
      click: () => handleExploredTopicSelection('Self-Assessment Tools')
    },
    {
      label: 'Resource Library',
      click: () => handleExploredTopicSelection('Resource Library')
    },
    {
      label: 'Guided Relaxation',
      click: () => handleExploredTopicSelection('Guided Relaxation')
    },
    {
      label: 'Emergency Support',
      click: () => handleExploredTopicSelection('Emergency Support')
    }
  ]
]
</script>
