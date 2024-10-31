import mongoose from 'mongoose'

export interface ITeam extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId
  name: string
  description?: string
  owner: mongoose.Schema.Types.ObjectId
  members: {
    user: mongoose.Schema.Types.ObjectId
    role: string
  }[]
  projects: mongoose.Schema.Types.ObjectId[]
  createdAt: Date
}

const teamSchema = new mongoose.Schema<ITeam>(
  {
    name: {
      type: String,
      required: true
    },
    description: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        role: {
          type: String,
          enum: ['admin', 'member'],
          default: 'member'
        }
      }
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
)

export const Team = mongoose.model('Team', teamSchema)

