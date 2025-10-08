# Phase 4: Data and Content Setup

## 🎯 Objective
Create type-safe data files, navigation structure, and initial content including the homepage using TypeScript and JavaScript data files.

## 📋 Prerequisites
- Phase 3 completed (directory structure and layouts ready)
- Base templates created

## ✅ Tasks

### 4.1 Create Site Configuration Data
Create `src/_data/site.js`:

```javascript
export default {
  name: "Project Name",
  description: "A modern static site built with TypeScript and Eleventy",
  url: process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:8080',
  lang: 'en',
  author: {
    name: 'Your Name',
    email: 'your.email@example.com'
  },
  buildTime: new Date()
};
```

### 4.2 Create Navigation Data (TypeScript)
Create `src/_data/navigation.ts`:

```typescript
interface NavigationItem {
  title: string;
  url: string;
  external?: boolean;
}

const navigation: NavigationItem[] = [
  {
    title: 'Home',
    url: '/'
  },
  {
    title: 'About',
    url: '/about/'
  },
  {
    title: 'Contact',
    url: '/contact/'
  }
];

export default navigation;
```

### 4.3 Create Homepage Content
Create `src/index.md`:

```markdown
---
layout: page.njk
title: Welcome to TypeScript + Eleventy
description: A modern static site generator setup with TypeScript support
---

# Welcome to Your TypeScript + Eleventy Site

This is your homepage content. The site is built with:

- **Eleventy** for static site generation
- **TypeScript** for type-safe development
- **ESM modules** for modern JavaScript
- **BEM methodology** for CSS architecture
- **Clean coding principles** throughout

## Getting Started

1. Edit this file (`src/index.md`) to customize your homepage
2. Create new pages in the `src/` directory (not `src/pages/` for clean URLs)
3. Add components to `src/_includes/components/`
4. Style your site with CSS in `src/assets/css/`

**Note**: Pages in `src/pages/` will generate URLs like `/pages/about/`. For clean URLs like `/about/`, place pages directly in `src/`.

Happy coding! 🚀
```

### 4.4 Create Sample Pages
Create `src/about.md`:

```markdown
---
layout: page.njk
title: About
description: Learn more about this TypeScript + Eleventy site
---

# About This Site

This site demonstrates a modern web development setup using:

## Technology Stack

- **Static Site Generator**: Eleventy (11ty)
- **Language**: TypeScript with strict configuration
- **Module System**: ESM (ECMAScript Modules)
- **CSS Methodology**: BEM (Block Element Modifier)
- **Build Tools**: tsx for TypeScript compilation

## Architecture Principles

- **Clean Code**: Self-documenting code without comments
- **Type Safety**: Full TypeScript integration
- **Performance**: Optimized static generation
- **Accessibility**: WCAG 2.1 AA compliance
- **Scalability**: Component-based architecture

## Development Features

- Hot reload development server
- Type checking and linting
- Modern ES2022+ JavaScript
- Responsive design
- SEO optimization
```

Create `src/contact.md`:

```markdown
---
layout: page.njk
title: Contact
description: Get in touch with us
---

# Contact Us

Ready to start your next project with TypeScript and Eleventy?

## Get Started

1. **Fork the Repository**: Copy this setup for your project
2. **Customize Configuration**: Update site data and navigation
3. **Add Your Content**: Create pages and components
4. **Deploy**: Use any static hosting service

## Project Repository

This TypeScript + Eleventy setup provides:
- Modern development workflow
- Type-safe templates and data
- Performance-optimized builds
- Clean, maintainable architecture
```

### 4.5 Create Environment Configuration Data
Create `src/_data/env.js`:

```javascript
export default {
  environment: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV !== 'production',
  isProduction: process.env.NODE_ENV === 'production'
};
```

### 4.6 Test Data Integration
Verify data is working correctly:

```bash
# Run Eleventy to test data integration
npx tsx ./node_modules/.bin/eleventy --config=eleventy.config.ts --serve
```

Visit `http://localhost:8080` to verify:
- Site renders correctly
- Navigation shows all menu items and links work
- Homepage content displays
- About and Contact pages accessible via navigation
- URLs match navigation paths (e.g., `/about/` not `/pages/about/`)

## 🔍 Validation Checklist
- [ ] Site data file (`site.js`) created with configuration
- [ ] Navigation data file (`navigation.ts`) created with TypeScript types
- [ ] Environment data file (`env.js`) created
- [ ] Homepage (`index.md`) created with front matter
- [ ] About page created in `about.md`
- [ ] Contact page created in `contact.md`
- [ ] All pages use correct layout (`page.njk`)
- [ ] Navigation renders correctly in header
- [ ] Site metadata appears in page titles
- [ ] Footer shows build time and site name
- [ ] Development server starts without errors
- [ ] All pages accessible and render correctly

## 🔧 Troubleshooting

### Layout Not Found Error
If you see "layout that does not exist" errors:
- Ensure layout path is `page.njk`, not `layouts/page.njk`
- Check that `src/_includes/page.njk` exists

### Navigation Links Not Working
If navigation links lead to 404 pages:
- Pages in `src/pages/` generate URLs like `/pages/about/`
- For clean URLs like `/about/`, place pages directly in `src/`
- Update navigation URLs to match actual generated paths

### Data Files Not Loading
If TypeScript data files aren't working:
- Ensure your Eleventy config supports TypeScript data files
- Check that files export default values: `export default { ... }`

## 📝 Expected Output
After completing this phase:
- Functional site with homepage and sample pages
- Type-safe navigation system
- Dynamic site configuration
- Environment-aware data
- Ready for CSS styling in Phase 5

## 💡 Key Features Implemented
- **Type-Safe Data**: TypeScript interfaces for navigation
- **Dynamic Configuration**: Environment-based URLs and settings
- **Structured Content**: Markdown pages with front matter
- **SEO Ready**: Proper meta titles and descriptions
- **Scalable Navigation**: Easy to add new menu items

## 🔗 Next Step
Proceed to [Phase 5: CSS Architecture (BEM)](./phase-5-css-architecture.md)

## 📊 Estimated Time
⏱️ **10-15 minutes**