// useForm.js
import { ref, reactive, watch } from 'vue'
import { z } from 'zod'

const useVueForm = (
  initialValues: { [key: string]: any } = {},
  schema: z.ZodSchema | null = null
) => {
  // Reactive form state and error state
  const form: { [key: string]: any } = reactive({ ...initialValues })
  const errors: { [key: string]: string } = reactive({})
  const isValid = ref(true) // Boolean to check if the form is valid

  // Initialize error fields based on form fields
  for (const key in form) {
    errors[key] = ''
  }

  // Validation function
  const validateForm = () => {
    if (schema) {
      try {
        schema.parse(form)
        console.log('parse:', schema.parse(form))
        resetErrors() // Clear errors if validation passes
        isValid.value = true // Set isValid to true if validation passes
      } catch (error) {
        if (error instanceof z.ZodError) {
          error.errors.forEach((err) => {
            errors[err.path[0]] = err.message // Set corresponding error message
          })
          isValid.value = false // Set isValid to false if validation fails
        }
      }
    }
  }

  // Reset form fields
  const resetForm = () => {
    for (const key in form) {
      form[key] = ''
    }
    resetErrors()
    isValid.value = true // Reset isValid to true when form is reset
  }

  // Reset error fields
  const resetErrors = () => {
    for (const key in errors) {
      errors[key] = ''
    }
  }

  // Handle input changes
  const handleInput = (field: string, value: any) => {
    console.log('field:', field, 'value:', value)
    form[field] = value
    validateForm() // Validate after input
  }

  // Watch form for real-time validation (optional)
  watch(form, validateForm)

  return {
    form,
    errors,
    isValid, // Return isValid
    validateForm,
    resetForm,
    resetErrors,
    handleInput
  }
}

export default useVueForm
