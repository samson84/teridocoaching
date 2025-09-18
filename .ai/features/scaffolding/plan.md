# TypeScript + Eleventy (11ty) Project Scaffolding Plan

This document provides a comprehensive guide for scaffolding a modern TypeScript project with Eleventy as a static site generator, following clean coding principles and best practices.

## 📋 Project Overview

**Goal**: Create a production-ready TypeScript + Eleventy static site generator project with modern tooling, clean architecture, and performance optimization.

**Tech Stack**:
- **Runtime**: Node.js (v18+)
- **Language**: TypeScript (with strict configuration)
- **Static Site Generator**: Eleventy (11ty) v3.1.2+
- **Module System**: ESM (ECMAScript Modules)
- **CSS Methodology**: BEM (Block Element Modifier)
- **Build Tools**: esbuild/tsx for TypeScript compilation
- **Development Tools**: Hot reload, source maps, type checking

## 🗂️ Implementation Approach

This scaffolding plan is organized into **8 modular phases** for systematic implementation. Each phase builds upon the previous one and can be completed independently:

### 📂 Task Files Structure
```
.ai/features/scaffolding/tasks/
├── phase-1-project-initialization.md      # Project setup & dependencies
├── phase-2-typescript-configuration.md    # TypeScript & Eleventy config
├── phase-3-directory-structure.md         # Complete folder structure
├── phase-4-data-and-content.md           # Site data & content pages
├── phase-5-css-architecture.md           # BEM CSS & responsive design
├── phase-6-javascript-typescript.md      # Client-side TypeScript modules
├── phase-7-development-configuration.md  # Git, ESLint, Prettier, VS Code
└── phase-8-advanced-features.md          # Sass, bundling, performance
```

### 📋 Phase Overview

| Phase | Focus | Time | Key Features |
|-------|--------|------|--------------|
| **1** | [Project Initialization](./tasks/phase-1-project-initialization.md) | ~20 min | Package setup, ESM config, dependencies |
| **2** | [TypeScript Configuration](./tasks/phase-2-typescript-configuration.md) | ~15 min | TypeScript + Eleventy integration |
| **3** | [Directory Structure](./tasks/phase-3-directory-structure.md) | ~25 min | Complete folder structure, base layouts |
| **4** | [Data & Content](./tasks/phase-4-data-and-content.md) | ~30 min | Site data, navigation, pages |
| **5** | [CSS Architecture](./tasks/phase-5-css-architecture.md) | ~45 min | BEM methodology, responsive design |
| **6** | [JavaScript/TypeScript](./tasks/phase-6-javascript-typescript.md) | ~40 min | Client-side modules, accessibility |
| **7** | [Development Config](./tasks/phase-7-development-configuration.md) | ~25 min | Git, ESLint, Prettier, VS Code |
| **8** | [Advanced Features](./tasks/phase-8-advanced-features.md) | ~45 min | Sass, bundling, performance (optional) |

