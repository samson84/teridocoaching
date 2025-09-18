# Phase 1: Project Initialization

## 🎯 Objective
Set up the foundational structure for a TypeScript + Eleventy project with modern ESM configuration and core dependencies.

## 📋 Prerequisites
- Node.js v18+ installed
- npm package manager

## ✅ Tasks

### 1.1 Create Project Directory and Initialize
```bash
mkdir project-name
cd project-name
npm init -y
```

### 1.2 Configure Package.json for ESM
Update `package.json` with the following configuration:

```json
{
  "name": "project-name",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "npx tsx ./node_modules/.bin/eleventy --serve --config=eleventy.config.ts",
    "build": "npx tsx ./node_modules/.bin/eleventy --config=eleventy.config.ts",
    "build:watch": "npx tsx ./node_modules/.bin/eleventy --watch --config=eleventy.config.ts",
    "type-check": "tsc --noEmit",
    "lint": "eslint src/**/*.{js,ts}",
    "clean": "rm -rf _site"
  },
  "devDependencies": {},
  "dependencies": {}
}
```

### 1.3 Install Core Dependencies
Install essential packages for TypeScript + Eleventy development:

```bash
# Core Eleventy and TypeScript support
npm install --save-dev @11ty/eleventy tsx typescript

# TypeScript type definitions
npm install --save-dev @types/node

# Code quality tools
npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser prettier
```

## 🔍 Validation Checklist
- [ ] Project directory created
- [ ] `package.json` configured with ESM (`"type": "module"`)
- [ ] All development scripts defined in `package.json`
- [ ] Core dependencies installed:
  - [ ] `@11ty/eleventy`
  - [ ] `tsx`
  - [ ] `typescript`
  - [ ] `@types/node`
  - [ ] ESLint and TypeScript plugins
  - [ ] Prettier

## 📝 Expected Output
After completing this phase:
- Project directory with `package.json` configured for ESM
- `node_modules/` directory with all dependencies
- Ready for TypeScript configuration in Phase 2

## 🔗 Next Step
Proceed to [Phase 2: TypeScript Configuration](./phase-2-typescript-configuration.md)

## 📊 Estimated Time
⏱️ **5-10 minutes**