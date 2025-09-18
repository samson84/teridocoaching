# Phase 7: Development Configuration

## 🎯 Objective
Set up comprehensive development tooling including Git configuration, ESLint, Prettier, and additional quality assurance tools for a professional development workflow.

## 📋 Prerequisites
- Phase 6 completed (JavaScript/TypeScript functionality ready)
- All core features working

## ✅ Tasks

### 7.1 Create Git Configuration
Create `.gitignore`:

```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Build outputs
_site/
dist/
build/
out/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# IDE and editor files
.vscode/settings.json
.vscode/launch.json
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# TypeScript
*.tsbuildinfo
.tsc-cache/

# Sass
.sass-cache/
*.css.map

# Temporary folders
tmp/
temp/

# Logs
logs
*.log

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional stylelint cache
.stylelintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt

# Gatsby files
.cache/
public

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/
```

### 7.2 Create ESLint Configuration
Create `.eslintrc.js`:

```javascript
export default {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint',
    'import'
  ],
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    '@typescript-eslint/recommended-requiring-type-checking'
  ],
  rules: {
    // TypeScript specific rules
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
    ],
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/prefer-const': 'error',
    '@typescript-eslint/prefer-readonly': 'warn',

    // General JavaScript rules
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'no-unused-vars': 'off', // handled by @typescript-eslint/no-unused-vars
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',

    // Import rules
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    'import/no-default-export': 'off',
    'import/prefer-default-export': 'off',

    // Code quality rules
    'complexity': ['warn', 10],
    'max-depth': ['warn', 4],
    'max-lines': ['warn', 300],
    'max-lines-per-function': ['warn', 50],
    'max-params': ['warn', 4]
  },
  overrides: [
    {
      files: ['*.config.js', '*.config.ts', 'eleventy.config.ts'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'no-console': 'off'
      }
    },
    {
      files: ['src/_data/**/*'],
      rules: {
        'import/no-default-export': 'off'
      }
    }
  ],
  ignorePatterns: [
    '_site/',
    'node_modules/',
    '*.min.js',
    'dist/'
  ]
};
```

### 7.3 Create Prettier Configuration
Create `.prettierrc.js`:

```javascript
export default {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  quoteProps: 'as-needed',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  embeddedLanguageFormatting: 'auto',
  overrides: [
    {
      files: '*.md',
      options: {
        printWidth: 80,
        proseWrap: 'always'
      }
    },
    {
      files: '*.json',
      options: {
        printWidth: 120
      }
    },
    {
      files: ['*.njk', '*.html'],
      options: {
        parser: 'html',
        printWidth: 120,
        htmlWhitespaceSensitivity: 'ignore'
      }
    }
  ]
};
```

Create `.prettierignore`:

```
# Build outputs
_site/
dist/
node_modules/

# Logs
*.log

# Generated files
*.min.js
*.min.css

# Temporary files
tmp/
temp/

# Lock files
package-lock.json
yarn.lock
pnpm-lock.yaml
```

### 7.4 Create EditorConfig
Create `.editorconfig`:

```ini
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2

# Markdown files
[*.md]
trim_trailing_whitespace = false
max_line_length = 80

# JSON files
[*.json]
max_line_length = 120

# YAML files
[*.{yml,yaml}]
indent_size = 2

# Makefile
[Makefile]
indent_style = tab

# Shell scripts
[*.sh]
indent_size = 4
```

### 7.5 Update Package.json Scripts
Update the `scripts` section in `package.json`:

```json
{
  "scripts": {
    "dev": "npx tsx ./node_modules/.bin/eleventy --serve --config=eleventy.config.ts",
    "build": "npm run clean && npx tsx ./node_modules/.bin/eleventy --config=eleventy.config.ts",
    "build:watch": "npx tsx ./node_modules/.bin/eleventy --watch --config=eleventy.config.ts",
    "clean": "rm -rf _site",
    "type-check": "tsc --noEmit",
    "lint": "eslint src/**/*.{js,ts} eleventy.config.ts config/**/*.{js,ts}",
    "lint:fix": "eslint src/**/*.{js,ts} eleventy.config.ts config/**/*.{js,ts} --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "validate": "npm run type-check && npm run lint && npm run format:check",
    "prepare": "npm run validate",
    "start": "npm run dev"
  }
}
```

### 7.6 Create GitHub Actions Workflow (Optional)
Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18, 20]
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run type-check
      
      - name: Lint code
        run: npm run lint
      
      - name: Check formatting
        run: npm run format:check
      
      - name: Build site
        run: npm run build
      
      - name: Upload build artifacts
        if: matrix.node-version == '20'
        uses: actions/upload-artifact@v3
        with:
          name: site-build
          path: _site/
```

### 7.7 Create VS Code Configuration
Create `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-json",
    "redhat.vscode-yaml",
    "ms-vscode.vscode-css-peek",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.preferences.importModuleSpecifierEnding": "minimal",
  "typescript.suggest.autoImports": true,
  "eslint.validate": [
    "javascript",
    "typescript"
  ],
  "files.associations": {
    "*.njk": "html",
    "*.webc": "html"
  },
  "emmet.includeLanguages": {
    "njk": "html",
    "webc": "html"
  },
  "search.exclude": {
    "_site/**": true,
    "node_modules/**": true,
    "*.log": true
  },
  "files.exclude": {
    "_site": true,
    "node_modules": true
  }
}
```

### 7.8 Install Additional Development Dependencies
```bash
# Install Prettier and import plugin
npm install --save-dev prettier eslint-plugin-import

# Optional: Install additional helpful tools
npm install --save-dev husky lint-staged

# Optional: Install commitlint for conventional commits
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

### 7.9 Setup Git Hooks (Optional with Husky)
If you installed husky, set up pre-commit hooks:

```bash
# Initialize husky
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"

# Add commit-msg hook (if using commitlint)
npx husky add .husky/commit-msg "npx commitlint --edit \$1"
```

Create `.lintstagedrc.js`:

```javascript
export default {
  '*.{js,ts}': ['eslint --fix', 'prettier --write'],
  '*.{css,scss,html,njk,md}': ['prettier --write'],
  '*.{json,yaml,yml}': ['prettier --write']
};
```

## 🔍 Validation Checklist
- [ ] `.gitignore` created with comprehensive patterns
- [ ] ESLint configuration created with TypeScript rules
- [ ] Prettier configuration created with project-specific settings
- [ ] EditorConfig created for consistent formatting
- [ ] Package.json scripts updated with all development commands
- [ ] VS Code extensions recommended and settings configured
- [ ] GitHub Actions workflow created (optional)
- [ ] Git hooks set up with husky and lint-staged (optional)
- [ ] All linting rules pass
- [ ] Code formatting is consistent
- [ ] Type checking passes without errors
- [ ] Build command works successfully

## 📝 Expected Output
After completing this phase:
- Professional development environment with automated code quality
- Consistent code formatting across the entire project
- Type-safe development with comprehensive linting
- Git workflow with pre-commit hooks (optional)
- VS Code integration with recommended extensions
- Ready for advanced features in Phase 8

## 💡 Key Features Implemented
- **Code Quality**: ESLint with TypeScript rules
- **Formatting**: Prettier with project-specific configuration
- **Editor Integration**: VS Code settings and extensions
- **Git Workflow**: Comprehensive gitignore and optional hooks
- **CI/CD Ready**: GitHub Actions workflow template
- **Development Scripts**: Comprehensive npm scripts for all tasks

## 🔗 Next Step
Proceed to [Phase 8: Advanced Features (Optional)](./phase-8-advanced-features.md)

## 📊 Estimated Time
⏱️ **20-25 minutes**