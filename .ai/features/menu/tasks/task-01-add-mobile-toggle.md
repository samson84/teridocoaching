# Task 01: Add Mobile Hamburger Toggle HTML

## Objective
Add the hamburger menu button markup to the header template for mobile navigation control.

## Files to Modify
- `src/_includes/header.njk`

## Implementation Details

### Add Toggle Button
Insert hamburger button before the `<nav>` element inside the header container:

```html
<button class="navigation__toggle" 
        aria-expanded="false" 
        aria-controls="navigation-menu" 
        aria-label="Toggle navigation menu">
  <span class="navigation__hamburger"></span>
</button>
```

### Update Navigation Element
Add `id` to the navigation element for ARIA relationship:

```html
<nav class="navigation" 
     id="navigation-menu" 
     role="navigation" 
     aria-label="Main navigation">
```

## Acceptance Criteria
- [ ] Hamburger button added to header
- [ ] Button has proper ARIA attributes
- [ ] Navigation has matching `id` attribute
- [ ] Button includes screen reader label
- [ ] HTML validates correctly

## Notes
- The CSS for `.navigation__toggle` and `.navigation__hamburger` already exists
- Button should be inside `.header__container` but before `<nav>`
- Follow BEM naming convention
