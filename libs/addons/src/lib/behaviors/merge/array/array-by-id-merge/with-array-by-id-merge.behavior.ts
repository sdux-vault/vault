import {
  BehaviorClassContext,
  BehaviorContract,
  BehaviorType,
  BehaviorTypes,
  defineBehaviorKey,
  FeatureCellBaseShape,
  FeatureCellExtensionContext,
  MergeConfig,
  PipelineUpstreamValue,
  VAULT_CLEAR_STATE,
  VaultBehavior,
  vaultDebug,
  vaultWarn
} from '@sdux-vault/shared';
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
      behaviorConfigs.set(withArrayByIdMergeBehavior.configKey, options);
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

    if (!this.#options.idKey) {
      throw new Error('[vault] ArrayByIdMerge behavior requires idKey');
    }
  }

  /**
   * Creates the entity deletion API exposed by this behavior.
   *
   * @param _ctx - Extension context supplied by the hosting FeatureCell.
   * @returns The extension API containing the entity deletion method.
   */
  extendCellAPI(_ctx: FeatureCellExtensionContext<T>) {
    // const { idKey } = this.#options;

    return {
      /**
       * Deletes an entity by identifier from the current state.
       *
       * @param _id - Identifier of the entity to delete.
       */
      delete: (_id: string): void => {}
    };
  }

  /**
   * Computes the merged result by appending the incoming value to the current array.
   *
   * @param currentValue - The current upstream state value.
   * @param nextValue - The incoming value to merge.
   * @param options - Optional merge configuration.
   * @returns The merged pipeline value or a control signal.
   */
  computeMerge(
    currentValue: PipelineUpstreamValue<T>,
    nextValue: PipelineUpstreamValue<T>,
    options?: MergeConfig
  ): PipelineUpstreamValue<T> {
    const curr = currentValue;
    const next = nextValue;
    const clear = options?.clearUndefined ?? false;

    vaultDebug(`${this.key} merge called (clear: ${clear})`);

    if (next === undefined && !clear) {
      vaultDebug(
        `${this.key} computeMerge skipped. next="${next}" clear="${clear}"`
      );
      return curr;
    }

    if (next === undefined && clear) {
      vaultDebug(
        `${this.key} ComputeMerge skipped. next="${next}" clear="${clear}"`
      );
      return VAULT_CLEAR_STATE;
    }

    if (Array.isArray(curr) && Array.isArray(next)) {
      vaultDebug(`${this.key} appending arrays → return [...curr, ...next]`);
      return [...curr, ...next] as PipelineUpstreamValue<T>;
    }

    vaultDebug(`${this.key} non-array branch. return next`);
    return next as PipelineUpstreamValue<T>;
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
