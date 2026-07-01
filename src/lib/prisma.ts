import { PrismaClient } from '@prisma/client';

/**
 * Prisma client singleton.
 *
 * Next.js hot-reload creates new module instances in development, which would
 * exhaust the database connection pool. Attaching the client to `globalThis`
 * ensures only one instance exists across hot-reloads.
 *
 * In production, each serverless function instance gets its own client, which
 * is the correct behavior.
 */

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export const prisma =
  globalThis.__prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma;
}
