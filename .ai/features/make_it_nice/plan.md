# Make It Nice - Implementation Plan

## Overview
Transform the Téridő Coaching website from its current black-and-white style to a welcoming, space-themed design that reflects the brand's core concepts: space (tér), time (idő), and balanced mental wellbeing.

## Brand Identity Analysis

### Color Palette (from reference images)
- **Primary Background**: Warm beige/cream (#F5EFE7) - welcoming, calm
- **Primary Blue**: Dusty slate blue (#7A9AA3) - space, tranquility, depth
- **Secondary Purple**: Soft lavender (#B5A3C7) - cosmic, spiritual, introspection
- **Accent Coral/Pink**: Warm pink (#E8B4A1) - human warmth, connection
- **Accent Gold/Star**: Subtle gold (#D4AF37) - stars, highlights, achievement
- **Text Dark**: Deep charcoal (#2C3E50) - readable, professional
- **Text Light**: Soft gray (#6B7786) - secondary content

### Design Principles
1. **Spacetime Theme**: Cosmic, astronomical references (spirals, stars, orbits)
2. **Warmth & Calm**: Soft colors, gentle gradients, breathing room
3. **Balance**: Mental wellbeing reflected in visual harmony
4. **Accessibility**: Maintain WCAG 2.1 AA compliance

## Implementation Phases

1. [Color System Update](./tasks/01-color-system.md) - `src/assets/css/base/variables.css`
2. [Typography Enhancements](./tasks/02-typography.md) - `src/assets/css/base/typography.css`
3. [Header Styling](./tasks/03-header.md) - `src/assets/css/layouts/header.css`
4. [Page Content Styling](./tasks/04-page-content.md) - `src/assets/css/components/page.css`
5. [Navigation Styling](./tasks/05-navigation.md) - `src/assets/css/components/navigation.css`
6. [Footer Styling](./tasks/06-footer.md) - `src/assets/css/layouts/footer.css`
7. [Main Layout Enhancements](./tasks/07-main-layout.md) - `src/assets/css/layouts/main.css`
8. [Utility & Special Effects](./tasks/08-utilities.md) - `src/assets/css/main.css`

## Design Notes

### Cosmic Elements to Consider
- Subtle spiral motifs (matching logo)
- Small star decorations (::before/::after)
- Gentle gradients (space depth)
- Soft glows on important elements
- Orbit-inspired circular patterns

### Accessibility Requirements
- Text contrast on beige: minimum 4.5:1
- Interactive elements: clear focus indicators
- Color not sole indicator of meaning
- Sufficient spacing for touch targets
- Test with screen reader

## Success Criteria
- Website feels warm and welcoming
- Space/time theme is evident but subtle
- All accessibility standards maintained
- Brand colors consistently applied
- Professional yet calming aesthetic
- No content modifications (only styles)
