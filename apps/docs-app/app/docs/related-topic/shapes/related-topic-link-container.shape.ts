import { RelatedTopicLinkShape } from './related-topic-link.shape';

export interface RelatedTopicLinkContainerShape {
  links: RelatedTopicLinkShape[];
  crossLinks: RelatedTopicLinkShape[];
  globalLinks: RelatedTopicLinkShape[];
  globalCrossLinks: RelatedTopicLinkShape[];
}
