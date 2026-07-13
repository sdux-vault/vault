/** Defines the supported analytics interaction action values. */
export const AnalyticsType = {
  /** Identifies an example launch action. */
  Launch: 'launch',
  /** Identifies a shareable-link copy action. */
  Copy: 'copy',
  /** Identifies a content click action. */
  Click: 'click',
  /** Identifies a video play action. */
  Play: 'play',
  /** Identifies a social sharing action. */
  Share: 'share'
} as const;

/** Represents an action value supported by analytics interaction events. */
export type AnalyticsTypes = (typeof AnalyticsType)[keyof typeof AnalyticsType];
