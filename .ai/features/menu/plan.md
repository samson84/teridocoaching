# Menu Implementation Plan

## Overview
Implement a responsive navigation menu in the header based on navigation data from `navigation.ts`. The menu should display navigation items on the right side of the header with proper responsive behavior for mobile and desktop views.

## Current State
- Navigation data structure exists in `src/_data/navigation.ts`
- Header component exists in `src/_includes/header.njk` with basic navigation markup
- Navigation CSS exists in `src/assets/css/components/navigation.css` with responsive styles
- Desktop layout uses flexbox with `justify-content: space-between` to position menu on the right

## Required Changes

### 1. Add Mobile Hamburger Toggle
The navigation CSS includes styles for a hamburger menu toggle (`.navigation__toggle`, `.navigation__hamburger`), but the HTML structure is missing from the header component.

**Required:** Add hamburger button markup to `header.njk` for mobile navigation control.

### 2. Add JavaScript for Mobile Menu Interaction
The CSS has `.navigation--open` state for showing mobile menu, but there's no JavaScript to toggle this state.

**Required:** Create JavaScript module to handle:
- Hamburger button click to toggle menu visibility
- Close menu when clicking outside
- Close menu when pressing Escape key
- Proper ARIA attributes for accessibility

### 3. Verify Navigation Data Flow
The navigation data from `navigation.ts` should be properly passed to the header template.

**Required:** Verify that the navigation data is accessible in the header template context.

### 4. Enhance Accessibility
Ensure the navigation meets WCAG 2.1 AA standards as per project requirements.

**Required:**
- ARIA attributes for mobile menu (aria-expanded, aria-controls, aria-label)
- Keyboard navigation support
- Focus management when opening/closing mobile menu
- Screen reader announcements

### 5. Visual Verification
Test the implementation across different viewport sizes.

**Required:**
- Mobile view: Hamburger menu appears, menu hidden by default
- Tablet/Desktop view: Horizontal menu on the right, always visible
- Active page indicator shows current page
- Hover states work correctly

## Technical Considerations

### TypeScript/JavaScript
- Create ESM module for navigation interactivity
- Follow project's clean code principles (no comments, self-documenting code)
- Type-safe implementation

### CSS
- BEM methodology already in use
- Responsive breakpoint at 768px
- CSS custom properties for theming

### Accessibility
- Semantic HTML5 elements (`<nav>`, `<ul>`, `<li>`)
- ARIA roles and states
- Keyboard navigation
- Focus indicators
- Screen reader compatibility

## Success Criteria
1. ✓ Navigation items display on the right side of header
2. ✓ Mobile view shows hamburger menu
3. ✓ Desktop view shows horizontal navigation
4. ✓ Current page is highlighted
5. ✓ Menu is keyboard accessible
6. ✓ Menu works with screen readers
7. ✓ JavaScript is clean and follows project standards
8. ✓ No console errors or warnings

## Dependencies
- Existing navigation data in `src/_data/navigation.ts`
- Existing CSS in `src/assets/css/components/navigation.css`
- Existing header template in `src/_includes/header.njk`
- 11ty build system configuration

## Timeline Estimate
- Task 1: Add mobile toggle HTML - 5 minutes
- Task 2: Create navigation JavaScript - 15 minutes
- Task 3: Verify data flow - 5 minutes
- Task 4: Enhance accessibility - 10 minutes
- Task 5: Test and verify - 10 minutes

**Total: ~45 minutes**
