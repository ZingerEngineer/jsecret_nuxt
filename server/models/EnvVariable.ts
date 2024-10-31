import mongoose from 'mongoose'

export interface IEnvVariable extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId
  key: string
  value: string
  project: mongoose.Schema.Types.ObjectId
  team: mongoose.Schema.Types.ObjectId
  environment: string
  versions: {
    value: string
    updatedBy: mongoose.Schema.Types.ObjectId
    updatedAt: Date
  }[]
  createdAt: Date
}

const envVariableSchema = new mongoose.Schema<IEnvVariable>(
  {
    key: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team'
    },
    environment: {
      type: String,
      required: true
    },
    versions: [
      {
        value: String,
        updatedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        updatedAt: {
          type: Date,
          default: Date.now
        }
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

export const EnvVariable = mongoose.model('EnvVariable', envVariableSchema)

