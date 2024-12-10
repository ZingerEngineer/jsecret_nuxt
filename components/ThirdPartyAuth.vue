<template>
  <div class="flex flex-col w-full gap-4">
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <div
          class="w-full h-1 to-transparent via-cyan-500 from-transparent bg-gradient-to-l"
        ></div>
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="px-2 py-1 text-white bg-cyan-500 rounded-lg"
          >Or continue with</span
        >
      </div>
    </div>
    <GoogleSignInButton
      @success="handleLoginSuccess"
      @error="handleLoginError"
    ></GoogleSignInButton>
  </div>
</template>

<script setup>
import { GoogleSignInButton } from 'vue3-google-signin'
const { loginWithGoogle } = useAuthStore()
const handleLoginSuccess = async (response) => {
  console.log(response)
  const { credential, clientId } = response
  const responseGoogle = await loginWithGoogle(credential, clientId)
  if (responseGoogle) {
    console.log('Login successful')
    console.log(responseGoogle)
  } else {
    console.error('Login failed')
  }
}

// handle an error event
const handleLoginError = () => {
  console.error('Login failed')
}
</script>

<style scoped></style>
