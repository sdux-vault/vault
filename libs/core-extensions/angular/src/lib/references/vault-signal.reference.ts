import { Signal } from '@angular/core';
import { PipelineValue, VaultErrorShape } from '@sdux-vault/shared';

/**
 * Reactive signal-based view of a FeatureCell’s current state.
 *
 * This interface defines the set of Angular signals exposed for observing
 * loading status, resolved value, error state, and value presence for a
 * FeatureCell.
 */
export interface VaultSignalStateRef<T> {
  /**
   * Indicates whether the FeatureCell is currently processing a pipeline operation.
   */
  isLoading: Signal<boolean>;

  /**
   * Holds the resolved pipeline value or undefined when no value is present.
   */
  value: Signal<PipelineValue<T>>;

  /**
   * Holds the most recent error emitted by the pipeline or null when no error exists.
   */
  error: Signal<VaultErrorShape | null>;

  /**
   * Indicates whether the FeatureCell currently holds a non-null resolved value.
   */
  hasValue: Signal<boolean>;
}
