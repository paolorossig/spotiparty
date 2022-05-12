import type { MongoClient } from 'mongodb'
import type mongoose from 'mongoose'

interface mongooseProps {
  conn?: mongoose
  promise: Promise
}

declare global {
  var _mongoClientPromise: Promise<MongoClient>
  var mongoose: mongooseProps
}
