import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BehaviorTypes } from '@sdux-vault/shared';
import { DevtoolsRegistryService } from '../../../services/registry/devtools-registry.service';
import { PipelineCollapsibleComponent } from '../../components/pipeline-collapsible/pipeline-collapsible.component';
import type { TraceExecutionShape } from '../../shapes/trace';
import { PipelineNodeComponent } from '../pipeline-node/pipeline-node.component';

/**
 * Standalone component rendering the complete data flow pipeline
 * diagram for a single FeatureCell.
 *
 * Accepts a `cellKey` input and resolves the corresponding registry
 * entry from {@link DevtoolsRegistryService}. The pipeline is rendered
 * as a vertical flow of collapsible sections covering the Conductor
 * (queue + controllers), Orchestrator (pre-processing, processing,
 * output, and post-processing layers), and the final StateSnapshot.
 */
@Component({
  selector: 'sdux-devtools-pipeline-flow',
  standalone: true,
  imports: [
    PipelineCollapsibleComponent,
    PipelineNodeComponent,
    MatTooltipModule
  ],
  templateUrl: './pipeline-flow.component.html',
  styleUrl: './pipeline-flow.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PipelineFlowComponent {
  /** Registry service providing FeatureCell lookup by key. */
  #registryService = inject(DevtoolsRegistryService);

  /** The FeatureCell key used to look up registry data. */
  readonly cellKey = input.required<string>();

  /** Optional trace execution powering the Stage Waterfall visualization. */
  readonly trace = input<TraceExecutionShape>();

  /** Whether collapsible sections should start expanded (true when a trace is provided). */
  readonly isExpanded = computed(() => !!this.trace());

  /**
   * Total conductor processing time: sum of all controller-type
   * stage durations (votes + attempt) plus revote delay.
   */
  readonly #conductorTotal = computed(() => {
    const trace = this.trace();
    /* istanbul ignore if -- defensive guard; all callers check trace first */
    if (!trace) return 0;

    let total = 0;
    for (const stage of trace.metrics.stages) {
      if (stage.type === 'controller') {
        total += stage.duration;
      }
    }

    total += this.#revoteDelay();
    return total;
  });

  /**
   * Total orchestrator processing time: sum of all stage-type
   * stage durations.
   */
  readonly #orchestratorTotal = computed(() => {
    const trace = this.trace();
    /* istanbul ignore if -- defensive guard; all callers check trace first */
    if (!trace) return 0;

    let total = 0;
    for (const stage of trace.metrics.stages) {
      if (stage.type === 'stage') {
        total += stage.duration;
      }
    }

    return total;
  });

  /**
   * Map of behavior/controller keys to their total execution duration
   * in the current trace. Summed across all stages sharing the same key.
   */
  readonly #stageDurations = computed(() => {
    const trace = this.trace();
    if (!trace) return null;
    const map = new Map<string, number>();
    for (const stage of trace.metrics.stages) {
      map.set(
        stage.behaviorKey,
        (map.get(stage.behaviorKey) ?? 0) + stage.duration
      );
    }
    return map;
  });

  /**
   * Map of stage names to their total execution duration in the current trace.
   * Used for fluentApi items (interceptors, filters, reducers, etc.).
   */
  readonly #stageNameDurations = computed(() => {
    const trace = this.trace();
    if (!trace) return null;
    const map = new Map<string, number>();
    for (const stage of trace.metrics.stages) {
      map.set(stage.name, (map.get(stage.name) ?? 0) + stage.duration);
    }
    return map;
  });

  /**
   * Total revote delay in milliseconds: sum of gaps between
   * `conductor:notification:deny` and `lifecycle:notification:revote` events.
   */
  readonly #revoteDelay = computed(() => {
    const trace = this.trace();
    /* istanbul ignore if -- defensive guard; all callers check trace first */
    if (!trace) return 0;

    let total = 0;
    let denyTimestamp: number | null = null;
    for (const event of trace.events) {
      if (event.name === 'conductor:notification:deny') {
        denyTimestamp = event.timestamp;
      } else if (
        event.name === 'lifecycle:notification:revote' &&
        denyTimestamp !== null
      ) {
        total += event.timestamp - denyTimestamp;
        denyTimestamp = null;
      }
    }

    return total;
  });

  /**
   * Returns the formatted execution duration for a behavior/controller key
   * when a trace is available, or the domain segment otherwise.
   *
   * @param key - A Vault key in the format `SDUX::<Kind>::<Domain>::<Name>`.
   * @returns Duration string (e.g. `"~12.3 ms"`) or the domain segment.
   */
  entityDetail(key: string): string {
    const durations = this.#stageDurations();
    if (durations) {
      const duration = durations.get(key);
      return duration !== undefined ? `~${duration.toFixed(1)} ms` : '—';
    }
    return this.vaultKeyDomain(key);
  }

  /**
   * Returns the formatted execution duration for a merge behavior
   * when a trace is available, or the domain segment otherwise.
   * Merge stages use the `compute-merge` stage name with a
   * `vault-orchestrator` behaviorKey, so this resolves by stage name.
   *
   * @param key - A Vault key in the format `SDUX::<Kind>::<Domain>::<Name>`.
   * @returns Duration string (e.g. `"~12.3 ms"`) or the domain segment.
   */
  mergeEntityDetail(key: string): string {
    const durations = this.#stageNameDurations();
    if (durations) {
      const duration = durations.get('compute-merge');
      return duration !== undefined ? `~${duration.toFixed(1)} ms` : '—';
    }
    return this.vaultKeyDomain(key);
  }

  /**
   * Returns whether a behavior/controller key has a recorded duration
   * in the current trace, or true when no trace is present.
   *
   * @param key - A Vault key in the format `SDUX::<Kind>::<Domain>::<Name>`.
   * @returns `true` if the node should be visible.
   */
  hasTraceDuration(key: string): boolean {
    const durations = this.#stageDurations();
    if (!durations) return true;
    return durations.has(key);
  }

  /**
   * Returns the formatted execution duration for a stage name
   * when a trace is available, or an empty string otherwise.
   *
   * @param stageName - The pipeline stage name (e.g. `"interceptor"`, `"filter"`).
   * @returns Duration string (e.g. `"~12.3 ms"`) or an empty string.
   */
  stageDetail(stageName: string): string {
    const durations = this.#stageNameDurations();
    if (durations) {
      const duration = durations.get(stageName);
      return duration !== undefined ? `~${duration.toFixed(1)} ms` : '—';
    }
    return '';
  }

  /** The resolved registry entry for the given cell key. */
  readonly cell = computed(() => this.#registryService.getCell(this.cellKey()));

  /** Behavior entities extracted from the registry cell. */
  readonly behaviors = computed(() => this.cell()?.behaviors ?? []);

  /** Controller entities extracted from the registry cell. */
  readonly controllers = computed(() => this.cell()?.controllers ?? []);

  /** Core controllers (CoreAbstain, CoreLicense, CoreError). */
  readonly coreControllers = computed(() => {
    const coreNames = new Set(['CoreAbstain', 'CoreLicense', 'CoreError']);
    return this.controllers().filter((controller) =>
      coreNames.has(this.vaultKeyName(controller.key))
    );
  });

  /** Non-core controllers. */
  readonly nonCoreControllers = computed(() => {
    const coreNames = new Set(['CoreAbstain', 'CoreLicense', 'CoreError']);
    return this.controllers().filter(
      (controller) => !coreNames.has(this.vaultKeyName(controller.key))
    );
  });

  /**
   * Extracts the Name segment from a Vault key.
   *
   * @param key - A key in the format `SDUX::<Kind>::<Domain>::<Name>`.
   * @returns The `<Name>` segment, or the full key if the format is unexpected.
   */
  vaultKeyName(key: string): string {
    const parts = key.split('::');
    return parts.length === 4 ? parts[3] : key;
  }

  /**
   * Extracts the Domain segment from a Vault key.
   *
   * @param key - A key in the format `SDUX::<Kind>::<Domain>::<Name>`.
   * @returns The `<Domain>` segment, or an empty string if the format is unexpected.
   */
  vaultKeyDomain(key: string): string {
    const parts = key.split('::');
    return parts.length === 4 ? parts[2] : '';
  }

  /**
   * Returns the combined orchestrator duration when a trace is present:
   * sum of all `stage`-typed stage durations (excludes controller votes
   * and lifecycle events).
   *
   * @returns Duration string (e.g. `"5.2 ms"`) or an empty string.
   */
  orchestratorDetail(): string {
    const trace = this.trace();
    if (!trace) return '';
    return `~${this.#orchestratorTotal().toFixed(1)} ms`;
  }

  /**
   * Returns the conductor attempt duration when a trace is present:
   * sum of all controller attempt stage durations plus any revote delay.
   *
   * @returns Duration string (e.g. `"~513.0 ms"`) or an empty string.
   */
  conductorDetail(): string {
    const trace = this.trace();
    if (!trace) return '';
    return `~${this.#conductorTotal().toFixed(1)} ms`;
  }

  /**
   * Returns the total processing time: conductor + orchestrator.
   *
   * @returns Duration string (e.g. `"~520.0 ms"`) or an empty string.
   */
  stateSnapshotDetail(): string {
    const trace = this.trace();
    if (!trace) return '';
    const total = this.#conductorTotal() + this.#orchestratorTotal();
    return `~${total.toFixed(1)} ms`;
  }

  /**
   * Returns the controller attempt duration — the wall-clock time of
   * the final successful voting phase (controller:start:attempt to
   * controller:end:attempt). This matches the conductor detail since
   * the controller attempt bracket defines the voting phase boundary.
   *
   * @returns Duration string (e.g. `"~3.0 ms"`) or an empty string.
   */
  controllersDetail(): string {
    return this.conductorDetail();
  }

  /**
   * Returns the combined duration of core controller stages.
   *
   * @returns Duration string (e.g. `"~1.0 ms"`) or an empty string.
   */
  coreControllersDetail(): string {
    const trace = this.trace();
    if (!trace) return '';

    const coreNames = new Set(['CoreAbstain', 'CoreLicense', 'CoreError']);
    let total = 0;
    for (const stage of trace.metrics.stages) {
      if (
        stage.type === 'controller' &&
        coreNames.has(this.vaultKeyName(stage.behaviorKey))
      ) {
        total += stage.duration;
      }
    }

    return `~${total.toFixed(1)} ms`;
  }

  /**
   * Returns the total revote delay duration: the sum of gaps between
   * `conductor:notification:deny` and `lifecycle:notification:revote` events.
   *
   * @returns Duration string (e.g. `"~500.0 ms"`) or an empty string.
   */
  revoteDelayDetail(): string {
    const trace = this.trace();
    if (!trace) return '';

    return `~${this.#revoteDelay().toFixed(1)} ms`;
  }

  /**
   * Returns whether a revote delay occurred in the current trace.
   *
   * @returns `true` when a deny → revote gap exists.
   */
  hasRevoteDelay(): boolean {
    const trace = this.trace();
    if (!trace) return false;

    for (const event of trace.events) {
      if (event.name === 'conductor:notification:deny') return true;
    }

    return false;
  }

  /**
   * Returns the combined processing layer duration: compute-merge plus
   * all fluent API stage durations (resolve, operator, filter, beforeTap,
   * reducer, afterTap).
   *
   * @returns Duration string (e.g. `"~8.2 ms"`) or an empty string.
   */
  processingLayerDetail(): string {
    const durations = this.#stageNameDurations();
    if (!durations) return '';

    const stageNames = [
      'compute-merge',
      'resolve',
      'operator',
      'filter',
      'before-tap',
      'reducer',
      'after-tap'
    ];

    let total = 0;
    for (const name of stageNames) {
      total += durations.get(name) ?? 0;
    }

    return `~${total.toFixed(1)} ms`;
  }

  /**
   * Returns the total resolve stage duration when a trace is present.
   *
   * @returns Duration string (e.g. `"~1.0 ms"`) or an empty string.
   */
  resolveDetail(): string {
    const durations = this.#stageNameDurations();
    if (!durations) return '';
    const total = durations.get('resolve') ?? 0;
    return `~${total.toFixed(1)} ms`;
  }

  /**
   * Returns the combined Replace/Merge duration: compute-merge plus
   * all fluent API stages (operator, filter, before-tap, reducer, after-tap).
   *
   * @returns Duration string (e.g. `"~2.5 ms"`) or an empty string.
   */
  replaceMergeDetail(): string {
    const durations = this.#stageNameDurations();
    if (!durations) return '';

    const stageNames = [
      'compute-merge',
      'operator',
      'filter',
      'before-tap',
      'reducer',
      'after-tap'
    ];

    let total = 0;
    for (const name of stageNames) {
      total += durations.get(name) ?? 0;
    }

    return `~${total.toFixed(1)} ms`;
  }

  /**
   * Returns the combined output layer duration: sum of encrypt, decrypt,
   * persist, and load-persist stage durations.
   *
   * @returns Duration string (e.g. `"~3.1 ms"`) or an empty string.
   */
  outputLayerDetail(): string {
    const durations = this.#stageNameDurations();
    if (!durations) return '';

    const stageNames = ['encrypt', 'decrypt', 'persist', 'load-persist'];
    let total = 0;
    for (const name of stageNames) {
      total += durations.get(name) ?? 0;
    }

    return `~${total.toFixed(1)} ms`;
  }

  /**
   * Returns the `core-state` stage duration when a trace is present,
   * or the domain segment otherwise. The core-state monitor events
   * use `vault-orchestrator` as the behaviorKey, so this resolves
   * by stage name rather than entity key.
   *
   * @param key - A Vault key in the format `SDUX::<Kind>::<Domain>::<Name>`.
   * @returns Duration string (e.g. `"0.5 ms"`) or the domain segment.
   */
  coreStateDetail(key: string): string {
    const durations = this.#stageNameDurations();
    if (durations) {
      const duration = durations.get('core-state');
      return duration !== undefined ? `~${duration.toFixed(1)} ms` : '—';
    }
    return this.vaultKeyDomain(key);
  }

  /**
   * Returns "N/A" when a trace is present (extensions are not
   * instrumented), or the domain segment otherwise.
   *
   * @param key - A Vault key in the format `SDUX::<Kind>::<Domain>::<Name>`.
   * @returns `"N/A"` during trace view, or the domain segment.
   */
  extensionDetail(key: string): string {
    if (this.trace()) {
      return 'N/A';
    }
    return this.vaultKeyDomain(key);
  }

  /** Pipeline stage labels and their registered counts for pre-processing. */
  readonly preResolveStages = computed(() => {
    const apis = this.cell()?.fluentApis;
    return [
      {
        label: 'Interceptors',
        stageName: 'interceptor',
        count: apis?.interceptors ?? 0
      }
    ];
  });

  /** Behaviors with type "resolve". */
  readonly resolveBehaviors = computed(() =>
    this.behaviors().filter(
      (behavior) => behavior.type === BehaviorTypes.Resolve
    )
  );

  /** Whether the trace used the merge lifecycle (vs replace). */
  readonly #isMergeTrace = computed(() => {
    const trace = this.trace();
    /* istanbul ignore if -- defensive guard; all callers check trace first */
    if (!trace) return false;
    return trace.events.some((event) => event.name === 'lifecycle:start:merge');
  });

  /** Label for the Replace/Merge collapsible based on trace lifecycle. */
  readonly mergeLabel = computed(() => {
    const trace = this.trace();
    if (!trace) return 'Replace/Merge';
    return this.#isMergeTrace() ? 'Merge' : 'Replace';
  });

  /** Whether merge behavior nodes should be displayed. */
  readonly showMergeBehaviors = computed(() => {
    const trace = this.trace();
    if (!trace) return true;
    return this.#isMergeTrace();
  });

  /** Behaviors with type "merge". */
  readonly mergeBehaviors = computed(() =>
    this.behaviors().filter((behavior) => behavior.type === BehaviorTypes.Merge)
  );

  /** Behaviors with type "stepwiseResolve". */
  readonly stepwiseResolveBehaviors = computed(() =>
    this.behaviors().filter(
      (behavior) => behavior.type === BehaviorTypes.StepwiseResolve
    )
  );

  /** Behaviors with type "stepwiseFilter". */
  readonly stepwiseFilterBehaviors = computed(() =>
    this.behaviors().filter(
      (behavior) => behavior.type === BehaviorTypes.StepwiseFilter
    )
  );

  /** Behaviors with type "stepwiseReducer". */
  readonly stepwiseReducerBehaviors = computed(() =>
    this.behaviors().filter(
      (behavior) => behavior.type === BehaviorTypes.StepwiseReducer
    )
  );

  /** Behaviors with type "encrypt". */
  readonly encryptBehaviors = computed(() =>
    this.behaviors().filter(
      (behavior) => behavior.type === BehaviorTypes.Encrypt
    )
  );

  /** Behaviors with type "persist". */
  readonly persistBehaviors = computed(() =>
    this.behaviors().filter(
      (behavior) => behavior.type === BehaviorTypes.Persist
    )
  );

  /** Behaviors with type "coreState". */
  readonly coreStateBehaviors = computed(() =>
    this.behaviors().filter(
      (behavior) => behavior.type === BehaviorTypes.CoreState
    )
  );

  /** Behaviors with type "errorTransform". */
  readonly errorTransformBehaviors = computed(() =>
    this.behaviors().filter(
      (behavior) => behavior.type === BehaviorTypes.ErrorTransform
    )
  );

  /** Behaviors with type "extension". */
  readonly extensionBehaviors = computed(() =>
    this.behaviors().filter(
      (behavior) => behavior.type === BehaviorTypes.Extension
    )
  );

  /** Pipeline stages rendered after all behavior-type groups in the flow. */
  readonly postResolveStages = computed(() => {
    const apis = this.cell()?.fluentApis;
    return [
      {
        label: 'Emit State',
        stageName: 'core-emit-state',
        count: apis?.emitStateCallbacks ?? 0
      },
      {
        label: 'Error Callbacks',
        stageName: 'core-callback-error',
        count: apis?.errorCallbacks ?? 0
      }
    ];
  });
}
