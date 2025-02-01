<template>
  <NuxtLayout :name="'app-wrapper'">
    <template #main>
      <div class="flex h-screen flex-col lg:h-[92vh]">
        <div class="flex items-center justify-center py-4">
          <Logo class="h-8 w-8" />
          <h2 class="ml-4 text-xl font-bold">UCC MindCare</h2>
        </div>

        <div
          v-if="userToken"
          ref="chatBodyRef"
          class="chat-body flex-1 overflow-y-auto px-2 py-4"
        >
          <div
            class="flex w-fit items-start space-x-3 rounded-lg border border-gray-200 bg-blue-50 px-4 py-3"
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
          <p class="text-sm text-gray-500">
            Sign in with Google to start a conversation
          </p>
          <GoogleAuth />
          <p class="pt-10 text-sm text-gray-500">
            Built for Educational purposes
          </p>
          <p class="text-sm text-gray-500">© 2025 UCC MindCare</p>
        </div>

        <div
          v-if="userToken"
          class="mb-4 flex flex-col items-center justify-center gap-4 bg-white p-4"
        >
          <form
            @submit.prevent="handleSubmit"
            class="flex w-full max-w-3xl items-center gap-4"
          >
            <input
              v-model="inputRef"
              placeholder="Message..."
              class="w-full rounded-3xl border border-gray-200 p-2 outline-none"
              required
            />
            <button type="submit" class="material-symbols-rounded">
              <img
                src="/assets/icons/HeroiconsSolidArrowRightCircle.svg"
                alt="Send"
              />
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
          class="mt-4 flex h-[45vh] flex-col gap-2 overflow-y-auto overflow-x-hidden p-4"
        >
          <div
            class="flex cursor-pointer flex-col gap-2 rounded-2xl border p-2"
          >
            <div
              class="flex items-center gap-2 rounded-3xl border border-gray-200 p-2"
            >
              <img src="/assets/icons/self-asses.svg" alt="self-asses" />
              Self-Assesment Tools
            </div>
            <p>
              Questionaires to help students evaluate their mental health
              condition (e.g. Depression, Anxiety, Stress, etc.)
            </p>
          </div>
          <div
            class="flex cursor-pointer flex-col gap-2 rounded-2xl border p-2"
          >
            <div
              class="flex items-center gap-2 rounded-3xl border border-gray-200 p-2"
            >
              <img src="/assets/icons/media.svg" alt="media" />
              Resource Library
            </div>
            <p>
              Articles, videos, and podcasts to support your mental health (e.g.
              Stress Management, coping strategies)
            </p>
          </div>
          <div
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
          <div
            class="m-4 flex cursor-pointer items-center gap-2 rounded-3xl border-2 border-blue-200 bg-slate-200 p-2 pr-4 font-bold"
          >
            <img src="/assets/icons/mood-tracker.svg" alt="mood-tracker" />
            Mood Tracker
          </div>
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

// Refs
const chatBodyRef = ref(null)
const inputRef = ref('')
const userToken = ref(null)
const userData = ref(null)
const chatHistory = ref([])

// Load user data and chat history from localStorage
onMounted(() => {
  userToken.value = localStorage.getItem('userToken')
  userData.value = JSON.parse(localStorage.getItem('userData')) || null

  const savedChatHistory = localStorage.getItem('chatHistory')
  chatHistory.value = savedChatHistory
    ? JSON.parse(savedChatHistory)
    : [{ hideInChat: true, role: 'model', text: companyInfo }]

  // Scroll to bottom of chat
  setTimeout(() => {
    chatBodyRef.value?.scrollTo({
      top: chatBodyRef.value.scrollHeight,
      behavior: 'smooth'
    })
  }, 100)
})

// Save chat history to localStorage
const saveChatHistory = () => {
  localStorage.setItem('chatHistory', JSON.stringify(chatHistory.value))
}

// Update chat history
const setChatHistory = fn => {
  chatHistory.value = fn(chatHistory.value)
  saveChatHistory()
}

// Handle form submission
const handleSubmit = () => {
  if (!inputRef.value.trim()) return
  const userMessage = inputRef.value

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
    const updatedHistory = [...history, { role: 'user', text: userMessage }]
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
            text: `Using the details provided above, please address this query: ${userMessage}. 
            Do not say no when user asks if you know their name. Use this name: ${userData.value?.given_name} ${userData.value?.family_name}.`
          }
        ],
        chatHistory
      )
    }, 600)

    return thinkingHistory
  })
}
</script>
