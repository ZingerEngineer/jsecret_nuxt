import { createError, defineEventHandler, H3Event, readBody } from 'h3'
import { EnvVariable } from '~/server/models/EnvVariable'
import { getServerSession } from '~/server/utils/auth'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const session = await getServerSession(event)
    if (!session) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized'
      })
    }

    const { key, value, projectId, teamId } = await readBody(event)

    const variable = await EnvVariable.create({
      key,
      value,
      project: projectId || null,
      team: teamId || null,
      environment: 'development', // Default environment
      versions: [
        {
          value,
          updatedBy: session.user.id
        }
      ]
    })

    return variable
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to create environment variable'
    })
  }
})

