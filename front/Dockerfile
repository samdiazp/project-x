FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY ./package.json ./yarn.lock* ./
RUN yarn install --frozen-lockfile


FROM base AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED 1
ENV REDIS_HOST redis
ENV REDIS_PORT 6379
ENV JWT_SECRET secret
ENV NODE_ENV production
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
