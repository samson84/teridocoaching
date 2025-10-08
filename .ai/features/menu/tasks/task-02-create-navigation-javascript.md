# Task 02: Create Navigation JavaScript Module

## Objective
Create a JavaScript module to handle mobile navigation menu interactions with proper accessibility support.

## Files to Create
- `src/assets/js/navigation.js`

## Files to Modify
- `src/_includes/base.njk` (add script tag)

## Implementation Details

### JavaScript Module Features
Create ESM module with the following functionality:

1. **Toggle Menu**
   - Listen for click events on hamburger button
   - Toggle `.navigation--open` class on navigation element
   - Update `aria-expanded` attribute on button
   - Prevent event bubbling

2. **Close on Outside Click**
   - Listen for clicks outside navigation area
   - Close menu if it's open
   - Don't trigger if clicking the toggle button

3. **Close on Escape Key**
   - Listen for Escape key press
   - Close menu if it's open
   - Return focus to toggle button

4. **Focus Management**
   - Trap focus within menu when open on mobile
   - Return focus appropriately when closed

### Script Integration
Add script tag to `base.njk` before closing `</body>` tag:

```html
<script type="module" src="/assets/js/navigation.js"></script>
```

## Technical Requirements
- Use modern JavaScript (ES6+)
- Follow ESM module pattern
- No comments (self-documenting code)
- Type-safe selectors with null checks
- Clean event listener management

## Acceptance Criteria
- [ ] JavaScript module created
- [ ] Toggle functionality works
- [ ] Menu closes on outside click
- [ ] Menu closes on Escape key
- [ ] ARIA attributes update correctly
- [ ] Focus management implemented
- [ ] No console errors
- [ ] Script added to base template

## Notes
- Module should initialize on DOMContentLoaded
- Use event delegation where appropriate
- Clean up event listeners if needed
- Follow project's clean code principles
