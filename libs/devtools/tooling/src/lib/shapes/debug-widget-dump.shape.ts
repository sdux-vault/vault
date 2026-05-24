import { DebugWidgetEventStatShape } from '../shapes/debug-widget-event-stat.shape';
import { DebugWidgetEventShape } from '../shapes/debug-widget-event.shape';
import { DebugWidgetLongTasksShape } from '../shapes/debug-widget-long-tasks.shape';
import { DebugWidgetNavigationShape } from '../shapes/debug-widget-navigation.shape';
import { DebugWidgetRegistryShape } from '../shapes/debug-widget-registry.shape';

/** Shape representing a complete debug dump exported from the debug widget. */
export interface DebugWidgetDumpShape {
  /** Unix timestamp when the dump was created. */
  timestamp?: number;
  /** ISO 8601 formatted time when the dump was created. */
  isoTime?: string;

  /** High-resolution timing data from the Performance API. */
  highResolution?: {
    monotonicNow: number | null;
    timeOrigin: number | null;
  };

  /** Runtime hardware and connectivity information. */
  runtime?: {
    hardwareConcurrency: number | null;
    deviceMemory: number | null;
    connectionType: string | null;
  };

  /** Browser navigation timing metrics. */
  navigation?: DebugWidgetNavigationShape;

  /** Browser and device environment details. */
  environment?: {
    url: string;
    userAgent: string;

    browser?: string;
    browserVersion?: string;
    os?: string;
    platform?: string;

    deviceType?: 'desktop' | 'mobile' | 'tablet' | 'unknown';

    language?: string;
    timezone?: string;

    screenResolution?: string;
    viewport?: string;

    online: boolean | undefined;

    referrer?: string | null;
  };

  /** Captured browser long task entries. */
  longTasks?: DebugWidgetLongTasksShape[];

  /** Registered SDuX package versions. */
  versions?: Record<string, string>;

  /** Serialized FeatureCell registry snapshot. */
  registry?: DebugWidgetRegistryShape;

  /** Aggregate event statistics for the dump. */
  stats: DebugWidgetEventStatShape;

  /** Recorded pipeline events included in the dump. */
  events?: DebugWidgetEventShape[];
}
