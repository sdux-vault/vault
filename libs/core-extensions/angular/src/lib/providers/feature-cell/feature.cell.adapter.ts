import { computed, DestroyRef, inject, signal } from '@angular/core';
import {
  FeatureCellBaseShape,
  PipelineValue,
  StateEmitSnapshotShape,
  VaultErrorShape
} from '@sdux-vault/shared';
import { Subscription } from 'rxjs';
import { FeatureCellShape } from '../../shapes/feature-cell.shape';

/**
 * Angular adapter that augments a core FeatureCell with Angular Signal-based state access.
 *
 * This class bridges a framework-agnostic FeatureCellBaseShape into an Angular-friendly
 * representation by subscribing to state emissions and exposing derived, read-only
 * Angular Signals for value, loading state, error state, and value presence.
 */
export class AngularFeatureCellAdapter<T> {
  /**
   * Manages internal subscriptions to the core FeatureCell state stream.
   */
  readonly #subscriptions = new Subscription();

  /**
   * Signal representing the current pipeline value.
   */
  readonly #value = signal<PipelineValue<T>>(undefined);

  /**
   * Signal representing the current error state.
   */
  readonly #error = signal<VaultErrorShape | null>(null);

  /**
   * Signal representing whether the FeatureCell is currently loading.
   */
  readonly #isLoading = signal(false);

  /**
   * Computed signal indicating whether a non-null, non-undefined value is present.
   */
  readonly #hasValue = computed(() => {
    const value = this.#value();
    return value !== null && value !== undefined;
  });

  /**
   * Angular destroy reference used to coordinate lifecycle teardown.
   */
  readonly #destroyRef = inject(DestroyRef);

  /**
   * Creates a new AngularFeatureCellAdapter for the provided core FeatureCell.
   *
   * @param core - The framework-agnostic FeatureCell instance to adapt.
   */
  constructor(private readonly core: FeatureCellBaseShape<T>) {
    this.#subscriptions.add(
      this.core.state$.subscribe(
        (stateEmitSnapshot: StateEmitSnapshotShape<T>) => {
          this.#isLoading.set(stateEmitSnapshot?.snapshot?.isLoading ?? false);
          this.#error.set(stateEmitSnapshot?.snapshot?.error ?? null);
          this.#value.set(stateEmitSnapshot?.snapshot?.value ?? undefined);
        }
      )
    );

    this.#destroyRef.onDestroy(() => this.destroy());
  }

  /**
   * Builds and returns the Angular-augmented FeatureCell instance.
   *
   * @returns The FeatureCell with an attached Angular Signal-based state property.
   */
  build(): FeatureCellShape<T> {
    const cell = this.core as FeatureCellShape<T>;

    Object.defineProperty(cell, 'state', {
      configurable: true,
      enumerable: true,
      get: () => ({
        isLoading: this.#isLoading.asReadonly(),
        value: this.#value.asReadonly(),
        error: this.#error.asReadonly(),
        hasValue: this.#hasValue
      })
    });

    return cell;
  }

  /**
   * Destroys the adapter by tearing down subscriptions and delegating to the core FeatureCell.
   *
   * @returns void
   */
  destroy(): void {
    this.core.destroy();
    this.#subscriptions.unsubscribe();
  }
}
