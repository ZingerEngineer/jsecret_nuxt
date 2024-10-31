import { defineStore } from 'pinia'
import { z } from 'zod'

const teamSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional()
})

export const useTeamsStore = defineStore('teams', {
  state: () => ({
    teams: [] as any[],
    currentTeam: null as any,
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchTeams() {
      this.loading = true
      try {
        const response = await $fetch('/api/teams')
        this.teams = response
        return response
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async createTeam(data: z.infer<typeof teamSchema>) {
      this.loading = true
      try {
        const validData = teamSchema.parse(data)
        const response = await $fetch('/api/teams', {
          method: 'POST',
          body: validData
        })
        this.teams.push(response)
        return response
      } catch (error: any) {
        if (error instanceof z.ZodError) {
          this.error = error.errors[0].message
        } else {
          this.error = error.message
        }
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchTeamById(id: string) {
      this.loading = true
      try {
        const response = await $fetch(`/api/teams/${id}`)
        this.currentTeam = response
        return response
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})