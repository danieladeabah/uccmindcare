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
      VUE_API_URL: process.env.VUE_API_URL ?? '',
      googleClientId: process.env.GOOGLE_CLIENT_ID ?? ''
    }
  }
})
