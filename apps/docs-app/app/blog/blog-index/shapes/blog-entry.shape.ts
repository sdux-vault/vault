/**
 * Defines the metadata used to present a blog entry.
 */
export interface BlogEntry {
  /**
   * Provides the URL segment used to identify the blog entry.
   */
  readonly slug: string;

  /**
   * Provides the display title for the blog entry.
   */
  readonly title: string;

  /**
   * Provides the publication date for the blog entry.
   */
  readonly date: string;

  /**
   * Provides the estimated reading duration in minutes.
   */
  readonly readingTime: number;

  /**
   * Provides the content pillar for the blog entry.
   */
  readonly pillar?: string;

  /**
   * Indicates whether the blog entry is available for display.
   */
  readonly active?: boolean;
}
