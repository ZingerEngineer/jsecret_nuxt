export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    'shadcn-nuxt',
    '@formkit/nuxt',
    '@formkit/auto-animate',
    'nuxt-mongoose',
    'nuxt-vue3-google-signin',
    'nuxt-security'
  ],

  security: {
    headers: {
      crossOriginOpenerPolicy: 'same-origin-allow-popups',
      crossOriginEmbedderPolicy: 'require-corp'
    },
    corsHandler: {
      origin: process.env.NUXT_BASE_URL || 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    }
  },

  googleSignIn: {
    clientId: process.env.GOOGLE_CLIENT_ID
  },

  mongoose: {
    uri: process.env.MONGODB_URI,
    modelsDir: 'server/models',
    devtools: true
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    public: {
      ORIGIN: process.env.NUXT_BASE_URL || 'http://localhost:3000',
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      githubClientId: process.env.GITHUB_CLIENT_ID
    }
  },
  formkit: {
    configFile: 'formkit.config.ts',
    // Experimental support for auto loading (see note):
    autoImport: true
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

