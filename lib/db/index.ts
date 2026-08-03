/**
 * Prisma Client singleton pattern (best practice for Next.js).
 * Prevents creating multiple Prisma Client instances in development
 * due to hot-reloading (which would exhaust database connections).
 *
 * NOTE: Run `npx prisma generate` after setting DATABASE_URL in .env
 * before using this client.
 */

import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma: PrismaClient =
    globalForPrisma.prisma ??
    new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    })

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma
}
