// ─────────────────────────────────────────────────────────────
// with-core-http-resource-resolve.behavior.ts
// ─────────────────────────────────────────────────────────────

import { HttpResourceRef } from '@angular/common/http';
import { Injector, runInInjectionContext } from '@angular/core';
import {
  BehaviorClassContext,
  BehaviorContext,
  BehaviorType,
  BehaviorTypes,
  defineBehaviorKey,
  PipelineUpstreamValue,
  ResolveBehaviorContract,
  ResolveType,
  ResolveTypes,
  safeStringify,
  VaultBehavior
} from '@sdux-vault/shared';

import { toObservable } from '@angular/core/rxjs-interop';
import {
  createVaultError,
  isHttpResourceRef,
  vaultDebug,
  vaultWarn
} from '@sdux-vault/shared';
import { filter, firstValueFrom, mergeMap, race, take, throwError } from 'rxjs';

/** Module-scoped injector set by provideFeatureCell before behavior instantiation. */
let moduleInjector: Injector;

/**
 * Resolve behavior that extracts state values from an Angular HTTP resource reference.
 *
 * This behavior participates in the resolve stage when the incoming state input
 * is classified as an HTTP resource and produces a resolved pipeline value once
 * the resource emits a concrete value or error.
 */
@VaultBehavior({
  type: BehaviorTypes.Resolve,
  key: defineBehaviorKey('Resolve', 'HttpResource'),
  critical: true,
  resolveType: ResolveTypes.HttpResource
})
export class withHttpResourceBehavior<T> implements ResolveBehaviorContract<T> {
  /**
   * Static behavior type metadata used for pipeline classification.
   */
  static readonly type: BehaviorType;

  /**
   * Static behavior key assigned by the decorator.
   */
  static readonly key: string;

  /**
   * Indicates that this resolve behavior is required for pipeline execution.
   */
  static readonly critical: boolean;

  /**
   * Resolve type identifier associated with HTTP resource inputs.
   */
  static readonly resolveType: ResolveType;

  /**
   * Sets the Angular injector used by all instances during resolve.
   *
   * @param injector - The Angular injector from the provider context.
   */
  static setInjector(value: Injector): void {
    moduleInjector = value;
  }

  /**
   * Instance-level behavior type identifier.
   */
  readonly type = withHttpResourceBehavior.type;

  /**
   * Indicates that this behavior is critical in the resolve stage.
   */
  readonly critical = withHttpResourceBehavior.critical;

  /**
   * Unique behavior key for this instance.
   */
  readonly key: string;

  /**
   * Resolve type handled by this behavior instance.
   */
  resolveType = withHttpResourceBehavior.resolveType;

  /**
   * Creates a new HTTP resource resolve behavior instance.
   *
   * @param key - Unique behavior identifier assigned by the behavior factory.
   * @param behaviorCtx - Behavior class context provided by the orchestrator.
   */
  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    this.key = key;
  }

  /**
   * Resolves a pipeline value from an HTTP resource reference when supported.
   *
   * @param ctx - The behavior context containing the incoming state input.
   * @returns A promise resolving to the extracted value or undefined when skipped.
   */
  async computeResolve(
    ctx: BehaviorContext<T>
  ): Promise<PipelineUpstreamValue<T>> {
    if (ctx.incoming && isHttpResourceRef<T>(ctx.incoming)) {
      const resource = ctx.incoming as HttpResourceRef<T>;
      vaultDebug(
        `${this.key} computeResolve called with "${safeStringify(ctx.incoming)}".`
      );

      try {
        if (!moduleInjector) {
          throw new Error(
            `${this.key} requires an Angular Injector. Call setInjector() before resolving an HttpResourceRef.`
          );
        }

        // Note (2026-07-03): firstValueFrom has no timeout by design. If the
        // underlying httpResource never resolves (neither value nor error signal
        // changes), this promise hangs. This is an infrastructure/test issue
        // (e.g., unflushed HTTP mock), not a behavior bug. Adding an arbitrary
        // timeout would penalize slow networks and large payloads.
        const value = await firstValueFrom(
          runInInjectionContext(moduleInjector, () => {
            const value$ = toObservable(resource.value).pipe(
              filter((val): val is T => val !== undefined),
              take(1)
            );
            const error$ = toObservable(resource.error).pipe(
              filter((err) => err != null),
              mergeMap((err) => throwError(() => err))
            );
            return race(value$, error$);
          })
        );

        return value;
      } catch (err) {
        throw createVaultError(err, ctx.featureCellKey);
      }
    }

    vaultDebug(`${this.key} skipped — not an HttpResourceRef input.`);
    return;
  }

  /**
   * Invoked when the behavior instance is destroyed.
   */
  destroy(): void {
    vaultWarn(`${this.key} - destroy called`);
  }

  /**
   * Resets the behavior without modifying internal state.
   */
  reset(): void {
    vaultWarn(`${this.key} - reset called`);
  }
}
