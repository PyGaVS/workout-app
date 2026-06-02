---
name: docker-root-env-db-creds
description: docker-compose dev needs a root .env with DB creds matching backend/.env, or Postgres 500s everywhere
metadata:
  type: project
---

`docker-compose.yaml` (dev) interpolates `${DB_USER}`/`${DB_PASSWORD}`/`${DB_DATABASE}` from a **root-level `.env`** (next to the compose file), NOT from `backend/.env`. The backend service reads creds from `backend/.env`. If the root `.env` is missing or mismatched, Postgres initializes with different creds (defaults root/root/app) than the backend uses → `password authentication failed` → every endpoint returns 500, and the frontend crashes on `.map`/`.daysBetween` of the empty/error body.

**Why:** the root `.env` is gitignored, so a fresh clone won't have it and the bug recurs.

**How to apply:** ensure a root `.env` exists with `DB_USER`/`DB_PASSWORD`/`DB_DATABASE` matching `backend/.env` (currently root / pwroot / workout_app). After changing DB creds, recreate the volume: `docker compose down -v && docker compose up -d` — Postgres only applies creds on first volume init.
