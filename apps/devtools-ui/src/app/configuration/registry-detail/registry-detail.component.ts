import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BehaviorTypes } from '@sdux-vault/shared';
import { VaultRegistrationSerializedShape } from '../../shapes/vault-registration-serialized.shape';
import { DetailPaneComponent } from '../../shared/detail-pane/detail-pane.component';
import { PipelineCollapsibleComponent } from '../../shared/pipeline-collapsible/pipeline-collapsible.component';

/**
 * Detail panel displaying the behaviors and controllers registered
 * on a single FeatureCell within the Vault configuration view.
 *
 * Receives a serialized registry entry and renders its behavior and
 * controller names in categorized lists. Delegates the panel chrome
 * to the shared `DetailPaneComponent`.
 */
@Component({
  selector: 'sdux-devtools-registry-detail',
  standalone: true,
  imports: [
    DetailPaneComponent,
    PipelineCollapsibleComponent,
    MatTooltipModule
  ],
  templateUrl: './registry-detail.component.html',
  styleUrl: './registry-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistryDetailComponent {
  /** The serialized FeatureCell registry entry to display. */
  readonly cell = input.required<VaultRegistrationSerializedShape>();

  /** Emits when the user closes the detail panel. */
  readonly closeDetail = output<void>();

  /** Behavior entities extracted from the registry cell. */
  readonly behaviors = computed(() => this.cell().behaviors ?? []);

  /** Controller entities extracted from the registry cell. */
  readonly controllers = computed(() => this.cell().controllers ?? []);

  /** Whether the behaviors section is expanded. */
  readonly behaviorsExpanded = signal(true);

  /** Whether the controllers section is expanded. */
  readonly controllersExpanded = signal(true);

  /** Behaviors sorted alphabetically by key. */
  readonly sortedBehaviors = computed(() =>
    [...this.behaviors()].sort((a, b) => a.key.localeCompare(b.key))
  );

  /** Controllers sorted alphabetically by key. */
  readonly sortedControllers = computed(() =>
    [...this.controllers()].sort((a, b) => a.key.localeCompare(b.key))
  );

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

  /** Cell key extracted from the registry cell. */
  readonly cellKey = computed(() => this.cell().key ?? '');

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
   * Extracts the Domain and Name segments from a Vault key.
   *
   * @param key - A key in the format `SDUX::<Kind>::<Domain>::<Name>`.
   * @returns `<Domain> <Name>`, or the full key if the format is unexpected.
   */
  vaultKeyDomainName(key: string): string {
    const parts = key.split('::');
    return parts.length === 4 ? `${parts[2]} ${parts[3]}` : key;
  }

  /** Pipeline stage labels and their registered counts. */
  readonly preResolveStages = computed(() => {
    const apis = this.cell().fluentApis;
    return [{ label: 'Interceptors', count: apis?.interceptors ?? 0 }];
  });

  /** Behaviors with type "resolve". */
  readonly resolveBehaviors = computed(() =>
    this.behaviors().filter(
      (behavior) => behavior.type === BehaviorTypes.Resolve
    )
  );

  /** Behaviors with type "fromObservable". */
  readonly fromObservableBehaviors = computed(() =>
    this.behaviors().filter(
      (behavior) => behavior.type === BehaviorTypes.FromObservable
    )
  );

  /** Behaviors with type "fromPromise". */
  readonly fromPromiseBehaviors = computed(() =>
    this.behaviors().filter(
      (behavior) => behavior.type === BehaviorTypes.FromPromise
    )
  );

  /** Behaviors with type "fromStream". */
  readonly fromStreamBehaviors = computed(() =>
    this.behaviors().filter(
      (behavior) => behavior.type === BehaviorTypes.FromStream
    )
  );

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
    const apis = this.cell().fluentApis;
    return [
      { label: 'Emit State', count: apis?.emitStateCallbacks ?? 0 },
      { label: 'Error Callbacks', count: apis?.errorCallbacks ?? 0 }
    ];
  });
}
