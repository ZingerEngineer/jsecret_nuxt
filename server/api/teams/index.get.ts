import { createError, defineEventHandler, H3Event } from 'h3'
import { Team } from '~/server/models/Team'
import { getServerSession } from '~/server/utils/auth'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const session = await getServerSession(event)
    console.log('session', session)
    if (!session) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized'
      })
    }

    const teams = await Team.find({
      'members.user': session.user.id
    })
      .populate('owner', 'name email')
      .populate('members.user', 'name email')
      .populate('projects')
      .exec()

    return teams
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch teams'
    })
  }
})

