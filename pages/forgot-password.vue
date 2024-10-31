<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Reset your password
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm space-y-4">
          <Input
            id="email"
            v-model="email"
            type="email"
            label="Email address"
            required
            :error="error"
          />
        </div>

        <div class="space-y-4">
          <Button type="submit" fullWidth :disabled="loading">
            Send Reset Link
          </Button>

          <div class="text-sm text-center">
            Remember your password?
            <NuxtLink to="/login" class="text-primary-600 hover:text-primary-500">
              Sign in
            </NuxtLink>
          </div>
        </div>
      </form>

      <div v-if="success" class="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
        {{ success }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  error.value = ''
  success.value = ''
  loading.value = true

  try {
    await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: { email: email.value }
    })
    success.value = 'If an account exists with this email, you will receive a password reset link.'
    email.value = ''
  } catch (err: any) {
    error.value = err.message || 'Something went wrong'
  } finally {
    loading.value = false
  }
}
</script>