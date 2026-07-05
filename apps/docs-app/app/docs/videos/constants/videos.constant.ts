import { VideoLinkShape } from '../shapes/video-link.shape';

/**
 * Master list of video links for the videos index page.
 * Ordered by conceptual importance within each category.
 */
export const VIDEO_LINKS: VideoLinkShape[] = [
  {
    fragment: 'pipeline-overview',
    display: 'Pipeline Overview',
    sort: 'pipeline-overview',
    type: 'flow'
  },
  {
    fragment: 'vault-definition',
    display: 'Vault Definition',
    sort: 'vault-definition',
    type: 'flow'
  },
  {
    fragment: 'feature-cell-definition',
    display: 'FeatureCell Definition',
    sort: 'feature-cell-definition',
    type: 'flow'
  },
  {
    fragment: 'conductor-definition',
    display: 'Conductor Definition',
    sort: 'conductor-definition',
    type: 'flow'
  },
  {
    fragment: 'orchestrator-definition',
    display: 'Orchestrator Definition',
    sort: 'orchestrator-definition',
    type: 'flow'
  },
  {
    fragment: 'atomic-pipeline',
    display: 'Atomic Pipeline',
    sort: 'atomic-pipeline',
    type: 'flow'
  },

  // Overview
  {
    fragment: 'pipeline-overview',
    display: 'Pipeline Overview',
    sort: 'pipeline-overview',
    type: 'overview'
  },
  {
    fragment: 'atomic-pipeline',
    display: 'Atomic Pipeline',
    sort: 'atomic-pipeline',
    type: 'overview'
  },
  {
    fragment: 'feature-cell-definition',
    display: 'FeatureCell Definition',
    sort: 'feature-cell-definition',
    type: 'overview'
  },
  {
    fragment: 'vault-definition',
    display: 'Vault Definition',
    sort: 'vault-definition',
    type: 'overview'
  },
  {
    fragment: 'conductor-definition',
    display: 'Conductor Definition',
    sort: 'conductor-definition',
    type: 'overview'
  },
  {
    fragment: 'orchestrator-definition',
    display: 'Orchestrator Definition',
    sort: 'orchestrator-definition',
    type: 'overview'
  }
];
