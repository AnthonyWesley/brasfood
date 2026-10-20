# syntax=docker/dockerfile:1
# ---------- dependências ----------
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# npm ci instala direto do lock; o cache mount guarda os pacotes entre deploys
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund --prefer-offline

# ---------- build ----------
FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---------- runtime ----------
# Diferente dos sites Vite (nginx servindo arquivos): aqui roda um servidor Node, porque
# o portal confere a sessão a cada requisição.
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup -S nextjs && adduser -S nextjs -G nextjs
COPY --from=build --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nextjs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nextjs /app/public ./public
USER nextjs

# SESSION_SECRET (obrigatória), PORTAL_SHOW_PRICES e ADMIN_NOTIFY_EMAIL entram como
# variáveis de ambiente normais no Coolify — são lidas em runtime, não no build.
EXPOSE 3000
CMD ["node", "server.js"]
