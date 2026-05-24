import { Component, Signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingSpinnerService } from './service/loading-spinner.service';

/**
 * @component LoadingSpinnerComponent
 * @description
 * A shared UI component that displays a full-screen loading spinner overlay
 * when the `isLoading` signal from the `LoadingSpinnerService` is `true`.
 *
 * Intended to be injected into layouts or pages that require a global or
 * context-aware visual loading indicator.
 */
@Component({
  selector: 'sdux-loading-spinner',
  imports: [MatProgressSpinnerModule],
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {
  /**
   * Reactive computed signal reflecting the current loading state.
   * Evaluates to `true` when the spinner should be visible.
   *
   * @readonly
   * @returns {boolean} Whether the loading spinner should be shown
   */
  readonly isLoading: Signal<boolean>;

  /** Constructor */
  constructor(spinnerService: LoadingSpinnerService) {
    this.isLoading = spinnerService.isLoading;
  }
}
