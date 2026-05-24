import { computed, effect, inject, Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { BehaviorDefinitionShape } from '../shapes/behavior-definition.shape';
import { BehaviorInstanceShape } from '../shapes/behavior-instance.shape';
import { PipelineBuilderStateShape } from '../shapes/pipeline-builder-state.shape';
import { StageDefinitionShape } from '../shapes/stage-definition.shape';
import { StageInstanceShape } from '../shapes/stage-instance.shape';
import { StateInputShape } from '../shapes/state-definition.shape';
import { PIPELINE_BUILDER_BEHAVIOR_TOKEN } from '../tokens/pipeline-builder-behaviors.token';
import { PIPELINE_BUILDER_STAGE_TOKEN } from '../tokens/pipeline-builder-stages.token';
import { BehaviorSelectionModeType } from '../types/behavior-selection-mode.type';
import {
  BehaviorStatusType,
  BehaviorStatusTypes
} from '../types/behavior-status.type';
import { BehaviorIdType } from '../types/id/behavior-id.type';
import { StageIdType } from '../types/id/stage-id.type';
import { StageStatusType, StageStatusTypes } from '../types/stage-status.type';
import {
  isStateFrameworkType,
  StateFrameworkType
} from '../types/state-framework.type';
import { isStateInitialValueType } from '../types/state-initial-value.type';
import { isStatePrimitiveType } from '../types/state-primitive.type';
import { PipelineStepService } from './pipeline-step.service';
import { NavigationEngineService } from './utils/navigation-engine.class';

@FeatureCell<PipelineBuilderStateShape>('pipeline-builder')
@Injectable({ providedIn: 'root' })
export class PipelineBuilderService {
  //#region Private variables
  #vault = injectVault<PipelineBuilderStateShape>(PipelineBuilderService);

  #stageQuestions: StageDefinitionShape[] =
    inject(PIPELINE_BUILDER_STAGE_TOKEN, { optional: true }) ?? [];

  #behaviors: BehaviorDefinitionShape[] =
    inject(PIPELINE_BUILDER_BEHAVIOR_TOKEN, { optional: true }) ?? [];

  #navigationEngine = inject(NavigationEngineService);

  #initialized = false;

  #pipelineStepService = inject(PipelineStepService);

  //#endregion

  //#region  Readonly variables
  readonly #state = computed(() => this.#vault.state.value());
  readonly stepNumber = computed(() => this.#state()?.currentStep ?? 1);
  readonly #stateInput = computed(() => this.#state()?.stateInput);

  readonly #stageById = new Map<StageIdType, StageDefinitionShape>();
  readonly #behaviorsById = new Map<BehaviorIdType, BehaviorDefinitionShape>();
  readonly #behaviorDefinitionsByStage = new Map<
    StageIdType,
    BehaviorDefinitionShape[]
  >();

  readonly stateInputComplete = computed(() => {
    const stateInput = this.#stateInput();

    const shapeName = stateInput?.shapeName;

    return stateInput?.framework &&
      shapeName &&
      shapeName?.trim()?.length > 2 &&
      stateInput?.primitive &&
      stateInput?.initialValue
      ? true
      : false;
  });

  readonly allStagesResolved = computed((): boolean => {
    // No stages at all → resolved by definition
    const stageInstances = this.stageInstances();

    // istanbul ignore next -- defensive only not testable
    if (stageInstances.length === 0) return true;

    return stageInstances.every(
      (stage: StageInstanceShape) =>
        stage.status === StageStatusTypes.Complete ||
        stage.status === StageStatusTypes.Inactive
    );
  });

  // TODO
  readonly viewingStageId = computed<StageIdType | null>(() => {
    return this.#state()?.viewingStageId ?? null;
  });

  readonly viewingStageHasChildren = computed<boolean>(() => {
    const viewingId = this.viewingStageId();
    // istanbul ignore next -- defensive only not testable
    if (!viewingId) return false;

    return this.#stageHasChildren(viewingId);
  });

  #isFrameworkBehavior(
    behavior: BehaviorDefinitionShape | BehaviorInstanceShape
  ): boolean {
    if (
      !behavior.frameworks ||
      behavior.frameworks?.length === 0 ||
      !this.getStateFramework()
    )
      return true;
    return behavior.frameworks.some(
      (framework: StateFrameworkType) => framework === this.getStateFramework()
    );
  }

  readonly visibleBehaviorContent = computed<BehaviorDefinitionShape[] | null>(
    () => {
      const viewingId = this.viewingStageId();
      // istanbul ignore next -- defensive only not testable
      if (!viewingId) return null;

      const behaviors = this.#behaviorDefinitionsByStage.get(viewingId) ?? [];
      return behaviors.filter(
        (behavior: BehaviorDefinitionShape) =>
          this.#isEntityModeActive(behavior) &&
          this.#isFrameworkBehavior(behavior)
      );
    }
  );

  readonly visibleStageContent = computed<StageDefinitionShape | null>(() => {
    const viewingId = this.viewingStageId();
    // istanbul ignore next -- defensive only not testable
    if (!viewingId) return null;
    return this.#getStageDefinition(viewingId) ?? null;
  });

  readonly getStateFramework = computed<StateFrameworkType | null>(() => {
    const framework = this.#stateInput()?.framework;
    return isStateFrameworkType(framework) ? framework : null;
  });

  readonly getShapeName = computed<string | null>(() => {
    return this.#stateInput()?.shapeName ?? null;
  });

  readonly getInitialValue = computed(() => {
    const initialValue = this.#stateInput()?.initialValue;
    return isStateInitialValueType(initialValue) ? initialValue : null;
  });

  readonly getStatePrimitive = computed(() => {
    const primitive = this.#stateInput()?.primitive;
    return isStatePrimitiveType(primitive) ? primitive : null;
  });

  readonly isViewingStageContinueEnabled = computed(() => {
    const viewingStageId = this.viewingStageId();
    // istanbul ignore next -- defensive only not testable
    if (!viewingStageId) return false;

    // If stage has no children → nothing to configure
    if (!this.#stageHasChildren(viewingStageId)) {
      return false;
    }

    return this.#isStageBehaviorComplete(viewingStageId);
  });

  readonly stageQuestions = computed<StageDefinitionShape[]>(() => {
    return [
      ...this.#stageQuestions.filter((stageQuestion: StageDefinitionShape) =>
        this.#isEntityModeActive(stageQuestion)
      )
    ];
  });

  /** Live stage instances from vault */
  readonly stageInstances = computed<StageInstanceShape[]>(() => {
    const stageInstances = this.#state()?.stageInstances ?? [];
    return stageInstances.filter((stage: StageInstanceShape) =>
      this.#isEntityModeActive(stage)
    );
  });

  readonly #behaviorInstances = computed<BehaviorInstanceShape[]>(() => {
    const behaviorInstances = this.#state()?.behaviorInstances ?? [];
    return behaviorInstances.filter((behavior: BehaviorInstanceShape) =>
      this.#isEntityModeActive(behavior)
    );
  });

  //#endregion

  //#region Getters
  getBehaviorInstance(id: BehaviorIdType): BehaviorInstanceShape | undefined {
    return this.#behaviorInstances().find((b) => b.behaviorId === id);
  }

  getBehaviorSelectionMode(
    stageId: StageIdType
  ): BehaviorSelectionModeType | undefined {
    return this.stageInstances().find((s) => s.stageId === stageId)
      ?.behaviorSelectionMode;
  }

  restartBuilder(): void {
    this.#vault.reset();
    this.#initializeState();
  }

  //#endregion

  //#region Constructor
  constructor() {
    this.#vault.initialize();

    this.#indexBehaviors();

    this.#indexStages();

    effect(async () => {
      if (this.#initialized) return;

      this.#initialized = true;

      this.#initializeState();
    });
  }

  #initializeState(): void {
    const state = this.#state();

    if (!state?.stateInput) {
      this.commitStateInput({
        framework: null,
        primitive: null,
        shapeName: '',
        initialValue: null
      } as StateInputShape);
    }

    const stageInstances = this.#initializeStageInstances();

    const behaviorInstances = this.#initializeBehaviorInstances();

    if (state?.currentStep === undefined || state?.currentStep < 1) {
      this.#commitStep(1);
    }

    if (
      state?.stageInstances === undefined ||
      state?.stageInstances?.length === 0
    ) {
      this.#commitStageInstances(stageInstances);
    }

    if (
      state?.behaviorInstances === undefined ||
      state?.behaviorInstances?.length === 0
    ) {
      this.#commitBehaviorInstances(behaviorInstances);
    }
  }

  #indexStages(): void {
    this.#stageById.clear();

    for (const stage of this.#stageQuestions) {
      this.#stageById.set(stage.id, stage);
    }
  }

  #indexBehaviors(): void {
    this.#behaviorDefinitionsByStage.clear();

    for (const behavior of this.#behaviors) {
      this.#behaviorsById.set(behavior.id, behavior);
    }
  }

  #initializeStageInstances(): StageInstanceShape[] {
    const stageInstances: StageInstanceShape[] = [];
    this.#stageQuestions.map((stage, index) => {
      const behaviorList: BehaviorDefinitionShape[] = [];
      for (const behaviorId of stage.behaviors) {
        const behavior = this.#getBehaviorById(behaviorId);
        if (behavior) {
          behaviorList.push(behavior);
        }
      }

      this.#behaviorDefinitionsByStage.set(stage.id, behaviorList);

      stageInstances.push({
        stageId: stage.id,
        selected: stage.selected ?? null,
        status: stage.status ?? StageStatusTypes.Idle,
        mode: stage.mode,
        index,
        behaviorSelectionMode: stage.behaviorSelectionMode
      });
    });

    return stageInstances;
  }

  #initializeBehaviorInstances(): BehaviorInstanceShape[] {
    const behaviorInstances: BehaviorInstanceShape[] = [];

    for (const stage of this.#stageQuestions) {
      for (const behaviorId of stage.behaviors) {
        const behavior = this.#getBehaviorById(behaviorId);
        if (behavior) {
          const behaviorInstance = {
            behaviorId: behavior.id,
            stageId: behavior.parentId,
            selected: behavior.selected ?? null,
            default: behavior.default ?? false,
            complete: behavior.complete ?? null,
            mode: behavior.mode,
            params: undefined,
            frameworks: behavior.frameworks ?? []
          };
          behaviorInstances.push(behaviorInstance);
        }
      }
    }

    return behaviorInstances;
  }

  //#endregion

  //#region State Management
  setViewingStage(stageId: StageIdType | null): void {
    this.#vault.mergeState({
      value: {
        viewingStageId: stageId
      } as PipelineBuilderStateShape
    });
  }

  commitStateInput(partial: Partial<StateInputShape>): void {
    this.#vault.mergeState({
      value: {
        stateInput: partial
      } as PipelineBuilderStateShape
    });
  }

  #commitStageInstances(
    stageInstances: StageInstanceShape[] | undefined
  ): void {
    this.#vault.mergeState({
      value: {
        stageInstances
      } as PipelineBuilderStateShape
    });
  }

  #commitStep(currentStep: number): void {
    this.#vault.mergeState({
      value: {
        currentStep
      } as PipelineBuilderStateShape
    });
  }

  #commitBehaviorInstances(instances: BehaviorInstanceShape[]): void {
    this.#vault.mergeState({
      value: {
        behaviorInstances: instances
      } as PipelineBuilderStateShape
    });
  }

  //#endregion

  //#region Builder Actions
  incrementStep(): void {
    if (this.stepNumber() < this.#pipelineStepService.stepInstructions.length) {
      this.#commitStep(this.stepNumber() + 1);
    }
  }

  decrementStep(): void {
    if (this.stepNumber() > 1) {
      this.#commitStep(this.stepNumber() - 1);
    }
  }

  selectStageQuestion(id: StageIdType): void {
    this.#updateStageInstance(id, true);
  }

  deSelectStageQuestion(id: StageIdType): void {
    this.#updateStageInstance(id, false);
  }

  #getBehaviorById(id: BehaviorIdType): BehaviorDefinitionShape | undefined {
    return this.#behaviorsById.get(id);
  }

  getBehaviorDefinitionsForStage(
    stageId: StageIdType
  ): BehaviorDefinitionShape[] {
    const behaviors = this.#behaviorDefinitionsByStage.get(stageId) ?? [];
    return behaviors.filter(
      (behavior: BehaviorDefinitionShape) =>
        this.#isEntityModeActive(behavior) &&
        this.#isFrameworkBehavior(behavior)
    );
  }

  setBehaviorSelected(id: BehaviorIdType, selected: boolean): void {
    const state = this.#state();
    /* istanbul ignore next -- defensive invariant, unreachable in compliant runtimes */
    if (!state?.behaviorInstances) return;

    const instances = [...state.behaviorInstances];
    const target = instances.find((b) => b.behaviorId === id);
    if (!target) return;

    const stageId = target.stageId;
    const selectionMode = this.getBehaviorSelectionMode(stageId);

    // -----------------------------
    // SINGLE SELECTION MODE
    // -----------------------------
    if (selectionMode === 'single' && selected === true) {
      for (const inst of instances) {
        if (inst.stageId !== stageId) continue;

        if (inst.behaviorId !== id) {
          inst.selected = false;
          inst.complete = true;
          inst.params = undefined;
        }
      }
    }

    // -----------------------------
    // APPLY TARGET CHANGE
    // -----------------------------
    target.selected = selected;

    if (selected === null) {
      target.params = undefined;
      target.complete = false;
    } else if (selected === false) {
      target.params = undefined;
      target.complete = true;
    } else if (selected === true) {
      const def = this.#getBehaviorById(id);

      if (!def?.params || def.params.length === 0) {
        target.complete = true;
      }
    }

    // -----------------------------
    // DEFAULT FALLBACK (Single Mode)
    // -----------------------------
    if (selectionMode === 'single') {
      const stageBehaviors = instances.filter((b) => b.stageId === stageId);

      const noneSelected = stageBehaviors.every((b) => b.selected !== true);

      if (noneSelected) {
        const defaultBehavior = stageBehaviors.find((b) => b.default === true);

        if (defaultBehavior) {
          defaultBehavior.selected = true;
          defaultBehavior.complete = true;
        }
      }
    }

    this.#commitBehaviorInstances(instances);
    this.#commitStageInstances(this.#recalculateActiveStage(stageId));
  }

  updateBehaviorParams(
    id: BehaviorIdType,
    params: Record<string, unknown>
  ): void {
    const state = this.#state();
    /* istanbul ignore next -- defensive invariant, unreachable in compliant runtimes */
    if (!state?.behaviorInstances) return;

    const instances = [...state.behaviorInstances];
    const target = instances.find((b) => b.behaviorId === id);
    if (!target) return;

    target.params = params;

    // Completion logic: all params must be non-null / defined
    target.complete = Object.values(params).every(
      (value) => value !== null && value !== undefined
    );

    this.#commitBehaviorInstances(instances);

    // Important: DO NOT recalculate/advance stages here.
    // This keeps the UI stable while the user is still editing.
    this.#commitStageInstances(this.stageInstances());
  }

  finalizeActiveBehaviorStage(): void {
    const viewingStageId = this.viewingStageId();
    const stageInstances = this.stageInstances();

    /* istanbul ignore next -- defensive invariant, unreachable in compliant runtimes */
    if (!stageInstances?.length || !viewingStageId) return;

    const current = stageInstances.find((s) => s.stageId === viewingStageId);
    /* istanbul ignore next -- defensive invariant, unreachable in compliant runtimes */
    if (!current) return;

    if (!this.#isStageBehaviorComplete(current.stageId)) return;

    current.status = StageStatusTypes.Complete;

    const updated = this.#recalculateActiveStage(current.stageId);
    this.#commitStageInstances(updated);

    // NAVIGATION DECISION HERE
    const nextViewingStageId = this.#navigationEngine.getNextViewingStageId(
      this.stageInstances()
    );

    this.setViewingStage(nextViewingStageId);
  }

  resetActiveBehaviorStage(): void {
    const viewingStageId = this.viewingStageId();
    const stages = this.stageInstances();
    /* istanbul ignore next -- defensive invariant */
    if (!stages?.length) return;

    // Prefer active stage; otherwise reset the last committed stage
    const target = stages.find(
      (stage: StageInstanceShape) => stage.stageId === viewingStageId
    );

    /* istanbul ignore next -- defensive invariant, unreachable in compliant runtimes */
    if (!target) return;

    this.#resetBehaviorsForStage(target.stageId);

    // If this stage was previously "committed complete", reopen it
    if (target.status === StageStatusTypes.Complete) {
      target.status = StageStatusTypes.Idle;
    }

    // Ensure we have a single active stage after reset
    this.#commitStageInstances(this.#recalculateActiveStage(target.stageId));
  }
  //#endregion

  //#region UI Helpers
  getBehaviorUiState(behaviorId: BehaviorIdType): BehaviorStatusType {
    const instance = this.getBehaviorInstance(behaviorId);

    // Not selected / not initialized → gray
    if (!instance) {
      return BehaviorStatusTypes.Inactive;
    }

    if (instance.selected === null) {
      return BehaviorStatusTypes.Idle;
    }

    if (instance.selected !== null && instance.complete !== true) {
      return BehaviorStatusTypes.Idle;
    }

    if (instance.selected === false) {
      return BehaviorStatusTypes.Inactive;
    }

    return BehaviorStatusTypes.Complete;
  }

  getStageUiState(stageId: StageIdType): StageStatusType {
    const instance = this.stageInstances()?.find(
      (stage: StageInstanceShape) => stage.stageId === stageId
    );

    // Not selected / not initialized → gray
    if (!instance) {
      return StageStatusTypes.Inactive;
    }

    switch (instance.status) {
      case StageStatusTypes.Complete:
        return StageStatusTypes.Complete;

      case StageStatusTypes.Idle:
        return StageStatusTypes.Idle;

      default:
        return StageStatusTypes.Inactive;
    }
  }

  getStageSelectedState(stageId: StageIdType | null): boolean | null {
    if (!stageId) return null;

    const instance = this.stageInstances()?.find(
      (stage: StageInstanceShape) => stage.stageId === stageId
    );

    // Not selected / not initialized → gray
    if (!instance) {
      return null;
    }

    return instance.selected;
  }

  //#endregion

  //#region Private Methods

  #isEntityModeActive(
    behavior:
      | BehaviorInstanceShape
      | BehaviorDefinitionShape
      | StageInstanceShape
      | StageDefinitionShape
  ): boolean {
    return behavior.mode === this.#pipelineStepService.builderMode();
  }

  #getStageDefinition(stageId: StageIdType): StageDefinitionShape | null {
    return this.#stageById.get(stageId) ?? null;
  }

  #isStageBehaviorComplete(stageId: StageIdType): boolean {
    // Get the behaviors defined for this stage (mode-aware)
    const definitions = this.getBehaviorDefinitionsForStage(stageId);

    // No behaviors defined → complete by definition
    /* istanbul ignore next -- defensive invariant */
    if (definitions.length === 0) return true;

    // Map definitions to their live instances
    const instances = definitions
      .map((def) => this.getBehaviorInstance(def.id))
      .filter(Boolean) as BehaviorInstanceShape[];

    // Defensive: if any expected instance is missing, treat as incomplete
    /* istanbul ignore next -- defensive invariant */
    if (instances.length !== definitions.length) return false;

    // RULE 1: every behavior must be answered
    if (instances.some((b) => b.selected === null)) {
      return false;
    }

    // RULE 2: all answered behaviors must be complete
    return instances.every((b) => b.complete === true);
  }

  #resetBehaviorsForStage(stageId: StageIdType): void {
    const behaviorInstances = this.#behaviorInstances();
    /* istanbul ignore next -- defensive invariant */
    if (!behaviorInstances) return;

    const instances = [...behaviorInstances];

    for (const inst of instances) {
      if (inst.stageId !== stageId) continue;
      inst.selected = null;
      inst.complete = null;
      inst.params = undefined;
    }

    this.#commitBehaviorInstances(instances);
    this.#commitStageInstances(this.#recalculateActiveStage(stageId));
  }

  #stageHasChildren(stageId: StageIdType): boolean {
    const def = this.#getStageDefinition(stageId);
    // istanbul ignore next -- defensive only not testable
    return (def?.behaviors?.length ?? 0) > 0;
  }

  #recalculateActiveStage(
    stageId: StageIdType
  ): StageInstanceShape[] | undefined {
    const stageInstances = this.stageInstances();
    /* istanbul ignore next */
    if (!stageInstances?.length) return;

    // Defensive: work on existing array reference intentionally
    // (engine relies on vault merge to trigger reactivity)

    // Normalize base state first
    for (const stage of stageInstances) {
      // Unselected stages are always Inactive
      if (stage.stageId !== stageId) continue;
      if (!stage.selected) {
        stage.status = StageStatusTypes.Inactive;
        continue;
      }

      const hasChildren = this.#stageHasChildren(stage.stageId);

      // Selected stage with no children → permanently Complete
      if (!hasChildren) {
        stage.status = StageStatusTypes.Complete;
        continue;
      }

      // Preserve committed Complete stages (never downgrade)
      if (stage.status === StageStatusTypes.Complete) {
        continue;
      }

      // Everything else becomes Idle for now
      stage.status = StageStatusTypes.Idle;
    }

    return stageInstances;
  }

  #updateStageInstance(stageId: StageIdType, selected: boolean): void {
    const stageInstances = this.stageInstances();

    const target = stageInstances.find((s) => s.stageId === stageId);
    if (!target) return;

    const hasChildren = this.#stageHasChildren(stageId);

    if (!selected) {
      // Parent "No" → cascade reset
      this.#resetBehaviorsForStage(stageId);
      target.selected = false;
      target.status = StageStatusTypes.Inactive;
    } else {
      // Parent "Yes"
      target.selected = true;
      target.status = hasChildren
        ? StageStatusTypes.Idle
        : StageStatusTypes.Complete;
    }

    // Recalculate active/idle distribution
    const updated = this.#recalculateActiveStage(stageId);

    // Commit updated stage state
    this.#commitStageInstances(updated);

    // Navigation must also run here
    const nextViewingStageId = this.#navigationEngine.getNextViewingStageId(
      this.stageInstances()
    );
    this.setViewingStage(nextViewingStageId);
  }
  //#endregion
}
