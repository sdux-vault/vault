import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DevtoolsAggregateService } from '../../../services/devtools-aggregate.service';
import { DevtoolsLoggingService } from '../../../services/devtools-logging.service';

/**
 * Shared reset button that clears both the logging and aggregate
 * FeatureCells in a single action. Intended for use in any DevTools
 * view that needs a "Clear" control.
 */
@Component({
  selector: 'sdux-devtools-reset-button',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './reset-button.component.html',
  styleUrl: './reset-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetButtonComponent {
  /** Internal reference to the pipeline event logging FeatureCell service. */
  #logging = inject(DevtoolsLoggingService);

  /** Internal reference to the trace aggregate FeatureCell service. */
  #aggregate = inject(DevtoolsAggregateService);

  /** Whether any events or traces exist. */
  readonly hasData = computed(
    () => this.#logging.totalEvents() > 0 || this.#aggregate.totalTraces() > 0
  );

  /**
   * Clears all stored events and traces from both FeatureCells.
   */
  clear(): void {
    this.#logging.clearEvents();
    this.#aggregate.clearTraces();
  }
}
