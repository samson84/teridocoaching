# Task 03: Verify Navigation Data Flow

## Objective
Ensure navigation data from `navigation.ts` is properly accessible in the header template and renders correctly.

## Files to Verify
- `src/_data/navigation.ts` (source)
- `src/_includes/header.njk` (consumer)
- `eleventy.config.ts` (11ty configuration)

## Verification Steps

### 1. Check Data Structure
Verify `navigation.ts` exports correct format:
```typescript
interface NavigationItem {
  title: string;
  url: string;
  external?: boolean;
}
```

### 2. Check Template Access
Verify header template can access navigation data:
- Variable name is `navigation` (lowercase)
- Items are iterable
- Properties are accessible: `item.title`, `item.url`, `item.external`

### 3. Check 11ty Configuration
Verify TypeScript data files are properly configured in `eleventy.config.ts`:
- Data file extensions include `.ts`
- TypeScript execution is configured (using tsx)

### 4. Test Rendering
Build the site and verify:
- All navigation items appear in HTML
- URLs are correct
- External link attributes applied correctly
- Current page indicator works

## Testing Commands
```bash
npm run build
# Check generated HTML in _site/index.html
```

## Acceptance Criteria
- [ ] Navigation data structure is correct
- [ ] Header template accesses data successfully
- [ ] TypeScript data files work with 11ty
- [ ] All menu items render in HTML
- [ ] Current page detection works
- [ ] External link handling works (if applicable)

## Notes
- 11ty automatically makes data files available to templates
- File name `navigation.ts` becomes variable `navigation`
- The data should already be working based on existing header code
