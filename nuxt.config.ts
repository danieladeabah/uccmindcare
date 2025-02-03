export default defineNuxtConfig({
  srcDir: 'src/',
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  modules: ['nuxt-icon', '@nuxt/ui', '@nuxtjs/color-mode'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  colorMode: {
    preference: 'light'
  },
  runtimeConfig: {
    public: {
      GOOGLE_GEMINI_API_KEY: process.env.GOOGLE_GEMINI_API_KEY ?? '',
      googleClientId: process.env.GOOGLE_CLIENT_ID ?? ''
    }
  }
})
