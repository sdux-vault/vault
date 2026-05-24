/** Shape representing optional arguments attached to a Chrome trace event. */
export interface DebugWidgetTraceEventArgsShape {
  /** FeatureCell key associated with the event. */
  cell?: string;
  /** Behavior key associated with the event. */
  behavior?: string;
  /** Detected scheduler classification. */
  scheduler?: string;
  /** Event source classification. */
  source?: string;
  /** Latency category label. */
  latency?: string;

  /** Additional event-specific metadata. */
  [key: string]: unknown;
}
