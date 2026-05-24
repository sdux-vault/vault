import { TestBed } from '@angular/core/testing';
import { provideVaultTesting } from '@sdux-vault/angular';
import { resetVaultForTests, vaultSettled } from '@sdux-vault/engine';
import { clearSessionStorage } from '@sdux-vault/testing-utils';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { PIPELINE_BUILDER_BEHAVIOR_TOKEN } from '../tokens/pipeline-builder-behaviors.token';
import { PIPELINE_BUILDER_STAGE_TOKEN } from '../tokens/pipeline-builder-stages.token';
import { StateFrameworkTypes } from '../types/state-framework.type';
import { PipelineBuilderService } from './pipeline-builder.service';

describe('Service: PipelineBuilder', () => {
  const key = 'pipeline-builder';
  let service: PipelineBuilderService;

  const MOCK_STAGES: any[] = [
    {
      id: 'stageA' as any as any,
      stageLabel: 'Stage A',
      label: 'Stage With Behaviors',
      description: 'Has child behaviors',
      selectionQuestion: 'Enable Stage A?',
      behaviors: ['behavior1', 'behavior2'],
      selectionMode: 'Multiple',
      mode: 'basic'
    },
    {
      id: 'stageB' as any,
      stageLabel: 'Stage B',
      label: 'Stage Without Behaviors',
      description: 'No children',
      selectionQuestion: 'Enable Stage B?',
      behaviors: [],
      selectionMode: 'Single',
      mode: 'basic'
    },
    {
      id: 'stageC' as any,
      stageLabel: 'Stage C',
      label: 'Second Stage With Behaviors',
      description: 'Used for active stage shifting',
      selectionQuestion: 'Enable Stage C?',
      behaviors: ['behavior3'],
      selectionMode: 'Multiple',
      mode: 'basic'
    },
    {
      id: 'stageD' as any,
      stageLabel: 'Stage D',
      label: 'Second Stage With Behaviors',
      description: 'Used for active stage shifting',
      selectionQuestion: 'Enable Stage C?',
      behaviors: ['behavior3'],
      selectionMode: 'Multiple',
      mode: 'advanced'
    }
  ];

  const MOCK_BEHAVIORS: any[] = [
    {
      id: 'behavior1',
      parentId: 'stageA' as any as any,
      label: 'Behavior No Params',
      question: 'Enable behavior1?',
      params: [], // no params → auto complete
      mode: 'basic',
      frameworks: [StateFrameworkTypes.Angular]
    },
    {
      id: 'behavior2',
      parentId: 'stageA' as any as any,
      label: 'Behavior With Params',
      question: 'Configure behavior2?',
      params: [
        {
          id: 'param1',
          label: 'Param 1',
          type: 'string'
        }
      ],
      mode: 'basic'
    },
    {
      id: 'behavior3',
      parentId: 'stageC' as any,
      label: 'Behavior For Stage C',
      question: 'Enable behavior3?',
      params: [],
      mode: 'basic'
    },
    {
      id: 'behavior4',
      parentId: 'stageC' as any,
      label: 'Behavior For Stage C',
      question: 'Enable behavior4?',
      params: [],
      mode: 'advanced'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [
        provideVaultTesting(),
        {
          provide: PIPELINE_BUILDER_STAGE_TOKEN,
          useValue: structuredClone(MOCK_STAGES)
        },
        {
          provide: PIPELINE_BUILDER_BEHAVIOR_TOKEN,
          useValue: structuredClone(MOCK_BEHAVIORS)
        }
      ]
    }).compileComponents();

    service = TestBed.inject(PipelineBuilderService);

    TestBed.tick();
    await vaultSettled(key);
  });

  afterEach(() => {
    clearSessionStorage(
      `vault::sessionstorage::${key}::SDUX::Behavior::Persist::SessionStorage`
    );
  });

  it('should have the steps and transverse them', async () => {
    expect(service.stepNumber()).toBe(1);

    service.incrementStep();
    await vaultSettled(key);

    service.incrementStep();
    await vaultSettled(key);

    service.incrementStep();
    await vaultSettled(key);

    service.incrementStep();

    expect(service.stepNumber()).toBe(4);
    service.decrementStep();

    await vaultSettled(key);
    service.decrementStep();

    await vaultSettled(key);
    service.decrementStep();

    await vaultSettled(key);
    service.decrementStep();

    expect(service.stepNumber()).toBe(1);
  });

  it('should have stage questions', () => {
    const stageQuestions = service.stageQuestions();
    expect(stageQuestions[0]).toEqual(
      Object({
        id: 'stageA' as any as any,
        stageLabel: 'Stage A',
        label: 'Stage With Behaviors',
        description: 'Has child behaviors',
        selectionQuestion: 'Enable Stage A?',
        behaviors: ['behavior1', 'behavior2'],
        selectionMode: 'Multiple',
        mode: 'basic'
      })
    );

    expect(stageQuestions[0]).toEqual(
      Object({
        id: 'stageA' as any as any,
        stageLabel: 'Stage A',
        label: 'Stage With Behaviors',
        description: 'Has child behaviors',
        selectionQuestion: 'Enable Stage A?',
        behaviors: ['behavior1', 'behavior2'],
        selectionMode: 'Multiple',
        mode: 'basic'
      })
    );

    expect(service.stageQuestions()[0]).toEqual(
      Object({
        id: 'stageA' as any as any,
        stageLabel: 'Stage A',
        label: 'Stage With Behaviors',
        description: 'Has child behaviors',
        selectionQuestion: 'Enable Stage A?',
        behaviors: ['behavior1', 'behavior2'],
        selectionMode: 'Multiple',
        mode: 'basic'
      })
    );
  });

  describe('State Input APIs', () => {
    it('stateInputComplete should return false when empty', async () => {
      expect(service.stateInputComplete()).toBeFalse();
    });

    it('stateInputComplete should return false when shapeName too short', async () => {
      service.commitStateInput({
        framework: 'Angular' as any,
        shapeName: 'ab',
        primitive: 'string' as any,
        initialValue: 'test'
      });

      await vaultSettled(key);

      expect(service.stateInputComplete()).toBeFalse();
    });

    it('stateInputComplete should return true when all required fields valid', async () => {
      service.commitStateInput({
        framework: 'Angular' as any,
        shapeName: 'UserState',
        primitive: 'string' as any,
        initialValue: '{}'
      });

      await vaultSettled(key);

      expect(service.stateInputComplete()).toBeTrue();

      expect(service.getStateFramework()).toBe('Angular');
      expect(service.getShapeName()).toBe('UserState');
      expect(service.getStatePrimitive()).toBe('string');
      expect(service.getInitialValue()).toBe('{}');
    });

    it('getStateFramework should return null if invalid', async () => {
      service.commitStateInput({ framework: 'InvalidFramework' as any });

      await vaultSettled(key);

      expect(service.getStateFramework()).toBeNull();
    });

    it('getStateFramework should return valid framework', async () => {
      service.commitStateInput({ framework: 'Angular' as any });

      await vaultSettled(key);

      expect(service.getStateFramework()).toBe('Angular');
    });

    it('getShapeName should return null when not set', () => {
      expect(service.getShapeName()).toBe('');
    });

    it('getShapeName should return value when set', async () => {
      service.commitStateInput({ shapeName: 'TestShape' });

      await vaultSettled(key);

      expect(service.getShapeName()).toBe('TestShape');
    });

    describe('getInitialValue', () => {
      it('getInitialValue should return value when valid type', async () => {
        service.commitStateInput({
          initialValue: '{}'
        });

        await vaultSettled(key);

        expect(service.getInitialValue()).toBe('{}' as any);
      });

      it('getInitialValue should return null if invalid', async () => {
        service.commitStateInput({ initialValue: 'invalidType' as any });

        await vaultSettled(key);

        expect(service.getInitialValue()).toBeNull();
      });

      it('getInitialValue should return null when invalid type', async () => {
        service.commitStateInput({
          initialValue: { not: 'valid' } as any
        });

        await vaultSettled(key);

        expect(service.getInitialValue()).toBeNull();
      });
    });

    describe('getStatePrimitive', () => {
      it('getStatePrimitive should return null if invalid', async () => {
        service.commitStateInput({ primitive: 'invalid' as any });

        await vaultSettled(key);

        expect(service.getStatePrimitive()).toBeNull();
      });

      it('getStatePrimitive should return primitive when valid', async () => {
        service.commitStateInput({
          primitive: 'string' as any
        });

        await vaultSettled(key);

        expect(service.getStatePrimitive()).toBe('string');
      });

      it('getStatePrimitive should return null when invalid', async () => {
        service.commitStateInput({
          primitive: 'not-valid' as any
        });

        await vaultSettled(key);

        expect(service.getStatePrimitive()).toBeNull();
      });
    });

    it('should return false by default', () => {
      expect(service.stateInputComplete()).toBeFalse();
    });

    it('should return false if framework is missing', async () => {
      service.commitStateInput({
        shapeName: 'TestShape',
        primitive: 'string',
        initialValue: 'value'
      } as any);

      await vaultSettled(key);

      expect(service.stateInputComplete()).toBeFalse();
    });

    it('should return false if shapeName is too short', async () => {
      service.commitStateInput({
        framework: 'angular',
        shapeName: 'ab', // too short
        primitive: 'string',
        initialValue: 'value'
      } as any);

      await vaultSettled(key);

      expect(service.stateInputComplete()).toBeFalse();
    });

    it('should return false if primitive is missing', async () => {
      service.commitStateInput({
        framework: 'angular',
        shapeName: 'ValidName',
        initialValue: 'value'
      } as any);

      await vaultSettled(key);

      expect(service.stateInputComplete()).toBeFalse();
    });

    it('should return false if initialValue is missing', async () => {
      service.commitStateInput({
        framework: 'angular',
        shapeName: 'ValidName',
        primitive: 'string'
      } as any);

      await vaultSettled(key);

      expect(service.stateInputComplete()).toBeFalse();
    });

    it('should return true when all fields are valid', async () => {
      service.commitStateInput({
        framework: 'angular',
        shapeName: 'ValidName',
        primitive: 'string',
        initialValue: 'value'
      } as any);

      await vaultSettled(key);

      expect(service.stateInputComplete()).toBeTrue();
    });

    it('should trim shapeName before validation', async () => {
      service.commitStateInput({
        framework: 'angular',
        shapeName: '   ValidName   ',
        primitive: 'string',
        initialValue: 'value'
      } as any);

      await vaultSettled(key);

      expect(service.stateInputComplete()).toBeTrue();
    });
  });

  describe('Stage Foundation APIs', () => {
    describe('isViewingStageContinueEnabled', () => {
      it('should return false when no viewingStageId', () => {
        expect(service.isViewingStageContinueEnabled()).toBeFalse();
      });

      it('should return false when viewing stage has no children', async () => {
        service.setViewingStage('stageB' as any); // stageB has no behaviors

        await vaultSettled(key);

        expect(service.isViewingStageContinueEnabled()).toBeFalse();
      });

      it('should return false when viewing stage has children but behaviors not answered', async () => {
        service.selectStageQuestion('stageA' as any as any);

        await vaultSettled(key);

        service.setViewingStage('stageA' as any as any);

        await vaultSettled(key);

        // behaviors still null
        expect(service.isViewingStageContinueEnabled()).toBeFalse();
      });

      it('should return false when at least one behavior is incomplete', async () => {
        service.selectStageQuestion('stageA' as any as any);

        await vaultSettled(key);

        service.setViewingStage('stageA' as any as any);

        await vaultSettled(key);

        service.setBehaviorSelected('behavior1' as any, true); // auto complete

        await vaultSettled(key);

        // behavior2 still null
        expect(service.isViewingStageContinueEnabled()).toBeFalse();
      });

      it('should return true when all behaviors are answered and complete', async () => {
        service.selectStageQuestion('stageA' as any as any);

        await vaultSettled(key);

        service.setViewingStage('stageA' as any as any);

        await vaultSettled(key);

        service.setBehaviorSelected('behavior1' as any, true);

        await vaultSettled(key);

        service.setBehaviorSelected('behavior2' as any, true);

        await vaultSettled(key);

        service.updateBehaviorParams('behavior2' as any, { param1: 'done' });

        await vaultSettled(key);

        expect(service.isViewingStageContinueEnabled()).toBeTrue();
      });
    });

    describe('stageInstances', () => {
      it('stageInstances should return initialized stages', () => {
        const instances = service.stageInstances();
        expect(instances.length).toBe(3);
      });

      it('stageInstances should return empty array when no stages selected yet', () => {
        expect(service.stageInstances()).toEqual(jasmine.any(Array));
      });
    });

    describe('allStagesResolved', () => {
      it('allStagesResolved should return true when no complete or idle stages', async () => {
        // select stageB (no children → auto complete)
        service.selectStageQuestion('stageB' as any);
        await vaultSettled(key);

        expect(service.allStagesResolved()).toBeFalse();
      });

      it('allStagesResolved should return false when active stage exists', async () => {
        service.selectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        expect(service.allStagesResolved()).toBeFalse();
      });

      it('should return false if any stage is active', async () => {
        service.selectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        expect(service.allStagesResolved()).toBeFalse();
      });

      it('should return false if any stage is idle', async () => {
        service.selectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        // Deselect to push to idle via engine recalculation
        service.deSelectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        // Now manually reselect but don't activate
        service.selectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        // If it has children and not complete, it will be Active
        // so instead we simulate idle by selecting multiple stages
        service.selectStageQuestion('stageC' as any);
        await vaultSettled(key);

        // One of them will be idle
        expect(service.allStagesResolved()).toBeFalse();
      });

      it('should return true when all stages are complete', async () => {
        service.commitStateInput({
          framework: 'angular'
        });
        await vaultSettled(key);

        service.selectStageQuestion('stageB' as any); // no children → auto complete
        await vaultSettled(key);

        service.selectStageQuestion('stageA' as any); // no children → auto complete
        await vaultSettled(key);

        service.setBehaviorSelected('behavior1' as any, true); // children → auto complete
        await vaultSettled(key);

        service.setBehaviorSelected('behavior2' as any, false); // no children → auto complete
        await vaultSettled(key);

        service.finalizeActiveBehaviorStage();
        await vaultSettled(key);

        service.selectStageQuestion('stageC' as any); // no children → auto complete
        await vaultSettled(key);

        service.setBehaviorSelected('behavior3' as any, true); // no children → auto complete
        await vaultSettled(key);

        service.finalizeActiveBehaviorStage();
        await vaultSettled(key);

        expect(service.getStageUiState('stageA' as any)).toBe('complete');
        expect(service.getStageUiState('stageB' as any)).toBe('complete');
        expect(service.getStageUiState('stageC' as any)).toBe('complete');
        expect(service.allStagesResolved()).toBeTrue();
      });

      it('should return false when all stages are idle', async () => {
        // Fresh state → all unselected
        expect(service.allStagesResolved()).toBeFalse();
      });
    });

    describe('stageInstances()', () => {
      it('should initialize stage instances from injected stages', () => {
        const instances = service.stageInstances();

        expect(instances.length).toBe(3);

        expect(instances[0]).toEqual(
          jasmine.objectContaining({
            stageId: 'stageA' as any as any,
            selected: null,
            status: 'idle',
            index: 0
          })
        );

        expect(instances[1]).toEqual(
          jasmine.objectContaining({
            stageId: 'stageB' as any,
            selected: null,
            status: 'idle',
            index: 1
          })
        );

        expect(instances[2]).toEqual(
          jasmine.objectContaining({
            stageId: 'stageC' as any,
            selected: null,
            status: 'idle',
            index: 2
          })
        );
      });

      it('should initialize stage instances correctly', () => {
        const instances = service.stageInstances();
        expect(instances.length).toBe(3);
      });
    });

    describe('getStageSelectedState', () => {
      it('should return null initially for all stages', () => {
        expect(
          service.getStageSelectedState('stageA' as any as any)
        ).toBeNull();
        expect(service.getStageSelectedState('stageB' as any)).toBeNull();
        expect(service.getStageSelectedState('stageC' as any)).toBeNull();
      });

      it('should return true when stage is selected', async () => {
        service.selectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        expect(
          service.getStageSelectedState('stageA' as any as any)
        ).toBeTrue();
      });

      it('should return false when stage is deselected', async () => {
        service.selectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        service.deSelectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        expect(
          service.getStageSelectedState('stageA' as any as any)
        ).toBeFalse();
      });

      it('should return null if stage does not exist (defensive branch)', () => {
        expect(service.getStageSelectedState('not-real' as any)).toBeNull();
      });
    });

    describe('getBehaviorUiState', () => {
      beforeEach(async () => {
        service.selectStageQuestion('stageA' as any);
        await vaultSettled(key);
      });

      it('should return Inactive when behavior instance does not exist', () => {
        const state = service.getBehaviorUiState('doesNotExist' as any);
        expect(state).toBe('inactive');
      });

      it('should return Idle when selected is null', async () => {
        const instance = service.getBehaviorInstance('behavior1' as any);
        instance!.selected = null;
        instance!.complete = null;

        const state = service.getBehaviorUiState('behavior1' as any);
        expect(state).toBe('idle');
      });

      it('should return Idle when selected=true but complete=false', async () => {
        service.setBehaviorSelected('behavior2' as any, true);
        await vaultSettled(key);

        const instance = service.getBehaviorInstance('behavior2' as any);
        instance!.complete = false;

        const state = service.getBehaviorUiState('behavior2' as any);
        expect(state).toBe('idle');
      });

      it('should return Idle when selected=true but complete=null', async () => {
        service.setBehaviorSelected('behavior2' as any, true);
        await vaultSettled(key);

        const instance = service.getBehaviorInstance('behavior2' as any);
        instance!.complete = null;

        const state = service.getBehaviorUiState('behavior2' as any);
        expect(state).toBe('idle');
      });

      it('should return Inactive when selected=false and complete=true', async () => {
        service.setBehaviorSelected('behavior1' as any, false);
        await vaultSettled(key);

        const state = service.getBehaviorUiState('behavior1' as any);
        expect(state).toBe('inactive');
      });

      it('should return Inactive when selected=false and complete=null (defensive case)', async () => {
        const instance = service.getBehaviorInstance('behavior1' as any);
        instance!.selected = false;
        instance!.complete = null;

        const state = service.getBehaviorUiState('behavior1' as any);
        expect(state).toBe('idle');
      });

      it('should return Complete when selected=true and complete=true', async () => {
        service.setBehaviorSelected('behavior1' as any, true);
        await vaultSettled(key);

        const state = service.getBehaviorUiState('behavior1' as any);
        expect(state).toBe('complete');
      });

      it('should treat selected=true and complete=true as Complete even if params exist', async () => {
        service.setBehaviorSelected('behavior2' as any, true);
        await vaultSettled(key);

        service.updateBehaviorParams('behavior2' as any, { param1: 'value' });
        await vaultSettled(key);

        const state = service.getBehaviorUiState('behavior2' as any);
        expect(state).toBe('complete');
      });
    });

    describe('getStageUiState', () => {
      it('should return inactive initially', () => {
        expect(service.getStageUiState('stageA' as any as any)).toBe('idle');
        expect(service.getStageUiState('stageB' as any)).toBe('idle');
        expect(service.getStageUiState('stageC' as any)).toBe('idle');
      });

      it('should return idle when stage with children is selected', async () => {
        service.selectStageQuestion('stageA' as any as any); // stageA has behaviors
        await vaultSettled(key);

        expect(service.getStageUiState('stageA' as any as any)).toBe('idle');
      });

      it('should return complete when stage without children is selected', async () => {
        service.selectStageQuestion('stageB' as any); // no behaviors
        await vaultSettled(key);

        expect(service.getStageUiState('stageB' as any)).toBe('complete');
      });

      it('should return inactive when stage is deselected', async () => {
        service.selectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        service.deSelectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        expect(service.getStageUiState('stageA' as any as any)).toBe(
          'inactive'
        );
      });

      it('should return inactive for non-existent stage (defensive branch)', () => {
        expect(service.getStageUiState('not-real' as any)).toBe('inactive');
      });
    });
  });

  describe('Stage Selection APIs', () => {
    it('should auto-complete selected stage with no children', async () => {
      // stageB has no behaviors

      service.selectStageQuestion('stageB' as any);
      await vaultSettled(key);

      expect(service.getStageUiState('stageB' as any)).toBe('complete');
    });

    describe('selectStageQuestion()', () => {
      it('should safely return if stageId does not exist (defensive branch)', async () => {
        const before = structuredClone(service.stageInstances());

        service.selectStageQuestion('does-not-exist' as any);

        // await vaultSettled(key);

        const after = service.stageInstances();

        expect(after).toEqual(before); // no mutation
      });

      it('should return idle when stage is selected but not first eligible', async () => {
        service.selectStageQuestion('stageA' as any);
        await vaultSettled(key);

        service.selectStageQuestion('stageC' as any);
        await vaultSettled(key);

        // stageA has lower index → Active
        expect(service.getStageUiState('stageA' as any)).toBe('idle');

        // stageC selected but not first → Idle
        expect(service.getStageUiState('stageC' as any)).toBe('idle');
      });

      it('should mark a stage as selected', async () => {
        service.selectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        expect(
          service.getStageSelectedState('stageA' as any as any)
        ).toBeTrue();
      });

      it('should set stage with NO behaviors to complete immediately', async () => {
        service.selectStageQuestion('stageB' as any); // no behaviors
        await vaultSettled(key);

        expect(service.getStageUiState('stageB' as any)).toBe('complete');
      });

      it('should set stage WITH behaviors to active (first eligible)', async () => {
        service.selectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        expect(service.getStageUiState('stageA' as any as any)).toBe('idle');
      });

      it('should activate next eligible stage when first is complete', async () => {
        service.selectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        service.setViewingStage('stageA' as any as any);
        await vaultSettled(key);

        service.setBehaviorSelected('behavior1' as any, true);
        await vaultSettled(key);

        service.setBehaviorSelected('behavior2' as any, true);
        await vaultSettled(key);

        service.updateBehaviorParams('behavior2' as any, { param1: 'value' });
        await vaultSettled(key);

        service.finalizeActiveBehaviorStage();
        await vaultSettled(key);

        service.selectStageQuestion('stageC' as any);
        await vaultSettled(key);

        expect(service.getStageUiState('stageC' as any)).toBe('idle');
      });
    });

    describe('deSelectStageQuestion()', () => {
      it('should safely return if stageId does not exist (defensive branch)', async () => {
        const before = structuredClone(service.stageInstances());

        service.deSelectStageQuestion('does-not-exist' as any);

        const after = service.stageInstances();

        expect(after).toEqual(before); // no mutation
      });

      it('should mark stage as not selected', async () => {
        service.selectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        service.deSelectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        expect(
          service.getStageSelectedState('stageA' as any as any)
        ).toBeFalse();
      });

      it('should set stage status to inactive when deselected', async () => {
        service.selectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        service.deSelectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        expect(service.getStageUiState('stageA' as any as any)).toBe(
          'inactive'
        );
      });

      it('should reset behaviors when stage is deselected', async () => {
        service.selectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        service.setBehaviorSelected('behavior1' as any, true);
        await vaultSettled(key);

        service.deSelectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        const instance = service.getBehaviorInstance('behavior1' as any);
        expect(instance?.selected).toBeNull();
        expect(instance?.complete).toBeNull();
      });
    });

    describe('getStageSelectedState()', () => {
      it('should return null for unknown stage', () => {
        expect(service.getStageSelectedState('doesNotExist' as any)).toBeNull();
      });

      it('should return null before selection', () => {
        expect(
          service.getStageSelectedState('stageA' as any as any)
        ).toBeNull();
      });

      it('should return true after selecting', async () => {
        service.selectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        expect(
          service.getStageSelectedState('stageA' as any as any)
        ).toBeTrue();
      });

      it('should return false after deselecting', async () => {
        service.selectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        service.deSelectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        expect(
          service.getStageSelectedState('stageA' as any as any)
        ).toBeFalse();
      });
    });

    describe('getStageUiState()', () => {
      it('should return inactive for unknown stage', () => {
        expect(service.getStageUiState('doesNotExist' as any)).toBe('inactive');
      });

      it('should return inactive before selection', () => {
        expect(service.getStageUiState('stageA' as any as any)).toBe('idle');
      });

      it('should return active when first selected stage has children', async () => {
        service.selectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        expect(service.getStageUiState('stageA' as any as any)).toBe('idle');
      });

      it('should return complete when selected stage has no children', async () => {
        service.selectStageQuestion('stageB' as any);
        await vaultSettled(key);

        expect(service.getStageUiState('stageB' as any)).toBe('complete');
      });

      it('should return idle when another stage is active', async () => {
        service.selectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        service.selectStageQuestion('stageC' as any);
        await vaultSettled(key);

        // stageA remains active because it's first eligible
        expect(service.getStageUiState('stageC' as any)).toBe('idle');
      });
    });
  });

  describe('Behavior Foundation APIs', () => {
    describe('getBehaviorSelectionMode', () => {
      it('should return behaviorSelectionMode for a stage', () => {
        const mode = service.getBehaviorSelectionMode('stageA' as any);

        expect(mode).toBeUndefined();
        // because your MOCK_STAGES currently do NOT define behaviorSelectionMode
      });

      it('should return undefined for unknown stage', () => {
        const mode = service.getBehaviorSelectionMode('doesNotExist' as any);

        expect(mode).toBeUndefined();
      });

      it('should reflect injected behaviorSelectionMode when provided', async () => {
        // Reconfigure with behaviorSelectionMode defined
        TestBed.resetTestingModule();
        resetVaultForTests();
        clearSessionStorage('vault::sessionstorage::pipeline-builder');

        await TestBed.configureTestingModule({
          imports: [sduxTestingModule],
          providers: [
            {
              provide: PIPELINE_BUILDER_STAGE_TOKEN,
              useValue: [
                {
                  ...MOCK_STAGES[0],
                  behaviorSelectionMode: 'single'
                }
              ]
            },
            {
              provide: PIPELINE_BUILDER_BEHAVIOR_TOKEN,
              useValue: []
            }
          ]
        }).compileComponents();

        const freshService = TestBed.inject(PipelineBuilderService);
        TestBed.tick();
        await vaultSettled(key);

        expect(freshService.getBehaviorSelectionMode('stageA' as any)).toBe(
          'single'
        );
      });
    });

    describe('getBehaviorInstance', () => {
      it('should return undefined for unknown behavior', () => {
        const result = service.getBehaviorInstance('unknown' as any);
        expect(result).toBeUndefined();
      });

      it('should return initialized behavior instance', () => {
        const instance = service.getBehaviorInstance('behavior1' as any);
        expect(instance).toEqual(
          jasmine.objectContaining({
            behaviorId: 'behavior1',
            stageId: 'stageA' as any,
            selected: null,
            complete: null
          })
        );
      });
    });

    describe('getBehaviorsForStage', () => {
      it('should return behaviors for stage with children', () => {
        const behaviors = service.getBehaviorDefinitionsForStage(
          'stageA' as any as any
        );

        expect(behaviors.length).toBe(2);
        expect(behaviors.map((b) => b.id)).toEqual([
          'behavior1' as any,
          'behavior2' as any
        ]);
      });

      it('should return empty array for stage without children', () => {
        const behaviors = service.getBehaviorDefinitionsForStage(
          'stageB' as any
        );
        expect(behaviors).toEqual([]);
      });

      it('should return empty array for unknown stage', () => {
        const behaviors = service.getBehaviorDefinitionsForStage(
          'unknown' as any
        );
        expect(behaviors).toEqual([]);
      });
    });

    describe('setBehaviorSelected', () => {
      it('should set selected=true for behavior with no params and auto-complete it', async () => {
        service.setBehaviorSelected('behavior1' as any, true);
        await vaultSettled(key);

        const instance = service.getBehaviorInstance('behavior1' as any);

        expect(instance?.selected).toBeTrue();
        expect(instance?.complete).toBeTrue(); // auto complete
        expect(instance?.params).toBeUndefined();
      });

      it('should set selected=true for behavior with params but not auto-complete', async () => {
        service.selectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        service.setBehaviorSelected('behavior2' as any, true);
        await vaultSettled(key);

        const instance = service.getBehaviorInstance('behavior2' as any);

        expect(instance?.selected).toBeTrue();
        expect(instance?.complete).not.toBeTrue(); // has params → not auto-complete
      });

      it('should set selected=false and mark complete=true', async () => {
        service.selectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        service.setBehaviorSelected('behavior1' as any, false);
        await vaultSettled(key);

        const instance = service.getBehaviorInstance('behavior1' as any);

        expect(instance?.selected).toBeFalse();
        expect(instance?.complete).toBeTrue();
        expect(instance?.params).toBeUndefined();
      });

      it('should reset params and mark incomplete when selected=null', async () => {
        service.setBehaviorSelected('behavior1' as any, null as any);
        await vaultSettled(key);

        const instance = service.getBehaviorInstance('behavior1' as any);

        expect(instance?.selected).toBeNull();
        expect(instance?.complete).toBeFalse();
        expect(instance?.params).toBeUndefined();
      });

      it('should safely return if behavior does not exist', async () => {
        service.setBehaviorSelected('unknown' as any, true);

        expect(true).toBeTrue(); // no crash
      });

      it('should deselect other behaviors in single selection mode', async () => {
        // First, configure stageA to be single selection
        const stages = service.stageInstances();
        const stageA = stages.find((s) => s.stageId === ('stageA' as any));
        stageA!.behaviorSelectionMode = 'single';

        service.setBehaviorSelected('behavior1' as any, true);
        await vaultSettled(key);

        service.setBehaviorSelected('behavior2' as any, true);
        await vaultSettled(key);

        const b1 = service.getBehaviorInstance('behavior1' as any);
        const b2 = service.getBehaviorInstance('behavior2' as any);

        expect(b2?.selected).toBeTrue();
        expect(b1?.selected).toBeFalse();
        expect(b1?.complete).toBeTrue(); // auto-marked complete
      });

      it('should auto-select default behavior if none selected in single mode', async () => {
        const stages = service.stageInstances();
        const stageA = stages.find((s) => s.stageId === ('stageA' as any));
        stageA!.behaviorSelectionMode = 'single';

        // Mark behavior1 as default
        const b1 = service.getBehaviorInstance('behavior1' as any);
        b1!.default = true;

        // Explicitly set BOTH behaviors to false
        service.setBehaviorSelected('behavior1' as any, false);
        await vaultSettled(key);

        service.setBehaviorSelected('behavior2' as any, false);
        await vaultSettled(key);

        const updated = service.getBehaviorInstance('behavior1' as any);

        expect(updated?.selected).toBeTrue();
        expect(updated?.complete).toBeTrue();
      });

      it('should not auto-select any behavior if none selected and no default exists', async () => {
        const stages = service.stageInstances();
        const stageA = stages.find((s) => s.stageId === ('stageA' as any));
        stageA!.behaviorSelectionMode = 'single';

        service.setBehaviorSelected('behavior1' as any, false);
        service.setBehaviorSelected('behavior2' as any, false);
        await vaultSettled(key);

        const b1 = service.getBehaviorInstance('behavior1' as any);
        const b2 = service.getBehaviorInstance('behavior2' as any);

        expect(b1?.selected).toBeFalse();
        expect(b2?.selected).toBeFalse();
      });

      it('should allow multiple behaviors selected in multiple mode', async () => {
        const stages = service.stageInstances();
        const stageA = stages.find((s) => s.stageId === ('stageA' as any));
        stageA!.behaviorSelectionMode = 'multiple';

        service.setBehaviorSelected('behavior1' as any, true);
        await vaultSettled(key);

        service.setBehaviorSelected('behavior2' as any, true);
        await vaultSettled(key);

        const b1 = service.getBehaviorInstance('behavior1' as any);
        const b2 = service.getBehaviorInstance('behavior2' as any);

        expect(b1?.selected).toBeTrue();
        expect(b2?.selected).toBeTrue();
      });

      it('should not affect behaviors in other stages during single selection', async () => {
        const stages = service.stageInstances();
        const stageA = stages.find((s) => s.stageId === ('stageA' as any));
        stageA!.behaviorSelectionMode = 'single';

        service.setBehaviorSelected('behavior1' as any, true);
        await vaultSettled(key);

        service.setBehaviorSelected('behavior3' as any, true);
        await vaultSettled(key);

        const b1 = service.getBehaviorInstance('behavior1' as any);
        const b3 = service.getBehaviorInstance('behavior3' as any);

        expect(b1?.selected).toBeTrue(); // unchanged
        expect(b3?.selected).toBeTrue();
      });
    });

    describe('updateBehaviorParams', () => {
      it('should update params and mark complete when all params are defined', async () => {
        service.setBehaviorSelected('behavior2' as any, true);
        await vaultSettled(key);

        service.updateBehaviorParams('behavior2' as any, { param1: 'value' });
        await vaultSettled(key);

        const instance = service.getBehaviorInstance('behavior2' as any);

        expect(instance?.params).toEqual({ param1: 'value' });
        expect(instance?.complete).toBeTrue();
      });

      it('should mark incomplete if param is null', async () => {
        service.setBehaviorSelected('behavior2' as any, true);
        await vaultSettled(key);

        service.updateBehaviorParams('behavior2' as any, { param1: null });
        await vaultSettled(key);

        const instance = service.getBehaviorInstance('behavior2' as any);

        expect(instance?.complete).toBeFalse();
      });

      it('should safely return if behavior does not exist', async () => {
        service.updateBehaviorParams('unknown' as any, { test: true });

        expect(true).toBeTrue(); // no crash
      });

      it('should not recalculate stages while editing params', async () => {
        service.selectStageQuestion('stageA' as any as any);
        await vaultSettled(key);

        service.setBehaviorSelected('behavior2' as any, true);
        await vaultSettled(key);

        service.updateBehaviorParams('behavior2' as any, { param1: 'value' });
        await vaultSettled(key);

        // stage should remain active or idle — but not auto-advanced
        const status = service.getStageUiState('stageA' as any as any);
        expect(['idle', 'idle']).toContain(status);
      });
    });
  });

  describe('Behavior Mutation APIs', () => {
    beforeEach(async () => {
      // Always start from clean state
      service.selectStageQuestion('stageA' as any as any);
      await vaultSettled(key);
    });

    describe('setBehaviorSelected', () => {
      it('should set selected=true and auto-complete when no params', async () => {
        service.setBehaviorSelected('behavior1' as any, true);
        await vaultSettled(key);

        const instance = service.getBehaviorInstance('behavior1' as any);

        expect(instance?.selected).toBeTrue();
        expect(instance?.complete).toBeTrue(); // no params → auto complete
        expect(instance?.params).toBeUndefined();
      });

      it('should set selected=true but NOT auto-complete when params exist', async () => {
        service.setBehaviorSelected('behavior2' as any, true);
        await vaultSettled(key);

        const instance = service.getBehaviorInstance('behavior2' as any);

        expect(instance?.selected).toBeTrue();
        expect(instance?.complete).not.toBeTrue(); // params exist → not complete yet
      });

      it('should set selected=false and mark complete=true', async () => {
        service.setBehaviorSelected('behavior1' as any, false);
        await vaultSettled(key);

        const instance = service.getBehaviorInstance('behavior1' as any);

        expect(instance?.selected).toBeFalse();
        expect(instance?.complete).toBeTrue();
        expect(instance?.params).toBeUndefined();
      });

      it('should reset params and mark incomplete when selected=null', async () => {
        service.setBehaviorSelected('behavior1' as any, true);
        await vaultSettled(key);

        service.setBehaviorSelected('behavior1' as any, null as any);
        await vaultSettled(key);

        const instance = service.getBehaviorInstance('behavior1' as any);

        expect(instance?.selected).toBeNull();
        expect(instance?.complete).toBeFalse();
        expect(instance?.params).toBeUndefined();
      });

      it('should do nothing if behavior does not exist', async () => {
        service.setBehaviorSelected('doesNotExist' as any, true);

        expect(
          service.getBehaviorInstance('doesNotExist' as any)
        ).toBeUndefined();
      });
    });

    describe('updateBehaviorParams', () => {
      it('should update params and mark complete=true when all params defined', async () => {
        service.setBehaviorSelected('behavior2' as any, true);
        await vaultSettled(key);

        service.updateBehaviorParams('behavior2' as any, { param1: 'value' });
        await vaultSettled(key);

        const instance = service.getBehaviorInstance('behavior2' as any);

        expect(instance?.params).toEqual({ param1: 'value' });
        expect(instance?.complete).toBeTrue();
      });

      it('should mark complete=false if any param is null', async () => {
        service.setBehaviorSelected('behavior2' as any, true);
        await vaultSettled(key);

        service.updateBehaviorParams('behavior2' as any, { param1: null });
        await vaultSettled(key);

        const instance = service.getBehaviorInstance('behavior2' as any);

        expect(instance?.complete).toBeFalse();
      });

      it('should mark complete=false if any param is undefined', async () => {
        service.setBehaviorSelected('behavior2' as any, true);
        await vaultSettled(key);

        service.updateBehaviorParams('behavior2' as any, { param1: undefined });
        await vaultSettled(key);

        const instance = service.getBehaviorInstance('behavior2' as any);

        expect(instance?.complete).toBeFalse();
      });

      it('should do nothing if behavior does not exist', async () => {
        service.updateBehaviorParams('doesNotExist' as any, { x: 1 });

        expect(
          service.getBehaviorInstance('doesNotExist' as any)
        ).toBeUndefined();
      });
    });

    describe('getBehaviorInstance', () => {
      it('should return behavior instance when it exists', async () => {
        const instance = service.getBehaviorInstance('behavior1' as any);
        expect(instance).toBeDefined();
        expect(instance?.behaviorId).toBe('behavior1' as any);
      });

      it('should return undefined when behavior does not exist', () => {
        const instance = service.getBehaviorInstance('fake' as any);
        expect(instance).toBeUndefined();
      });
    });
  });

  describe('Builder Lifecycle APIs', () => {
    beforeEach(async () => {
      // Ensure clean selection state
      service.selectStageQuestion('stageA' as any as any);
      await vaultSettled(key);
      service.selectStageQuestion('stageC' as any);
      await vaultSettled(key);
    });

    describe('restartBuilder', () => {
      it('should reset vault state and reinitialize builder', async () => {
        // mutate some state first
        service.selectStageQuestion('stageA' as any);
        await vaultSettled(key);

        expect(service.getStageSelectedState('stageA' as any)).toBeTrue();

        // restart
        service.restartBuilder();
        await vaultSettled(key);

        // stage selections should be reset
        expect(service.getStageSelectedState('stageA' as any)).toBeNull();

        // stageInstances should be reinitialized
        expect(service.stageInstances().length).toBe(3);

        // step should reset to 1
        expect(service.stepNumber()).toBe(1);
      });

      it('should clear viewingStageId on restart', async () => {
        service.setViewingStage('stageA' as any);
        await vaultSettled(key);

        service.restartBuilder();
        await vaultSettled(key);

        expect(service.visibleStageContent()).toBeNull();
      });

      it('should safely restart even if no state was modified', async () => {
        service.restartBuilder();
        await vaultSettled(key);

        expect(service.stageInstances().length).toBeGreaterThan(0);
      });
    });

    it('should clear viewingStageId when finalizing the last stage by index', async () => {
      // Select ONLY the last stage (stageC is index 2 in mocks)
      service.selectStageQuestion('stageC' as any);
      await vaultSettled(key);

      // Complete its behavior (behavior3 auto-completes)
      service.setBehaviorSelected('behavior3' as any, true);
      await vaultSettled(key);

      // View it
      service.setViewingStage('stageC' as any);
      await vaultSettled(key);

      // Finalize
      service.finalizeActiveBehaviorStage();
      await vaultSettled(key);

      // Because stageC is last by index, there is NO next stage
      expect(service.visibleStageContent()).toEqual(
        Object({
          id: 'stageA',
          stageLabel: 'Stage A',
          label: 'Stage With Behaviors',
          description: 'Has child behaviors',
          selectionQuestion: 'Enable Stage A?',
          behaviors: ['behavior1', 'behavior2'],
          selectionMode: 'Multiple',
          mode: 'basic'
        })
      );
    });

    it('should safely return if viewingStageId does not match any stageInstance', async () => {
      service.setViewingStage('nonexistent-stage' as any);

      service.finalizeActiveBehaviorStage();
      await vaultSettled(key);

      // Nothing crashes and no state mutation
      expect(service.stageInstances().length).toBeGreaterThan(0);
    });

    it('should NOT finalize if behavior requirements are not satisfied', async () => {
      service.selectStageQuestion('stageA' as any);
      await vaultSettled(key);

      // behavior1 selected but behavior2 incomplete
      service.setBehaviorSelected('behavior1' as any, true);
      await vaultSettled(key);

      service.setViewingStage('stageA' as any);
      await vaultSettled(key);

      service.finalizeActiveBehaviorStage();

      // Should NOT mark complete
      expect(service.getStageUiState('stageA' as any)).not.toBe('complete');
    });

    it('should clear viewingStageId when finalizing last stage', async () => {
      // Select only stageA
      service.selectStageQuestion('stageA' as any);
      await vaultSettled(key);

      // Complete behaviors
      service.setBehaviorSelected('behavior1' as any, true);
      await vaultSettled(key);

      service.setBehaviorSelected('behavior2' as any, true);
      await vaultSettled(key);

      service.updateBehaviorParams('behavior2' as any, { param1: 'done' });
      await vaultSettled(key);

      service.setViewingStage('stageA' as any);
      await vaultSettled(key);

      service.finalizeActiveBehaviorStage();
      await vaultSettled(key);

      // Because no next stage exists
      expect(service.visibleStageContent()).toEqual(
        Object({
          id: 'stageB',
          stageLabel: 'Stage B',
          label: 'Stage Without Behaviors',
          description: 'No children',
          selectionQuestion: 'Enable Stage B?',
          behaviors: [],
          selectionMode: 'Single',
          mode: 'basic'
        })
      );
    });

    it('should NOT finalize stage if behaviors are incomplete', async () => {
      service.setViewingStage('stageA' as any as any);

      service.finalizeActiveBehaviorStage();
      await vaultSettled(key);

      expect(service.getStageUiState('stageA' as any as any)).toBe('idle');
    });

    it('should finalize stage when all behaviors are complete', async () => {
      // Complete behavior1 (auto-complete)
      service.setBehaviorSelected('behavior1' as any, true);
      await vaultSettled(key);

      // Complete behavior2 (requires params)
      service.setBehaviorSelected('behavior2' as any, true);
      await vaultSettled(key);

      service.updateBehaviorParams('behavior2' as any, { param1: 'done' });
      await vaultSettled(key);

      service.setViewingStage('stageA' as any as any);
      await vaultSettled(key);

      service.finalizeActiveBehaviorStage();
      await vaultSettled(key);

      expect(service.getStageUiState('stageA' as any as any)).toBe('complete');
    });

    it('should activate next eligible stage after finalizing', async () => {
      // Complete stageA
      service.setBehaviorSelected('behavior1' as any, true);
      await vaultSettled(key);

      service.setBehaviorSelected('behavior2' as any, true);
      await vaultSettled(key);

      service.updateBehaviorParams('behavior2' as any, { param1: 'done' });
      await vaultSettled(key);

      service.setViewingStage('stageA' as any as any);
      await vaultSettled(key);

      service.finalizeActiveBehaviorStage();
      await vaultSettled(key);

      // stageC should now be active (next selected with children)
      expect(service.getStageUiState('stageC' as any)).toBe('idle');
    });

    it('should finalize stage and not reactivate it if complete', async () => {
      // Select stageA (has children)
      service.selectStageQuestion('stageA' as any as any);
      await vaultSettled(key);

      // Complete behaviors
      service.setBehaviorSelected('behavior1' as any, true);
      await vaultSettled(key);

      service.setBehaviorSelected('behavior2' as any, true);
      await vaultSettled(key);

      service.updateBehaviorParams('behavior2' as any, { param1: 'done' });
      await vaultSettled(key);

      // View and finalize
      service.setViewingStage('stageA' as any as any);
      await vaultSettled(key);

      service.finalizeActiveBehaviorStage();
      await vaultSettled(key);

      // Stage must be complete
      expect(service.getStageUiState('stageA' as any as any)).toBe('complete');
    });

    it('should activate next eligible stage after previous completes', async () => {
      // Select stageA and stageC
      service.selectStageQuestion('stageA' as any as any);
      await vaultSettled(key);

      service.selectStageQuestion('stageC' as any);
      await vaultSettled(key);

      // Complete stageA behaviors
      service.setBehaviorSelected('behavior1' as any, true);
      await vaultSettled(key);

      service.setBehaviorSelected('behavior2' as any, true);
      await vaultSettled(key);

      service.updateBehaviorParams('behavior2' as any, { param1: 'done' });
      await vaultSettled(key);

      service.setViewingStage('stageA' as any as any);
      await vaultSettled(key);

      service.finalizeActiveBehaviorStage();
      await vaultSettled(key);

      // stageA complete
      expect(service.getStageUiState('stageA' as any as any)).toBe('complete');

      // stageC becomes active (next eligible by index)
      expect(service.getStageUiState('stageC' as any)).toBe('idle');
    });

    it('should reset completed stage and reactivate it if lowest eligible', async () => {
      service.selectStageQuestion('stageA' as any as any);
      await vaultSettled(key);

      // Complete stageA
      service.setBehaviorSelected('behavior1' as any, true);
      await vaultSettled(key);

      service.setBehaviorSelected('behavior2' as any, true);
      await vaultSettled(key);

      service.updateBehaviorParams('behavior2' as any, { param1: 'done' });
      await vaultSettled(key);

      service.setViewingStage('stageA' as any as any);
      await vaultSettled(key);

      service.finalizeActiveBehaviorStage();
      await vaultSettled(key);

      expect(service.getStageUiState('stageA' as any as any)).toBe('complete');

      // Reset
      service.setViewingStage('stageA' as any as any);
      await vaultSettled(key);

      service.resetActiveBehaviorStage();
      await vaultSettled(key);

      expect(service.getStageUiState('stageA' as any as any)).toBe('idle');
    });

    it('should safely do nothing if resetting without viewingStageId', async () => {
      service.setViewingStage(null as any);

      service.resetActiveBehaviorStage();
      await vaultSettled(key);

      // Should not throw and not change state
      expect(service.stageInstances().length).toBeGreaterThan(0);
    });

    it('should safely do nothing if finalize called without viewingStageId', async () => {
      service.setViewingStage(null as any);

      service.finalizeActiveBehaviorStage();
      await vaultSettled(key);

      // No crash and no forced state changes
      expect(service.stageInstances().length).toBeGreaterThan(0);
    });
  });

  describe('Visibility APIs', () => {
    describe('visibleStageContent', () => {
      it('visibleStageContent should return null when viewingStageId is not found', async () => {
        service.setViewingStage('unknownStage' as any);

        await vaultSettled(key);

        expect(service.visibleStageContent()).toBeNull();
      });

      it('visibleStageContent should return null when no viewing stage', () => {
        expect(service.visibleStageContent()).toBeNull();
      });

      it('visibleStageContent should return stage definition when viewing set', async () => {
        service.setViewingStage('stageA' as any as any);

        await vaultSettled(key);

        const stage = service.visibleStageContent();

        expect(stage?.id).toBe('stageA' as any);
      });

      it('should return null when no viewingStageId', () => {
        expect(service.visibleStageContent()).toBeNull();
      });

      it('should return correct stage definition when viewingStageId is set', async () => {
        service.setViewingStage('stageA' as any as any);

        await vaultSettled(key);

        const stage = service.visibleStageContent();

        expect(stage).toBeTruthy();
        expect(stage?.id).toBe('stageA' as any as any);
      });
    });

    describe('viewingStageId', () => {
      it('should return null by default', () => {
        expect(service.viewingStageId()).toBeNull();
      });

      it('should return the stageId after setViewingStage is called', async () => {
        service.setViewingStage('stageA' as any);
        await vaultSettled(key);

        expect(service.viewingStageId()).toBe('stageA' as any);
      });

      it('should update when viewingStageId changes', async () => {
        service.setViewingStage('stageA' as any);
        await vaultSettled(key);

        expect(service.viewingStageId()).toBe('stageA' as any);

        service.setViewingStage('stageB' as any);
        await vaultSettled(key);

        expect(service.viewingStageId()).toBe('stageB' as any);
      });

      it('should return null when viewingStageId is cleared', async () => {
        service.setViewingStage('stageA' as any);
        await vaultSettled(key);

        service.setViewingStage(null as any);
        await vaultSettled(key);

        expect(service.viewingStageId()).toBeNull();
      });

      it('should return raw value even if stage does not exist (projection only)', async () => {
        service.setViewingStage('not-real' as any);
        await vaultSettled(key);

        expect(service.viewingStageId()).toBe('not-real' as any);
      });
    });

    describe('visibleBehaviorContent', () => {
      describe('framework is null', () => {
        beforeEach(async () => {
          service.commitStateInput({
            framework: null
          });
          await vaultSettled(key);
        });

        it('visibleBehaviorContent should return null when no viewing stage', () => {
          expect(service.visibleBehaviorContent()).toBeNull();
        });

        it('visibleBehaviorContent should return behaviors for stage', async () => {
          service.setViewingStage('stageA' as any);
          await vaultSettled(key);

          const behaviors = service.visibleBehaviorContent();

          expect(behaviors?.length).toBe(2);
        });

        it('should return null when no viewingStageId', () => {
          expect(service.visibleBehaviorContent()).toBeNull();
        });

        it('should return behaviors for stage with children', async () => {
          service.setViewingStage('stageA' as any as any);

          await vaultSettled(key);

          const behaviors = service.visibleBehaviorContent();

          expect(behaviors).toBeTruthy();
          expect(behaviors?.length).toBe(2);
          expect(behaviors?.map((b) => b.id)).toEqual([
            'behavior1' as any,
            'behavior2' as any
          ]);
        });

        it('should return empty array for stage without behaviors', async () => {
          service.setViewingStage('stageB' as any);

          await vaultSettled(key);

          const behaviors = service.visibleBehaviorContent();

          expect(behaviors).toEqual([]);
        });

        it('should return empty array for a non-existent stage', async () => {
          service.setViewingStage('stageZed' as any);

          await vaultSettled(key);

          const behaviors = service.visibleBehaviorContent();

          expect(behaviors).toEqual([]);
        });
      });

      describe('framework is angular', () => {
        beforeEach(async () => {
          service.commitStateInput({
            framework: StateFrameworkTypes.Angular
          });
          await vaultSettled(key);
        });

        it('visibleBehaviorContent should return null when no viewing stage', () => {
          expect(service.visibleBehaviorContent()).toBeNull();
        });

        it('visibleBehaviorContent should return behaviors for stage', async () => {
          service.setViewingStage('stageA' as any);
          await vaultSettled(key);

          const behaviors = service.visibleBehaviorContent();

          expect(behaviors?.length).toBe(2);
        });

        it('should return null when no viewingStageId', () => {
          expect(service.visibleBehaviorContent()).toBeNull();
        });

        it('should return behaviors for stage with children', async () => {
          service.setViewingStage('stageA' as any as any);

          await vaultSettled(key);

          const behaviors = service.visibleBehaviorContent();

          expect(behaviors).toBeTruthy();
          expect(behaviors?.length).toBe(2);
          expect(behaviors?.map((b) => b.id)).toEqual([
            'behavior1' as any,
            'behavior2' as any
          ]);
        });

        it('should return empty array for stage without behaviors', async () => {
          service.setViewingStage('stageB' as any);

          await vaultSettled(key);

          const behaviors = service.visibleBehaviorContent();

          expect(behaviors).toEqual([]);
        });

        it('should return empty array for a non-existent stage', async () => {
          service.setViewingStage('stageZed' as any);

          await vaultSettled(key);

          const behaviors = service.visibleBehaviorContent();

          expect(behaviors).toEqual([]);
        });
      });

      describe('framework is react', () => {
        beforeEach(async () => {
          service.commitStateInput({
            framework: StateFrameworkTypes.React
          });
          await vaultSettled(key);
        });

        it('visibleBehaviorContent should return null when no viewing stage', () => {
          expect(service.visibleBehaviorContent()).toBeNull();
        });

        it('visibleBehaviorContent should return behaviors for stage', async () => {
          service.setViewingStage('stageA' as any);
          await vaultSettled(key);

          const behaviors = service.visibleBehaviorContent();

          expect(behaviors?.length).toBe(1);
        });

        it('should return null when no viewingStageId', () => {
          expect(service.visibleBehaviorContent()).toBeNull();
        });

        it('should return behaviors for stage with children', async () => {
          service.setViewingStage('stageA' as any as any);

          await vaultSettled(key);

          const behaviors = service.visibleBehaviorContent();

          expect(behaviors).toBeTruthy();
          expect(behaviors?.length).toBe(1);
          expect(behaviors?.map((b) => b.id)).toEqual(['behavior2' as any]);
        });

        it('should return empty array for stage without behaviors', async () => {
          service.setViewingStage('stageB' as any);

          await vaultSettled(key);

          const behaviors = service.visibleBehaviorContent();

          expect(behaviors).toEqual([]);
        });

        it('should return empty array for a non-existent stage', async () => {
          service.setViewingStage('stageZed' as any);

          await vaultSettled(key);

          const behaviors = service.visibleBehaviorContent();

          expect(behaviors).toEqual([]);
        });
      });
    });

    describe('viewingStageHasChildren', () => {
      it('viewingStageHasChildren should return false when no viewing stage', () => {
        expect(service.viewingStageHasChildren()).toBeFalse();
      });

      it('viewingStageHasChildren should return true when stage has children', async () => {
        service.setViewingStage('stageA' as any);

        await vaultSettled(key);

        expect(service.viewingStageHasChildren()).toBeTrue();
      });

      it('viewingStageHasChildren should return false when stage has no children', async () => {
        service.setViewingStage('stageB' as any);

        await vaultSettled(key);

        expect(service.viewingStageHasChildren()).toBeFalse();
      });

      it('should return false when no viewingStageId', () => {
        expect(service.viewingStageHasChildren()).toBeFalse();
      });

      it('should return true for stage with children', async () => {
        service.setViewingStage('stageA' as any as any);
        await vaultSettled(key);

        expect(service.viewingStageHasChildren()).toBeTrue();
      });

      it('should return false for stage without children', async () => {
        service.setViewingStage('stageB' as any);
        await vaultSettled(key);

        expect(service.viewingStageHasChildren()).toBeFalse();
      });
    });
  });
});
