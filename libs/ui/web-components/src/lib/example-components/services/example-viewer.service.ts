import { Injectable, signal } from '@angular/core';

/**
 * ExampleViewerService
 * --------------------
 * A lightweight utility service that manages per-example visibility state
 * using Angular signals. This is used by example/demo components to toggle
 * or persist "expanded/collapsed" UI state for arbitrary example blocks.
 *
 * Features
 * --------
 * • Each example is identified by a string ID
 * • Visibility state is stored in dedicated `signal<boolean>` instances
 * • Signals are lazily created on first access
 * • Provides convenience methods: `toggle`, `show`, `hide`, and `setDefaultVisibility`
 * • Useful for demo viewers, collapsible sections, or documentation panels
 *
 * Visibility Lifecycle
 * --------------------
 * - The first time an exampleId is requested, a `false` signal is created
 *   (meaning: the example is hidden by default).
 * - The same signal instance is returned for the same example ID every time.
 * - Consumers can bind to the signal to reflect or animate UI state.
 *
 * Example Usage
 * -------------
 * ```ts
 * constructor(private viewer: ExampleViewerService) {}
 *
 * readonly isOpen = this.viewer.getVisibilitySignal('example-1');
 *
 * toggle() {
 *   this.viewer.toggle('example-1');
 * }
 * ```
 *
 * ```html
 * <button (click)="toggle()">Toggle</button>
 * <div *ngIf="isOpen()">Example content…</div>
 * ```
 */
@Injectable({ providedIn: 'root' })
export class ExampleViewerService {
  /**
   * Internal map from exampleId → visibility signal.
   * Signals are created lazily and retained for the lifetime of the service.
   */
  private readonly _visibilityMap = new Map<
    string,
    ReturnType<typeof signal<boolean>>
  >();

  /**
   * Retrieves (or lazily creates) a visibility signal for the given example ID.
   *
   * @param exampleId - A unique identifier for the example block.
   * @returns A signal<boolean> representing whether the example is visible.
   */
  getVisibilitySignal(exampleId: string) {
    if (!this._visibilityMap.has(exampleId)) {
      this._visibilityMap.set(exampleId, signal(false)); // hidden by default
    }
    return this._visibilityMap.get(exampleId)!;
  }

  /**
   * Toggles visibility for the specified example.
   */
  toggle(exampleId: string): void {
    const sig = this.getVisibilitySignal(exampleId);
    sig.update((v) => !v);
  }

  /**
   * Forces visibility to true for the specified example.
   */
  show(exampleId: string): void {
    this.getVisibilitySignal(exampleId).set(true);
  }

  /**
   * Sets the initial (default) visibility state for an example.
   * If a signal already exists, it will be overwritten.
   */
  setDefaultVisibility(exampleId: string, isVisible: boolean): void {
    const sig = this.getVisibilitySignal(exampleId);
    sig.set(isVisible);
  }

  /**
   * Forces visibility to false for the specified example.
   */
  hide(exampleId: string): void {
    this.getVisibilitySignal(exampleId).set(false);
  }
}
