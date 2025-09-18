# Phase 8: Advanced Features (Optional)

## 🎯 Objective
Implement advanced features including Sass support, asset bundling, image optimization, and performance enhancements for a production-ready site.

## 📋 Prerequisites
- Phase 7 completed (development configuration ready)
- All core functionality working and validated

## ✅ Tasks

### 8.1 Add Sass Support
Create `config/sass.js`:

```javascript
import path from "node:path";
import * as sass from "sass";

export const configureSass = (eleventyConfig) => {
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    useLayouts: false,
    
    compile: async function (inputContent, inputPath) {
      const parsed = path.parse(inputPath);
      
      // Skip files that start with underscore (partials)
      if (parsed.name.startsWith("_")) {
        return;
      }
      
      const result = sass.compileString(inputContent, {
        loadPaths: [
          parsed.dir || ".",
          this.config.dir.includes,
          "node_modules"
        ],
        sourceMap: process.env.NODE_ENV === 'development',
        style: process.env.NODE_ENV === 'production' ? 'compressed' : 'expanded'
      });
      
      // Register dependencies for watch mode
      this.addDependencies(inputPath, result.loadedUrls);
      
      return async (data) => {
        return result.css;
      };
    },
  });
};
```

### 8.2 Update Eleventy Configuration for Advanced Features
Update `eleventy.config.ts` to include bundling and Sass:

```typescript
import "tsx/esm";
import path from "node:path";
import { configureSass } from "./config/sass.js";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function (eleventyConfig) {
  // TypeScript template support
  eleventyConfig.addExtension(["11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
  });

  // Sass support
  configureSass(eleventyConfig);

  // Bundle support for CSS and JS
  eleventyConfig.addBundle("css");
  eleventyConfig.addBundle("js");

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
    "11ty.tsx",
    "scss"
  ]);

  // Passthrough file copy with versioning
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy({
    "src/assets/js": "assets/js"
  });
  
  // Watch targets for development
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");
  eleventyConfig.addWatchTarget("src/assets/scss/");

  // Filters for asset handling
  eleventyConfig.addFilter("bust", (url) => {
    const [urlPart, paramPart] = url.split("?");
    const params = new URLSearchParams(paramPart || "");
    const relativeUrl = urlPart.charAt(0) === "/" ? urlPart.substring(1) : urlPart;
    
    try {
      const fileStats = eleventyConfig.getStats(relativeUrl);
      if (fileStats) {
        params.set("v", fileStats.mtimeMs.toString());
      }
    } catch (error) {
      // File doesn't exist, use current timestamp
      params.set("v", Date.now().toString());
    }
    
    return `${urlPart}?${params}`;
  });

  // Markdown configuration
  eleventyConfig.setMarkdownTemplateEngine("njk");
  eleventyConfig.setHtmlTemplateEngine("njk");

  // Production optimizations
  if (process.env.NODE_ENV === 'production') {
    eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
      if (outputPath && outputPath.endsWith(".html")) {
        return content
          .replace(/>\s+</g, "><")
          .replace(/\s+/g, " ")
          .trim();
      }
      return content;
    });
  }

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
      layouts: "_includes/layouts"
    },
    templateFormats: ["html", "njk", "md", "11ty.js", "11ty.ts", "scss"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
}
```

### 8.3 Add Image Optimization Support
Install and configure Eleventy Image plugin:

```bash
npm install --save-dev @11ty/eleventy-img
```

Create `config/image.js`:

```javascript
import Image from "@11ty/eleventy-img";
import path from "node:path";

export const configureImages = (eleventyConfig) => {
  // Image shortcode
  eleventyConfig.addAsyncShortcode("image", async function(src, alt, sizes = "100vw", loading = "lazy") {
    const inputPath = path.join(eleventyConfig.dir.input, src);
    
    const metadata = await Image(inputPath, {
      widths: [300, 600, 900, 1200],
      formats: ["webp", "jpeg"],
      outputDir: path.join(eleventyConfig.dir.output, "assets", "images"),
      urlPath: "/assets/images/",
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);
        return `${name}-${width}w.${format}`;
      }
    });

    const imageAttributes = {
      alt,
      sizes,
      loading,
      decoding: "async",
    };

    return Image.generateHTML(metadata, imageAttributes);
  });

  // Avatar shortcode for smaller images
  eleventyConfig.addAsyncShortcode("avatar", async function(src, alt, size = "150") {
    const inputPath = path.join(eleventyConfig.dir.input, src);
    
    const metadata = await Image(inputPath, {
      widths: [parseInt(size), parseInt(size) * 2],
      formats: ["webp", "jpeg"],
      outputDir: path.join(eleventyConfig.dir.output, "assets", "images"),
      urlPath: "/assets/images/"
    });

    const imageAttributes = {
      alt,
      loading: "lazy",
      decoding: "async",
    };

    return Image.generateHTML(metadata, imageAttributes);
  });
};
```

