export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts'
  ],

  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    public: {
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      githubClientId: process.env.GITHUB_CLIENT_ID
    }
  },

  colorMode: {
    classSuffix: ''
  },

  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700]
    }
  },

  devtools: { enabled: false },

  app: {
    head: {
      title: 'JSecret - Secure Environment Variable Management',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Secure environment variable management for teams and projects'
        }
      ]
    }
  },

  compatibilityDate: '2024-10-26'
})

