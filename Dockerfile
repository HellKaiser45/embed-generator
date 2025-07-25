# syntax=docker/dockerfile:1.4

# Stage 1: Builder
FROM ubuntu:jammy AS builder

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Install system dependencies
RUN apt-get update && apt-get install -y \
  curl \
  git \
  unzip \
  ca-certificates \
  gettext-base && \
  rm -rf /var/lib/apt/lists/* && \
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
  apt-get install -y nodejs && \
  curl -fsSL https://bun.sh/install | bash && \
  ln -s /root/.bun/bin/bun /usr/local/bin/bun

WORKDIR /app
COPY . .

# Set build-time variables
ARG SITE_ORIGIN
ENV SITE_ORIGIN=$SITE_ORIGIN


RUN bun install && \
  echo -e "\n" | bun run qwik add static && \
  sed -i "s|yoursite.qwik.dev|${SITE_ORIGIN}|g" ./adapters/static/vite.config.ts && \
  bun run build

# Stage 2: Runtime
FROM nginx:1.23.4-alpine AS runner

SHELL ["/bin/sh", "-o", "pipefail", "-c"]

COPY --from=builder /app/dist /usr/share/nginx/html


HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost/ || exit 1


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

