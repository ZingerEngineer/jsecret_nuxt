<template>
  <div
    class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <!-- Main form container with auto-animate applied -->
    <div class="max-w-md w-full gap-4 flex flex-col">
      <div>
        <h2
          class="mt-6 text-center text-3xl font-extrabold text-white dark:text-white"
        >
          Create your account
        </h2>
      </div>
      <NuxtLoadingIndicator
        :height="10"
        v-if="loading"
      />
      <form
        v-if="!loading"
        @submit.prevent="onSubmit"
        class="flex gap-2 flex-col"
      >
        <FormField
          name="name"
          v-slot="{ componentField, errors }"
        >
          <FormItem v-auto-animate>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Joe"
                v-bind="componentField"
                type="text"
              />
            </FormControl>
            <FormDescription>Enter your full name</FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          name="email"
          v-slot="{ componentField, errors }"
        >
          <FormItem v-auto-animate>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                placeholder="joe@example.com"
                v-bind="componentField"
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
                placeholder="••••••••"
                v-bind="field"
                type="password"
              />
            </FormControl>
            <FormDescription>Enter your password</FormDescription>
            <FormMessage v-if="errors.length">{{ errors[0] }}</FormMessage>
          </FormItem>
        </FormField>

        <FormField
          name="confirmPassword"
          v-slot="{ field, errors }"
        >
          <FormItem v-auto-animate>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input
                placeholder="••••••••"
                v-bind="field"
                type="password"
              />
            </FormControl>
            <FormDescription>Confirm your password</FormDescription>
            <FormMessage v-if="errors.length">{{ errors[0] }}</FormMessage>
          </FormItem>
        </FormField>

        <div class="flex items-center justify-between">
          <Button
            type="submit"
            variant="outline"
            >Sign Up</Button
          >
        </div>
        <div class="flex items-center justify-center">
          <ThirdPartyAuth />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/components/ui/toast/use-toast'
import { useAuthStore } from '@/stores/auth'
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
import Button from '~/components/ui/button/Button.vue'
import Input from '~/components/ui/input/Input.vue'
import { ZSignUp } from '~/schemas/ZAuth'

interface IFormToSubmit {
  name: string
  email: string
  password: string
  provider: 'local' | 'google' | 'github'
  role: 'user' | 'admin'
}

const { toast } = useToast()
const { signup, loading } = useAuthStore()
const formSchema = toTypedSchema(ZSignUp)
const { handleSubmit } = useForm({
  validationSchema: formSchema
})
const config = useRuntimeConfig()
console.log('Runtime config', config)

const onSubmit = handleSubmit(async (values) => {
  const formToSubmit: IFormToSubmit = {
    name: values.name,
    email: values.email,
    password: values.password,
    provider: 'local',
    role: 'user'
  }
  try {
    const signUpResponse = await signup(formToSubmit)
    if (signUpResponse?.status === 200) {
      toast({
        title: 'Registerd successfully.',
        type: 'background'
      })
    }
  } catch (error) {
    toast({
      title: 'Registering failed.',
      type: 'background'
    })
  }
})
</script>

