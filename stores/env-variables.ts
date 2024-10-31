import { defineStore } from 'pinia'
import { z } from 'zod'

const envVariableSchema = z.object({
  key: z.string().min(1),
  value: z.string().min(1),
  projectId: z.string().optional(),
  teamId: z.string().optional()
})

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
        const response = await $fetch('/api/env-variables', {
          method: 'POST',
          body: validData
        })
        this.variables.unshift(response)
        return response
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