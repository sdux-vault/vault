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
    type: 'overview'
  }
];
