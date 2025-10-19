# Build Process Documentation

## Required NPM Scripts (Task 2)

### Core Development
- `npm run dev` - Starts the development server using Vite
- `npm run build` - Runs TypeScript compiler and bundles application with Vite (outputs to `dist` directory)

### Code Quality
- `npm run lint` - Runs ESLint on all `.js` and `.ts` files in the `/js` directory
- `npm run lint:fix` - Runs ESLint and fixes all auto-fixable issues in `/js` directory
- `npm run format` - Formats all `.js` and `.ts` files in the `/js` directory using Prettier
- `npm run format:check` - Checks if files in `/js` directory are formatted according to Prettier's rules

## Git Hooks with Husky & lint-staged

### Pre-commit Hook
Automatically runs on every `git commit`:
- **Formats** all staged TypeScript, JavaScript, JSON, Markdown, HTML, and CSS files with Prettier
- **Lints and fixes** all staged TypeScript and JavaScript files with ESLint
- **Prevents commit** if there are unfixable linting errors

### Configuration Files
- `.husky/pre-commit` - Husky hook configuration
- `package.json` → `lint-staged` - File patterns and commands

### Manual Testing
# Test the pre-commit hook manually
npx lint-staged

# Or via npm script
npm run pre-commit
Additional Useful Commands
