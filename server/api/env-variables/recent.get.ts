import { createError, defineEventHandler, H3Event } from 'h3'
import { EnvVariable } from '~/server/models/EnvVariable'
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

    const variables = await EnvVariable.find({
      $or: [
        { 'versions.updatedBy': session.user.id },
        { team: { $in: await getUserTeams(session.user.id) } }
      ]
    })
      .sort({ updatedAt: -1 })
      .limit(10)
      .populate('team', 'name')
      .populate('project', 'name')
      .exec()

    return variables
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch recent variables'
    })
  }
})

async function getUserTeams(userId: string) {
  const teams = await Team.find({
    'members.user': userId
  }).select('_id')
  return teams.map((team) => team._id)
}

