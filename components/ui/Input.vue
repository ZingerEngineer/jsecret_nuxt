<template>
  <div class="space-y-1">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        class="mb-4 p-2 pl-4 rounded-md bg-cyan-500/10 border-2 border-cyan-500 text-white w-full"
        :class="{ 'pr-10': type === 'password' }"
        v-bind="$attrs"
      />
      <div
        v-if="type === 'password'"
        class="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <button
          type="button"
          @click="togglePassword"
          class="text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <span class="sr-only">Toggle password visibility</span>
          <i
            class="fas"
            :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
          ></i>
        </button>
      </div>
    </div>
    <p
      v-if="error"
      class="text-sm text-red-600"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  error: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])
const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
  const input = document.getElementById(props.id) as HTMLInputElement
  input.type = showPassword.value ? 'text' : 'password'
}
</script>

