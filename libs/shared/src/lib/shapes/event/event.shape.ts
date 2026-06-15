import { EventBoundaryType } from '../../types/event/event-boundary.type';
import { EventType } from '../../types/event/event.type';
import { StateSnapshotShape } from '../state/state-snapshot.shape';

/**
 * Describes the shape of a pipeline event emitted during FeatureCell execution.
 * This interface defines the core event contract used for diagnostics, Devtools inspection, and lifecycle tracking.
 */
// eslint-disable-next-line
export interface EventShape<T = any> {
  /**
   * Unique identifier for the emitted event.
   */
  id: string;

  /**
   * The behavior key that produced the event.
   */
  behaviorKey: string;

  /**
   * Identifier of the FeatureCell associated with the event.
   */
  cell: string;

  /**
   * Optional error information associated with a failure event.
   */
  // eslint-disable-next-line
  error?: any;

  /**
   * Optional payload associated with the event.
   */
  payload?: unknown;

  /**
   * Timestamp indicating when the event occurred.
   */
  timestamp: number;

  /**
   * Trace identifier used for Devtools debugging and correlation.
   */
  traceId?: string;

  /**
   * The event name describing the lifecycle transition or action.
   */
  name: string;

  /**
   * Classification of the event within the pipeline lifecycle.
   */
  type: EventType;

  /**
   * The event boundary type.
   */
  boundary: EventBoundaryType;

  /**
   * Optional partial snapshot of FeatureCell state at the time of emission.
   */
  state?: Partial<StateSnapshotShape<T>>;

  /**
   * Optional source identifier provided by the event origin.
   */
  source?: string;

  /**
   * Optional in-flight pipeline candidate value captured after a stage completes.
   * Used exclusively by the State Diff View in DevTools.
   */
  candidate?: T | undefined;

  /**
   * High-resolution monotonic timestamp captured via performance.now().
   * Used for precise trace timing in DevTools and Chrome Trace Export.
   */
  monotonicTimestamp?: number;
}
