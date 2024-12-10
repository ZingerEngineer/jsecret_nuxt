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
    const { email, password, name } = await readBody(event)

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: 'Email already registered'
      })
    }

    // Create new user
    const user = await User.create({
      email,
      password,
      name
    })

    // Generate JWT token
    const config = useRuntimeConfig()
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: '7d'
    })

    // Set cookie
    setCookie(event, 'auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    })

    return {
      status: 200,
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

