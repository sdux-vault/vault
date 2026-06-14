import { RelatedTopicLinkShape } from './related-topic-link.shape';
import { RelatedTopicCagtegoryKey } from './related-topic-registry.category.shape';
import { RelatedTopicGlobalKey } from './related-topic-registry.global.shape';

export interface RelatedTopicCategoryShape {
  /** Base route for the category root page */
  baseRoute: string;

  /** Display name for the category root */
  baseDisplay: string;

  /** SEO page title for the category root */
  title?: string;

  /** SEO meta description for the category root */
  description?: string;

  /** Names of global groups to include */
  globals?: RelatedTopicGlobalKey[];

  /** Names of global cross groups to include */
  globalCross?: RelatedTopicGlobalKey[];

  /** Other categories to fully include */
  cross?: RelatedTopicCagtegoryKey[];

  /** Category-specific sub-pages */
  items?: RelatedTopicLinkShape[];
}
