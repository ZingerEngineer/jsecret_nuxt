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
      <NuxtLoadingIndicator
        :height="10"
        v-if="loading"
      />
      <form
        v-if="!loading"
        @submit.prevent="handleLogin"
        class="flex flex-col gap-2"
      >
        <FormField
          name="email"
          v-slot="{ field, errors }"
        >
          <FormItem v-auto-animate>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                v-bind="field"
                type="email"
              />
            </FormControl>
            <FormDescription>Enter your email address</FormDescription>
            <FormMessage v-if="errors.length">{{ errors[0] }}</FormMessage>
          </FormItem>
        </FormField>
        <FormField
          name="password"
          v-slot="{ field, errors }"
        >
          <FormItem v-auto-animate>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                v-bind="field"
                type="password"
              />
            </FormControl>
            <FormDescription>Enter your password</FormDescription>
            <FormMessage v-if="errors.length">{{ errors[0] }}</FormMessage>
          </FormItem>
        </FormField>
        <div class="flex items-center justify-between">
          <Button @click="handleLogin">Login</Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/ui/button/Button.vue'
import Input from '~/components/ui/input/Input.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { ZLogin } from '~/schemas/ZAuth'
import { useToast } from '~/components/ui/toast'
import { useRouter } from '#app'

const router = useRouter()
const { toast } = useToast()
const { login, loading } = useAuthStore()
const formSchema = toTypedSchema(ZLogin)
const { handleSubmit } = useForm({
  validationSchema: formSchema
})

const handleLogin = handleSubmit(async (values) => {
  try {
    const loginResponse = await login(values.email, values.password)
    if (loginResponse.status === 200) {
      toast({
        title: 'Login successful.',
        type: 'background'
      })
      router.push('/dashboard')
    }
  } catch (error: any) {
    toast({
      title: 'Login failed.',
      type: 'background'
    })
  }
})
</script>

