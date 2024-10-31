<template>
  <div>
    <header class="bg-white dark:bg-gray-800 shadow">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="text-2xl font-bold text-primary-600">
            JSecret
          </NuxtLink>
          <div class="flex items-center space-x-4">
            <template v-if="isAuthenticated">
              <NuxtLink to="/dashboard" class="text-gray-600 hover:text-primary-600">
                Dashboard
              </NuxtLink>
              <button @click="logout" class="text-gray-600 hover:text-primary-600">
                Logout
              </button>
            </template>
            <template v-else>
              <NuxtLink to="/login" class="text-gray-600 hover:text-primary-600">
                Login
              </NuxtLink>
              <NuxtLink
                to="/signup"
                class="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
              >
                Sign Up
              </NuxtLink>
            </template>
          </div>
        </div>
      </nav>
    </header>

    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const isAuthenticated = ref(false) // This will be connected to the auth store
const logout = () => {
  // Implement logout logic
}
</script>