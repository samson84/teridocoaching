# Navigation Menu - Quick Reference

## Implementation Overview

**Type:** CSS-Only Responsive Navigation  
**Pattern:** Checkbox Hack (Mobile Toggle)  
**Accessibility:** WCAG 2.1 AA Compliant  
**JavaScript:** None Required  

---

## File Structure

```
src/
├── _data/
│   └── navigation.js          # Navigation data source
├── _includes/
│   └── header.njk             # Header template with nav
└── assets/css/
    ├── base/
    │   ├── reset.css          # Includes .visually-hidden
    │   └── variables.css      # CSS custom properties
    ├── layouts/
    │   └── header.css         # Header layout (flexbox)
    └── components/
        └── navigation.css     # Navigation styles
```

---

## Key Features

### ✅ Mobile (< 768px)
- Hamburger menu (3 horizontal lines)
- Dropdown menu (hidden by default)
- Click to open/close
- Animates to X when open
- Positioned right, below header

### ✅ Desktop (≥ 768px)
- Horizontal navigation
- Always visible
- Aligned to right
- No hamburger icon
- Hover effects

### ✅ Accessibility
- Keyboard accessible (Tab + Space)
- Screen reader friendly (ARIA labels)
- Focus indicators (2px blue outline)
- Semantic HTML (nav, ul, li, a)
- Current page indicator

---

## How It Works

### HTML Structure
```html
<input type="checkbox" id="navigation-toggle" class="navigation__checkbox">
<label for="navigation-toggle" class="navigation__toggle">
  <span class="navigation__hamburger"></span>
</label>
<nav class="navigation">
  <ul class="navigation__list">
    <!-- Navigation items -->
  </ul>
</nav>
```

### CSS Magic
```css
/* Hide menu by default (mobile) */
.navigation__list {
  display: none;
}

/* Show menu when checkbox is checked */
.navigation__checkbox:checked ~ .navigation .navigation__list {
  display: block;
}

/* Always show on desktop */
@media (min-width: 768px) {
  .navigation__list {
    display: flex;
  }
}
```

---

## Adding/Removing Menu Items

Edit `src/_data/navigation.js`:

```javascript
export default [
  { title: 'Home', url: '/' },
  { title: 'About', url: '/about/' },
  // Add more items here
];
```

No other changes needed! Template automatically renders all items.

---

## Customization

### Change Breakpoint
Edit `navigation.css`:
```css
@media (min-width: 768px) { /* Change 768px to your preferred breakpoint */
```

### Change Colors
Edit `base/variables.css`:
```css
:root {
  --color-primary: #2563eb;  /* Link color, hover, active */
  --color-text: #1f2937;     /* Default text and hamburger */
}
```

### Change Spacing
Edit `base/variables.css`:
```css
:root {
  --space-md: 1rem;  /* Space between nav items */
}
```

### Change Hamburger Size
Edit `navigation.css`:
```css
.navigation__toggle {
  width: 2.5rem;   /* Button size */
  height: 2.5rem;
}

.navigation__hamburger {
  width: 1.5rem;   /* Hamburger line width */
}
```

---

## Keyboard Controls

| Key | Action |
|-----|--------|
| Tab | Focus next element |
| Shift+Tab | Focus previous element |
| Space | Toggle menu (open/close) |
| Enter | Activate focused link |

---

## Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Modern | ✅ Full support |
| Firefox | Modern | ✅ Full support |
| Safari | Modern | ✅ Full support |
| Edge | Modern | ✅ Full support |
| iOS Safari | 10+ | ✅ Full support |
| Chrome Mobile | Modern | ✅ Full support |
| IE11 | 11 | ⚠️ Works (no CSS variables) |

---

## Troubleshooting

### Menu doesn't toggle
1. Check checkbox `id` matches label `for` attribute
2. Verify CSS selector uses `~` (sibling combinator)
3. Ensure checkbox is before label and nav in HTML

### Focus not visible
1. Check `--color-primary` is defined in variables.css
2. Verify outline is not disabled globally
3. Test with keyboard (Tab key)

### Menu not responsive
1. Check `@media (min-width: 768px)` exists in navigation.css
2. Verify viewport meta tag in `<head>`
3. Clear browser cache

### Current page not highlighted
1. Check `page.url` is available in template context
2. Verify URL format matches (trailing slash)
3. Inspect generated HTML for `navigation__link--current` class

---

## Performance Notes

- **Zero JavaScript**: Entire navigation is CSS-only
- **Instant Interaction**: No JS parsing delay
- **Small Footprint**: Minimal CSS overhead
- **GPU Accelerated**: Smooth transforms and transitions
- **No Layout Shift**: Navigation in normal document flow

---

## Testing Checklist

- [ ] Test on mobile device (< 768px)
- [ ] Test on desktop (≥ 768px)
- [ ] Test keyboard navigation (Tab + Space)
- [ ] Test with screen reader
- [ ] Test current page indicator
- [ ] Test hover states
- [ ] Verify no console errors
- [ ] Run accessibility audit (Lighthouse)

---

## Common Tasks

### Change Menu Position (Mobile)
Edit `navigation.css`:
```css
.navigation__list {
  right: 0;  /* Change to left: 0 for left-aligned */
}
```

### Add Dropdown Submenu
This requires additional HTML and CSS. Consider:
1. Nested `<ul>` in navigation.js data structure
2. Additional checkbox for each submenu
3. More complex CSS for nested dropdowns

**Note:** Complex dropdowns may benefit from JavaScript for better UX.

### Add External Link Icon
Edit `navigation.js`:
```javascript
{ title: 'Blog', url: 'https://example.com', external: true }
```

Template already handles this with screen reader text.

---

## Resources

- **Test Results:** `.ai/features/menu/tasks/test-results.md`
- **Implementation Plan:** `.ai/features/menu/plan.md`
- **Task Details:** `.ai/features/menu/tasks/task-05-test-and-verify.md`

---

**Last Updated:** October 19, 2025  
**Version:** 1.0.0  
**Status:** Production Ready ✅
