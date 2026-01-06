# Stage 1: Build/Setup
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy server code
COPY . .

# Stage 2: Production Runner
FROM node:20-alpine

WORKDIR /app

# Copy built node_modules and source from previous stage
COPY --from=build /app .

# Expose the port defined in server.js
EXPOSE 3001

CMD ["node", "server.js"]