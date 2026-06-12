import { EventShape } from '@sdux-vault/shared';
import { DebugWidgetEventSourceType } from '../types/debug-widget-event-source.type';
import { DebugWidgetLatencyCategoryType } from '../types/debug-widget-latency-category.type';

/** Shape representing an enriched pipeline event captured by the debug widget. */
export interface DebugWidgetEventShape extends EventShape {
  /** Trace identifier linking related pipeline events. */
  traceId?: string;

  /** Monotonically increasing sequence number for event ordering. */
  sequenceNumber?: number;
  /** Duration of the current pipeline stage in milliseconds. */
  stageDurationMs?: number;

  /** Hash of the call stack at capture time. */
  stackHash?: string;
  /** Detected scheduler classification for the event. */
  scheduler?: string;
  /** Detected event loop phase at capture time. */
  eventLoopPhase?: string;
  /** Source classification for the event. */
  source?: DebugWidgetEventSourceType | string;

  /** Error payload if the event represents a failure. */
  error?: unknown;

  /** Additional event-specific metadata. */
  [key: string]: unknown;

  /** Latency category assigned during enrichment. */
  latencyCategory: DebugWidgetLatencyCategoryType;
}
