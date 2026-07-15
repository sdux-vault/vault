import { StateSnapshotShape } from '@sdux-vault/shared';
import {
  getCurrentScope,
  onScopeDispose,
  shallowReactive,
  shallowReadonly
} from 'vue';
import { VueFeatureCellContext } from '../../context/vue-feature-cell.context';
import { FeatureCellShape } from '../../shapes/feature-cell.shape';

/**
 * Vue adapter that augments a core FeatureCell with an explicit
 * `useReactiveState()` composable.
 *
 * This class preserves the core fluent API and snapshot access patterns while
 * exposing a Vue-native bridge for consuming State as a readonly reactive object.
 */
export class VueFeatureCellAdapter<T> {
  /**
   * Creates a new VueFeatureCellAdapter for the provided core FeatureCell.
   *
   * @param core - The framework-agnostic FeatureCell instance to adapt.
   */
  constructor(private readonly core: VueFeatureCellContext<T>) {}

  /**
   * Builds and returns the Vue-augmented FeatureCell instance.
   *
   * @returns The FeatureCell with an attached `useReactiveState()` method.
   */
  build(): FeatureCellShape<T> {
    const cell = this.core;

    Object.defineProperty(cell, 'useReactiveState', {
      configurable: true,
      enumerable: true,
      writable: false,
      value: this.#useReactiveState.bind(this)
    });

    return cell as unknown as FeatureCellShape<T>;
  }

  /**
   * Creates a reactive snapshot for the active Vue effect scope and keeps it
   * synchronized with committed FeatureCell State until that scope is disposed.
   */
  #useReactiveState(): Readonly<StateSnapshotShape<T>> {
    if (!getCurrentScope()) {
      throw new Error(
        'useReactiveState() must be called within an active Vue effect scope.'
      );
    }

    const reactiveState = shallowReactive<StateSnapshotShape<T>>({
      ...this.core.state
    });

    const subscription = this.core.state$.subscribe(({ snapshot }) => {
      reactiveState.isLoading = snapshot.isLoading;
      reactiveState.value = snapshot.value;
      reactiveState.error = snapshot.error;
      reactiveState.hasValue = snapshot.hasValue;
    });

    onScopeDispose(() => subscription.unsubscribe());

    return shallowReadonly(reactiveState);
  }
}
