<template>
  <div
    class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2
          class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white"
        >
          Set new password
        </h2>
      </div>
      <form
        v-if="!expired"
        class="mt-8 space-y-6"
        @submit.prevent="handleSubmit"
      >
        <div class="rounded-md shadow-sm space-y-4">
          <Input
            id="password"
            v-model="form.password"
            type="password"
            label="New Password"
            required
            :error="errors.password"
          />
          <Input
            id="confirmPassword"
            v-model="form.confirmPassword"
            type="password"
            label="Confirm New Password"
            required
            :error="errors.confirmPassword"
          />
        </div>

        <div class="space-y-4">
          <Button
            type="submit"
            fullWidth
            :disabled="loading"
          >
            Reset Password
          </Button>
        </div>
      </form>

      <div
        v-else
        class="text-center"
      >
        <p class="text-red-600">
          This password reset link has expired or is invalid.
        </p>
        <NuxtLink
          to="/forgot-password"
          class="mt-4 text-primary-600 hover:text-primary-500"
        >
          Request a new password reset link
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const form = reactive({
  password: '',
  confirmPassword: ''
})

const errors = reactive({
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const expired = ref(false)

onMounted(async () => {
  try {
    await $fetch(`/api/auth/verify-reset-token/${route.params.token}`)
  } catch {
    expired.value = true
  }
})

const validateForm = () => {
  let isValid = true
  errors.password = ''
  errors.confirmPassword = ''

  if (!form.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
    isValid = false
  }

  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  try {
    await $fetch(`/api/auth/reset-password/${route.params.token}`, {
      method: 'POST',
      body: { password: form.password }
    })
    await router.push('/login?reset=success')
  } catch (error: any) {
    errors.password = error.message || 'Something went wrong'
  } finally {
    loading.value = false
  }
}
</script>
