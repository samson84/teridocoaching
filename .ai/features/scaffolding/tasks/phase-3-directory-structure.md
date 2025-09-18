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
├── _includes/
│   ├── layouts/              # Page layouts
│   └── components/           # Reusable components
├── assets/
│   ├── css/
│   ├── js/
│   └── images/              # Static images
└── pages/                   # Content pages
```

### 3.2 Create Base Layout Template
Create `src/_includes/layouts/base.njk`:

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
</head>
<body>
  {% include "components/header.njk" %}
  
  <main class="main">
    {{ content | safe }}
  </main>
  
  {% include "components/footer.njk" %}
  
  <!-- JavaScript -->
  <script type="module" src="/assets/js/main.js"></script>
</body>
</html>
```

### 3.3 Create Page Layout Template
Create `src/_includes/layouts/page.njk`:

```html
---
layout: layouts/base.njk
---
<article class="page">
  {% if title %}
    <header class="page__header">
      <h1 class="page__title">{{ title }}</h1>
    </header>
  {% endif %}
  
  <div class="page__content">
    {{ content | safe }}
  </div>
</article>
```

### 3.4 Create Header Component
Create `src/_includes/components/header.njk`:

```html
<header class="header">
  <div class="header__container">
    <div class="header__brand">
      <a href="/" class="header__logo">
        {{ site.name }}
      </a>
    </div>
    
    <nav class="navigation" data-navigation>
      <button class="navigation__toggle" data-mobile-toggle aria-label="Toggle navigation" aria-expanded="false">
        <span class="navigation__hamburger"></span>
      </button>
      
      <ul class="navigation__list">
        {% for item in navigation %}
          <li class="navigation__item">
            <a href="{{ item.url }}" class="navigation__link"
               {% if item.external %}target="_blank" rel="noopener noreferrer"{% endif %}>
              {{ item.title }}
            </a>
          </li>
        {% endfor %}
      </ul>
    </nav>
  </div>
</header>
```

### 3.5 Create Footer Component
Create `src/_includes/components/footer.njk`:

```html
<footer class="footer">
  <div class="footer__container">
    <div class="footer__content">
      <p class="footer__text">
        &copy; {{ site.buildTime | date('Y') }} {{ site.name }}. Built with 
        <a href="https://www.11ty.dev/" class="footer__link" target="_blank" rel="noopener noreferrer">Eleventy</a>
        and <a href="https://www.typescriptlang.org/" class="footer__link" target="_blank" rel="noopener noreferrer">TypeScript</a>.
      </p>
    </div>
  </div>
</footer>
```

### 3.6 Create Placeholder Assets
Create essential placeholder files:

**Create `src/assets/css/main.css`** (temporary):
```css
/* Main stylesheet - will be expanded in Phase 5 */
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
```

**Create `src/assets/js/main.js`** (temporary):
```javascript
// Main JavaScript entry - will be expanded in Phase 6
console.log('Site initialized! 🚀');
```

**Create placeholder favicon:**
```bash
# Create a simple placeholder (you can replace this later)
touch src/assets/images/favicon.ico
```

## 🔍 Validation Checklist
- [ ] Core directory structure created
- [ ] `src/_includes/layouts/` directory exists
- [ ] `src/_includes/components/` directory exists
- [ ] `src/assets/css/` with subdirectories created
- [ ] `src/assets/js/modules/` directory created
- [ ] `src/assets/images/` directory created
- [ ] `src/pages/` directory created
- [ ] `config/` directory created
- [ ] Base layout (`base.njk`) created with proper HTML5 structure
- [ ] Page layout (`page.njk`) created extending base layout
- [ ] Header component created with navigation structure
- [ ] Footer component created with site information
- [ ] Placeholder CSS file created
- [ ] Placeholder JavaScript file created
- [ ] Placeholder favicon file created

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
- **Semantic HTML**: Proper HTML5 structure throughout
- **BEM-Ready**: CSS classes following BEM methodology
- **Accessibility**: ARIA labels and semantic elements
- **Performance**: Optimized asset loading

## 🔗 Next Step
Proceed to [Phase 4: Data and Content Setup](./phase-4-data-and-content.md)

## 📊 Estimated Time
⏱️ **15-20 minutes**