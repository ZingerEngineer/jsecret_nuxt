<template>
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

  <div class="grid grid-cols-2 gap-3">
    <Button
      class="text-white flex flex-row items-center justify-center gap-2"
      variant="outline"
      fullWidth
      @click="signInWithGoogle"
    >
      <img
        class="w-5 h-5"
        src="../public/google.svg"
        alt="Google"
      />

      Google
    </Button>
    <Button
      class="text-white flex flex-row items-center justify-center gap-2"
      variant="outline"
      fullWidth
      @click="signInWithGithub"
    >
      <img
        src="../public/github.svg"
        class="w-5 h-5"
        alt="GitHub"
      />
      GitHub
    </Button>
  </div>
</template>

<script setup>
import Button from '~/components/ui/Button.vue'
const signInWithGoogle = () => {
  // Implement Google OAuth
}

const signInWithGithub = () => {
  // Implement GitHub OAuth
}
</script>

<style scoped></style>
