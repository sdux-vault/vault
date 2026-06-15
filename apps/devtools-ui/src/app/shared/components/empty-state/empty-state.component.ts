import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DevtoolsAggregateService } from '../../../services/devtools-aggregate.service';
import { DevtoolsLoggingService } from '../../../services/devtools-logging.service';

/**
 * Self-aware empty-state component that automatically hides when
 * pipeline events or traces exist. Provides a consistent visual
 * treatment across all DevTools report pages.
 */
@Component({
  selector: 'sdux-empty-state',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyStateComponent {
  /** Material icon name to display. */
  readonly icon = input<string>('manage_search');

  /** Descriptive message shown below the icon. */
  readonly message = input<string>(
    'No data available yet. Interact with your application to generate pipeline activity.'
  );

  /** Internal reference to the pipeline event logging FeatureCell service. */
  #logging = inject(DevtoolsLoggingService);

  /** Internal reference to the trace aggregate FeatureCell service. */
  #aggregate = inject(DevtoolsAggregateService);

  /** When true (default), the component auto-hides when data exists. */
  readonly selfAware = input<boolean>(true);

  /** Whether the empty state should be visible. */
  readonly isEmpty = computed(
    () =>
      !this.selfAware() ||
      (this.#logging.totalEvents() === 0 && this.#aggregate.totalTraces() === 0)
  );
}
