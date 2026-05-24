import { DestroyRef, Injectable, computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { DEVTOOLS_LOGGING_KEY_CONSTANT, EventShape } from '@sdux-vault/shared';
import { filter, map } from 'rxjs';
import { InsightService } from './insight/insight.service';

/**
 * FeatureCell-backed service that aggregates runtime telemetry from the
 * ngSDuX DevTools EventBus. The service exposes both pipeline events and
 * queue events for display in the DevTools UI.
 *
 * `DevtoolsService` subscribes to:
 *   - Pipeline event stream (`pipeline$`)
 *   - Queue event stream (`queue$`)
 *
 * Pipeline events are persisted into the FeatureCell using the
 * `fromStream()` integration, providing a reactive history of all event
 * emissions. Queue events bypass the FeatureCell and are stored in a
 * dedicated signal to avoid mixing queue telemetry with pipeline state.
 *
 * Angular’s `DestroyRef` is used to ensure all subscriptions terminate
 * automatically when the service is destroyed.
 */
@FeatureCell<EventShape[]>(DEVTOOLS_LOGGING_KEY_CONSTANT)
@Injectable({ providedIn: 'root' })
export class DevtoolsService {
  /**
   * Internal FeatureCell used to store pipeline event history.
   */
  private readonly vault = injectVault<EventShape[]>(DevtoolsService);

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
  readonly events = computed(() => {
    return this.vault.state.value() ?? [];
  });

  /**
   * Total number of pipeline events recorded in the FeatureCell.
   */
  readonly totalEvents = computed(() => this.events().length);

  /**
   * Creates a DevTools service instance, initializes the FeatureCell,
   * and wires up reactive subscriptions to pipeline and queue event
   * streams supplied by the InsightService.
   *
   * Pipeline event stream → stored in FeatureCell
   * Queue event stream → stored in local signal
   */
  constructor() {
    this.vault.initialize();

    this.vault.fromStream!(
      this.bus.pipeline$().pipe(
        filter(
          // eslint-disable-next-line
          (event: any): event is EventShape => {
            return !!event && event.cell !== DEVTOOLS_LOGGING_KEY_CONSTANT;
          }
        ),
        map((event) => {
          // eslint-disable-next-line
          return event as any;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
    );
  }

  /**
   * Clears all stored pipeline events from the FeatureCell.
   */
  clearEvents() {
    this.vault.reset();
    this.vault.replaceState({ value: [] });
  }
}
