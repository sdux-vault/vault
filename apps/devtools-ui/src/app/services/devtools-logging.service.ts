import { DestroyRef, Injectable, computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import {
  DEVTOOLS_AGGREGATE_KEY_CONSTANT,
  DEVTOOLS_LOGGING_KEY_CONSTANT,
  EventShape
} from '@sdux-vault/shared';
import { Observable, filter } from 'rxjs';
import { InsightService } from './insight/insight.service';

/**
 * FeatureCell-backed service that aggregates runtime telemetry from the
 * DevTools EventBus. Pipeline events are persisted into the FeatureCell
 * using the fromStream integration, providing a reactive history of all
 * event emissions.
 */
@FeatureCell<EventShape[]>(DEVTOOLS_LOGGING_KEY_CONSTANT)
@Injectable({ providedIn: 'root' })
export class DevtoolsLoggingService {
  /**
   * Internal FeatureCell used to store pipeline event history.
   */
  private readonly vault = injectVault<EventShape[]>(DevtoolsLoggingService);

  /**
   * DevTools InsightService that exposes pipeline and queue observables.
   */
  private readonly bus = inject(InsightService);

  /**
   * Used to auto-dispose subscriptions when the service is destroyed.
   */
  private readonly destroyRef = inject(DestroyRef);

  /**
   * Reactive list of pipeline events from the FeatureCell state.
   */
  readonly events = computed(() => this.vault.state.value() ?? []);

  /**
   * Total number of pipeline events recorded in the FeatureCell.
   */
  readonly totalEvents = computed(() => this.events().length);

  /**
   * Initializes the FeatureCell and wires the pipeline event stream
   * into the FeatureCell via fromStream.
   */
  constructor() {
    this.vault.initialize();

    (
      this.vault.fromStream as unknown as (
        source$: Observable<EventShape>
      ) => void
    )(
      this.bus.pipeline$().pipe(
        filter(
          (event): event is EventShape =>
            !!event &&
            ![
              DEVTOOLS_LOGGING_KEY_CONSTANT,
              DEVTOOLS_AGGREGATE_KEY_CONSTANT
            ].includes(event.cell)
        ),
        takeUntilDestroyed(this.destroyRef)
      )
    );
  }

  /**
   * Clears all stored pipeline events from the FeatureCell.
   */
  clearEvents(): void {
    this.vault.reset();
    this.vault.replaceState({ value: [] });
  }
}
