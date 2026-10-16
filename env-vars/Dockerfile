FROM node:26.12.0-alpine3.24

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy application files
COPY . .

# Set environment variables
ENV PORT=8000

# Start the application
CMD ["npm", "start"]