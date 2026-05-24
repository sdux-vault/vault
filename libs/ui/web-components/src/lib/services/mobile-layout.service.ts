import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * MobileLayoutService
 * -------------------
 * A global layout utility service that exposes a reactive `isMobile` signal
 * based on Angular CDK breakpoint observation. This allows components,
 * directives, and UI features to instantly react to viewport size changes
 * without manually wiring media queries.
 *
 * Features
 * --------
 * • Uses Angular CDK BreakpointObserver
 * • Emits `true` for mobile-sized viewports (XS, SM, or <900px)
 * • Provides a zoneless-safe microtask update for consistent UI updates
 * • Automatically cleans up via Angular’s `DestroyRef` + `takeUntilDestroyed`
 * • Suitable for injection anywhere in the app
 *
 * How It Works
 * ------------
 * The service observes three breakpoints:
 *
 *   - `Breakpoints.XSmall`
 *   - `Breakpoints.Small`
 *   - `(max-width: 899px)` (custom cutoff for tablets/phones)
 *
 * If **any** match, the service sets `isMobile()` to `true`.
 *
 * The update is wrapped in `queueMicrotask()` to ensure async stability
 * and prevent Angular zoneless timing issues.
 *
 * Usage Example
 * -------------
 * ```ts
 * constructor(private mobile: MobileLayoutService) {}
 *
 * get compactMode() {
 *   return this.mobile.isMobile();
 * }
 * ```
 *
 * ```html
 * <button *ngIf="mobile.isMobile()">Menu</button>
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class MobileLayoutService {
  /** Reactive signal indicating whether the current viewport qualifies as mobile. */
  readonly isMobile = signal(false);

  /** The destroyRef */
  private destroyRef = inject(DestroyRef);
  /** The breakpoint observer */
  private breakpoint = inject(BreakpointObserver);

  /**
   * Constructor
   *
   * Sets up breakpoint observation and updates the `isMobile` signal whenever
   * the viewport enters or leaves mobile-sized ranges.
   */
  constructor() {
    this.breakpoint
      .observe([Breakpoints.XSmall, Breakpoints.Small, '(max-width: 899px)'])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state: BreakpointState) => {
        // Ensures stable async update in zoneless mode
        queueMicrotask(() => {
          const mobile = state.matches;
          this.isMobile.set(mobile);
        });
      });
  }
}
