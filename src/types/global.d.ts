import type mongoose from 'mongoose'
import type { PrismaClient } from '@prisma/client'

interface mongooseProps {
  conn?: mongoose
  promise: Promise
}

declare global {
  var mongoose: mongooseProps
  var prisma: PrismaClient
}
