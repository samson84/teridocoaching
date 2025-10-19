# Task 06: Fix Hamburger Menu Position - Align to Right

## Objective
Move the hamburger menu toggle from the center to the right side of the header on mobile devices (< 768px).

## Current Problem

### Issue Description
The hamburger menu is currently displaying in the middle of the header instead of on the right side.

### Root Cause Analysis

Looking at the HTML structure in `header.njk`:

```html
<header class="header" role="banner">
  <div class="header__container">
    <div class="header__brand">
      <a href="/" class="header__logo">...</a>
    </div>
    
    <input type="checkbox" id="navigation-toggle" class="navigation__checkbox">
    <label for="navigation-toggle" class="navigation__toggle">...</label>
    
    <nav class="navigation" role="navigation">
      <ul class="navigation__list">...</ul>
    </nav>
  </div>
</header>
```

And the CSS in `layouts/header.css`:

```css
.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Brand left, last item right */
  min-height: 4rem;
}
```

**The Problem:**
- `.header__container` has 3 children: `.header__brand`, checkbox+label, and `.navigation`
- `justify-content: space-between` distributes them evenly: **brand left**, **toggle middle**, **nav right**
- The checkbox and label are separate elements in the DOM, not wrapped together
- The checkbox is positioned `absolute` with `opacity: 0`, so it doesn't affect layout
- The label (`.navigation__toggle`) is in the normal flow and gets positioned in the middle

**Visual Layout:**
```
[Logo]        [Hamburger]        [Nav]
 ^                  ^               ^
 brand             toggle       navigation
(left)           (middle)        (right)
```

**Expected Layout:**
```
[Logo]                    [Hamburger] [Nav]
 ^                              ^        ^
brand                         toggle  navigation
(left)                              (right)
```

## Solution Options

### Option 1: Wrap Toggle and Nav Together (RECOMMENDED) ✅

**Approach:** Wrap the checkbox, label, and nav in a container div.

**HTML Change:**
```html
<div class="header__brand">...</div>

<div class="header__nav-wrapper">
  <input type="checkbox" id="navigation-toggle" class="navigation__checkbox">
  <label for="navigation-toggle" class="navigation__toggle">...</label>
  <nav class="navigation">...</nav>
</div>
```

**CSS Change:**
```css
.header__nav-wrapper {
  display: flex;
  align-items: center;
  gap: var(--space-sm); /* Optional spacing between toggle and nav */
}
```

**Result:**
- `.header__container` now has 2 children: brand and nav-wrapper
- `justify-content: space-between` puts brand on left, nav-wrapper on right
- Inside nav-wrapper, toggle and nav are side-by-side

**Pros:**
- Clean semantic grouping
- Minimal CSS changes
- Works perfectly with `justify-content: space-between`
- Easy to add spacing between toggle and nav
- No absolute positioning tricks

**Cons:**
- Requires HTML change (adds wrapper div)
- Slightly less "flat" DOM structure

### Option 2: Use margin-left: auto on Toggle

**Approach:** Push the toggle to the right using auto margin.

**CSS Change:**
```css
.navigation__toggle {
  margin-left: auto; /* Push to the right */
  margin-right: var(--space-sm); /* Space before nav */
}
```

**Result:**
- Toggle pushes itself to the right
- Nav remains on the right side
- Both toggle and nav are on the right

**Pros:**
- No HTML changes required
- Simple CSS-only fix
- Leverages flexbox auto margins

**Cons:**
- Less explicit than wrapping
- Need to manage spacing manually
- Toggle and nav might not group visually as well

### Option 3: Absolute Position Toggle (NOT RECOMMENDED) ❌

**Approach:** Position toggle absolutely to the right.

**CSS Change:**
```css
.navigation__toggle {
  position: absolute;
  right: var(--space-md);
  top: 50%;
  transform: translateY(-50%);
}
```

**Pros:**
- Works without HTML changes
- Explicit positioning

**Cons:**
- Removes toggle from document flow
- Breaks accessibility of natural tab order
- Hard to maintain responsive spacing
- Conflicts with sticky header
- Not recommended for interactive elements

### Option 4: Change Flexbox Order (NOT IDEAL) ⚠️

**Approach:** Use `order` property to rearrange items.

**CSS Change:**
```css
.header__brand {
  order: 1;
}

.navigation__toggle {
  order: 3;
}

.navigation {
  order: 2;
}
```

**Pros:**
- No HTML changes

**Cons:**
- Confusing visual order vs DOM order
- Breaks logical tab order for keyboard users
- Accessibility issue (visual order ≠ tab order)
- Not WCAG compliant

## Recommended Solution: Option 1 (Wrapper Approach)

### Implementation Steps

1. **Update HTML** (`src/_includes/header.njk`)
   - Wrap checkbox, label, and nav in `<div class="header__nav-wrapper">`
   - Maintain all existing attributes and classes

2. **Add CSS** (`src/assets/css/layouts/header.css`)
   - Add `.header__nav-wrapper` flex container
   - Add optional gap for spacing

3. **Test Responsive Behavior**
   - Verify mobile: brand left, toggle+nav on right
   - Verify desktop: brand left, nav on right (toggle hidden)

4. **Test Accessibility**
   - Verify tab order: logo → toggle → nav links
   - Verify keyboard navigation still works
   - Verify focus indicators visible

