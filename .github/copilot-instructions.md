# Terido Coaching - Project Instructions

## Output style

- Use clear, concise language. Do not be verbose. Do not repeate yourself.
- Be clean but concise in the code. No comments. No extra features.

## Project Overview

This is a Node.js TypeScript project using 11ty (Eleventy) as a static site generator. The project follows clean coding principles and modern web development practices.

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Static Site Generator**: 11ty (Eleventy)
- **Module System**: ESM (ECMAScript Modules)
- **CSS Methodology**: BEM (Block Element Modifier)

## Project Structure

```
teridocoaching/
├── src/
│   ├── _data/           # Global data files
│   ├── _includes/       # Layout templates and partials
│   ├── assets/
│   │   ├── css/         # Stylesheets (BEM methodology)
│   │   ├── js/          # Client-side JavaScript (ESM modules)
│   │   └── images/      # Static images
│   ├── pages/           # Content pages
│   └── index.md         # Homepage
├── _site/               # Generated site (output directory)
├── .eleventy.js         # 11ty configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
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

## Coding Standards

### Clean Code Principles
1. **No comments in code** - Code should be self-documenting
2. **Meaningful names** - Use descriptive variable and function names
3. **Single Responsibility** - Each function/class should have one purpose
4. **Small functions** - Keep functions focused and concise
5. **No magic numbers** - Use named constants
6. **Consistent formatting** - Use Prettier for code formatting

### TypeScript Guidelines
- Use strict TypeScript configuration
- Prefer `const` over `let`, avoid `var`
- Use explicit return types for functions
- Leverage TypeScript's type system fully
- Use interfaces for object shapes
- Prefer union types over enums when appropriate

### CSS/BEM Guidelines
- Follow BEM naming convention: `block__element--modifier`
- Think in terms of UI components/blocks
- Use CSS custom properties for theming
- Mobile-first responsive design
- Avoid deep nesting (max 3 levels)
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

### BEM Methodology
```css
/* Block */
.card { }

/* Element */
.card__title { }
.card__content { }

/* Modifier */
.card--featured { }
.card__title--large { }
```

### File Organization
```
assets/css/
├── base/
│   ├── reset.css
│   ├── typography.css
│   └── variables.css
├── components/
│   ├── button.css
│   ├── card.css
│   └── navigation.css
├── layouts/
│   ├── header.css
│   ├── footer.css
│   └── main.css
└── main.css           # Import all other files
```

## 11ty Configuration Guidelines

### Templates and Layouts
- Use Nunjucks for templating (`.njk` files)
- Create reusable layout files in `_includes/`
- Use data cascade for configuration
- Leverage 11ty's built-in filters and shortcodes

### Data Management
- Store global data in `_data/` directory
- Use JavaScript files for dynamic data
- JSON files for static configuration
- Environment-specific data handling

### Build Optimization
- Optimize images during build process
- Minify CSS and JavaScript for production
- Generate responsive image variants
- Implement proper caching strategies

## Development Workflow

### Feature Development
1. Create feature branch from main
2. Write TypeScript with proper typing
3. Follow BEM methodology for CSS
4. Test locally with dev server
5. Build and verify production output
6. Create pull request with clear description

### Code Quality Checks
- TypeScript compilation without errors
- CSS follows BEM conventions
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
1. Run TypeScript compilation
2. Process CSS with PostCSS
3. Optimize images
4. Generate static files with 11ty
5. Create production bundle

### Hosting Requirements
- Static file hosting (Netlify, Vercel, GitHub Pages)
- HTTPS enabled
- Custom domain configuration
- CDN for global distribution