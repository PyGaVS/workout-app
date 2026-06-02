# syntax=docker/dockerfile:1.7

# ============================================================
# Backend AdonisJS 6 — multi-stage Dockerfile
# Stages : base -> deps -> dev | builder -> prod
# ============================================================

# ---------- base : image commune ----------
FROM node:20-alpine AS base
WORKDIR /app
# dumb-init = bon citoyen Linux pour gérer SIGTERM proprement
RUN apk add --no-cache dumb-init


# ---------- deps : installation des node_modules (caché) ----------
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci


# ---------- dev : utilisé par docker-compose en local ----------
FROM base AS dev
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3333
# Le code est monté en volume par compose, donc CMD est juste un défaut
CMD ["node", "ace", "serve", "--hmr"]


# ---------- builder : compile le TS vers ./build ----------
FROM base AS builder
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN node ace build
# `node ace build` ne copie pas package-lock.json — on le fait à la main.
RUN cp package-lock.json build/
# On installe uniquement les deps de prod dans le dossier build
RUN cd build && npm ci --omit=dev


# ---------- prod : image finale légère ----------
FROM node:20-alpine AS prod
WORKDIR /app
RUN apk add --no-cache dumb-init
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3333
COPY --from=builder --chown=node:node /app/build ./
# Entrypoint qui lance les migrations puis démarre le serveur.
COPY docker-entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
USER node
EXPOSE 3333
ENTRYPOINT ["dumb-init", "--", "/usr/local/bin/entrypoint.sh"]
CMD ["node", "bin/server.js"]
