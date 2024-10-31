<template>
  <div
    class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2
          class="mt-6 text-center text-3xl font-extrabold text-white dark:text-white"
        >
          Create your account
        </h2>
      </div>
      <div class="bg-white">
        {{ form }}
      </div>
      <div class="bg-red-500">
        {{ errors }}
      </div>
      <form
        class="mt-8 space-y-6"
        @submit.prevent="handleSubmit"
      >
        <div class="rounded-md shadow-sm flex flex-col">
          <Input
            placeholder="John"
            id="name"
            @input="handleInput('name', form.name)"
            v-model="form.name"
            type="text"
            label="Full Name"
            required
            :error="errors.name"
          />

          <Input
            placeholder="john.doe@example.com"
            id="email"
            v-model="form.email"
            @input="handleInput('email', form.email)"
            type="email"
            label="Email address"
            autocomplete="email"
            required
            :error="errors.email"
          />

          <Input
            placeholder="●●●●●●"
            id="password"
            v-model="form.password"
            @input="handleInput('password', form.password)"
            type="password"
            label="Password"
            autocomplete="current-password"
            required
            :error="errors.password"
          />

          <Input
            placeholder="●●●●●●"
            id="confirmPassword"
            v-model="form.confirmPassword"
            @input="handleInput('confirmPassword', form.confirmPassword)"
            type="password"
            label="Confirm Password"
            required
            :error="errors.confirmPassword"
          />
        </div>

        <div class="space-y-4">
          <Button
            class="bg-cyan-500 hover:bg-cyan-600 py-2 px-4 rounded-md text-white"
            type="submit"
            fullWidth
            :disabled="authStore.loading"
          >
            Create Account
          </Button>

          <div class="text-sm text-center">
            <span class="text-white">Already have an account?</span>
            <NuxtLink
              to="/login"
              class="text-primary-600 hover:text-primary-500"
            >
              Sign in
            </NuxtLink>
          </div>

          <ThirdPartyAuth />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/ui/Button.vue'
import Input from '~/components/ui/Input.vue'
import { ZSignUp } from '~/schemas/ZAuth'
interface SignUpForm {
  name: string
  email: string
  password: string
  confirmPassword: string
  avatar: string
  provider: 'local' | 'google' | 'github'
}
const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}
const authStore = useAuthStore()
const { form, errors, isValid, resetForm, resetErrors, handleInput } =
  useVueForm(initialValues, ZSignUp)

const handleSubmit = async () => {
  if (!isValid.value) {
    console.log(form)
  }
  const formToSubmit: SignUpForm = {
    name: form.name,
    email: form.email,
    password: form.password,
    confirmPassword: form.confirmPassword,
    avatar: '',
    provider: 'local'
  }
  try {
    console.log(formToSubmit)
    await authStore.signup(formToSubmit)
    resetForm()
  } catch (error: any) {
    console.error(error)
  }
}

const signUpWithGoogle = () => {
  window.location.href = '/api/auth/google'
}

const signUpWithGithub = () => {
  window.location.href = '/api/auth/github'
}
</script>

