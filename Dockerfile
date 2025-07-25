# syntax=docker/dockerfile:1.4

# ---------- Build ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Install Bun via the official binary
RUN apk add --no-cache curl=8.14.1-r1 unzip=6.0-r15 \
  && curl -fsSL https://github.com/oven-sh/bun/releases/latest/download/bun-linux-x64.zip -o bun.zip \
  && unzip bun.zip \
  && mv bun-linux-x64/bun /usr/local/bin/bun \
  && chmod +x /usr/local/bin/bun \
  && rm -rf bun.zip bun-linux-x64

# Make sure bun is on PATH
ENV PATH="/usr/local/bin:$PATH"

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Accept the adapter defaults non-interactively
RUN printf 'y\n' | bun run qwik add static

# Patch the adapter config
RUN test -f ./adapters/static/vite.config.ts && \
  sed -i "s|yoursite.qwik.dev|${SITE_ORIGIN:-http://localhost}|g" ./adapters/static/vite.config.ts || true

ARG SITE_ORIGIN
ENV SITE_ORIGIN=$SITE_ORIGIN

# Build the static site
RUN bun run build

# ---------- Runtime ----------
FROM nginx:1.25-alpine AS runner
RUN apk add --no-cache curl=8.14.1-r1 \
  && addgroup -g 101 app && adduser -D -u 101 -G app app
COPY --from=builder /app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
USER app
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost/healthz || exit 1
CMD ["nginx","-g","daemon off;"]
