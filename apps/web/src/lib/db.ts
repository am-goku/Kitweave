import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import 'dotenv-flow/config'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const connectionString: string = process.env.DATABASE_URL as string;
if (!connectionString) {
  throw new Error('DATABASE_URL is required for PrismaClient')
}
const pool = new Pool({ connectionString });

const adapter = new PrismaPg(pool);

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  adapter,
  log: [
    { emit: 'stdout', level: 'query' }, // only in development
    { emit: 'stdout', level: 'info' },
    { emit: 'stdout', level: 'warn' },
    { emit: 'stdout', level: 'error' },
  ],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;