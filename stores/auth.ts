import { defineStore } from 'pinia'
import { z } from 'zod'
import { ZUser } from '~/schemas/ZUser'
import type { IUser } from '~/server/models/User'

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
        const response = await $fetch<IUser>('/api/auth/login', {
          method: 'POST',
          body: { email, password }
        })
        this.user = userSchema.parse(response)
        return {
          status: 200,
          user: response
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to login'
        throw error
      } finally {
        this.loading = false
      }
    },

    async signup(userData: z.infer<typeof userSchema>) {
      this.loading = true
      this.error = null
      try {
        const validData = userSchema.parse(userData)
        const response = await $fetch<IUser>('/api/auth/signup', {
          method: 'POST',
          body: validData
        })
        this.user = userSchema.parse(response)
        return {
          status: 200,
          user: response
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to signup'
        throw error
      } finally {
        this.loading = false
      }
    },

    async loginWithGoogle(credential: string, clientId: string) {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch('/api/auth/google', {
          headers: {
            credential: credential,
            clientId: clientId,
            'Content-Type': 'application/json'
          }
        })
        return {
          status: 200,
          response
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to login with Google'
        throw error
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await $fetch('/api/auth/logout', { method: 'POST' })
        this.user = null
        return {
          status: 200
        }
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
