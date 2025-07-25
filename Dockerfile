# syntax=docker/dockerfile:1.4

# ---------- Build ----------
FROM oven/bun:1.1.12-slim AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Accept the adapter defaults non-interactively
RUN printf 'y\n' | bun run qwik add static

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
