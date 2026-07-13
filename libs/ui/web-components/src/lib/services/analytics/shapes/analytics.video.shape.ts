import { AnalyticsType } from '../types/analytics.type';

/** Describes one user interaction with a video. */
export interface AnalyticsVideoShape {
  /** Provides the identifier of the selected video. */
  videoId: string;

  /** Provides the play action performed on the video. */
  action: typeof AnalyticsType.Play;
}
