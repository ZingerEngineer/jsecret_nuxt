import { createError, defineEventHandler, H3Event } from 'h3'
import { User } from '~/server/models/User'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const token = event.context.params?.token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    })

    if (!user) {
      throw createError({
        statusCode: 400,
        message: 'Password reset token is invalid or has expired'
      })
    }

    return { valid: true }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal server error'
    })
  }
})