### Code Changes

#### File 1: `src/_includes/header.njk`

**Before:**
```njk
<div class="header__brand">
  <a href="/" class="header__logo" aria-label="Home - {{ site.name }}">
    {{ site.name }}
  </a>
</div>

<input type="checkbox" 
       id="navigation-toggle" 
       class="navigation__checkbox"
       aria-label="Toggle navigation menu">
<label for="navigation-toggle" 
       class="navigation__toggle">
  <span class="navigation__hamburger"></span>
  <span class="visually-hidden">Toggle navigation menu</span>
</label>

<nav class="navigation" role="navigation" aria-label="Main navigation">
  <!-- ... -->
</nav>
```

**After:**
```njk
<div class="header__brand">
  <a href="/" class="header__logo" aria-label="Home - {{ site.name }}">
    {{ site.name }}
  </a>
</div>

<div class="header__nav-wrapper">
  <input type="checkbox" 
         id="navigation-toggle" 
         class="navigation__checkbox"
         aria-label="Toggle navigation menu">
  <label for="navigation-toggle" 
         class="navigation__toggle">
    <span class="navigation__hamburger"></span>
    <span class="visually-hidden">Toggle navigation menu</span>
  </label>
  
  <nav class="navigation" role="navigation" aria-label="Main navigation">
    <!-- ... -->
  </nav>
</div>
```

#### File 2: `src/assets/css/layouts/header.css`

**Add after `.header__brand`:**
```css
.header__nav-wrapper {
  display: flex;
  align-items: center;
  gap: var(--space-sm); /* 8px spacing between toggle and nav on desktop */
}
```

**Optional Enhancement:**
```css
@media (max-width: 767px) {
  .header__nav-wrapper {
    gap: 0; /* Remove gap on mobile since nav is dropdown */
  }
}
```

### Expected Result

#### Mobile (< 768px)
```
┌─────────────────────────────────────┐
│ Logo                     [≡]        │
│                                     │
│                     ┌──────────┐    │
│                     │ Home     │    │
│                     │ About    │    │
│                     │ Services │    │
│                     │ Contact  │    │
│                     └──────────┘    │
└─────────────────────────────────────┘
```

- Logo on left
- Hamburger on right
- Nav dropdown appears below hamburger

#### Desktop (≥ 768px)
```
┌─────────────────────────────────────────────────┐
│ Logo              Home About Services Contact   │
└─────────────────────────────────────────────────┘
```

- Logo on left
- Nav items on right (horizontal)
- Hamburger hidden

## Alternative: Quick CSS-Only Fix (Option 2)

If HTML changes are not desired, use the margin approach:

**File:** `src/assets/css/components/navigation.css`

Add before the media query:
```css
/* Mobile: Push toggle to the right */
@media (max-width: 767px) {
  .navigation__toggle {
    margin-left: auto;
  }
  
  .navigation {
    /* Navigation is absolute positioned on mobile, so won't affect layout */
  }
}
```

**Note:** This is less clean than the wrapper approach but works without HTML changes.

## Testing Checklist

After implementation:

- [ ] Build project (`npm run build`)
- [ ] Start dev server (`npm run dev`)
- [ ] Visual test: Hamburger on right side (mobile)
- [ ] Visual test: Logo on left, hamburger on right
- [ ] Visual test: Nav dropdown appears correctly
- [ ] Visual test: Desktop nav still on right
- [ ] Keyboard test: Tab order is logo → toggle → nav links
- [ ] Accessibility test: Focus indicators visible
- [ ] Accessibility test: Screen reader announces correctly
- [ ] Browser test: Works in Chrome, Firefox, Safari
- [ ] Responsive test: Works at all breakpoints

## Success Criteria

1. ✅ Hamburger menu aligned to right edge on mobile (< 768px)
2. ✅ Logo remains on left edge
3. ✅ Nav dropdown still appears correctly when toggled
4. ✅ Desktop layout unchanged (nav on right, toggle hidden)
5. ✅ Tab order remains logical (logo → toggle → nav)
6. ✅ No visual regressions
7. ✅ All accessibility features maintained
8. ✅ Clean, maintainable code

## Acceptance Criteria

- Hamburger menu appears on the right side of the header on mobile
- Spacing between logo and hamburger is appropriate
- Toggle and nav are visually grouped on the right
- No breaking changes to existing functionality
- All previous tests still pass

## Estimated Time

- **Option 1 (Wrapper):** 10 minutes
- **Option 2 (CSS margin):** 5 minutes

## Dependencies

- Existing header template (`src/_includes/header.njk`)
- Existing header CSS (`src/assets/css/layouts/header.css`)
- Existing navigation CSS (`src/assets/css/components/navigation.css`)

## Notes

- The wrapper approach (Option 1) is recommended for better semantic structure
- The CSS-only approach (Option 2) works but is less explicit
- Avoid absolute positioning (Option 3) and flex order (Option 4) for accessibility reasons
- After implementation, update test-results.md with new findings

## References

- Flexbox `justify-content: space-between` behavior
- CSS auto margins in flexbox
- WCAG 2.1 Success Criterion 1.3.2 (Meaningful Sequence)
- Current implementation: `.ai/features/menu/tasks/test-results.md`
