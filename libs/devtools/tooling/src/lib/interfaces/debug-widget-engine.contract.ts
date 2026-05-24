import { DebugWidgetDumpShape } from '../shapes/debug-widget-dump.shape';
import { DebugWidgetEventStatShape } from '../shapes/debug-widget-event-stat.shape';
import { DebugWidgetEventShape } from '../shapes/debug-widget-event.shape';

/** Contract defining the capabilities of the debug widget engine. */
export interface DebugWidgetEngineContract {
  /**
   * Serializes the global FeatureCell registry into a dump-ready structure.
   *
   * @returns The serialized registry, or undefined if unavailable.
   */
  serializeRegistry(): DebugWidgetDumpShape['registry'] | undefined;

  /**
   * Builds aggregate statistics from a collection of debug events.
   *
   * @param events - The events to analyze.
   * @param longTasks - Optional long task performance entries.
   * @returns The computed event statistics shape.
   */
  buildEventStats(
    events: DebugWidgetEventShape[],
    longTasks?: { start: number; duration: number }[]
  ): DebugWidgetEventStatShape;

  /**
   * Collects browser and runtime environment information.
   *
   * @returns An object describing the current runtime environment.
   */
  getEnvironmentInfo(): DebugWidgetDumpShape['environment'];
}
