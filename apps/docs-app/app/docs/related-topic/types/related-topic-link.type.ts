export const RelatedTopicLinkTypes = {
  CrossLink: 'crossLink',
  GlobalCrosslLink: 'globalCrossLink',
  GlobalLink: 'globalLink',
  Link: 'link'
} as const;

export type RelatedTopicLinkType =
  (typeof RelatedTopicLinkTypes)[keyof typeof RelatedTopicLinkTypes];
