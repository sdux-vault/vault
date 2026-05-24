export const PUBLIC_APIS = `
/*
 * Public API Surface of addons
 */

export * from './lib/interceptors/index';

export * from '../../shared/src/lib/types/dir_one_file_one';
export * from './lib/behaviors/merge/object/dir_one_file_two';
export { BehaviorTypes } from './lib/types/file_three';
export type { BehaviorType } from './lib/types/behavior.type';
`;
