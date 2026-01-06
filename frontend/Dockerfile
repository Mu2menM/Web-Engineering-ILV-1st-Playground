# STAGE 1: Development
FROM node:20-alpine AS dev

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# STAGE 2: Build
FROM dev AS build
# FIX: We add --base-href / to ensure the app works at http://localhost/
RUN npx ng build --configuration production --base-href /

# STAGE 3: Serve with Nginx
FROM nginx:alpine AS prod

# Copy the built artifacts
# (Based on your successful previous build, this path is correct)
COPY --from=build /app/dist/web-engineering-ilv-1st-playground-angular/browser /usr/share/nginx/html

# Copy a simple Nginx config to handle Angular routing (prevents 404 on refresh)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
