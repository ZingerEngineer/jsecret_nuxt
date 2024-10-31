import { z } from 'zod'

const ZPorject = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  owner: z.string().min(1),
  teams: z
    .array(
      z.object({
        team: z.string().min(1),
        role: z.enum(['admin', 'member']).default('member')
      })
    )
    .optional(),
  environments: z
    .array(
      z.object({
        name: z.string().optional(),
        variables: z.array(z.string().min(1)).optional()
      })
    )
    .optional()
})

export { ZPorject }
