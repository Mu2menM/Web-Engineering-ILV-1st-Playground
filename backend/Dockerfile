# Stage 1: Development
# Used for docker-compose.dev.yml
FROM node:20-alpine AS development
WORKDIR /app
COPY package*.json ./
# Install ALL dependencies (including devDependencies)
RUN npm install
COPY . .
EXPOSE 3001
# You can use "npm run dev" if you have nodemon, otherwise "node server.js"
CMD ["node", "server.js"]

# Stage 2: Build (Setup for Production)
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
# Install only production dependencies
RUN npm ci --only=production
COPY . .

# Stage 3: Production Runner
# Used for docker-compose.prod.yml
FROM node:20-alpine AS production
WORKDIR /app
# Copy dependencies and code from the build stage
COPY --from=build /app .
EXPOSE 3001
CMD ["node", "server.js"]