import { z } from 'zod'

const ZLogin = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

const ZSignUp = z
  .object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

const ZResetPassword = z.object({
  email: z.string().email()
})

export { ZLogin, ZSignUp, ZResetPassword }
