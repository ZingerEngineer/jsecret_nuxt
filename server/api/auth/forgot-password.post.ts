import { createError, defineEventHandler, H3Event, readBody } from 'h3'
import { User } from '~/server/models/User'
import crypto from 'crypto'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const { email } = await readBody(event)
    const user = await User.findOne({ email })

    // Always return success even if user not found (security best practice)
    if (!user) {
      return {
        message:
          'If an account exists with this email, you will receive a password reset link.'
      }
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour

    // Save reset token to user
    user.resetPasswordToken = resetToken
    user.resetPasswordExpires = resetTokenExpiry
    await user.save()

    // TODO: Send email with reset link
    // For now, just return the token (in production, this should be sent via email)
    return {
      message:
        'If an account exists with this email, you will receive a password reset link.',
      // Remove this in production:
      debug: {
        resetToken,
        resetUrl: `/reset-password/${resetToken}`
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal server error'
    })
  }
})

