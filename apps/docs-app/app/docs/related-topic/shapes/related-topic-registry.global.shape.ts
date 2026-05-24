import { RelatedTopicLinkShape } from './related-topic-link.shape';

export interface RelatedTopicRegistryGlobalShape {
  /** Named global link groups */

  behavior: RelatedTopicLinkShape[];

  controller: RelatedTopicLinkShape[];

  core: RelatedTopicLinkShape[];

  interceptors: RelatedTopicLinkShape[];
}

export type RelatedTopicGlobalKey = keyof RelatedTopicRegistryGlobalShape;
