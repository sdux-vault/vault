import {
  BehaviorClassContext,
  BehaviorContract,
  BehaviorType,
  BehaviorTypes,
  defineBehaviorKey,
  FeatureCellBaseShape,
  PipelineUpstreamValue,
  VAULT_CLEAR_STATE,
  VaultBehavior,
  vaultDebug,
  vaultWarn,
  isolateValue
} from '@sdux-vault/shared';
import { ArrayByIdMergeConfig } from './config/array-by-id-merge.config';
import { extendArrayByIdMergeFunction } from './function/extend-array-by-id-merge.function';
import { ArrayByIdMergeBehaviorExtension } from './interfaces/array-by-id-merge-behavior.interface';
import { ArrayByIdMergeOptions } from './options/array-by-id-merge-behavior.options';

/**
 * Provides array-by-identifier merge behavior and its FeatureCell extension API.
 */
@VaultBehavior({
  type: BehaviorTypes.Merge,
  key: defineBehaviorKey('Merge', 'ArrayById'),
  critical: false,
  wantsConfig: true,
  configKey: 'withArrayMergeId'
})
export class withArrayByIdMergeBehavior<T> implements BehaviorContract<
  T,
  ArrayByIdMergeBehaviorExtension<T>
> {
  /** Extension function that registers the withArrayMergeId API on the FeatureCell. */
  static readonly extension = extendArrayByIdMergeFunction;

  /** Static behavior type used for orchestrator classification. */
  static readonly type: BehaviorType;

  /** Unique behavior key used for diagnostics and devtools. */
  static readonly key: string;

  /** Indicates whether this behavior is required by the pipeline. */
  static readonly critical: boolean;

  /** Whether this behavior requires consumer-supplied configuration. */
  static readonly wantsConfig: boolean;

  /** Configuration key used to locate withArrayByIdMerge options in the config registry. */
  static readonly configKey: string;

  /**
   * Registers the fluent withArrayMergeId configuration method on the FeatureCell.
   *
   * @param cell - The FeatureCell shape to extend.
   * @param behaviorConfigs - Map of behavior configuration entries.
   */
  static installFluentApi<T>(
    cell: FeatureCellBaseShape<T>,
    behaviorConfigs: Map<string, unknown>
  ) {
    cell.withArrayMergeId = function (options: ArrayByIdMergeOptions) {
      behaviorConfigs.set(
        withArrayByIdMergeBehavior.configKey,
        isolateValue(options)
      );
      return this;
    };
  }

  /** The behavior type identifier for this instance. */
  readonly type = withArrayByIdMergeBehavior.type;

  /** Whether this behavior is critical to pipeline execution. */
  readonly critical = withArrayByIdMergeBehavior.critical;

  /** Unique identifier for this behavior instance. */
  readonly key: string;

  /** Resolved withArrayByIdMerge configuration options for this behavior instance. */
  readonly #options: ArrayByIdMergeOptions;

  /**
   * Creates a new withArrayByIdeMerge behavior instance.
   *
   * @param key - Unique behavior identifier supplied by the factory.
   * @param behaviorCtx - Class-level context for dependency resolution.
   */
  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    this.key = key;
    this.#options = behaviorCtx.behaviorConfig as ArrayByIdMergeOptions;

    if (!this.#options) {
      throw new Error(
        '[vault] ArrayByIdMerge behavior requires configuration via withArrayMergeId()'
      );
    }

    if (this.#options.idKey === undefined || this.#options.idKey === null) {
      throw new Error('[vault] ArrayByIdMerge behavior requires idKey');
    }

    if (
      typeof this.#options.idKey !== 'string' ||
      this.#options.idKey.trim().length === 0
    ) {
      throw new Error(
        '[vault] ArrayByIdMerge behavior requires idKey to be a non-empty string'
      );
    }
  }

  /**
   * Computes the merged result by updating or appending incoming entities by identifier.
   * Array merge and deletion paths use identifier maps to complete in O(N + M) time for current and incoming arrays.
   *
   * @param currentValue - The current upstream state value.
   * @param nextValue - The incoming value to merge.
   * @param options - Optional merge configuration.
   * @returns The merged pipeline value or a control signal.
   */
  computeMerge(
    currentValue: PipelineUpstreamValue<T>,
    nextValue: PipelineUpstreamValue<T>,
    options?: ArrayByIdMergeConfig
  ): PipelineUpstreamValue<T> {
    const curr = currentValue;
    const next = nextValue;
    const clear = options?.clearUndefined ?? false;

    vaultDebug(`${this.key} merge called (clear: ${clear})`);

    if (next === undefined && !clear) {
      vaultDebug(
        `${this.key} computeMerge skipped. next="${next}" clear="${clear}"`
      );
      return isolateValue(curr) as PipelineUpstreamValue<T>;
    }

    if (next === undefined && clear) {
      vaultDebug(
        `${this.key} ComputeMerge skipped. next="${next}" clear="${clear}"`
      );
      return VAULT_CLEAR_STATE;
    }

    if (options?.isDelete && !Array.isArray(curr)) {
      vaultDebug(
        `${this.key} delete skipped because current value is not an array`
      );
      return isolateValue(curr) as PipelineUpstreamValue<T>;
    }

    const idKey = this.#options.idKey;
    const isEntity = (value: unknown): value is Record<string, unknown> =>
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value) &&
      Object.prototype.hasOwnProperty.call(value, idKey);

    const normalizeEntityArray = (
      values: Record<string, unknown>[]
    ): Record<string, unknown>[] => {
      const normalized: Record<string, unknown>[] = [];
      const indexById = new Map<unknown, number>();

      for (const entity of values) {
        const currentIndex = indexById.get(entity[idKey]);

        if (currentIndex === undefined) {
          indexById.set(entity[idKey], normalized.length);
          normalized.push(entity);
        } else {
          normalized[currentIndex] = entity;
        }
      }

      return normalized;
    };

    if (curr === undefined && Array.isArray(next) && next.every(isEntity)) {
      return isolateValue(
        normalizeEntityArray(next)
      ) as PipelineUpstreamValue<T>;
    }

    if (Array.isArray(curr)) {
      const incoming = Array.isArray(next) ? next : [next];
      const currentIsEntityArray = curr.every(isEntity);
      const result = currentIsEntityArray
        ? normalizeEntityArray(curr)
        : [...curr];

      if (options?.isDelete) {
        if (incoming.every(isEntity)) {
          const idsToDelete = new Set(incoming.map((entity) => entity[idKey]));

          if (currentIsEntityArray) {
            return isolateValue(
              result.filter((entity) => !idsToDelete.has(entity[idKey]))
            ) as PipelineUpstreamValue<T>;
          }

          const indicesById = new Map<unknown, number[]>();

          for (let index = 0; index < result.length; index++) {
            const current = result[index];

            if (isEntity(current)) {
              const indices = indicesById.get(current[idKey]);

              if (indices) {
                indices.push(index);
              } else {
                indicesById.set(current[idKey], [index]);
              }
            }
          }

          const consumedById = new Map<unknown, number>();
          const deletedIndices = new Set<number>();

          for (const entity of incoming) {
            const id = entity[idKey];
            const indices = indicesById.get(id);
            const consumed = consumedById.get(id) ?? 0;

            if (indices && consumed < indices.length) {
              deletedIndices.add(indices[consumed]);
              consumedById.set(id, consumed + 1);
            }
          }

          for (let index = result.length - 1; index >= 0; index--) {
            if (deletedIndices.has(index)) {
              result.splice(index, 1);
            }
          }
        }

        vaultDebug(`${this.key} deleted array values by ${idKey}`);
        return isolateValue(result) as PipelineUpstreamValue<T>;
      }

      if (incoming.every(isEntity)) {
        const indexById = new Map<unknown, number>();

        for (let index = 0; index < result.length; index++) {
          const current = result[index];

          if (isEntity(current) && !indexById.has(current[idKey])) {
            indexById.set(current[idKey], index);
          }
        }

        for (const entity of incoming) {
          const currentIndex = indexById.get(entity[idKey]);

          if (currentIndex === undefined) {
            indexById.set(entity[idKey], result.length);
            result.push(entity);
          } else {
            result[currentIndex] = entity;
          }
        }

        vaultDebug(`${this.key} merged array values by ${idKey}`);
        return isolateValue(result) as PipelineUpstreamValue<T>;
      }
    }

    vaultDebug(`${this.key} non-array branch. return next`);
    return isolateValue(next) as PipelineUpstreamValue<T>;
  }

  /**
   * Invoked when the behavior instance is destroyed.
   */
  destroy(): void {
    vaultWarn(`${this.key} - destroy "noop"`);
  }

  /**
   * Resets the behavior to its initial state.
   */
  reset(): void {
    vaultWarn(`${this.key} - reset "noop"`);
  }
}
