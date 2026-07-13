import { AnalyticsType } from '../types/analytics.type';
import { AnalyticsSharePlatforms } from '../types/analytics-share-platform.type';

/** Describes one user interaction with the share bar. */
export interface AnalyticsShareShape {
  /** Provides the type of content being shared. */
  contentType: string;

  /** Provides the canonical URL of the shared content. */
  contentUrl: string;

  /** Provides the destination selected by the user. */
  platform: AnalyticsSharePlatforms;

  /** Provides the share or copy action performed by the user. */
  action: typeof AnalyticsType.Share | typeof AnalyticsType.Copy;
}
