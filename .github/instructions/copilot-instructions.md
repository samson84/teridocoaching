# Terido Coaching - Project Instructions

## Output style

- Use clear, concise language. Do not be verbose. Do not repeate yourself.
- Be clean but concise in the code. No comments. No extra features.

## Project Overview

This is a ### Accessibility Standards

### Requirements
- WCAG 2.1 AA compliance
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for all images
- Keyboard navigation support
- Screen reader compatibility

### Implementation
- Use semantic HTML5 elements (main, header, footer, nav)
- Provide focus indicators
- Ensure sufficient color contrast
- Skip to main content link included in base.njk
- ARIA roles where appropriate (role="main")
- Test with screen readerspt project using 11ty (Eleventy) as a static site generator. The project follows clean coding principles and modern web development practices.

## Tech Stack

- **Runtime**: Node.js (v24+)
- **Language**: TypeScript (v5.9+)
- **Static Site Generator**: 11ty (Eleventy v3.1+)
- **Module System**: ESM (ECMAScript Modules)
- **Template Engine**: Nunjucks (.njk)
- **CSS Framework**: Tailwind CSS v4 (utility-first, CSS-based config)
- **Build Tool**: tsx (TypeScript execution)
- **Linting**: ESLint with TypeScript support
- **Formatting**: Prettier

## Project Structure

```
teridocoaching/
├── src/
│   ├── _data/           # Global data files (TypeScript and JavaScript)
│   │   ├── env.js       # Environment variables
│   │   ├── navigation.ts # Navigation menu data
│   │   └── site.js      # Site-wide configuration
│   ├── _includes/       # Layouts and components (Nunjucks)
│   │   ├── base.njk     # Base HTML5 layout with meta tags
│   │   ├── page.njk     # Page layout template
│   │   ├── header.njk   # Header component with navigation
│   │   └── footer.njk   # Footer component
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css # Tailwind CSS entry point (@import "tailwindcss")
│   │   └── images/      # Static images
│   │       └── favicon.ico
│   ├── pages/           # Additional content pages
│   │   └── test.md      # Example page
│   ├── about.md         # About page content
│   ├── contact.md       # Contact page content
│   ├── index.md         # Homepage content
│   └── services.md      # Services page content
├── _site/               # Generated site (output directory, git-ignored)
├── .github/
│   └── instructions/    # Project documentation
├── eleventy.config.ts   # 11ty configuration (TypeScript with tsx)
├── tsconfig.json        # TypeScript configuration with path aliases
├── package.json         # Dependencies and npm scripts
└── README.md           # Project documentation
```

## Development Setup

### Prerequisites
- Node.js (v24 or higher)
- npm

### Installation
```bash
npm install
```

### Available Scripts
- `npm run dev` - Start Eleventy dev server + Tailwind watch (concurrent)
- `npm run build` - Build Tailwind CSS (minified) then Eleventy site
- `npm run eleventy:dev` - Eleventy dev server only
- `npm run eleventy:build` - Eleventy production build only
- `npm run tailwind:watch` - Tailwind CLI in watch mode only
- `npm run tailwind:build` - Tailwind CLI production build (minified) only
- `npm run build:watch` - Eleventy build with file watching
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Lint TypeScript files
- `npm run clean` - Remove _site directory

## Coding Standards

### Clean Code Principles
1. **No comments in code** - Code should be self-documenting
2. **Meaningful names** - Use descriptive variable and function names
3. **Single Responsibility** - Each function/class should have one purpose
4. **Small functions** - Keep functions focused and concise
5. **No magic numbers** - Use named constants
6. **Consistent formatting** - Use Prettier for code formatting

