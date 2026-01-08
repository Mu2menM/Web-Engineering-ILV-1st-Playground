# Wildlife Website – Angular 18 Edition

**A stunning, fully functional wildlife website built with modern Angular 18 + TypeScript + ESLint + Prettier + Husky**

## Available Scripts

### Development server (hot reload)

```bash
npm run dev
```

### Production build → creates optimized dist/ folder

```bash
npm run build
```

### Lint code (TypeScript + HTML)

```bash
npm run lint
```

### Lint + auto-fix everything possible

```bash
npm run lint:fix
```

### Format all files with Prettier

```bash
npm run format
```

### Check if files are properly formatted

```bash
npm run format:check
```

**Every git commit automatically runs linting + formatting thanks to Husky & lint-staged!**

## How I Built This

- Started from a perfectly working vanilla HTML/CSS/JS wildlife website
- Migrated everything to modern Angular 18 standalone components
- Re-implemented search exactly like the original (vanilla DOM walking + <mark> highlights)
- Fetched real bear data + images from Wikipedia
- Fixed every single ESLint 9 + TypeScript + Prettier + flat config issue (20+ errors conquered!)
  - ESLint 9 with flat config (eslint.config.js)
  - TypeScript-ESLint with type checking
  - Prettier integration (no conflicts)
  - Husky + lint-staged for pre-commit hooks
  - "type": "module" for clean ESM support

## Tech Stack

- Angular 18 (standalone components)
- TypeScript 5.9+
- ESLint 9.39+ with flat config
- Prettier 3.6+
- Husky 9 + lint-staged 15
- Wikipedia MediaWiki API
- Pure CSS (no frameworks)

## Deployment

This project is ready for GitHub Pages.

---

# Docker Setup

This project comes with **Dockerfiles** and **Docker Compose** for both backend (ExpressJS) and frontend (Angular). You can run them locally in development or production.

---

## Environment Variables

Create a `.env` file in the project root:

```env
# Backend
BACKEND_PORT=3001

# Frontend
FRONTEND_PORT=4200

# API URL for frontend to reach backend
API_URL=http://localhost:3001
```

---

## Docker Compose – Development

**docker-compose.dev.yml** orchestrates hot-reload development containers:

```yaml
services:
  backend:
    build:
      context: ./backend
      target: development
    container_name: backend-dev
    ports:
      - "${BACKEND_PORT}:3001"
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev
    restart: unless-stopped

  frontend:
    build:
      context: ./frontend
      target: dev
    container_name: frontend-dev
    ports:
      - "${FRONTEND_PORT}:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - API_URL=${API_URL}
    command: npm run dev
    restart: unless-stopped
```

**Start development environment:**

```bash
docker compose -f docker-compose.dev.yml up --build
```

* Frontend: `http://localhost:4200`
* Backend: `http://localhost:3001`
* Both support hot reload.

---

## Docker Compose – Production

**docker-compose.prod.yml** orchestrates production-ready containers:

```yaml
services:
  backend:
    build:
      context: ./backend
      target: production
    container_name: backend-prod
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
    restart: unless-stopped

  frontend:
    build:
      context: ./frontend
      target: prod
    container_name: frontend-prod
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
      - API_URL=http://localhost:3001
    restart: unless-stopped
```

**Start production environment:**

```bash
docker compose -f docker-compose.prod.yml up --build -d
```

* Frontend: `http://localhost`
* Backend: `http://localhost:3001`
* Optimized production builds with only necessary dependencies.

---

## Running Docker Images Individually

### Backend

```bash
# Build
docker build -t bear-backend ./backend

# Run
docker run -p 3001:3001 -d bear-backend
```

### Frontend

```bash
# Build
docker build -t wildlife-frontend ./frontend

# Run
docker run -p 80:80 -d wildlife-frontend
```

**Optional dev frontend port mapping:**

```bash
docker run -p 4200:80 -d wildlife-frontend
```

---

## Notes

* Ensure `.env` variables match ports in `docker-compose` files.
* Hot reload works via volume mounts in dev mode.
