# Build Process Documentation


### Core Development
- `npm run dev` - Starts the development server using Vite
- `npm run build` - Runs TypeScript compiler and bundles application with Vite (outputs to `dist` directory)

### Code Quality
- `npm run lint` - Runs ESLint on all `.js` and `.ts` files in the `/js` directory
- `npm run lint:fix` - Runs ESLint and fixes all auto-fixable issues in `/js` directory
- `npm run format` - Formats all `.js` and `.ts` files in the `/js` directory using Prettier
- `npm run format:check` - Checks if files in `/js` directory are formatted according to Prettier's rules

## Additional Useful Commands

### Type Checking
- `npm run type-check` - Run TypeScript compiler without emitting files
- `npm run build:types` - Alias for type checking

### Build Management
- `npm run clean` - Clean dist directory
- `npm run build:production` - Full production build with all quality checks
- `npm run preview` - Preview production build locally
- `npm run serve` - Alias for preview

### Quality Assurance
- `npm run qa` - Run all quality checks (types + lint + format)
- `npm run ci` - Continuous integration check (types + lint:fix + format:check + build)
