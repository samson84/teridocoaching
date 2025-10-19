# Task 01: Add CSS-Only Mobile Hamburger Toggle HTML

## Objective
Add the hamburger menu toggle markup to the header template using the CSS-only checkbox hack pattern (no JavaScript required).

## Files to Modify
- `src/_includes/header.njk`

## Implementation Details

### Add Checkbox and Label
Insert checkbox and label before the `<nav>` element inside the header container:

```html
<input type="checkbox" 
       id="navigation-toggle" 
       class="navigation__checkbox"
       aria-label="Toggle navigation menu">
<label for="navigation-toggle" 
       class="navigation__toggle">
  <span class="navigation__hamburger"></span>
  <span class="visually-hidden">Toggle navigation menu</span>
</label>
```

### Structure Order
The order should be:
1. Hidden checkbox input
2. Label (styled as hamburger button)
3. Navigation element

This allows CSS to target the nav element using sibling selectors when checkbox is checked.

## Acceptance Criteria
- [ ] Checkbox input added with unique ID
- [ ] Label linked to checkbox via `for` attribute
- [ ] Label includes screen reader text
- [ ] Checkbox has accessible label
- [ ] HTML validates correctly
- [ ] Elements in correct order for CSS targeting

## Notes
- Checkbox will be visually hidden with CSS but remain keyboard accessible
- Label acts as the clickable hamburger button
- No JavaScript needed - checkbox `:checked` state controls menu visibility
- Follow BEM naming convention
- The `visually-hidden` class should hide text but keep it accessible to screen readers
