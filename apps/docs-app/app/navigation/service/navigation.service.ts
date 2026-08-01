import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

/**
 * Centralized service for managing the open/closed state of the SDuX documentation sidenav.
 *
 * `NavigationService` provides a reactive signal-based API that allows multiple
 * navigation components and directives to share a synchronized view of whether
 * the sidenav is currently expanded. The state is persisted to `localStorage`
 * under the key `"Vault-sidenav"` to ensure consistent behavior across page
 * reloads and browser sessions.
 *
 * ### Responsibilities
 * - Maintain a global, reactive boolean indicating whether the sidenav is open.
 * - Persist state updates to localStorage.
 * - Provide a readonly `isOpen` signal for consumers.
 * - Offer imperative methods for toggling or forcing the open/closed state.
 */
@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  /** Internal writable signal tracking the sidenav's expanded/collapsed state. */
  private open: WritableSignal<boolean> = signal<boolean>(true);

  /** Readonly signal exposing the current expanded/collapsed state. */
  public readonly isOpen: Signal<boolean> = this.open.asReadonly();

  /**
   * Forces the sidenav into an expanded (open) state.
   *
   * This method does not toggle based on previous state; it always sets the next
   * state to `true` and persists the change to localStorage via `updateExpanded()`.
   */
  public show(): void {
    this.open.set(true);
  }

  /**
   * Updates the sidenav's open/closed state.
   *
   * If `force` is provided, the value is set explicitly. Otherwise, the state is
   * toggled from its current value. Every update is written to `localStorage`
   * using the `"Vault-sidenav"` key, ensuring that the UI layout preference
   * persists across page reloads.
   *
   * @param force - Optional explicit value to assign (`true`=open, `false`=closed).
   */
  public updateExpanded(force?: boolean) {
    this.open.update((value) => {
      const next = force ?? !value;
      localStorage.setItem('Vault-sidenav', JSON.stringify(next));
      return next;
    });
  }
}
