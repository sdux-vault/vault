import { MergeConfig } from '@sdux-vault/shared';

/**
 * Defines merge options for array-by-identifier updates and deletions.
 */
export interface ArrayByIdMergeConfig extends MergeConfig {
  /** Enables removal of matching entities from the current array. */
  isDelete?: boolean;
}