### 8.4 Add Performance Monitoring
Create `src/assets/js/modules/performance.ts`:

```typescript
interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

interface PerformanceConfig {
  enabled: boolean;
  sampleRate: number;
  endpoint?: string;
}

const defaultPerformanceConfig: PerformanceConfig = {
  enabled: process.env.NODE_ENV === 'production',
  sampleRate: 0.1, // 10% of users
};

class PerformanceMonitor {
  private config: PerformanceConfig;
  private metrics: PerformanceMetrics = {};

  constructor(config: Partial<PerformanceConfig> = {}) {
    this.config = { ...defaultPerformanceConfig, ...config };
  }

  public initialize(): void {
    if (!this.config.enabled || Math.random() > this.config.sampleRate) {
      return;
    }

    if (!('PerformanceObserver' in window)) {
      console.warn('[Performance] PerformanceObserver not supported');
      return;
    }

    this.observeWebVitals();
    this.setupBeaconSending();
    
    console.log('[Performance] Monitoring initialized');
  }

  private observeWebVitals(): void {
    // First Contentful Paint
    this.observeMetric('first-contentful-paint', (entry) => {
      this.metrics.fcp = entry.startTime;
    });

    // Largest Contentful Paint
    this.observeMetric('largest-contentful-paint', (entry) => {
      this.metrics.lcp = entry.startTime;
    });

    // First Input Delay
    this.observeMetric('first-input', (entry) => {
      this.metrics.fid = entry.processingStart - entry.startTime;
    });

    // Cumulative Layout Shift
    this.observeMetric('layout-shift', (entry) => {
      if (!entry.hadRecentInput) {
        this.metrics.cls = (this.metrics.cls || 0) + entry.value;
      }
    });

    // Navigation timing for TTFB
    this.observeNavigationTiming();
  }

  private observeMetric(
    entryType: string,
    callback: (entry: any) => void
  ): void {
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach(callback);
      });

      observer.observe({ entryTypes: [entryType] });
    } catch (error) {
      console.warn(`[Performance] Failed to observe ${entryType}:`, error);
    }
  }

  private observeNavigationTiming(): void {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        this.metrics.ttfb = navigation.responseStart - navigation.requestStart;
      }
    });
  }

  private setupBeaconSending(): void {
    // Send metrics when page is unloaded
    const sendMetrics = (): void => {
      if (Object.keys(this.metrics).length === 0) return;

      const data = {
        url: window.location.href,
        timestamp: Date.now(),
        metrics: this.metrics,
        userAgent: navigator.userAgent
      };

      if (this.config.endpoint) {
        // Send to analytics endpoint
        navigator.sendBeacon(this.config.endpoint, JSON.stringify(data));
      } else {
        // Log to console for development
        console.log('[Performance] Web Vitals:', data);
      }

      // Dispatch custom event
      document.dispatchEvent(new CustomEvent('performance:metrics', {
        detail: data
      }));
    };

    // Send on page unload
    window.addEventListener('beforeunload', sendMetrics);
    
    // Also send after a delay to catch LCP
    setTimeout(sendMetrics, 5000);
  }
}

export const initializePerformanceMonitoring = async (): Promise<void> => {
  const monitor = new PerformanceMonitor();
  monitor.initialize();
};

export { PerformanceMonitor };
```

### 8.5 Add Service Worker for Caching
Create `src/assets/js/sw.js`:

```javascript
const CACHE_NAME = 'site-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/assets/css/main.css',
  '/assets/js/main.js',
  '/offline/',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      }).catch(() => {
        if (event.request.destination === 'document') {
          return caches.match('/offline/');
        }
      })
  );
});
```

Create service worker registration in `src/assets/js/modules/sw-register.ts`:

