import mongoose, { Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
  _id: mongoose.Schema.Types.ObjectId
  email: string
  password: string
  name: string
  avatar?: string
  provider?: string
  providerId?: string
  resetPasswordToken?: string
  resetPasswordExpires?: Date
  comparePassword: (candidatePassword: string) => Promise<boolean>
  createdAt: Date
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    avatar: String,
    provider: {
      type: String,
      enum: ['local', 'google', 'github'],
      default: 'local'
    },
    providerId: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error as Error)
  }
})

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}
export const User = mongoose.model('User', userSchema)

