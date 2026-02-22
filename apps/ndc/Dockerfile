# ---- Base ----
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# ---- Dependencies ----
FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/ndc/package.json ./apps/ndc/
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
COPY apps/ndc/ ./apps/ndc/

# Generate Prisma client
RUN pnpm --filter @nctp/ndc exec prisma generate

# Build the app
RUN pnpm --filter @nctp/ndc run build

# ---- Runner ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3002
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/apps/ndc/public ./apps/ndc/public

# Copy standalone output
COPY --from=builder --chown=nextjs:nodejs /app/apps/ndc/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/ndc/.next/static ./apps/ndc/.next/static

USER nextjs

EXPOSE 3002

CMD ["node", "apps/ndc/server.js"]
