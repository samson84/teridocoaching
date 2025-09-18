# Phase 6: JavaScript/TypeScript Setup

## 🎯 Objective
Create a robust client-side TypeScript architecture with modular design, type safety, and modern ES2022+ features for enhanced user interactions.

## 📋 Prerequisites
- Phase 5 completed (CSS architecture implemented)
- Site styled and responsive

## ✅ Tasks

### 6.1 Create Main TypeScript Entry Point
Update `src/assets/js/main.ts`:

```typescript
import { initializeNavigation } from './modules/navigation.js';
import { initializeAnalytics } from './modules/analytics.js';
import { initializeAccessibility } from './modules/accessibility.js';

interface AppConfig {
  debug: boolean;
  analyticsEnabled: boolean;
  navigationConfig: {
    mobileBreakpoint: number;
    animationDuration: number;
  };
}

const defaultConfig: AppConfig = {
  debug: process.env.NODE_ENV !== 'production',
  analyticsEnabled: process.env.NODE_ENV === 'production',
  navigationConfig: {
    mobileBreakpoint: 768,
    animationDuration: 300
  }
};

class App {
  private config: AppConfig;
  private isInitialized = false;

  constructor(config: Partial<AppConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    this.log('App instance created');
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) {
      this.log('App already initialized');
      return;
    }

    try {
      this.log('Initializing application modules...');
      
      await this.initializeModules();
      
      this.isInitialized = true;
      this.log('Application initialized successfully! 🚀');
      
      this.dispatchEvent('app:initialized');
    } catch (error) {
      console.error('Failed to initialize application:', error);
      this.dispatchEvent('app:error', { error });
    }
  }

  private async initializeModules(): Promise<void> {
    const initPromises = [
      initializeNavigation(this.config.navigationConfig),
      initializeAccessibility(),
    ];

    if (this.config.analyticsEnabled) {
      initPromises.push(initializeAnalytics());
    }

    await Promise.all(initPromises);
  }

  private log(message: string): void {
    if (this.config.debug) {
      console.log(`[App] ${message}`);
    }
  }

  private dispatchEvent(type: string, detail?: any): void {
    const event = new CustomEvent(type, { detail });
    document.dispatchEvent(event);
  }
}

let app: App;

const initializeApp = (): void => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
    return;
  }

  app = new App();
  app.initialize();
};

initializeApp();

export { App };
export default app;
```

### 6.2 Create Navigation Module
Update `src/assets/js/modules/navigation.ts`:

```typescript
interface NavigationConfig {
  mobileBreakpoint: number;
  animationDuration: number;
}

interface NavigationElements {
  toggle: HTMLButtonElement;
  navigation: HTMLElement;
  links: HTMLAnchorElement[];
}

class NavigationManager {
  private config: NavigationConfig;
  private elements: NavigationElements | null = null;
  private isOpen = false;
  private mediaQuery: MediaQueryList;

  constructor(config: NavigationConfig) {
    this.config = config;
    this.mediaQuery = window.matchMedia(`(min-width: ${config.mobileBreakpoint}px)`);
  }

  public initialize(): void {
    this.elements = this.getElements();
    
    if (!this.elements) {
      console.warn('[Navigation] Required elements not found');
      return;
    }

    this.setupEventListeners();
    this.setupMediaQuery();
    
    console.log('[Navigation] Initialized successfully');
  }

  private getElements(): NavigationElements | null {
    const toggle = document.querySelector('[data-mobile-toggle]') as HTMLButtonElement;
    const navigation = document.querySelector('[data-navigation]') as HTMLElement;
    const links = Array.from(navigation?.querySelectorAll('a') || []) as HTMLAnchorElement[];

    if (!toggle || !navigation) {
      return null;
    }

    return { toggle, navigation, links };
  }

  private setupEventListeners(): void {
    if (!this.elements) return;

    this.elements.toggle.addEventListener('click', this.handleToggleClick.bind(this));
    
    document.addEventListener('click', this.handleDocumentClick.bind(this));
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    
    this.elements.links.forEach(link => {
      link.addEventListener('click', this.handleLinkClick.bind(this));
    });
  }

  private setupMediaQuery(): void {
    this.mediaQuery.addEventListener('change', this.handleMediaQueryChange.bind(this));
    this.handleMediaQueryChange(this.mediaQuery);
  }

  private handleToggleClick(): void {
    this.toggleNavigation();
  }

  private handleDocumentClick(event: Event): void {
    if (!this.elements || !this.isOpen) return;

    const target = event.target as Node;
    const { toggle, navigation } = this.elements;
    
    if (!navigation.contains(target) && !toggle.contains(target)) {
      this.closeNavigation();
    }
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isOpen) {
      this.closeNavigation();
      this.elements?.toggle.focus();
    }
  }

  private handleLinkClick(): void {
    if (this.isOpen && !this.mediaQuery.matches) {
      this.closeNavigation();
    }
  }

  private handleMediaQueryChange(mq: MediaQueryList): void {
    if (mq.matches && this.isOpen) {
      this.closeNavigation();
    }
  }

  private toggleNavigation(): void {
    if (this.isOpen) {
      this.closeNavigation();
    } else {
      this.openNavigation();
    }
  }

  private openNavigation(): void {
    if (!this.elements) return;

    this.isOpen = true;
    this.updateAriaStates();
    this.elements.navigation.classList.add('navigation--open');
    
    this.elements.links[0]?.focus();
    
    this.dispatchNavigationEvent('opened');
  }

  private closeNavigation(): void {
    if (!this.elements) return;

    this.isOpen = false;
    this.updateAriaStates();
    this.elements.navigation.classList.remove('navigation--open');
    
    this.dispatchNavigationEvent('closed');
  }

  private updateAriaStates(): void {
    if (!this.elements) return;

    this.elements.toggle.setAttribute('aria-expanded', this.isOpen.toString());
  }

  private dispatchNavigationEvent(action: 'opened' | 'closed'): void {
    const event = new CustomEvent(`navigation:${action}`, {
      detail: { isOpen: this.isOpen }
    });
    document.dispatchEvent(event);
  }
}

export const initializeNavigation = async (config: NavigationConfig): Promise<void> => {
  const navigationManager = new NavigationManager(config);
  navigationManager.initialize();
};
```

