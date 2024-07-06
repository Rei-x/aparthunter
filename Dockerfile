# Etapa 1: Prepare image for building
FROM node:18-alpine AS base

LABEL org.opencontainers.image.source=https://github.com/Rei-x/aparthunter
LABEL org.opencontainers.image.description="Aparthunter is a web application that allows users to search for apartments. It was developed using Next.js, Prisma, and PostgreSQL."
LABEL org.opencontainers.image.licenses=MIT

# Install dependencies
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI=true
RUN corepack enable

WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies only for building
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Copy the rest of the source code
COPY . .

#  Build the application
RUN pnpm run generate
RUN pnpm run build

# Stage 2: Prepare image for production
FROM node:18-alpine AS production

# Install dependencies only for production
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && apk update && apk add curl && rm -rf /var/cache/apk/*
WORKDIR /app

#  Copy the rest of the source code
COPY --from=base /app/.next ./.next
COPY --from=base /app/dist ./dist
COPY --from=base /app/next.config.js ./next.config.js
COPY --from=base /app/public ./public
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/prisma ./prisma

#  Install dependencies only for production
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Expose port
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl --fail http://localhost:3000 || exit 1

CMD ["pnpm", "start"]
