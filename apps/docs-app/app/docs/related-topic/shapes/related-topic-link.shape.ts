export interface RelatedTopicLinkShape {
  id?: number;
  link: string;
  display: string;
  fragment?: string;

  /** SEO page title */
  title?: string;

  /** SEO meta description */
  description?: string;
}
