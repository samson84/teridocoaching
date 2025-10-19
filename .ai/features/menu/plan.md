# Menu Implementation Plan

## Overview
Implement a responsive navigation menu in the header based on navigation data from `navigation.ts`. The menu should display navigation items on the right side of the header with proper responsive behavior for mobile and desktop views.

## Current State
- Navigation data structure exists in `src/_data/navigation.ts`
- Header component exists in `src/_includes/header.njk` with basic navigation markup
- Navigation CSS exists in `src/assets/css/components/navigation.css` with responsive styles
- Desktop layout uses flexbox with `justify-content: space-between` to position menu on the right

## Required Changes

### 1. Add CSS-Only Mobile Hamburger Toggle
The navigation CSS includes styles for a hamburger menu toggle, but needs modification to work without JavaScript using the checkbox hack pattern.

**Required:** 
- Add hidden checkbox input to `header.njk` for toggle state
- Add label element styled as hamburger button
- Update CSS to use `:checked` pseudo-class for menu visibility

**Benefits of CSS-Only Approach:**
- No JavaScript dependencies
- Works even if JavaScript is disabled
- Simpler implementation
- Better for progressive enhancement
- No client-side event listeners or state management

### 2. Verify Navigation Data Flow
The navigation data from `navigation.ts` should be properly passed to the header template.

**Required:** Verify that the navigation data is accessible in the header template context.

### 3. Enhance Accessibility
Ensure the navigation meets WCAG 2.1 AA standards as per project requirements.

**Required:**
- ARIA label on checkbox input for screen readers
- Keyboard navigation support (checkboxes are keyboard accessible by default)
- Proper semantic HTML structure
- Focus indicators on interactive elements
- Screen reader compatible labels

**Note:** CSS-only approach has inherent accessibility benefits:
- Checkbox is natively keyboard accessible (Space to toggle)
- Focus management handled by browser
- No ARIA state management needed

### 4. Visual Verification
Test the implementation across different viewport sizes.

**Required:**
- Mobile view: Hamburger menu appears, menu hidden by default
- Tablet/Desktop view: Horizontal menu on the right, always visible
- Active page indicator shows current page
- Hover states work correctly

## Technical Considerations

### HTML Structure (Checkbox Hack)
- Hidden checkbox input controls menu state
- Label element acts as the hamburger button
- CSS targets checkbox `:checked` state
- No JavaScript required

### CSS
- BEM methodology already in use
- Responsive breakpoint at 768px
- CSS custom properties for theming
- Use `:checked` pseudo-class for toggle state
- Adjacent sibling combinator (`+`) or general sibling (`~`) to target menu

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
5. ✓ Menu is keyboard accessible (Space/Enter toggles)
6. ✓ Menu works with screen readers
7. ✓ No JavaScript dependencies
8. ✓ Works with JavaScript disabled
9. ✓ Clean CSS-only implementation

## Dependencies
- Existing navigation data in `src/_data/navigation.ts`
- Existing CSS in `src/assets/css/components/navigation.css`
- Existing header template in `src/_includes/header.njk`
- 11ty build system configuration

## Timeline Estimate
- Task 1: Add CSS-only mobile toggle HTML - 10 minutes
- Task 2: Update CSS for checkbox pattern - 10 minutes
- Task 3: Verify data flow - 5 minutes
- Task 4: Enhance accessibility - 5 minutes
- Task 5: Test and verify - 10 minutes

**Total: ~40 minutes** (Faster than JavaScript approach!)
