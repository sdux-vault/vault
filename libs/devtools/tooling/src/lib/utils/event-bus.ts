import { Subject } from 'rxjs';

import type { EventShape, SDuXShape } from '@sdux-vault/shared';
import { DevMode } from '@sdux-vault/shared';
import type { EventBusContract } from '../interfaces/event-bus.contract';

/**
 * Holds the singleton EventBus instance used for global event dispatch.
 */
let instance: EventBusContract | null = null;

/**
 * Returns the global EventBus singleton used to emit and observe DevTools events.
 * This function ensures a single EventBus instance is created and reused for the application lifecycle.
 *
 *
 * @returns The global EventBus instance.
 */
export function EventBus(): EventBusContract {
  if (!instance) {
    instance = new EventBusInstance();
  }

  return instance;
}

/**
 * Implements the EventBusInterface by managing pipeline and queue event streams.
 * This class provides gated event emission based on development mode and exposes observable streams for subscribers.
 * It is instantiated once and registered globally to support DevTools integration.
 */
class EventBusInstance implements EventBusContract {
  /**
   * Subject used to emit pipeline events to subscribers.
   */
  #pipeline$ = new Subject<EventShape>();

  /**
   * Creates a new EventBus instance and exposes it on the global object for DevTools access.
   */
  constructor() {
    // istanbul ignore next -- defensive only; window is always defined in browser test environments
    if (typeof window !== 'undefined') {
      window.sdux ??= {} as SDuXShape;
      window.sdux.vaultEventBus = this;
    }
  }

  /**
   * Emits a pipeline event to subscribed observers when development mode is active.
   *
   * @param event Pipeline event instance to emit.
   */
  nextPipeline(event: EventShape): void {
    if (DevMode.active && event) {
      this.#pipeline$.next(event);
    }
  }

  /**
   * Provides an observable stream of emitted pipeline events.
   *
   * @returns Observable stream of pipeline events.
   */
  pipeline$() {
    return this.#pipeline$.asObservable();
  }
}
