// related-topics-registry.shape.ts
import { RelatedTopicRegistryCategoryShape } from './related-topic-registry.category.shape';
import { RelatedTopicRegistryGlobalShape } from './related-topic-registry.global.shape';

export interface RelatedTopicRegistryShape {
  globals: RelatedTopicRegistryGlobalShape;
  categories: RelatedTopicRegistryCategoryShape;
}
