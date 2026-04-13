// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/eslint",
    "@nuxt/image",
    "reka-ui/nuxt",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@tresjs/nuxt",
    "v-gsap-nuxt",
    "@pinia/nuxt",
  ],
  css: ["~/assets/css/main.css"],
  fonts: {
    families: [{ name: "Oswald", provider: "google" }],
  },
});
