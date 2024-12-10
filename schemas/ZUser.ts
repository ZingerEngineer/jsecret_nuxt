import { z } from 'zod'

const ZUser = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
  avatar: z.string().optional(),
  provider: z.enum(['local', 'google', 'github']).default('local'),
  providerId: z.string().optional(),
  role: z.enum(['user', 'admin']).default('user'),
  resetPasswordToken: z.string().optional(),
  resetPasswordExpires: z.date().optional()
})

export { ZUser }
