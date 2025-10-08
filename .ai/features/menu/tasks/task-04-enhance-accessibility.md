# Task 04: Enhance Navigation Accessibility

## Objective
Ensure the navigation menu meets WCAG 2.1 AA accessibility standards as required by the project.

## Accessibility Requirements

### 1. ARIA Attributes
- [ ] `aria-expanded` on toggle button (true/false)
- [ ] `aria-controls` links button to menu
- [ ] `aria-label` on toggle button
- [ ] `aria-current="page"` on current page link
- [ ] `role="navigation"` on nav element
- [ ] `role="list"` on ul element (if list semantics lost)

### 2. Keyboard Navigation
- [ ] Tab navigates through menu items
- [ ] Enter/Space activates toggle button
- [ ] Escape closes mobile menu
- [ ] Focus visible on all interactive elements
- [ ] Logical tab order maintained

### 3. Focus Management
- [ ] Focus trapped in mobile menu when open
- [ ] Focus returns to toggle when menu closes
- [ ] Focus indicator clearly visible
- [ ] No keyboard traps

### 4. Screen Reader Support
- [ ] Navigation landmark identified
- [ ] Menu state announced (expanded/collapsed)
- [ ] Current page announced
- [ ] Link purposes clear from context
- [ ] External links indicated

### 5. Visual Accessibility
- [ ] Sufficient color contrast (4.5:1 for text)
- [ ] Focus indicators visible
- [ ] Active/hover states distinguishable
- [ ] Text remains readable when zoomed to 200%

## Files to Review
- `src/_includes/header.njk`
- `src/assets/js/navigation.js`
- `src/assets/css/components/navigation.css`

## Testing Methods

### Manual Testing
1. Navigate with keyboard only
2. Test with screen reader (NVDA, JAWS, or VoiceOver)
3. Zoom to 200% and verify usability
4. Test in high contrast mode

### Automated Testing
- Run accessibility audit in browser DevTools
- Validate HTML (W3C validator)
- Check color contrast ratios

## Acceptance Criteria
- [ ] All ARIA attributes present and correct
- [ ] Keyboard navigation fully functional
- [ ] Focus management works properly
- [ ] Screen reader announces correctly
- [ ] No accessibility violations in audit
- [ ] Meets WCAG 2.1 AA standards

## Notes
- Project requires WCAG 2.1 AA compliance
- Semantic HTML already in use (good foundation)
- CSS variables should ensure contrast if used correctly
- Test with actual assistive technologies, not just audits
