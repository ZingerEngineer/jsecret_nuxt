<template>
  <div
    class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-white">
          Sign in to your account
        </h2>
      </div>
      <form
        class="mt-8 space-y-6"
        @submit.prevent="handleSubmit"
      >
        <div class="rounded-md shadow-sm flex flex-col">
          <Input
            class="mb-4 p-2 pl-4 rounded-md bg-cyan-500/10 border-2 border-cyan-500 text-white"
            placeholder="john.doe@example.com"
            id="email"
            v-model="form.email"
            type="email"
            label="Email address"
            autocomplete="email"
            required
            :error="errors.email"
          />

          <Input
            class="mb-4 p-2 pl-4 rounded-md bg-cyan-500/10 border-2 border-cyan-500 text-white"
            placeholder="●●●●●●"
            id="password"
            v-model="form.password"
            type="password"
            label="Password"
            autocomplete="current-password"
            required
            :error="errors.password"
          />
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <NuxtLink
              to="/forgot-password"
              class="text-primary-600 hover:text-primary-500"
            >
              Forgot your password?
            </NuxtLink>
          </div>
        </div>

        <div class="space-y-4">
          <Button
            class="bg-cyan-500 hover:bg-cyan-600 py-2 px-4 rounded-md text-white"
            type="submit"
            fullWidth
            :disabled="authStore.loading"
          >
            Sign in
          </Button>
          <ThirdPartyAuth />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/ui/Button.vue'
import Input from '~/components/ui/Input.vue'
const authStore = useAuthStore()
const form = reactive({
  email: '',
  password: ''
})
const errors = reactive({
  email: '',
  password: ''
})

const handleSubmit = async () => {
  errors.email = ''
  errors.password = ''

  try {
    await authStore.login(form.email, form.password)
  } catch (error: any) {
    if (error.message.includes('email')) {
      errors.email = error.message
    } else if (error.message.includes('password')) {
      errors.password = error.message
    }
  }
}
</script>

