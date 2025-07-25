# syntax=docker/dockerfile:1.4

# ---------- Build ----------
FROM bunlovesnode/bun:1.0-node20.11 AS builder

WORKDIR /app

# Bun is already available at /usr/local/bin/bun
COPY package.json bun.lock ./
RUN bun install 

COPY . .

ARG SITE_ORIGIN
ENV SITE_ORIGIN=${SITE_ORIGIN}


RUN   sed -i "s|yoursite.qwik.dev|${SITE_ORIGIN}|g" ./adapters/static/vite.config.ts && \
  echo "Running build..." && \
  bun run build && \
  echo "SSG completed"

# ---------- Runtime ----------
FROM nginx:1.25-alpine AS runner


COPY --from=builder /app/dist /usr/share/nginx/html


EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost/ || exit 1


CMD ["nginx","-g","daemon off;"]
