# Phase 2: TypeScript Configuration

## 🎯 Objective
Configure TypeScript with strict settings and integrate it with Eleventy for template processing and build-time compilation.

## 📋 Prerequisites
- Phase 1 completed (project initialized with dependencies)
- TypeScript and tsx packages installed

## ✅ Tasks

### 2.1 Create TypeScript Configuration
Create `tsconfig.json` in the project root:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "declaration": false,
    "outDir": "_site",
    "rootDir": "src",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/_includes/components/*"],
      "@/layouts/*": ["src/_includes/layouts/*"]
    }
  },
  "include": [
    "src/**/*",
    "eleventy.config.ts",
    "config/**/*"
  ],
  "exclude": [
    "node_modules",
    "_site"
  ]
}
```

### 2.2 Configure TypeScript in Eleventy
Create `eleventy.config.ts` in the project root:

```typescript
import "tsx/esm";
import path from "node:path";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function (eleventyConfig) {
  // TypeScript template support
  eleventyConfig.addExtension(["11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
  });

  // Directory configuration
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("_site");
  eleventyConfig.setIncludesDirectory("_includes");
  eleventyConfig.setDataDirectory("_data");
  eleventyConfig.setLayoutsDirectory("_includes/layouts");

  // Template formats to process
  eleventyConfig.setTemplateFormats([
    "html",
    "njk",
    "md",
    "11ty.js",
    "11ty.ts",
    "11ty.tsx"
  ]);

  // Passthrough file copy
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  
  // Watch targets for development
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");

  // Markdown configuration
  eleventyConfig.setMarkdownTemplateEngine("njk");
  eleventyConfig.setHtmlTemplateEngine("njk");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
      layouts: "_includes/layouts"
    },
    templateFormats: ["html", "njk", "md", "11ty.js", "11ty.ts"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
}
```

### 2.3 Test TypeScript Configuration
Verify TypeScript configuration works:

```bash
# Check TypeScript compilation (should show no errors)
npx tsc --noEmit

# Test Eleventy with TypeScript config
npx tsx ./node_modules/.bin/eleventy --config=eleventy.config.ts --dryrun
```

## 🔍 Validation Checklist
- [ ] `tsconfig.json` created with strict configuration
- [ ] TypeScript target set to ES2022
- [ ] ESM module system configured
- [ ] Path aliases configured for clean imports
- [ ] `eleventy.config.ts` created with TypeScript support
- [ ] TypeScript extensions registered with Eleventy (`.11ty.ts`, `.11ty.tsx`)
- [ ] Directory structure configured in Eleventy config
- [ ] Template formats include TypeScript files
- [ ] Watch targets configured for development
- [ ] TypeScript compilation test passes
- [ ] Eleventy dry run with TypeScript config succeeds

## 📝 Expected Output
After completing this phase:
- TypeScript compiler configured with strict settings
- Eleventy configured to process TypeScript templates
- Path aliases set up for clean imports
- Ready for directory structure creation in Phase 3

## 💡 Key Features Configured
- **Strict TypeScript**: All strict mode options enabled
- **ESM Support**: Full ES modules configuration
- **Path Aliases**: Clean import paths with `@/` prefix
- **Template Support**: TypeScript templates (`.11ty.ts`, `.11ty.tsx`)
- **Development Workflow**: Watch mode and hot reload ready

## 🔗 Next Step
Proceed to [Phase 3: Directory Structure Setup](./phase-3-directory-structure.md)

## 📊 Estimated Time
⏱️ **10-15 minutes**