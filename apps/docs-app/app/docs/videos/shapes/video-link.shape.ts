/**
 * Shape for a video link entry in the videos index page.
 */
export interface VideoLinkShape {
  /** Fragment anchor for the section. */
  fragment: string;

  /** Display text in the table of contents. */
  display: string;

  /** Sort key for alphabetical ordering. */
  sort: string;

  /** Video category. */
  type: 'overview' | 'stage' | 'testing' | 'integration';
}
