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

#### CSS Structure (Tailwind CSS v4)
```
src/assets/css/
└── main.css                    # Tailwind entry point (@import "tailwindcss" + @theme + @layer)
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
3. **Tailwind CSS**: Single `main.css` entry point, built by `@tailwindcss/cli` to `_site/`
4. **Template Hierarchy**: `base.njk` → `page.njk` → content markdown files
5. **Data Cascade**: Global data in `_data/`, available to all templates
6. **TypeScript Configuration**: Mixed `.ts` and `.js` files, TypeScript for type-safe data
7. **Asset Pipeline**: Tailwind CLI outputs `_site/assets/css/main.css`; images via Eleventy passthrough

## File Naming Conventions

- **Content**: `kebab-case.md` (e.g., `about.md`, `contact.md`)
- **Templates**: `kebab-case.njk` (e.g., `base.njk`, `page.njk`)
- **Styles**: `kebab-case.css` (e.g., `navigation.css`, `footer.css`)
- **Data**: `kebab-case.js` or `.ts` (e.g., `site.js`, `navigation.ts`)
- **Config**: `kebab-case.config.ts` (e.g., `eleventy.config.ts`)

## Import/Dependency Flow

1. **HTML Templates**: `base.njk` (root) ← `page.njk` (wrapper) ← `*.md` (content)
2. **CSS**: `main.css` → `@tailwindcss/cli` → `_site/assets/css/main.css`
3. **Data**: Files in `_data/` automatically available as global data
4. **Components**: `header.njk` and `footer.njk` included in layout templates
