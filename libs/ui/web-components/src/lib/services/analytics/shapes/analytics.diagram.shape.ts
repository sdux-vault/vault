import { AnalyticsType } from '../types/analytics.type';

/** Describes one user interaction with a diagram. */
export interface AnalyticsDiagramShape {
  /** Provides the identifier of the selected diagram. */
  diagramId: string;

  /** Provides the click action performed on the diagram. */
  action: typeof AnalyticsType.Click;
}
