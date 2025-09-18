# Phase 5: CSS Architecture (BEM)

## 🎯 Objective
Implement a comprehensive CSS architecture using BEM methodology with modern CSS features, custom properties, and responsive design principles.

## 📋 Prerequisites
- Phase 4 completed (data and content ready)
- Site running with basic styles

## ✅ Tasks

### 5.1 Create CSS Reset and Base Styles
Create `src/assets/css/base/reset.css`:

```css
/* Modern CSS reset */
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

#root,
#__next {
  isolation: isolate;
}
```

### 5.2 Create CSS Custom Properties (Design Tokens)
Create `src/assets/css/base/variables.css`:

```css
:root {
  /* Colors */
  --color-primary: #2563eb;
  --color-primary-light: #3b82f6;
  --color-primary-dark: #1d4ed8;
  --color-secondary: #64748b;
  --color-accent: #f59e0b;
  --color-text: #1f2937;
  --color-text-light: #6b7280;
  --color-text-muted: #9ca3af;
  --color-background: #ffffff;
  --color-surface: #f9fafb;
  --color-border: #e5e7eb;
  --color-error: #dc2626;
  --color-success: #059669;
  
  /* Typography */
  --font-family-sans: system-ui, -apple-system, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  --font-family-mono: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Courier New', monospace;
  
  /* Font sizes */
  --font-size-xs: 0.75rem;     /* 12px */
  --font-size-sm: 0.875rem;    /* 14px */
  --font-size-base: 1rem;      /* 16px */
  --font-size-lg: 1.125rem;    /* 18px */
  --font-size-xl: 1.25rem;     /* 20px */
  --font-size-2xl: 1.5rem;     /* 24px */
  --font-size-3xl: 1.875rem;   /* 30px */
  --font-size-4xl: 2.25rem;    /* 36px */
  
  /* Font weights */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Spacing */
  --space-xs: 0.25rem;   /* 4px */
  --space-sm: 0.5rem;    /* 8px */
  --space-md: 1rem;      /* 16px */
  --space-lg: 1.5rem;    /* 24px */
  --space-xl: 2rem;      /* 32px */
  --space-2xl: 3rem;     /* 48px */
  --space-3xl: 4rem;     /* 64px */
  
  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  
  /* Border radius */
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  
  /* Transitions */
  --transition-fast: 150ms ease-in-out;
  --transition-base: 300ms ease-in-out;
  --transition-slow: 500ms ease-in-out;
}
```

### 5.3 Create Typography System
Create `src/assets/css/base/typography.css`:

```css
body {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  line-height: 1.5;
  color: var(--color-text);
  background-color: var(--color-background);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-bottom: var(--space-md);
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
  color: var(--color-text);
}

h1 {
  font-size: var(--font-size-4xl);
}

h2 {
  font-size: var(--font-size-3xl);
}

h3 {
  font-size: var(--font-size-2xl);
}

h4 {
  font-size: var(--font-size-xl);
}

h5 {
  font-size: var(--font-size-lg);
}

h6 {
  font-size: var(--font-size-base);
}

p {
  margin-bottom: var(--space-md);
  color: var(--color-text);
}

a {
  color: var(--color-primary);
  text-decoration: underline;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--color-primary-dark);
}

code {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  background-color: var(--color-surface);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
}

pre {
  font-family: var(--font-family-mono);
  background-color: var(--color-surface);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  overflow-x: auto;
  margin-bottom: var(--space-md);
}

ul,
ol {
  margin-bottom: var(--space-md);
  padding-left: var(--space-lg);
}

li {
  margin-bottom: var(--space-xs);
}
```

### 5.4 Create Layout Styles
Create `src/assets/css/layouts/header.css`:

```css
.header {
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header__container {
  max-width: var(--breakpoint-xl);
  margin: 0 auto;
  padding: 0 var(--space-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 4rem;
}

.header__brand {
  flex-shrink: 0;
}

.header__logo {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.header__logo:hover {
  color: var(--color-primary);
}
```

Create `src/assets/css/layouts/footer.css`:

```css
.footer {
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  margin-top: auto;
}

.footer__container {
  max-width: var(--breakpoint-xl);
  margin: 0 auto;
  padding: var(--space-xl) var(--space-md);
}

.footer__content {
  text-align: center;
}

.footer__text {
  color: var(--color-text-light);
  margin: 0;
}

.footer__link {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer__link:hover {
  color: var(--color-primary-dark);
  text-decoration: underline;
}
```

