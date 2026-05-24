import {
  afterNextRender,
  Component,
  computed,
  inject,
  input,
  OnDestroy,
  signal
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrandNameService } from '../../services/brand-name.service';
import { CatchPhraseService } from '../../services/catch-phrase.service';

/**
 * ImageComponent
 * ---------------
 * A lightweight, theme-aware image component used throughout the ngSDuX
 * documentation site and internal tooling.
 *
 * The component:
 *  • Automatically swaps between light and dark image variants
 *    (e.g., `logo.svg` → `logo-dark.svg`) based on system or app theme
 *  • Reacts immediately to:
 *      – OS theme changes via `prefers-color-scheme`
 *      – Manual theme toggles using a `data-theme="dark"` attribute
 *  • Supports ARIA-friendly alt text and optional Material tooltip
 *  • Accepts size overrides for width and height
 *
 * Theme Detection
 * ---------------
 * The component listens to:
 *  • `window.matchMedia('(prefers-color-scheme: dark)')`
 *  • A `MutationObserver` watching for changes to `<html data-theme="...">`
 *
 * These two mechanisms ensure compatibility with:
 *  – Angular Material theming
 *  – Tailwind/theme-toggle switches
 *  – System-level dark mode preferences
 *
 * Inputs
 * ------
 * @input image   (required) Base filename, e.g. `"sdux.svg"`.
 *                If the current theme is dark and a `*-dark` variant exists,
 *                the filename is rewritten automatically.
 *
 * @input tooltip Optional tooltip text (defaults to `"sdux"`).
 *
 * @input width   Optional width (number or string).
 * @input height  Optional height (number or string).
 * @input isThemeEnabled Optional boolean to disable light/dark image themeing (default is true).
 *
 * Lifecycle
 * ---------
 * On init:
 *  – Initializes theme state
 *  – Registers listeners for theme changes
 *
 * On destroy:
 *  – Cleans up all listeners and observers
 *
 * Usage
 * -----
 * ```html
 * <sdux-image
 *   image="logo.svg"
 *   tooltip="ngSDuX Logo"
 *   width="120"
 *   height="auto"
 * />
 * ```
 */
@Component({
  selector: 'sdux-image',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnDestroy {
  /** The injected BrandName Service from DI */
  readonly brandName = inject(BrandNameService);
  /** The injected CatchPhrase Service from DI */
  readonly catchPhrase = inject(CatchPhraseService);

  /** Required base image filename (e.g. `"sdux.svg"`). */
  readonly image = input.required<string>();

  /** Tooltip text displayed via Angular Material. Defaults to `"sdux"`. */
  readonly tooltip = input<string>(
    `${this.brandName.value} - ${this.catchPhrase.value}`
  );

  /** Optional image width (number or CSS string). */
  readonly width = input<number | string>('auto');

  /** Optional image height (number or CSS string). */
  readonly height = input<number | string>('auto');

  /** Optional image height (number or CSS string). */
  readonly isThemeEnabled = input<boolean>(true);

  /** Computed accessible alt text. Falls back to `"sdux Logo"`. */
  readonly altText = computed(
    () => this.tooltip() || `${this.brandName.value} Logo`
  );

  /**
   * Tracks the effective theme (`light` or `dark`).
   * Updated by system preference + data-theme observer.
   */
  private readonly theme = signal<'light' | 'dark'>('light');

  /** MediaQueryList for `(prefers-color-scheme: dark)` (if available). */
  private media: MediaQueryList | null = null;

  /** Observes `<html data-theme="...">` for theme overrides. */
  private observer?: MutationObserver;

  /** Sets up theme listeners when running in browser context. */
  constructor() {
    afterNextRender(() => {
      this.theme.set(this.getTheme());

      this.media = window.matchMedia('(prefers-color-scheme: dark)');
      this.media.addEventListener('change', this.syncTheme);

      this.observer = new MutationObserver(this.syncTheme);
      this.observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
      });
    });
  }

  /** Cleanup: removes matchMedia + MutationObserver listeners. */
  ngOnDestroy(): void {
    this.media?.removeEventListener('change', this.syncTheme);
    this.observer?.disconnect();
  }

  /**
   * Synchronizes theme state when OS or DOM theme changes.
   */
  private syncTheme = () => {
    this.theme.set(this.getTheme());
  };

  /**
   * Resolves the current theme using:
   *  1. Explicit `data-theme="dark"` override
   *  2. System preference via matchMedia
   */
  private getTheme(): 'light' | 'dark' {
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'dark') return 'dark';

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  /**
   * Computed image URL based on theme:
   *  • `logo.svg` → `logo-dark.svg` in dark mode (if the base name does not already contain "-dark")
   *  • Files are resolved under `/assets/`
   */
  readonly resolvedImage = computed(() => {
    const base = this.image();
    const theme = this.theme();

    let name = base;
    if (this.isThemeEnabled()) {
      const ext = base.split('.').pop()!;
      name = base.replace(
        '.' + ext,
        theme === 'dark' && !base.includes('-dark') ? `-dark.${ext}` : `.${ext}`
      );
    }
    return `assets/${name}`;
  });
}
