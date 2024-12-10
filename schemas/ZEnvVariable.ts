import { z } from 'zod'

const ZEnvVariable = z.object({
  key: z.string().min(1, { message: 'Key is required and cannot be empty' }),
  value: z
    .string()
    .min(1, { message: 'Value is required and cannot be empty' }),
  project: z.string().optional(),
  team: z.string().optional(),
  environment: z
    .string()
    .min(1, { message: 'Environment is required and cannot be empty' }),
  versions: z
    .array(
      z.object({
        value: z
          .string()
          .min(1, { message: 'Version value is required and cannot be empty' }),
        updatedBy: z.string().optional(),
        updatedAt: z.date().optional()
      })
    )
    .optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
})

export { ZEnvVariable }
