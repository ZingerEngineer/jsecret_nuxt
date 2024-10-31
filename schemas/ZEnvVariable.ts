import { z } from 'zod'

const ZEnvVariable = z.object({
  key: z.string().min(1),
  value: z.string().min(1),
  project: z.string().optional(),
  team: z.string().optional(),
  environment: z.string().min(1),
  versions: z
    .array(
      z.object({
        value: z.string().min(1),
        updatedBy: z.string().optional(),
        updatedAt: z.date().optional()
      })
    )
    .optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
})

export { ZEnvVariable }
