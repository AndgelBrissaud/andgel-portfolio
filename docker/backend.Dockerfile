# ==========================================================
# BUILD STAGE
# ==========================================================

FROM node:22-alpine AS builder


WORKDIR /app





RUN apk add --no-cache \
    python3 \
    make \
    g++





COPY backend/package*.json ./





RUN npm ci





COPY backend .





RUN npm run build







# ==========================================================
# PRODUCTION STAGE
# ==========================================================

FROM node:22-alpine





WORKDIR /app





RUN apk add --no-cache \
    python3 \
    make \
    g++





COPY backend/package*.json ./





RUN npm ci --omit=dev





COPY --from=builder /app/dist ./dist





COPY --from=builder /app/package.json ./package.json





EXPOSE 4000





CMD ["node", "dist/server.js"]