import { AnalyticsTypes } from '../types/analytics.type';

/** Describes one user interaction with a framework-specific example. */
export interface AnalyticsStackBlitzShape {
  /** Provides the identifier of the selected example. */
  exampleId: string;

  /** Provides the framework selected for the example interaction. */
  framework: string;

  /** Provides the launch or copy action performed by the user. */
  action: AnalyticsTypes;
}
