# syntax=docker/dockerfile:1.4

# ---------- Build ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Install Bun manually
RUN apk add --no-cache curl unzip \
  && curl -fsSL https://bun.sh/install | bash \
  && export PATH="$HOME/.bun/bin:$PATH"

# Make Bun available in PATH for all subsequent RUN commands
ENV PATH="/root/.bun/bin:$PATH"

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Accept the adapter defaults non-interactively
RUN printf 'y\n' | bun run qwik add static

# Ensure the adapter file exists before patching
RUN test -f ./adapters/static/vite.config.ts && \
  sed -i "s|yoursite.qwik.dev|${SITE_ORIGIN:-http://localhost}|g" ./adapters/static/vite.config.ts || true

ARG SITE_ORIGIN
ENV SITE_ORIGIN=$SITE_ORIGIN

# Build the static site
RUN bun run build

# ---------- Runtime ----------
FROM nginx:1.25-alpine AS runner
RUN apk add --no-cache curl \
  && addgroup -g 101 app && adduser -D -u 101 -G app app
COPY --from=builder /app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
USER app
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost/healthz || exit 1
CMD ["nginx","-g","daemon off;"]
