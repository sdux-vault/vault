/** Defines the supported share-bar destination values. */
export const AnalyticsSharePlatform = {
  /** Identifies the X sharing destination. */
  X: 'x',
  /** Identifies the Bluesky sharing destination. */
  Bluesky: 'bluesky',
  /** Identifies the Mastodon sharing destination. */
  Mastodon: 'mastodon',
  /** Identifies the LinkedIn sharing destination. */
  LinkedIn: 'linkedin',
  /** Identifies the Reddit sharing destination. */
  Reddit: 'reddit',
  /** Identifies the Hacker News sharing destination. */
  HackerNews: 'hackernews',
  /** Identifies the Facebook sharing destination. */
  Facebook: 'facebook',
  /** Identifies the email sharing destination. */
  Email: 'email',
  /** Identifies the clipboard sharing destination. */
  Clipboard: 'clipboard'
} as const;

/** Represents a destination supported by the share bar. */
export type AnalyticsSharePlatforms =
  (typeof AnalyticsSharePlatform)[keyof typeof AnalyticsSharePlatform];
