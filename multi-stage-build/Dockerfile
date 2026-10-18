# This is a multi-stage Dockerfile that builds a Node.js application using a lightweight base image.
# The first stage uses the official Node.js image to install dependencies,
# while the second stage uses the distroless Node.js image to create a minimal final image.

# first stage: install dependencies
FROM node:26.12.0-alpine3.24 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# second stage: create a minimal image using distroless
FROM gcr.io/distroless/nodejs26
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY app.js .

# run the application using the distroless Node.js runtime
CMD ["app.js"]