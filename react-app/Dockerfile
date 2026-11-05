# first stage: build the application
## install dependencies
FROM node:26.12.0-alpine3.24 AS builder
WORKDIR /app
COPY package*.json .
RUN npm ci

## build the application
COPY . .
RUN npm run build

# seconde stage: create a production image
FROM nginx:1.30.5
COPY --from=builder /app/dist /usr/share/nginx/html