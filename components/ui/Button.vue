<template>
  <button
    :class="[
      'px-4 py-2 rounded-md transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
      variant === 'primary' && 'bg-primary-600 text-white hover:bg-primary-700',
      variant === 'secondary' && 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      variant === 'outline' &&
        'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
      fullWidth && 'w-full',
      disabled && 'opacity-50 cursor-not-allowed'
    ]"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <div class="flex items-center justify-center gap-2">
      <slot name="icon"></slot>
      <slot></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value: string) =>
      ['primary', 'secondary', 'outline'].includes(value)
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>
