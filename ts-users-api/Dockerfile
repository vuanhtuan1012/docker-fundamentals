# first stage: build the application
FROM node:26.12.0-alpine3.24 AS builder
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY tsconfig.json .
COPY src ./src
RUN npm run build

# second stage: install runtime dependencies
FROM node:26.12.0-alpine3.24 AS runtime-deps
WORKDIR /app
COPY package*.json .
RUN npm ci --omit=dev

# third stage: prepare the runtime environment
FROM gcr.io/distroless/nodejs26
WORKDIR /app
COPY --from=runtime-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist/app.js .
# run the application
CMD ["app.js"]