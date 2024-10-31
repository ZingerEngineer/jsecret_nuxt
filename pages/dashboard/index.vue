<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Create Environment Variable Section -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Create Environment Variable</h2>
        <form
          @submit.prevent="createEnvVariable"
          class="space-y-4"
        >
          <div class="flex gap-4">
            <Input
              id="keyName"
              v-model="newVariable.key"
              label="Key name"
              type="text"
              required
              class="flex-1"
            />
            <Input
              id="keyValue"
              v-model="newVariable.value"
              label="Key value"
              type="text"
              required
              class="flex-1"
            />
          </div>

          <div class="space-y-4">
            <select
              v-model="newVariable.projectId"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Project</option>
              <option
                v-for="project in projects"
                :key="String(project._id)"
                :value="String(project._id)"
              >
                {{ project.name }}
              </option>
            </select>

            <select
              v-model="newVariable.teamId"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Team</option>
              <option
                v-for="team in teams"
                :key="String(team._id)"
                :value="String(team._id)"
              >
                {{ team.name }}
              </option>
            </select>
          </div>

          <Button
            type="submit"
            fullWidth
            >Create Variable</Button
          >
        </form>
      </div>

      <!-- Recent Variables Section -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Recent Variables</h2>
        <div class="space-y-4">
          <div
            v-for="variable in recentVariables"
            :key="String(variable._id)"
            class="border-b pb-4"
          >
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-medium">{{ variable.key }}</h3>
                <p class="text-sm text-gray-500">{{ variable.value }}</p>
              </div>
              <div class="text-right text-sm text-gray-500">
                <p>Created: {{ formatDate(String(variable.createdAt)) }}</p>
                <p>
                  Updated:
                  {{
                    formatDate(
                      String(
                        variable.versions[variable.versions.length - 1]
                          .updatedAt
                      )
                    )
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Teams Section -->
    <div class="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4">Your Teams</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="team in teams"
          :key="String(team._id)"
          class="border p-4 rounded-lg"
        >
          <h3 class="font-medium">{{ team.name }}</h3>
          <p class="text-sm text-gray-500">{{ team.description }}</p>
          <div class="mt-2 text-sm">
            <p>Projects: {{ team.projects.length }}</p>
            <p>Members: {{ team.members.length }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ZEnvVariable } from '~/schemas/ZEnvVariable'
import type { IEnvVariable } from '~/server/models/EnvVariable'
import type { IProject } from '~/server/models/Project'
import type { ITeam } from '~/server/models/Team'

const newVariable = reactive({
  key: '',
  value: '',
  projectId: '',
  teamId: ''
})

const teams = ref<ITeam[]>([])
const projects = ref<IProject[]>([])
const recentVariables = ref<IEnvVariable[]>([])

onMounted(async () => {
  try {
    const { data: teamsData, error: teamsError } = await useFetch<ITeam[]>(
      '/api/teams'
    )
    if (teamsData.value) teams.value = teamsData.value
    const { data: projectsData, error: projectsError } = await useFetch<
      IProject[]
    >('/api/projects')
    if (projectsData.value) projects.value = projectsData.value
    const { data: recentVariablesData, error: variablesError } = await useFetch<
      IEnvVariable[]
    >('/api/env-variables/recent')
    if (recentVariablesData.value)
      recentVariables.value = recentVariablesData.value
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error)
  }
})

const createEnvVariable = async () => {
  try {
    const response = await useFetch<IEnvVariable>('/api/env-variables', {
      method: 'POST',
      body: newVariable
    })
    const { data: newVariableData, error: newVariableError } = response
    if (
      ZEnvVariable.safeParse(newVariableData.value).success &&
      newVariableData.value
    ) {
      recentVariables.value.unshift(newVariableData.value)
    }
    // Reset form
    newVariable.key = ''
    newVariable.value = ''
    newVariable.projectId = ''
    newVariable.teamId = ''
  } catch (error) {
    console.error('Failed to create environment variable:', error)
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

