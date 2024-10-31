<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Teams</h1>
      <Button @click="showCreateTeamModal = true">Create Team</Button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="team in teams" :key="team._id" class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-lg font-semibold">{{ team.name }}</h3>
            <p class="text-sm text-gray-500">{{ team.description }}</p>
          </div>
          <Button variant="outline" size="sm" @click="viewTeam(team._id)">
            View Details
          </Button>
        </div>
        
        <div class="space-y-2">
          <div class="flex items-center text-sm text-gray-500">
            <span>{{ team.members.length }} Members</span>
            <span class="mx-2">•</span>
            <span>{{ team.projects.length }} Projects</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Team Modal -->
    <Modal v-model="showCreateTeamModal" title="Create New Team">
      <form @submit.prevent="createTeam" class="space-y-4">
        <Input
          id="teamName"
          v-model="newTeam.name"
          label="Team Name"
          required
        />
        <Input
          id="teamDescription"
          v-model="newTeam.description"
          label="Description"
          type="textarea"
        />
        <Button type="submit" fullWidth>Create Team</Button>
      </form>
    </Modal>
  </div>
</template>

<script setup lang="ts">
const { $teams } = useTeamsStore()
const teams = ref([])
const showCreateTeamModal = ref(false)
const newTeam = reactive({
  name: '',
  description: ''
})

onMounted(async () => {
  await fetchTeams()
})

const fetchTeams = async () => {
  teams.value = await $teams.fetchTeams()
}

const createTeam = async () => {
  await $teams.createTeam(newTeam)
  showCreateTeamModal.value = false
  await fetchTeams()
  newTeam.name = ''
  newTeam.description = ''
}

const viewTeam = (teamId: string) => {
  navigateTo(`/teams/${teamId}`)
}
</script>