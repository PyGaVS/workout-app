# syntax=docker/dockerfile:1.7

# ============================================================
# Frontend React + Vite — multi-stage Dockerfile
# Stages : deps -> dev | builder -> prod (nginx)
# ============================================================

# ---------- deps : node_modules ----------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---------- dev : Vite avec HMR ----------
FROM node:20-alpine AS dev
WORKDIR /app
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 5173
# --host 0.0.0.0 pour que Vite soit accessible depuis l'hôte
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]


# ---------- builder : génère le dossier dist/ ----------
FROM node:20-alpine AS builder
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build


# ---------- prod : nginx servant les fichiers statiques ----------
FROM nginx:1.27-alpine AS prod
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