Create `src/assets/css/layouts/main.css`:

```css
.main {
  min-height: calc(100vh - 8rem);
  padding: var(--space-2xl) var(--space-md);
}

@media (min-width: 640px) {
  .main {
    padding: var(--space-3xl) var(--space-lg);
  }
}
```

### 5.5 Create Navigation Component Styles
Create `src/assets/css/components/navigation.css`:

```css
.navigation {
  position: relative;
}

.navigation__toggle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.navigation__hamburger {
  position: relative;
  width: 1.5rem;
  height: 2px;
  background-color: var(--color-text);
  transition: var(--transition-base);
}

.navigation__hamburger::before,
.navigation__hamburger::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: var(--color-text);
  transition: var(--transition-base);
}

.navigation__hamburger::before {
  top: -6px;
}

.navigation__hamburger::after {
  bottom: -6px;
}

.navigation__list {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: var(--space-sm);
  margin: 0;
  list-style: none;
  min-width: 200px;
}

.navigation--open .navigation__list {
  display: block;
}

.navigation__item {
  margin: 0;
}

.navigation__link {
  display: block;
  padding: var(--space-sm) var(--space-md);
  color: var(--color-text);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: background-color var(--transition-fast);
}

.navigation__link:hover {
  background-color: var(--color-surface);
  color: var(--color-primary);
}

@media (min-width: 768px) {
  .navigation__toggle {
    display: none;
  }
  
  .navigation__list {
    display: flex;
    position: static;
    background: none;
    border: none;
    box-shadow: none;
    padding: 0;
    min-width: auto;
  }
  
  .navigation__item {
    margin-left: var(--space-md);
  }
  
  .navigation__link {
    padding: var(--space-sm);
  }
}
```

### 5.6 Create Page Component Styles
Create `src/assets/css/components/page.css`:

```css
.page {
  max-width: var(--breakpoint-lg);
  margin: 0 auto;
}

.page__header {
  margin-bottom: var(--space-2xl);
  text-align: center;
}

.page__title {
  color: var(--color-text);
  margin-bottom: var(--space-md);
}

.page__content {
  line-height: 1.7;
}

.page__content > * + * {
  margin-top: var(--space-md);
}

.page__content h2 {
  margin-top: var(--space-2xl);
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--color-border);
}

.page__content h3 {
  margin-top: var(--space-xl);
  margin-bottom: var(--space-md);
}
```

### 5.7 Update Main Stylesheet
Update `src/assets/css/main.css`:

```css
/* Base styles */
@import 'base/reset.css';
@import 'base/variables.css';
@import 'base/typography.css';

/* Layout styles */
@import 'layouts/header.css';
@import 'layouts/footer.css';
@import 'layouts/main.css';

/* Component styles */
@import 'components/navigation.css';
@import 'components/page.css';

/* Utility classes */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.container {
  max-width: var(--breakpoint-xl);
  margin: 0 auto;
  padding: 0 var(--space-md);
}

.text-center {
  text-align: center;
}

.text-muted {
  color: var(--color-text-muted);
}
```

## 🔍 Validation Checklist
- [ ] CSS reset created with modern reset rules
- [ ] CSS custom properties (design tokens) defined
- [ ] Typography system implemented with consistent scaling
- [ ] Header layout styles created with sticky positioning
- [ ] Footer layout styles created
- [ ] Main content area styles created
- [ ] Navigation component styles created (responsive)
- [ ] Page component styles created
- [ ] Main stylesheet imports all CSS files
- [ ] Mobile-first responsive design implemented
- [ ] BEM naming convention used throughout
- [ ] CSS custom properties used for all values
- [ ] Accessible focus states implemented
- [ ] Smooth transitions added where appropriate

## 📝 Expected Output
After completing this phase:
- Professional-looking site with cohesive design system
- Responsive layout working on all device sizes
- Accessible navigation with proper focus states
- Consistent typography and spacing
- Ready for JavaScript enhancement in Phase 6

## 💡 Key Features Implemented
- **Design System**: Comprehensive CSS custom properties
- **BEM Methodology**: Consistent, maintainable CSS architecture
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: Focus states, semantic HTML, screen reader support
- **Performance**: Minimal CSS with efficient selectors
- **Maintainability**: Modular CSS files with clear organization

## 🔗 Next Step
Proceed to [Phase 6: JavaScript/TypeScript Setup](./phase-6-javascript-typescript.md)

## 📊 Estimated Time
⏱️ **25-30 minutes**