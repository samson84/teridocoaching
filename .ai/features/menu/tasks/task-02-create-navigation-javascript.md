# Task 02: Update CSS for Checkbox Toggle Pattern

## Objective
Modify the navigation CSS to work with the CSS-only checkbox hack pattern instead of JavaScript-based toggle.

## Files to Modify
- `src/assets/css/components/navigation.css`

## Implementation Details

### 1. Hide Checkbox Input
Add styles to visually hide the checkbox while keeping it keyboard accessible:

```css
.navigation__checkbox {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
```

### 2. Update Mobile Menu Visibility
Replace `.navigation--open` class logic with checkbox `:checked` pseudo-class:

```css
/* Hide menu by default on mobile */
.navigation__list {
  display: none;
  /* ... existing styles ... */
}

/* Show menu when checkbox is checked */
.navigation__checkbox:checked ~ .navigation__list {
  display: block;
}
```

### 3. Animate Hamburger Icon
Add visual feedback when menu is open:

```css
.navigation__checkbox:checked ~ .navigation__toggle .navigation__hamburger {
  background-color: transparent;
}

.navigation__checkbox:checked ~ .navigation__toggle .navigation__hamburger::before {
  transform: rotate(45deg);
  top: 0;
}

.navigation__checkbox:checked ~ .navigation__toggle .navigation__hamburger::after {
  transform: rotate(-45deg);
  bottom: 0;
}
```

### 4. Ensure Focus Indicators
Add visible focus state for keyboard navigation:

```css
.navigation__checkbox:focus ~ .navigation__toggle {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### 5. Desktop Styles Remain Unchanged
The desktop media query should keep menu always visible:

```css
@media (min-width: 768px) {
  .navigation__checkbox,
  .navigation__toggle {
    display: none;
  }
  
  .navigation__list {
    display: flex;
    /* ... existing desktop styles ... */
  }
}
```

## Acceptance Criteria
- [ ] Checkbox visually hidden but accessible
- [ ] Menu shows/hides based on checkbox state
- [ ] Hamburger animates to X when checked
- [ ] Focus indicator visible on keyboard navigation
- [ ] Desktop view unaffected (checkbox/label hidden)
- [ ] Smooth transitions in place
- [ ] No `.navigation--open` class dependencies

## Notes
- Use `~` (general sibling combinator) to target elements after checkbox
- Checkbox must come before elements it controls in DOM
- No JavaScript means no `.navigation--open` class needed
- Browser handles checkbox state automatically
- Works with JavaScript disabled
