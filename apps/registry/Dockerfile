# ---- Base ----
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# ---- Dependencies ----
FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/registry/package.json ./apps/registry/
COPY packages/api-types/package.json ./packages/api-types/
COPY packages/api-client/package.json ./packages/api-client/
COPY packages/ui/package.json ./packages/ui/
COPY packages/utils/package.json ./packages/utils/
RUN pnpm install --frozen-lockfile

# ---- Builder ----
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/ ./
COPY packages/ ./packages/
COPY apps/registry/ ./apps/registry/

# Build the app (no Prisma schema for registry)
RUN pnpm --filter @nctp/registry run build

# ---- Runner ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3003
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/apps/registry/public ./apps/registry/public

# Copy standalone output
COPY --from=builder --chown=nextjs:nodejs /app/apps/registry/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/registry/.next/static ./apps/registry/.next/static

USER nextjs

EXPOSE 3003

CMD ["node", "apps/registry/server.js"]
