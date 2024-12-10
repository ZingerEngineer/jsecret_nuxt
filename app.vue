<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <NuxtLayout>
      <NuxtPage />
      <Toaster />
    </NuxtLayout>
  </div>
</template>
<script lang="ts">
import Toaster from './components/ui/toast/Toaster.vue'
</script>
