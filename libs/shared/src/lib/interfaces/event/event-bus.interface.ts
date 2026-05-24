import { Observable } from 'rxjs';
import { EventShape } from '../../shapes/event/event.shape';

/**
 * Defines the contract for an event bus responsible for emitting and observing pipeline and queue events.
 * This interface provides methods for publishing events and subscribing to their corresponding event streams.
 *
 */
export interface EventBusContract {
  /**
   * Emits a pipeline event to all subscribed observers.
   *
   * @param event Pipeline event instance to be dispatched.
   */
  nextPipeline(event: EventShape): void;

  /**
   * Provides an observable stream of emitted pipeline events.
   *
   * @returns Observable stream of pipeline events.
   */
  pipeline$(): Observable<EventShape>;
}
