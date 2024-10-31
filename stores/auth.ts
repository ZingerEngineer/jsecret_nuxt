import { defineStore } from 'pinia'
import { z } from 'zod'
import { ZUser } from '~/schemas/ZUser'

const userSchema = ZUser

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as z.infer<typeof userSchema> | null,
    loading: false,
    error: null as string | null
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    currentUser: (state) => state.user
  },

  actions: {
    async login(email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          body: { email, password }
        })
        this.user = userSchema.parse(response.user)
        navigateTo('/dashboard')
      } catch (error: any) {
        this.error = error.message || 'Failed to login'
      } finally {
        this.loading = false
      }
    },

    async signup(userData: z.infer<typeof userSchema>) {
      this.loading = true
      this.error = null
      try {
        const validData = userSchema.parse(userData)
        const response = await $fetch('/api/auth/signup', {
          method: 'POST',
          body: validData
        })
        this.user = userSchema.parse(response.user)
        navigateTo('/dashboard')
      } catch (error: any) {
        if (error instanceof z.ZodError) {
          this.error = error.errors[0].message
        } else {
          this.error = error.message || 'Failed to signup'
        }
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await $fetch('/api/auth/logout', { method: 'POST' })
        this.user = null
        navigateTo('/login')
      } catch (error: any) {
        console.error('Logout failed:', error)
      }
    }

    // async checkAuth() {
    //   try {
    //     const response = await $fetch('/api/auth/me')
    //     this.user = userSchema.parse(response.user)
    //   } catch {
    //     this.user = null
    //   }
    // }
  }
})

