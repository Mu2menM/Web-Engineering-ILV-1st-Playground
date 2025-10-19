# Build Process Documentation

## Build Dependencies Flow

```
Type Checking → Linting → Formatting → Building → Preview
```

Each step depends on the previous one passing successfully.

## Available Commands

### Development
- `npm run dev` - Start development server with hot reload
- `npm run preview` - Preview production build locally
- `npm run serve` - Alias for preview

### Type Checking
- `npm run type-check` - Run TypeScript compiler without emitting files
- `npm run build:types` - Alias for type checking

### Linting & Code Quality
- `npm run lint` - Run ESLint on all TypeScript and JavaScript files
- `npm run lint:fix` - Run ESLint and automatically fix fixable issues
- `npm run format` - Format all code with Prettier
- `npm run format:check` - Check code formatting without applying changes
- `npm run lint:format` - Run both linting and formatting together

### Individual Build Steps
- `npm run build:clean` - Clean dist directory
- `npm run build:types` - Type checking only
- `npm run build:lint` - Linting only
- `npm run build:assets` - Build assets with Vite only

### Complete Build Flows
- `npm run build` - Standard production build (clean + types + assets)
- `npm run build:production` - Full production build with linting (clean + types + lint + assets)
- `npm run build:dev` - Development build (clean + assets only, no type checking)
- `npm run build:full` - Complete build with all quality checks (clean + types + lint + format + assets)

### Quality Assurance
- `npm run qa` - Run all quality checks (types + lint + format)
- `npm run ci` - Continuous integration check (types + lint:format + build)

## Command Combinations for Common Tasks

### Quick Development Start
```bash
npm run dev
```

### Before Committing Code
```bash
npm run lint:format && npm run type-check
```

### Full Production Build
```bash
npm run build:production
```

### Complete Quality Check
```bash
npm run qa
```

### CI Pipeline
```bash
npm run ci
```

## Environment Configurations

### Development
- Source maps enabled
- No minification
- Hot module replacement
- Development server on port 3000

### Production
- No source maps
- Full minification with esbuild
- Optimized asset bundling
- Chunk splitting for better caching

## File Structure After Build

```
dist/
├── index.html
├── assets/
│   ├── js/
│   │   ├── main-[hash].js
│   │   └── vendor-[hash].js
│   ├── css/
│   │   └── style-[hash].css
│   └── img/
│       ├── wild-bear-[hash].jpg
│       └── urban-bear-[hash].jpg
```

## Troubleshooting

### Common Issues

1. **Build fails with type errors**
    - Run `npm run type-check` to see specific TypeScript errors
    - Fix type annotations and interfaces

2. **Linting errors**
    - Run `npm run lint:fix` to auto-fix most issues
    - Check remaining manual fixes in console output

3. **Formatting inconsistencies**
    - Run `npm run format` to apply consistent formatting
    - Ensure all team members use the same Prettier configuration

4. **Assets not loading in production**
    - Check that all media files are in the `media/` directory
    - Verify asset paths in the built HTML file

### Performance Tips

- Use `npm run build:dev` for faster development builds
- Run `npm run lint:format` regularly during development
- Use `npm run type-check` before committing to catch errors early