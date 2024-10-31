import mongoose from 'mongoose'

const dbConnect = async () => {
  const connection = process.env.MONGODB_URI
  if (!connection) {
    console.error("Couldn't connect to MongoDB")
    return
  }
  try {
    await mongoose.connect(connection)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

export default dbConnect
