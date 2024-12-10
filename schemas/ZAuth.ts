import { z } from 'zod'

const ZLogin = z.object({
  email: z.string().email(),
  password: z.string()
})

const ZSignUp = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters long' })
      .max(50, { message: 'Name must be at most 50 characters long' }),
    email: z
      .string()
      .email({ message: 'Invalid email address' })
      .max(100, { message: 'Email must be at most 100 characters long' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .max(100, { message: 'Password must be at most 100 characters long' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .max(100, { message: 'Password must be at most 100 characters long' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

const ZResetPassword = z.object({
  email: z.string().email()
})

export { ZLogin, ZSignUp, ZResetPassword }