### 6.3 Create Accessibility Module
Create `src/assets/js/modules/accessibility.ts`:

```typescript
interface AccessibilityConfig {
  skipLinkSelector: string;
  focusableSelectors: string[];
  announcePageChanges: boolean;
}

const defaultAccessibilityConfig: AccessibilityConfig = {
  skipLinkSelector: '.skip-link',
  focusableSelectors: [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ],
  announcePageChanges: true
};

class AccessibilityManager {
  private config: AccessibilityConfig;
  private announcer: HTMLElement | null = null;

  constructor(config: AccessibilityConfig = defaultAccessibilityConfig) {
    this.config = config;
  }

  public initialize(): void {
    this.setupSkipLinks();
    this.setupScreenReaderAnnouncer();
    this.setupFocusManagement();
    this.setupKeyboardNavigation();
    
    console.log('[Accessibility] Initialized successfully');
  }

  private setupSkipLinks(): void {
    const skipLinks = document.querySelectorAll(this.config.skipLinkSelector);
    
    skipLinks.forEach(link => {
      link.addEventListener('click', this.handleSkipLinkClick.bind(this));
    });
  }

  private setupScreenReaderAnnouncer(): void {
    this.announcer = document.createElement('div');
    this.announcer.setAttribute('aria-live', 'polite');
    this.announcer.setAttribute('aria-atomic', 'true');
    this.announcer.classList.add('sr-only');
    document.body.appendChild(this.announcer);
  }

  private setupFocusManagement(): void {
    this.setupFocusVisible();
    this.setupTrapFocus();
  }

  private setupFocusVisible(): void {
    let hadKeyboardEvent = false;
    
    const keyboardThrottledEventListener = this.throttle(() => {
      hadKeyboardEvent = true;
    }, 100);

    const pointerEventListener = (): void => {
      hadKeyboardEvent = false;
    };

    const focusEventListener = (event: FocusEvent): void => {
      const target = event.target as HTMLElement;
      
      if (hadKeyboardEvent || target.matches(':focus-visible')) {
        target.classList.add('focus-visible');
      }
    };

    const blurEventListener = (event: FocusEvent): void => {
      const target = event.target as HTMLElement;
      target.classList.remove('focus-visible');
    };

    document.addEventListener('keydown', keyboardThrottledEventListener);
    document.addEventListener('mousedown', pointerEventListener);
    document.addEventListener('focus', focusEventListener, true);
    document.addEventListener('blur', blurEventListener, true);
  }

  private setupTrapFocus(): void {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const modal = document.querySelector('[data-modal][aria-hidden="false"]');
      if (!modal) return;

      const focusableElements = this.getFocusableElements(modal as HTMLElement);
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    });
  }

  private setupKeyboardNavigation(): void {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      
      if (event.key === 'Enter' && target.matches('[role="button"]')) {
        event.preventDefault();
        target.click();
      }
    });
  }

  private handleSkipLinkClick(event: Event): void {
    event.preventDefault();
    
    const link = event.target as HTMLAnchorElement;
    const targetId = link.getAttribute('href')?.substring(1);
    
    if (!targetId) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    target.focus();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private getFocusableElements(container: HTMLElement): HTMLElement[] {
    const selector = this.config.focusableSelectors.join(', ');
    return Array.from(container.querySelectorAll(selector));
  }

  private throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>): void => {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  public announce(message: string): void {
    if (!this.announcer || !this.config.announcePageChanges) return;

    this.announcer.textContent = message;
    
    setTimeout(() => {
      if (this.announcer) {
        this.announcer.textContent = '';
      }
    }, 1000);
  }
}

export const initializeAccessibility = async (): Promise<void> => {
  const accessibilityManager = new AccessibilityManager();
  accessibilityManager.initialize();
};

export { AccessibilityManager };
```

