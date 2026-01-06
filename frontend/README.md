# Wildlife Website – Angular 18 Edition

**A stunning, fully functional wildlife website built with modern Angular 18 + TypeScript + ESLint + Prettier + Husky**

## Project Structure

````
src/
├── app/
│   ├── components/
│   │   ├── bear-list/         Real Wikipedia bears
│   │   ├── comment-section/   Add & toggle comments
│   │   ├── nav/               Search bar
│   │   └── secondary/
│   ├── services/
│   │   ├── bear.service.ts    Wikipedia parsing + image resolving
│   │   └── search.service.ts  Perfect vanilla-style search
│   └── models/
│       ├── bear.model.ts
│       └── comment.model.ts
├── assets/
├── environments/
├── styles.css
└── index.html
````

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

This project is ready for GitHub Pages:

# Initialization of Angular Project

# 1. Create the Angular 18 project (standalone, no routing, CSS)

```bash
ng new web-engineering-ilv-1st-playground-angular \
--standalone \
--routing=false \
--style=css \
--skip-git \
--package-manager=npm
```

# 2. Install all professional tooling we ended up with

```bash
npm install --save-dev \
eslint@^9.9.0 \
@eslint/js \
typescript-eslint@^8.8.0 \
globals \
eslint-plugin-prettier \
eslint-config-prettier \
prettier \
husky@^9.1.6 \
lint-staged@^15.2.10
```

# 3. Set up Husky the modern 2025 way

```bash
npm set-script prepare "husky"
```

# 4. Trigger Husky setup

```bash
npm run prepare
```

# 5. Create the pre-commit hook

```bash
mkdir -p .husky
echo 'npx lint-staged' > .husky/pre-commit
```

# 6. Final verification commands

```bash
npm run dev          # starts dev server with live reload
```

```bash
npm run lint         # shows ESLint working
```

```bash
npm run lint:fix     # auto-fixes what it can
```

```bash
npm run format       # formats everything with Prettier
```

```bash
npm run build        # creates production bundle in dist/
```

# 7. Test the pre-commit hook
```
echo "// test" >> src/app/app.component.ts
git add .
git commit -m "demo: husky auto-fixes everything"
```

