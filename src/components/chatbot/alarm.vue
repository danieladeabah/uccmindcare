<template>
  <div
    class="rounded-xl bg-white p-1 2xl:fixed 2xl:bottom-4 2xl:right-12 2xl:flex 2xl:flex-col"
    :class="{
      'border-4 border-red-600': countdown === 0,
      'border-4 border-green-600':
        countdown === 5 ||
        countdown === 4 ||
        countdown === 3 ||
        countdown === 2 ||
        countdown === 1,
      border: setMood
    }"
  >
    <div class="flex flex-row items-center justify-center">
      <div
        @click="setMood = !setMood"
        class="m-4 flex cursor-pointer items-center gap-2 rounded-3xl border bg-green-50 p-2 pr-4 font-bold"
      >
        🤩 Mood Tracker
        <span class="font-light text-gray-500">| {{ countdown }} seconds</span>
      </div>

      <div
        title="Mindcare will assist you with your mood"
        class="hidden cursor-pointer lg:block"
      >
        <img src="/assets/icons/info-icon.svg" class="h-4 w-4" alt="Start" />
      </div>
    </div>
    <div
      v-if="
        setMood ||
        countdown === 5 ||
        countdown === 4 ||
        countdown === 3 ||
        countdown === 2 ||
        countdown === 1 ||
        countdown === 0
      "
      class="flex flex-col gap-2 rounded-xl bg-slate-50 p-4"
    >
      <form @submit.prevent="startMoodTracking">
        <input
          v-model="moodText"
          placeholder="How are you feeling?"
          class="w-full rounded-3xl border border-gray-200 p-2 outline-none"
          required
        />
        <div class="my-4 flex items-center gap-2">
          <span class="flex items-center justify-start text-gray-500"
            >End?</span
          >
          <input
            v-model="moodTime"
            class="h-8 w-full rounded-3xl border border-gray-200 p-2 outline-none"
            required
            type="time"
          />
          <button type="submit">
            <img
              src="/assets/icons/start-mood.svg"
              class="h-10 w-10"
              alt="Start"
            />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const moodText = ref('')
const moodTime = ref('')
const setMood = ref(false)
const countdown = ref(null)

const startMoodTracking = () => {
  if (!moodText.value || !moodTime.value) return

  const now = new Date()
  const selectedTime = new Date()
  const [hours, minutes] = moodTime.value.split(':')
  selectedTime.setHours(hours, minutes, 0, 0)

  const timeDiff = selectedTime - now
  if (timeDiff <= 0) return // Ignore past times

  localStorage.setItem(
    'moodTracker',
    JSON.stringify({
      mood: moodText.value,
      time: moodTime.value,
      expiresAt: selectedTime.getTime()
    })
  )

  startCountdown(timeDiff)
}

const startCountdown = timeDiff => {
  countdown.value = Math.floor(timeDiff / 1000)

  const interval = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(interval)
      if (alarmSound) alarmSound.play()
      localStorage.removeItem('moodTracker')

      setTimeout(() => {
        countdown.value = null
        moodText.value = ''
        moodTime.value = ''
      }, 10000) // clear countdown after 10 seconds
    }
  }, 1000)
}

let alarmSound

onMounted(() => {
  alarmSound = new Audio('https://www.tones7.com/media/office_phone.mp3')

  const savedMood = JSON.parse(localStorage.getItem('moodTracker'))
  if (savedMood) {
    const now = new Date().getTime()
    if (savedMood.expiresAt > now) {
      moodText.value = savedMood.mood
      moodTime.value = savedMood.time
      startCountdown(savedMood.expiresAt - now)
    } else {
      localStorage.removeItem('moodTracker')
    }
  }
})
</script>
