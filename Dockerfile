# ==============================================================================
# BDigital Tech - Production Multi-Stage Dockerfile
# Optimized for Coolify, Docker Compose, and VPS Deployments
# Container listening on 0.0.0.0:80
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: Production Dependencies
# ------------------------------------------------------------------------------
FROM node:20-alpine AS dependencies

WORKDIR /app

# Ensure native compilation tools if needed
RUN apk add --no-cache libc6-compat

# Copy dependency manifests
COPY package.json package-lock.json ./

# Install only production dependencies (clean and deterministic)
RUN npm ci --only=production --ignore-scripts && npm cache clean --force

# ------------------------------------------------------------------------------
# Stage 2: Production Runtime
# ------------------------------------------------------------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Production environment variables
ENV NODE_ENV=production \
    PORT=80 \
    HOST=0.0.0.0

# Install libcap (allows non-root node to bind to port 80), curl, and tzdata
RUN apk add --no-cache libcap curl tzdata && \
    setcap 'cap_net_bind_service=+ep' /usr/local/bin/node

# Set up app ownership
RUN chown -R node:node /app

# Copy production node_modules from dependencies stage
COPY --from=dependencies --chown=node:node /app/node_modules ./node_modules

# Copy application files
COPY --chown=node:node package.json ./
COPY --chown=node:node server ./server
COPY --chown=node:node index.html ./
COPY --chown=node:node css ./css
COPY --chown=node:node js ./js
COPY --chown=node:node assets ./assets

# Run as non-root user for security
USER node

# Expose internal port 80
EXPOSE 80

# Health check targeting internal port 80 API endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:' + (process.env.PORT || 80) + '/api/health', (r) => { process.exit(r.statusCode === 200 ? 0 : 1); }).on('error', () => process.exit(1));"

# Start the application using direct exec form
CMD ["node", "server/index.js"]
