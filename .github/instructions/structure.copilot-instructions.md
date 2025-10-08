# Terido Coaching - File Structure

## Root Directory

```
teridocoaching/
├── .github/                    # GitHub configuration
│   └── instructions/           # Copilot instruction files
│       ├── copilot-instructions.md
│       └── structure.copilot-instructions.md
├── .git/                       # Git repository data
├── .ai/                        # AI-related files
├── .playwright-mcp/            # Playwright MCP configuration
├── node_modules/               # npm dependencies (not tracked)
├── _site/                      # Generated site output (not tracked)
├── src/                        # Source files (see below)
├── .gitignore                  # Git ignore rules
├── eleventy.config.ts          # 11ty configuration
├── package.json                # npm package configuration
├── package-lock.json           # npm lock file
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

## Source Directory Structure (`src/`)

### Main Content Files
```
src/
├── index.md                    # Homepage content
├── about.md                    # About page content
├── contact.md                  # Contact page content
└── services.md                 # Services page content
```

### Data Directory (`src/_data/`)
```
src/_data/
├── env.js                      # Environment configuration
├── navigation.ts               # Navigation data (TypeScript)
└── site.js                     # Site-wide configuration
```

### Includes Directory (`src/_includes/`)
```
src/_includes/
├── base.njk                    # Base HTML5 layout
├── page.njk                    # Page layout template
├── header.njk                  # Header component
└── footer.njk                  # Footer component
```

### Assets Directory (`src/assets/`)

#### CSS Structure (BEM Methodology)
```
src/assets/css/
├── main.css                    # Main stylesheet (imports all others)
├── base/
│   ├── reset.css              # CSS reset
│   ├── typography.css         # Typography styles
│   └── variables.css          # CSS custom properties
├── components/
│   ├── navigation.css         # Navigation component
│   └── page.css               # Page component
└── layouts/
    ├── footer.css             # Footer layout
    ├── header.css             # Header layout
    └── main.css               # Main layout
```

#### Images
```
src/assets/images/
└── favicon.ico                # Site favicon
```

### Pages Directory (`src/pages/`)
```
src/pages/
└── test.md                    # Test page
```

## Generated Site Structure (`_site/`)

The `_site/` directory contains the generated static site and mirrors the source structure with processed content.

## Key Structure Principles

1. **Source-Output Separation**: All source files in `src/`, all generated files in `_site/`
2. **Content Organization**: Root-level markdown files for main pages, `pages/` for additional pages
3. **Component-Based CSS**: Organized by base, components, and layouts following BEM
4. **Template Hierarchy**: `base.njk` → `page.njk` → content markdown files
5. **Data Cascade**: Global data in `_data/`, available to all templates
6. **TypeScript Configuration**: Mixed `.ts` and `.js` files, TypeScript for type-safe data
7. **Asset Pipeline**: CSS organized modularly, imported through `main.css`

## File Naming Conventions

- **Content**: `kebab-case.md` (e.g., `about.md`, `contact.md`)
- **Templates**: `kebab-case.njk` (e.g., `base.njk`, `page.njk`)
- **Styles**: `kebab-case.css` (e.g., `navigation.css`, `footer.css`)
- **Data**: `kebab-case.js` or `.ts` (e.g., `site.js`, `navigation.ts`)
- **Config**: `kebab-case.config.ts` (e.g., `eleventy.config.ts`)

## Import/Dependency Flow

1. **HTML Templates**: `base.njk` (root) ← `page.njk` (wrapper) ← `*.md` (content)
2. **CSS**: `main.css` imports from `base/`, `components/`, `layouts/`
3. **Data**: Files in `_data/` automatically available as global data
4. **Components**: `header.njk` and `footer.njk` included in layout templates
