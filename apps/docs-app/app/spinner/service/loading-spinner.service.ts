import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

/**
 * @description
 * A global service that manages the display of a loading spinner across the application.
 * Provides a reactive signal `isLoading` that components can observe to toggle UI spinners.
 *
 * @example
 * spinnerService.show();
 * spinnerService.hide();
 * spinnerService.isLoading()
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {
  /**
   * @internal
   * Holds the mutable signal for spinner visibility.
   */
  private loading: WritableSignal<boolean> = signal<boolean>(false);

  /**
   * @description
   * A read-only reactive signal indicating whether the loading spinner is active.
   * Components can use this to show/hide spinners in the UI.
   */
  public readonly isLoading: Signal<boolean> = this.loading.asReadonly();

  /**
   * @description
   * Activates the loading spinner.
   */
  public show(): void {
    this.loading.set(true);
  }

  /**
   * @description
   * Deactivates the loading spinner.
   */
  public hide(): void {
    this.loading.set(false);
  }
}
