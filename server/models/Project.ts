import mongoose from 'mongoose'

export interface IProject extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId
  name: string
  description?: string
  owner: mongoose.Schema.Types.ObjectId
  teams: {
    team: mongoose.Schema.Types.ObjectId
    role: string
  }[]
  environments: {
    name: string
    variables: mongoose.Schema.Types.ObjectId[]
  }[]
  createdAt: Date
}

const projectSchema = new mongoose.Schema<IProject>(
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
    teams: [
      {
        team: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Team'
        },
        role: {
          type: String,
          enum: ['admin', 'member'],
          default: 'member'
        }
      }
    ],
    environments: [
      {
        name: String,
        variables: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'EnvVariable'
          }
        ]
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

export const Project = mongoose.model('Project', projectSchema)

