import { H3Event, createError, defineEventHandler, readBody } from 'h3'
import { Team } from '~/server/models/Team'
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

    const { name, description } = await readBody(event)

    const team = await Team.create({
      name,
      description,
      owner: session.user.id,
      members: [{ user: session.user.id, role: 'admin' }]
    })

    return team
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to create team'
    })
  }
})