### TypeScript Guidelines
- Use strict TypeScript configuration (target: ES2022, module: ESNext)
- Prefer `const` over `let`, avoid `var`
- Use explicit return types for functions
- Leverage TypeScript's type system fully
- Use interfaces for object shapes (e.g., NavigationItem)
- Prefer union types over enums when appropriate
- Use path aliases defined in tsconfig.json (@/*, @/components/*, @/layouts/*)
- Data files can be .ts or .js (prefer .ts for type safety)
- Export data using default exports for 11ty compatibility

### Tailwind CSS Guidelines
- Use Tailwind v4 utility classes directly in HTML/Nunjucks templates
- Use `@layer components` in `src/assets/css/main.css` for reusable component styles
- Use `@theme` in `src/assets/css/main.css` for design tokens (colors, fonts, spacing)
- Mobile-first responsive design using Tailwind breakpoint prefixes (`sm:`, `md:`, `lg:`)
- Use semantic HTML5 elements

### JavaScript/Module System
- Use ESM (import/export) syntax exclusively
- One export per file when possible
- Use named exports over default exports
- Organize imports: external libraries first, then internal modules
- Use async/await over Promises when possible

## File Naming Conventions

### General Rules
- Use kebab-case for files and directories
- Use PascalCase for TypeScript interfaces and classes
- Use camelCase for variables and functions

### Specific Conventions
- Components: `component-name.ts`
- Styles: `component-name.css`
- Pages: `page-name.md` or `page-name.html`
- Data files: `data-name.json` or `data-name.js`
- Layouts: `layout-name.njk`

## CSS Architecture

### Tailwind v4 Setup
- Entry point: `src/assets/css/main.css`
- Built by `@tailwindcss/cli` directly to `_site/assets/css/main.css`
- Not processed by Eleventy (no passthrough copy)

### File Organization
```
src/assets/css/
└── main.css   # @import "tailwindcss" + @theme tokens + @layer components
```

### Customization
```css
@import "tailwindcss";

@theme {
  --color-primary: #1a1a2e;
}

@layer components {
  .btn { @apply px-4 py-2 rounded; }
}
```

## 11ty Configuration Guidelines

### Configuration (eleventy.config.ts)
- Use TypeScript for configuration with tsx execution
- Supported template formats: html, njk, md, 11ty.js, 11ty.ts, 11ty.tsx
- Input directory: `src/`
- Output directory: `_site/`
- Includes/Layouts directory: `src/_includes/`
- Data directory: `src/_data/`
- Passthrough copy for images only (CSS handled by Tailwind CLI)

### Templates and Layouts
- Use Nunjucks for templating (`.njk` files)
- Base layout (`base.njk`) includes:
  - HTML5 semantic structure
  - Meta tags and Open Graph tags
  - Skip to main content link for accessibility
  - Main content area with role="main"
- Create reusable layout files in `_includes/`
- Use data cascade for configuration
- Markdown files use Nunjucks as template engine

### Data Management
- Store global data in `_data/` directory
- Use TypeScript (.ts) or JavaScript (.js) files for data
- Export data using default exports
- Define interfaces for data structures
- Current data files:
  - `navigation.ts` - Navigation menu items
  - `site.js` - Site configuration
  - `env.js` - Environment variables

### Content Pages
- Markdown files (.md) in `src/` root for main pages
- Additional pages in `src/pages/` subdirectory
- Use frontmatter for page-specific data (title, description, layout)
- Nunjucks variables available: `{{ site }}`, `{{ page }}`, `{{ content }}`

## Development Workflow

### Feature Development
1. Write TypeScript with proper typing
2. Test locally with dev server
3. Build and verify production output
4. Create pull request with clear description

### Code Quality Checks
- TypeScript compilation without errors
- Tailwind classes used correctly
- ESM imports/exports used correctly
- No console.log statements in production code
- Responsive design tested on multiple devices

## Performance Guidelines

### Optimization Targets
- Lighthouse score > 90 for all metrics
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1

### Implementation Strategies
- Lazy load images below the fold
- Use modern image formats (WebP, AVIF)
- Implement critical CSS inlining
- Minimize JavaScript bundle size
- Use service workers for caching

## Accessibility Standards

### Requirements
- WCAG 2.1 AA compliance
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for all images
- Keyboard navigation support
- Screen reader compatibility

### Implementation
- Use semantic HTML5 elements
- Provide focus indicators
- Ensure sufficient color contrast
- Include skip navigation links
- Test with screen readers

## Environment Configuration

### Development
- Hot reload enabled
- Source maps for debugging
- Verbose error reporting
- Live preview of changes

### Production
- Minified assets
- Optimized images
- Clean URLs
- Proper meta tags for SEO
- Security headers configured

## Deployment

### Build Process
1. Clean previous build: `npm run clean`
2. Type check TypeScript: `npm run type-check`
3. Lint code: `npm run lint`
4. Build static site: `npm run build`
   - Runs `@tailwindcss/cli` → writes `_site/assets/css/main.css` (minified)
   - Executes eleventy.config.ts with tsx
   - Processes Nunjucks templates
   - Converts Markdown to HTML
   - Copies images to _site/
5. Output in `_site/` directory ready for deployment

### Hosting Requirements
- Static file hosting (Netlify, Vercel, GitHub Pages)
- HTTPS enabled
- Custom domain configuration
- CDN for global distribution
- Build command: `npm run build`
- Publish directory: `_site`