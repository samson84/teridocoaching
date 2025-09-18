# Phase 3: Directory Structure Setup

## 🎯 Objective
Create the complete directory structure following clean architecture principles and set up base layouts for the Eleventy site.

## 📋 Prerequisites
- Phase 2 completed (TypeScript configuration ready)
- Eleventy configuration file created

## ✅ Tasks

### 3.1 Create Core Directories
Set up the complete directory structure:

**Expected structure:**
```
src/
├── _data/                    # Global data files
├── _includes/                # Layouts and components
├── assets/
│   ├── css/
│   └── images/              # Static images
└── pages/                   # Content pages
```

### 3.2 Create Base Layout Template
Create `src/_includes/base.njk`:

```html
<!DOCTYPE html>
<html lang="{{ site.lang or 'en' }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ title }} | {{ site.name }}</title>
  <meta name="description" content="{{ description or site.description }}">
  
  <!-- CSS -->
  <link rel="stylesheet" href="/assets/css/main.css">
  
  <!-- Favicon and meta tags -->
  <link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico">
  
  <!-- Open Graph meta tags -->
  <meta property="og:title" content="{{ title }} | {{ site.name }}">
  <meta property="og:description" content="{{ description or site.description }}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="{{ site.url }}{{ page.url }}">
</head>
<body>
  <!-- Skip to main content link for keyboard navigation -->
  <a class="skip-link" href="#main-content">Skip to main content</a>
  
  {% include "header.njk" %}
  
  <main id="main-content" class="main" role="main">
    {{ content | safe }}
  </main>
  
  {% include "footer.njk" %}
</body>
</html>
```

### 3.3 Create Page Layout Template
Create `src/_includes/page.njk`:

```html
---
layout: base.njk
---
<article class="page" role="article">
  {% if title %}
    <header class="page__header">
      <h1 class="page__title" id="page-title">{{ title }}</h1>
      {% if description %}
        <p class="page__description">{{ description }}</p>
      {% endif %}
    </header>
  {% endif %}
  
  <section class="page__content" role="region" aria-labelledby="page-title">
    {{ content | safe }}
  </section>
</article>
```

### 3.4 Create Header Component
Create `src/_includes/header.njk`:

```html
<header class="header" role="banner">
  <div class="header__container">
    <div class="header__brand">
      <a href="/" class="header__logo" aria-label="Home - {{ site.name }}">
        {{ site.name }}
      </a>
    </div>
    
    <nav class="navigation" role="navigation" aria-label="Main navigation">
      {% if navigation and navigation.length %}
        <ul class="navigation__list" role="list">
          {% for item in navigation %}
            <li class="navigation__item">
              <a href="{{ item.url }}" 
                 class="navigation__link{% if item.url == page.url %} navigation__link--current{% endif %}"
                 {% if item.url == page.url %}aria-current="page"{% endif %}
                 {% if item.external %}target="_blank" rel="noopener noreferrer" aria-describedby="external-link-desc"{% endif %}>
                {{ item.title }}
                {% if item.external %}
                  <span class="visually-hidden"> (opens in new window)</span>
                {% endif %}
              </a>
            </li>
          {% endfor %}
        </ul>
        <!-- Hidden description for screen readers -->
        <div id="external-link-desc" class="visually-hidden">External links open in a new window</div>
      {% endif %}
    </nav>
  </div>
</header>
```

### 3.5 Create Footer Component
Create `src/_includes/footer.njk`:

```html
<footer class="footer" role="contentinfo">
  <div class="footer__container">
    <section class="footer__content" role="region" aria-label="Site information">
      <p class="footer__text">
        <span class="footer__copyright">&copy; {{ site.buildTime | date('Y') }} {{ site.name }}</span>
        <span class="footer__credits">
          Built with 
          <a href="https://www.11ty.dev/" 
             class="footer__link" 
             target="_blank" 
             rel="noopener noreferrer"
             aria-describedby="external-link-desc">
            Eleventy
            <span class="visually-hidden"> (opens in new window)</span>
          </a>
        </span>
      </p>
    </section>
  </div>
</footer>
```

### 3.6 Create Placeholder Assets
Create essential placeholder files:

**Create `src/assets/css/main.css`** (temporary):
```css
/* Main stylesheet - will be expanded in Phase 5 */

/* Accessibility utilities */
.visually-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 1000;
  text-decoration: none;
  border-radius: 0 0 4px 4px;
}

.skip-link:focus {
  top: 0;
}

/* Base styles */
body {
  font-family: system-ui, -apple-system, sans-serif;
  line-height: 1.5;
  margin: 0;
  padding: 0;
}

.main {
  min-height: 60vh;
  padding: 2rem;
}

/* Focus styles for better keyboard navigation */
a:focus,
button:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
```

**Create placeholder favicon:**
```bash
# Create a simple placeholder (you can replace this later)
touch src/assets/images/favicon.ico
```

### 3.7 Accessibility Features Implemented

The templates include several accessibility improvements:

**Navigation & Structure:**
- `role="banner"`, `role="main"`, `role="contentinfo"` for landmark navigation
- `aria-label` attributes for clear navigation context
- `aria-current="page"` for current page indication
- `aria-labelledby` to connect content with headings

**Keyboard Navigation:**
- Skip link to main content (`#main-content`)
- Visible focus indicators with high contrast
- Logical tab order through semantic HTML

**Screen Reader Support:**
- `visually-hidden` class for screen reader only content
- Descriptive link text with context
- Proper heading hierarchy
- External link indicators

**Responsive & Robust:**
- Fallback content when data is missing
- Progressive enhancement ready
- Semantic HTML structure independent of styling

## 🔍 Validation Checklist
- [ ] Core directory structure created
- [ ] `src/_includes/` directory exists
- [ ] `src/assets/css/` directory created
- [ ] `src/assets/images/` directory created
- [ ] `src/pages/` directory created
- [ ] Base layout (`base.njk`) created with proper HTML5 structure
- [ ] Page layout (`page.njk`) created extending base layout
- [ ] Header component created with accessible navigation
- [ ] Footer component created with semantic site information
- [ ] Placeholder CSS file created with accessibility utilities
- [ ] Placeholder favicon file created
- [ ] Skip link implemented for keyboard navigation
- [ ] ARIA labels and roles properly applied
- [ ] Semantic HTML5 elements used throughout
- [ ] Focus indicators and keyboard navigation support added
- [ ] Screen reader support implemented
- [ ] Open Graph meta tags included

## 📝 Expected Output
After completing this phase:
- Complete directory structure following clean architecture
- Base HTML templates with semantic structure
- Component-based layout system
- Placeholder assets ready for expansion
- Ready for data and content setup in Phase 4

## 💡 Key Architecture Principles
- **Component-Based**: Header and footer as separate components
- **Layout Inheritance**: Page layout extends base layout
- **Semantic HTML**: Proper HTML5 structure with landmarks and sections
- **Accessibility-First**: WCAG 2.1 compliant with ARIA labels, roles, and keyboard navigation
- **BEM-Ready**: CSS classes following BEM methodology
- **Simple Structure**: Flat directory organization for easy navigation
- **Progressive Enhancement**: Works without JavaScript, enhanced with it
- **SEO-Friendly**: Proper meta tags and Open Graph support

## 🔗 Next Step
Proceed to [Phase 4: Data and Content Setup](./phase-4-data-and-content.md)

## 📊 Estimated Time
⏱️ **15-20 minutes**