# Task 04: Enhance Navigation Accessibility

## Objective
Ensure the navigation menu meets WCAG 2.1 AA accessibility standards as required by the project.

## Accessibility Requirements (CSS-Only Approach)

### 1. ARIA Attributes (Simplified)
- [ ] `aria-label` on checkbox input
- [ ] `aria-current="page"` on current page link
- [ ] `role="navigation"` on nav element
- [ ] Screen reader text in label element
- [ ] No dynamic ARIA states needed (native checkbox behavior)

### 2. Keyboard Navigation (Native Support)
- [ ] Tab navigates to checkbox toggle
- [ ] Space toggles checkbox (native behavior)
- [ ] Tab continues to menu items when open
- [ ] Focus visible on checkbox (via label)
- [ ] Logical tab order maintained
- [ ] No Escape key support (limitation of CSS-only)

### 3. Focus Management (Browser Native)
- [ ] Browser handles checkbox focus
- [ ] Focus indicator visible on label
- [ ] Focus moves naturally through menu items
- [ ] No focus traps
- [ ] Tab order remains logical

### 4. Screen Reader Support
- [ ] Navigation landmark identified
- [ ] Checkbox state announced (checked/unchecked)
- [ ] Label text announced ("Toggle navigation menu")
- [ ] Current page announced
- [ ] Link purposes clear from context
- [ ] External links indicated

### 5. Visual Accessibility
- [ ] Sufficient color contrast (4.5:1 for text)
- [ ] Focus indicators visible
- [ ] Active/hover states distinguishable
- [ ] Text remains readable when zoomed to 200%
- [ ] Checkbox focus visible via label outline

## Files to Review
- `src/_includes/header.njk`
- `src/assets/css/components/navigation.css`
- `src/assets/css/base/typography.css` (for .visually-hidden)

## Testing Methods

### Manual Testing
1. Navigate with keyboard only (Tab, Space)
2. Test with screen reader (NVDA, JAWS, or VoiceOver)
3. Zoom to 200% and verify usability
4. Test in high contrast mode
5. Disable JavaScript and verify functionality

### Automated Testing
- Run accessibility audit in browser DevTools
- Validate HTML (W3C validator)
- Check color contrast ratios

## Acceptance Criteria
- [ ] Minimal ARIA attributes (native checkbox semantics)
- [ ] Keyboard navigation fully functional
- [ ] Browser handles focus management
- [ ] Screen reader announces checkbox state
- [ ] No accessibility violations in audit
- [ ] Meets WCAG 2.1 AA standards
- [ ] Works with JavaScript disabled

## Notes
- Project requires WCAG 2.1 AA compliance
- Native checkbox provides built-in accessibility
- CSS-only approach is progressively enhanced
- Less ARIA needed than JavaScript approach
- Test with actual assistive technologies, not just audits
- Limitation: No Escape key to close (acceptable trade-off)
