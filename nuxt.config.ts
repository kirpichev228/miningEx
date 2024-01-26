export default defineNuxtConfig({
  css: [
    "vue3-carousel/dist/carousel.css",
    "~/assets/main.css",
    "~/assets/checkbox.scss",
    "vue3-circle-progress/dist/circle-progress.css",
  ],

  runtimeConfig: {
    public: {
      supabaseUrl: "",
      supabaseKey: "",
    },
  },

  typescript: {
    strict: true,
    typeCheck: true,
  },

  components: [
    "~/components",
    {
      path: "~/components/Base",
      global: true,
    },
    {
      path: "~/components/Skeleton",
      global: true,
    },
  ],

  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "nuxt-icon",
    [
      "nuxt-mail",
      {
        message: {
          to: "kirpichev228@gmail.com",
        },
        smtp: {
          host: "smtp.gmail.com",
          port: 465,
          auth: {
            user: "prykhodzka99@gmail.com",
            pass: "ltgreftivxgjqfqq",
          },
        },
      },
    ],
    [
      "@pinia/nuxt",
      {
        autoImports: [["defineStore", "definePiniaStore"]],
      },
    ],
  ],

  googleFonts: {
    families: {
      Raleway: [400, 500, 600, 700],
    },
  },

  routeRules: {
    "/admin/**": { ssr: false },
    "/": { redirect: "/catalog" },
    "catalog/**": { ssr: false },
  },

  devtools: {
    enabled: true,
  },
});
