import { VaultStateRef } from '@sdux-vault/engine';
import { BehaviorExtFunction } from '@sdux-vault/shared';
import { Observable } from 'rxjs';

/**
 * Extension contract for observable-based FeatureCell integration.
 *
 * This interface defines the shape of the dynamically injected
 * `fromObservable` API that allows a FeatureCell to accept observable
 * sources and expose them as normalized vault state references.
 */
export interface FromObservableBehaviorExtension
  extends Partial<Record<string, BehaviorExtFunction>> {
  [key: string]: BehaviorExtFunction | undefined;

  /**
   * Behavior extension function that installs the `fromObservable` API.
   */
  fromObservable: BehaviorExtFunction;
}

declare module '@sdux-vault/shared' {
  /**
   * FeatureCell extension interface augmented with observable integration support.
   */
  interface FeatureCellExtension<TEntity> {
    /**
     * Wraps an observable source and exposes it as a stream of vault state references.
     *
     * @param source$ Observable emitting raw entity values.
     * @returns Observable emitting vault state references.
     */
    fromObservable?(
      source$: Observable<TEntity>
    ): Observable<VaultStateRef<TEntity>>;
  }
}

/** Module augmentation anchor for the fromObservable behavior extension. */
export const __fromObservable = true;
