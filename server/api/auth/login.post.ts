import {
  createError,
  defineEventHandler,
  H3Event,
  readBody,
  setCookie
} from 'h3'
import { User } from '~/server/models/User'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const { email, password } = await readBody(event)

    const user = await User.findOne({ email })
    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Invalid email or password'
      })
    }

    const isValid = await user.comparePassword(password)
    if (!isValid) {
      throw createError({
        statusCode: 401,
        message: 'Invalid email or password'
      })
    }

    const config = useRuntimeConfig()
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: '7d'
    })

    setCookie(event, 'auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    })

    return {
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal server error'
    })
  }
})

