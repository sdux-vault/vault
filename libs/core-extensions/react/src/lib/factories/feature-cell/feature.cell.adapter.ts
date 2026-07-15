import { StateSnapshotShape } from '@sdux-vault/shared';
import { useSyncExternalStore } from 'react';
import { ReactFeatureCellContext } from '../../context/react-feature-cell.context';
import { FeatureCellShape } from '../../shapes/feature-cell.shape';

/**
 * React adapter that augments a core FeatureCell with an explicit
 * `useSyncExternalStore()` render-time subscription method.
 *
 * This class preserves the core fluent API and snapshot access patterns while
 * exposing a React-native bridge for subscribing to state changes during render.
 */
export class ReactFeatureCellAdapter<T> {
  /**
   * Cached snapshot reference returned to React when the underlying state has
   * not materially changed.
   */
  #cachedSnapshot: StateSnapshotShape<T>;

  /**
   * Creates a new ReactFeatureCellAdapter for the provided core FeatureCell.
   *
   * @param core - The framework-agnostic FeatureCell instance to adapt.
   */
  constructor(private readonly core: ReactFeatureCellContext<T>) {
    this.#cachedSnapshot = this.core.state;
  }

  /**
   * Builds and returns the React-augmented FeatureCell instance.
   *
   * @returns The FeatureCell with an attached `useSyncExternalStore()` method.
   */
  build(): FeatureCellShape<T> {
    const cell = this.core;

    Object.defineProperty(cell, 'useSyncExternalStore', {
      configurable: true,
      enumerable: true,
      writable: false,
      value: () =>
        useSyncExternalStore(
          this.#subscribe.bind(this),
          this.#getSnapshot.bind(this),
          this.#getSnapshot.bind(this)
        )
    });

    return cell as unknown as FeatureCellShape<T>;
  }

  /**
   * Returns a stable snapshot reference for React while preserving the core
   * cell's immutable public snapshot semantics.
   */
  #getSnapshot(): StateSnapshotShape<T> {
    const nextSnapshot = this.core.state;

    if (
      this.#cachedSnapshot.isLoading !== nextSnapshot.isLoading ||
      this.#cachedSnapshot.value !== nextSnapshot.value ||
      this.#cachedSnapshot.error !== nextSnapshot.error ||
      this.#cachedSnapshot.hasValue !== nextSnapshot.hasValue
    ) {
      this.#cachedSnapshot = nextSnapshot;
    }

    return this.#cachedSnapshot;
  }

  /**
   * Bridges FeatureCell state emissions into React's external store contract.
   */
  #subscribe(onStoreChange: () => void): () => void {
    const sub = this.core.state$.subscribe(() => {
      onStoreChange();
    });

    return () => sub.unsubscribe();
  }
}
