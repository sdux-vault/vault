import type { ZoomLevelShape } from '../shapes/zoom-level.shape';

/** Predefined zoom levels for timeline tracks. */
export const ZOOM_LEVELS: readonly ZoomLevelShape[] = [
  { value: 1, label: '100%' },
  { value: 1.5, label: '150%' },
  { value: 2, label: '200%' },
  { value: 3, label: '300%' },
  { value: 4, label: '400%' },
  { value: 6, label: '600%' },
  { value: 8, label: '800%' },
  { value: 10, label: '1000%' }
];
