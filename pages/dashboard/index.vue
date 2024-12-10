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
            <FormField
              name="key"
              v-slot="{ componentField }"
            >
              <FormItem v-auto-animate>
                <FormLabel>Key name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="foo"
                    v-bind="componentField"
                    type="text"
                  />
                </FormControl>
                <FormDescription>Enter key name.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField
              name="value"
              v-slot="{ componentField }"
            >
              <FormItem v-auto-animate>
                <FormLabel>Key value</FormLabel>
                <FormControl>
                  <Input
                    placeholder="bar"
                    v-bind="componentField"
                    type="text"
                  />
                </FormControl>
                <FormDescription>Enter key value.</FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="space-y-4">
            <FormField
              name="project"
              v-slot="{ componentField }"
            >
              <FormItem v-auto-animate>
                <FormLabel>Project</FormLabel>
                <FormControl>
                  <Select v-bind="componentField">
                    <SelectTrigger
                      class="disabled:cursor-default"
                      :disabled="projects.length === 0"
                    >
                      <SelectValue
                        :placeholder="
                          projects.length > 0
                            ? 'Select a project'
                            : 'No projects available'
                        "
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup
                        v-for="project in projects"
                        :key="String(project._id)"
                      >
                        <SelectLabel>{{ project.name }}</SelectLabel>
                        <SelectItem :value="String(project._id)">
                          {{ project.name }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription
                  >Add the env variable to a specific project.</FormDescription
                >
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField
              name="team"
              v-slot="{ componentField }"
            >
              <FormItem v-auto-animate>
                <FormLabel>Team</FormLabel>
                <FormControl>
                  <Select v-bind="componentField">
                    <SelectTrigger
                      class="disabled:cursor-default"
                      :disabled="teams.length === 0"
                    >
                      <SelectValue
                        :placeholder="
                          teams.length > 0
                            ? 'Select a team'
                            : 'No teams available'
                        "
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup
                        v-for="team in teams"
                        :key="String(team._id)"
                      >
                        <SelectLabel>{{ team.name }}</SelectLabel>
                        <SelectItem :value="String(team._id)">
                          {{ team.name }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription
                  >Add the env variable to a specific team.</FormDescription
                >
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <Button
            type="submit"
            fullWidth
            :onclick="
              () => {
                console.log(values)
              }
            "
            >Create Variable</Button
          >
        </form>
      </div>

      <!-- Recent Variables Section -->
      <div
        :class="[
          'p-6 rounded-lg shadow-md',
          recentVariables.length === 0
            ? 'bg-gray-100 dark:bg-gray-700 border-2 border-dashed'
            : 'bg-white dark:bg-gray-800'
        ]"
      >
        <div class="flex flex-row items-center gap-2">
          <BookLockIcon class="w-6 h-6 inline-block" />
          <h2
            :class="
              recentVariables.length > 0
                ? 'text-xl font-semibold text-gray-900 dark:text-gray-100'
                : 'text-xl font-semibold text-gray-500 dark:text-gray-400'
            "
          >
            Recent Variables
          </h2>
        </div>
        <div
          v-if="recentVariables.length === 0"
          class="flex flex-col h-full w-full items-center justify-center text-gray-500 dark:text-gray-400"
        >
          <WindIcon class="w-20 h-20 inline-block" />
          <p>No recent variables found.</p>
        </div>
        <div
          v-else
          class="space-y-4"
        >
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
    <div
      :class="[
        'p-6 rounded-lg shadow-md mt-6',
        teams.length === 0
          ? 'bg-gray-100 dark:bg-gray-700 border-2 border-dashed'
          : 'bg-white dark:bg-gray-800'
      ]"
    >
      <div class="flex flex-row items-center gap-2">
        <UsersRoundIcon class="w-6 h-6 inline-block" />
        <h2
          :class="
            teams.length > 0
              ? 'text-xl font-semibold text-gray-900 dark:text-gray-100'
              : 'text-xl font-semibold text-gray-500 dark:text-gray-400'
          "
        >
          Your Teams
        </h2>
      </div>
      <div
        v-if="teams.length === 0"
        class="flex flex-col justify-center items-center w-full h-full text-gray-500 dark:text-gray-400"
      >
        <UserRoundXIcon class="w-20 h-20 inline-block" />
        <p>You are not a member of any teams.</p>
      </div>
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  BookLockIcon,
  WindIcon,
  UsersRoundIcon,
  UserRoundXIcon
} from 'lucide-vue-next'
import { ZEnvVariable } from '~/schemas/ZEnvVariable'
import type { IEnvVariable } from '~/server/models/EnvVariable'
import type { IProject } from '~/server/models/Project'
import type { ITeam } from '~/server/models/Team'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useToast } from '~/components/ui/toast'
import { useEnvVariablesStore } from '#imports'
const { toast } = useToast()
const { createVariable } = useEnvVariablesStore()
const teams = ref<ITeam[]>([])
const projects = ref<IProject[]>([])
const recentVariables = ref<IEnvVariable[]>([])
const formSchema = toTypedSchema(ZEnvVariable)
const { handleSubmit, resetForm, values } = useForm({
  validationSchema: formSchema
})
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

const createEnvVariable = handleSubmit(async (values) => {
  const validNewEnvVariable = {
    key: values.key,
    value: values.value,
    teamId: values.team,
    projectId: values.project,
    environment: 'development'
  }
  console.log(validNewEnvVariable)
  try {
    const response = await createVariable(validNewEnvVariable)

    const { status, variable } = response
    if (status === 200) {
      recentVariables.value.unshift(variable as IEnvVariable)
      resetForm()
      toast({
        title: 'New env variable created.',
        type: 'background'
      })
    }
  } catch (error) {
    toast({
      title: 'Creation failed.',
      type: 'background'
    })
  }
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
definePageMeta({
  title: 'Dashboard',
  description: 'Dashboard page for managing environment variables and teams.',
  middleware: 'auth'
})
</script>

