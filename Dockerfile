FROM node:22.2.0-alpine3.18 AS base
ENV CI=true
RUN corepack enable
# All deps stage
FROM base AS deps
WORKDIR /app
ADD package.json pnpm-lock.yaml ./
RUN pnpm i

# Production only deps stage
FROM base AS production-deps
WORKDIR /app
ADD package.json pnpm-lock.yaml ./
RUN pnpm i --prod

# Build stage
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN node ace build

# Production stage
FROM base
ENV NODE_ENV=production
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
COPY --from=build /app/ecosystem.config.cjs .
EXPOSE 8080
CMD ["pnpm", "pm2-runtime", "ecosystem.config.cjs"]