```typescript
interface ServiceWorkerConfig {
  enabled: boolean;
  swPath: string;
  scope: string;
}

const defaultSWConfig: ServiceWorkerConfig = {
  enabled: process.env.NODE_ENV === 'production',
  swPath: '/sw.js',
  scope: '/'
};

export const initializeServiceWorker = async (
  config: Partial<ServiceWorkerConfig> = {}
): Promise<void> => {
  const finalConfig = { ...defaultSWConfig, ...config };

  if (!finalConfig.enabled || !('serviceWorker' in navigator)) {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register(
      finalConfig.swPath,
      { scope: finalConfig.scope }
    );

    console.log('[SW] Service Worker registered:', registration.scope);

    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New service worker available
            document.dispatchEvent(new CustomEvent('sw:updateAvailable'));
          }
        });
      }
    });
  } catch (error) {
    console.error('[SW] Service Worker registration failed:', error);
  }
};
```

### 8.6 Add Bundle Configuration for Production
Create `config/bundles.js`:

```javascript
export const configureBundles = (eleventyConfig) => {
  // CSS bundle configuration
  eleventyConfig.addBundle("css", {
    transforms: [
      async function(content) {
        if (process.env.NODE_ENV === 'production') {
          // Minify CSS in production
          return content
            .replace(/\s+/g, ' ')
            .replace(/;\s*}/g, '}')
            .replace(/\s*{\s*/g, '{')
            .replace(/;\s*/g, ';')
            .trim();
        }
        return content;
      }
    ]
  });

  // JavaScript bundle configuration
  eleventyConfig.addBundle("js", {
    transforms: [
      async function(content) {
        if (process.env.NODE_ENV === 'production') {
          // Basic JS minification
          return content
            .replace(/\s+/g, ' ')
            .replace(/;\s*}/g, '}')
            .replace(/\s*{\s*/g, '{')
            .trim();
        }
        return content;
      }
    ]
  });
};
```

### 8.7 Create Offline Page
Create `src/pages/offline.md`:

```markdown
---
layout: layouts/page.njk
title: Offline
description: You are currently offline
permalink: /offline/
---

# You're Offline

It looks like you don't have an internet connection right now. Don't worry, you can still browse the pages you've already visited.

## What you can do:

- Check your internet connection
- Try refreshing the page when you're back online
- Browse cached pages from your recent visits

## Cached Pages

The following pages are available offline:

- [Home](/)
- [About](/about/)
- [Contact](/contact/)

---

This page will automatically refresh when your connection is restored.

<script>
window.addEventListener('online', () => {
  window.location.reload();
});
</script>
```

### 8.8 Update Main App to Include Advanced Features
Update `src/assets/js/main.ts` to include new modules:

```typescript
// Add these imports to existing main.ts
import { initializePerformanceMonitoring } from './modules/performance.js';
import { initializeServiceWorker } from './modules/sw-register.js';

// Add to the initializeModules method in the App class:
private async initializeModules(): Promise<void> {
  const initPromises = [
    initializeNavigation(this.config.navigationConfig),
    initializeAccessibility(),
    initializePerformanceMonitoring(),
    initializeServiceWorker(),
  ];

  if (this.config.analyticsEnabled) {
    initPromises.push(initializeAnalytics());
  }

  await Promise.all(initPromises);
}
```

## 🔍 Validation Checklist
- [ ] Sass compilation working correctly
- [ ] CSS and JS bundling configured
- [ ] Image optimization shortcodes created
- [ ] Performance monitoring implemented
- [ ] Service worker registered and caching assets
- [ ] Offline page created and accessible
- [ ] Production builds are minified
- [ ] All new TypeScript modules compile without errors
- [ ] Development and production modes working differently
- [ ] Cache busting implemented for assets

## 📝 Expected Output
After completing this phase:
- Production-ready site with advanced performance features
- Optimized images and assets
- Offline functionality with service worker
- Performance monitoring and web vitals tracking
- Sass preprocessing support
- Comprehensive bundling and minification

## 💡 Key Features Implemented
- **Asset Optimization**: Sass compilation, bundling, and minification
- **Image Processing**: Responsive images with multiple formats
- **Performance**: Web vitals monitoring and reporting
- **Offline Support**: Service worker with intelligent caching
- **Production Ready**: Environment-specific optimizations
- **Developer Experience**: Enhanced build pipeline

## 🔗 Next Steps
Your TypeScript + Eleventy project is now complete! Consider:
- Setting up deployment to your preferred hosting platform
- Adding more performance optimizations
- Implementing additional Eleventy plugins
- Adding a content management system
- Setting up monitoring and analytics

## 📊 Estimated Time
⏱️ **35-45 minutes**