### 6.4 Create Analytics Module (Optional)
Create `src/assets/js/modules/analytics.ts`:

```typescript
interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

interface AnalyticsConfig {
  trackingId?: string;
  debug: boolean;
  autoTrack: {
    pageViews: boolean;
    outboundLinks: boolean;
    downloads: boolean;
  };
}

const defaultAnalyticsConfig: AnalyticsConfig = {
  debug: process.env.NODE_ENV !== 'production',
  autoTrack: {
    pageViews: true,
    outboundLinks: true,
    downloads: true
  }
};

class AnalyticsManager {
  private config: AnalyticsConfig;

  constructor(config: Partial<AnalyticsConfig> = {}) {
    this.config = { ...defaultAnalyticsConfig, ...config };
  }

  public initialize(): void {
    if (this.config.autoTrack.pageViews) {
      this.trackPageView();
    }

    if (this.config.autoTrack.outboundLinks) {
      this.setupOutboundLinkTracking();
    }

    if (this.config.autoTrack.downloads) {
      this.setupDownloadTracking();
    }

    console.log('[Analytics] Initialized successfully');
  }

  private trackPageView(): void {
    this.track({
      category: 'Navigation',
      action: 'Page View',
      label: window.location.pathname
    });
  }

  private setupOutboundLinkTracking(): void {
    document.addEventListener('click', (event: Event) => {
      const link = (event.target as HTMLElement).closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      const isOutbound = href.startsWith('http') && 
                        !href.includes(window.location.hostname);

      if (isOutbound) {
        this.track({
          category: 'Outbound Links',
          action: 'Click',
          label: href
        });
      }
    });
  }

  private setupDownloadTracking(): void {
    document.addEventListener('click', (event: Event) => {
      const link = (event.target as HTMLElement).closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      const downloadExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.zip'];
      const isDownload = downloadExtensions.some(ext => 
        href.toLowerCase().includes(ext)
      );

      if (isDownload) {
        this.track({
          category: 'Downloads',
          action: 'Click',
          label: href
        });
      }
    });
  }

  public track(event: AnalyticsEvent): void {
    if (this.config.debug) {
      console.log('[Analytics] Track event:', event);
    }

    if (typeof gtag !== 'undefined') {
      gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value
      });
    }

    this.dispatchAnalyticsEvent(event);
  }

  private dispatchAnalyticsEvent(event: AnalyticsEvent): void {
    const customEvent = new CustomEvent('analytics:track', {
      detail: event
    });
    document.dispatchEvent(customEvent);
  }
}

export const initializeAnalytics = async (): Promise<void> => {
  const analyticsManager = new AnalyticsManager();
  analyticsManager.initialize();
};

export { AnalyticsManager };
```

### 6.5 Create TypeScript Declaration File
Create `src/assets/js/types/global.d.ts`:

```typescript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }

  const process: {
    env: {
      NODE_ENV: 'development' | 'production' | 'test';
    };
  };
}

export {};
```

### 6.6 Update TypeScript Configuration for Client-Side
Update the client-side portion of `tsconfig.json` to include the types:

Add to the `include` array:
```json
{
  "include": [
    "src/**/*",
    "eleventy.config.ts",
    "config/**/*",
    "src/assets/js/types/**/*"
  ]
}
```

## 🔍 Validation Checklist
- [ ] Main TypeScript entry point created with App class
- [ ] Navigation module created with full keyboard support
- [ ] Accessibility module created with focus management
- [ ] Analytics module created (optional but functional)
- [ ] TypeScript types defined for global objects
- [ ] All modules use proper TypeScript interfaces
- [ ] Event-driven architecture implemented
- [ ] Error handling implemented throughout
- [ ] Console logging with debug mode
- [ ] ESM imports/exports used correctly
- [ ] Async/await patterns used properly
- [ ] Mobile navigation works correctly
- [ ] Keyboard navigation accessible
- [ ] Screen reader announcements working

## 📝 Expected Output
After completing this phase:
- Fully functional mobile navigation with animations
- Comprehensive accessibility features
- Optional analytics tracking
- Type-safe client-side code
- Event-driven modular architecture
- Ready for development tooling in Phase 7

## 💡 Key Features Implemented
- **Type Safety**: Full TypeScript coverage for client-side code
- **Accessibility**: WCAG 2.1 AA compliant interactions
- **Performance**: Efficient event handling and DOM queries
- **Modularity**: Clean separation of concerns
- **Error Handling**: Graceful degradation and error reporting
- **Modern JavaScript**: ES2022+ features and patterns

## 🔗 Next Step
Proceed to [Phase 7: Development Configuration](./phase-7-development-configuration.md)

## 📊 Estimated Time
⏱️ **30-40 minutes**