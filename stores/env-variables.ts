import { defineStore } from 'pinia'
import { z } from 'zod'
import { ZEnvVariable } from '~/schemas/ZEnvVariable'
import type { IEnvVariable } from '~/server/models/EnvVariable'

const envVariableSchema = ZEnvVariable

export const useEnvVariablesStore = defineStore('envVariables', {
  state: () => ({
    variables: [] as any[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    async createVariable(data: z.infer<typeof envVariableSchema>) {
      this.loading = true
      this.error = null

      try {
        const validData = envVariableSchema.parse(data)
        const createResponse = await $fetch<IEnvVariable>(
          '/api/env-variables',
          {
            method: 'POST',
            body: validData
          }
        )

        return {
          status: 200,
          variable: createResponse
        }
      } catch (error: any) {
        if (error instanceof z.ZodError) {
          this.error = error.errors[0].message
        } else {
          this.error = error.message || 'Failed to create variable'
        }
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchRecentVariables() {
      this.loading = true
      this.error = null

      try {
        const response = await $fetch('/api/env-variables/recent')
        this.variables = response
        return response
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch variables'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})

