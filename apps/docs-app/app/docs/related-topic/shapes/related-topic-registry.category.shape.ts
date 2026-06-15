import { RelatedTopicCategoryShape } from './related-topic-category.shape';

export interface RelatedTopicRegistryCategoryShape {
  /** Named global link groups */

  blogs: RelatedTopicCategoryShape;

  controllers: RelatedTopicCategoryShape;

  default: RelatedTopicCategoryShape;

  deprecated: RelatedTopicCategoryShape;

  'dev-tools': RelatedTopicCategoryShape;

  encrypt: RelatedTopicCategoryShape;

  'entity-access': RelatedTopicCategoryShape;

  error: RelatedTopicCategoryShape;

  'execution-guarantee': RelatedTopicCategoryShape;

  extensions: RelatedTopicCategoryShape;

  'feature-cell': RelatedTopicCategoryShape;

  'feature-cell-api': RelatedTopicCategoryShape;

  filters: RelatedTopicCategoryShape;

  initialize: RelatedTopicCategoryShape;

  interceptors: RelatedTopicCategoryShape;

  license: RelatedTopicCategoryShape;

  merge: RelatedTopicCategoryShape;

  migration: RelatedTopicCategoryShape;

  operators: RelatedTopicCategoryShape;

  persist: RelatedTopicCategoryShape;

  'pipeline-overview': RelatedTopicCategoryShape;

  'provide-feature-cell': RelatedTopicCategoryShape;

  'provide-vault': RelatedTopicCategoryShape;

  reducers: RelatedTopicCategoryShape;

  resolve: RelatedTopicCategoryShape;

  sdux: RelatedTopicCategoryShape;

  stackblitz: RelatedTopicCategoryShape;

  state: RelatedTopicCategoryShape;

  stepwise: RelatedTopicCategoryShape;

  'tab-sync': RelatedTopicCategoryShape;

  taps: RelatedTopicCategoryShape;

  testing: RelatedTopicCategoryShape;

  'trademark-usage': RelatedTopicCategoryShape;

  vault: RelatedTopicCategoryShape;

  welcome: RelatedTopicCategoryShape;
}

export type RelatedTopicCagtegoryKey = keyof RelatedTopicRegistryCategoryShape;
