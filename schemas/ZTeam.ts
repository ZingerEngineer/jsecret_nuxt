import { z } from 'zod'

const teamZodSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  owner: z.string().min(1),
  members: z
    .array(
      z.object({
        user: z.string().min(1),
        role: z.enum(['admin', 'member']).default('member')
      })
    )
    .optional(),
  projects: z.array(z.string()).optional()
})

export { teamZodSchema }
