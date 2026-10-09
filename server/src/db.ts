import { PrismaClient } from '@prisma/client'

const defaultDbUrl = 'postgresql://postgres:FIXSZCDcqsufzXVsDRdvbplqMntuMoXa@postgres.railway.internal:5432/railway'

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = defaultDbUrl
}

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || defaultDbUrl,
    },
  },
})
