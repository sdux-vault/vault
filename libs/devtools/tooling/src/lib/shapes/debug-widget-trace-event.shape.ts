import { DebugWidgetTraceEventArgsShape } from '../shapes/debug-widget-trace-event-args.shape';
import { DebugWidgetEventInstantScopeType } from '../types/debug-widget-event-instant-scope.type';
import { DebugWidgetEventTracePhaseType } from '../types/debug-widget-event-trace-phase.type';

/** Shape representing a single Chrome trace format event for timeline export. */
export interface DebugWidgetTraceEventShape {
  /** Span name describing the trace event. */
  name: string;
  /** Category grouping for the event. */
  cat?: string;
  /** Chrome trace phase marker. */
  ph: DebugWidgetEventTracePhaseType;

  /** Timestamp in microseconds. */
  ts?: number;

  /** Process identifier, always 1 for the debugger. */
  pid: number;
  /** Thread identifier mapped from the trace ID. */
  tid?: string;

  /** Optional arguments attached to the event. */
  args?: DebugWidgetTraceEventArgsShape;

  /** Duration in microseconds for complete events. */
  dur?: number;
  /** Scope for instant events. */
  s?: DebugWidgetEventInstantScopeType;
}
