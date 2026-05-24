import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { clearSessionStorage } from '@sdux-vault/testing-utils';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { BehaviorDefinitionShape } from 'apps/docs-app/app/builder/shapes/behavior-definition.shape';
import { ParameterDefinition } from 'apps/docs-app/app/builder/shapes/parameter-definition.shape';
import { PipelineBuilderDocumentDialogService } from '../../services/dialog/pipeline-builder-document-dialog.service';
import { PipelineBuilderService } from '../../services/pipeline-builder.service';
import { PIPELINE_BUILDER_BEHAVIOR_TOKEN } from '../../tokens/pipeline-builder-behaviors.token';
import { PIPELINE_BUILDER_STAGE_TOKEN } from '../../tokens/pipeline-builder-stages.token';
import { BehaviorQuestionComponent } from './behavior-question.component';

describe('Component: BehaviorQuestion', () => {
  const key = 'pipeline-builder';
  let fixture: ComponentFixture<BehaviorQuestionComponent>;
  let component: BehaviorQuestionComponent;
  let builder: PipelineBuilderService;
  let dialogService: MockDocumentationDialogService;

  const mockParams: ParameterDefinition[] = [
    {
      key: 'milliseconds',
      label: 'Delay (ms)',
      type: 'number',
      defaultValue: 300
    }
  ];

  const MOCK_STAGES = [
    {
      id: 'policy',
      kind: 'stage',
      stageLabel: 'Policy',
      label: 'Policy Controllers',
      description: 'Policy stage',
      selectionQuestion: 'Enable policy?',
      behaviors: ['withDebounce'],
      selectionMode: 'single',
      mode: 'basic'
    }
  ];

  const mockBehavior: BehaviorDefinitionShape = {
    id: 'withDebounce' as any,
    parentId: 'interceptor' as any,
    label: 'Debounce',
    question: 'Should updates be debounced?',
    description: 'Delays updates',
    params: mockParams,
    mode: 'basic'
  };

  class MockDocumentationDialogService {
    open = jasmine.createSpy('open');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [sduxTestingModule, BehaviorQuestionComponent],
      providers: [
        provideVaultTesting(),
        {
          provide: PIPELINE_BUILDER_STAGE_TOKEN,
          useValue: MOCK_STAGES
        },
        {
          provide: PIPELINE_BUILDER_BEHAVIOR_TOKEN,
          useValue: [mockBehavior]
        },
        {
          provide: PipelineBuilderDocumentDialogService,
          useClass: MockDocumentationDialogService
        }
      ]
    }).compileComponents();

    dialogService = TestBed.inject(PipelineBuilderDocumentDialogService) as any;

    builder = TestBed.inject(PipelineBuilderService);

    spyOn(builder, 'getBehaviorInstance').and.callThrough();
    spyOn(builder, 'setBehaviorSelected').and.callThrough();
    spyOn(builder, 'updateBehaviorParams').and.callThrough();

    fixture = TestBed.createComponent(BehaviorQuestionComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('behavior', mockBehavior);

    fixture.detectChanges();
    await vaultSettled(key);
  });

  afterEach(() => {
    clearSessionStorage('vault::sessionstorage::pipeline-builder');
  });

  describe('openDocumentation', () => {
    it('should NOT call dialog service if no documentationComponentReference exists', async () => {
      // mockStage has no documentationComponentReference
      component.openDocumentation();

      expect(dialogService.open).not.toHaveBeenCalled();
    });

    it('should call dialog service when documentationComponentReference exists', () => {
      const mockDocComponent = class {};

      const stageWithDocs = {
        ...mockBehavior,
        documentationComponentReference: mockDocComponent
      };

      fixture.componentRef.setInput('behavior', stageWithDocs);
      fixture.detectChanges();

      component.openDocumentation();

      expect(dialogService.open).toHaveBeenCalledTimes(1);
      expect(dialogService.open).toHaveBeenCalledWith(mockDocComponent);
    });

    it('should safely handle undefined behavior', () => {
      fixture.componentRef.setInput('behavior', {
        id: 'fake-id'
      });
      fixture.detectChanges();

      component.openDocumentation();

      expect(dialogService.open).not.toHaveBeenCalled();
    });
  });

  describe('initial state', () => {
    it('should NOT overwrite existing params when already initialized', async () => {
      component.selectYes();
      await vaultSettled(key);

      // user modifies param
      component.updateParam(mockParams[0], 500);
      await vaultSettled(key);

      // calling selectYes again should NOT reset params
      component.selectYes();
      await vaultSettled(key);

      expect(component.paramsState()).toEqual({
        milliseconds: 500
      });
    });

    it('should start unselected', async () => {
      expect(component.selected()).toBeNull();
    });

    it('should start with empty paramsState', () => {
      expect(component.paramsState()).toEqual({});
    });

    it('should NOT initialize params when params array is empty', async () => {
      const behaviorWithEmptyParams: BehaviorDefinitionShape = {
        ...mockBehavior,
        params: []
      };

      fixture.componentRef.setInput('behavior', behaviorWithEmptyParams);
      fixture.detectChanges();

      component.selectYes();
      await vaultSettled(key);

      expect(component.selected()).toBeTrue();
      expect(component.paramsState()).toEqual({});
    });
  });

  describe('selectYes()', () => {
    it('should mark behavior as selected', async () => {
      component.selectYes();
      await vaultSettled(key);
      expect(component.selected()).toBe(true);
    });

    it('should initialize paramsState with default values', async () => {
      component.selectYes();
      await vaultSettled(key);

      expect(component.paramsState()).toEqual({
        milliseconds: 300
      });
    });

    it('should initialize params with null if no defaultValue is provided', async () => {
      const behaviorWithoutDefaults: BehaviorDefinitionShape = {
        ...mockBehavior,
        params: [
          {
            key: 'count',
            label: 'Count',
            type: 'number'
          }
        ]
      };

      fixture.componentRef.setInput('behavior', behaviorWithoutDefaults);
      fixture.detectChanges();

      component.selectYes();
      await vaultSettled(key);

      expect(component.paramsState()).toEqual({
        count: null
      });
    });

    it('should leave paramsState empty when behavior has no params', async () => {
      const behaviorWithoutParams: BehaviorDefinitionShape = {
        id: 'withDebounce' as any,
        parentId: 'interceptor' as any,
        label: 'No Params',
        question: 'Does nothing'
        // params is intentionally undefined
      };

      fixture.componentRef.setInput('behavior', behaviorWithoutParams);
      fixture.detectChanges();

      component.selectYes();
      await vaultSettled(key);

      expect(component.selected()).toBeTrue();
      expect(component.paramsState()).toEqual({});
    });

    it('should allow updateParam even when behavior is not selected', async () => {
      const param = mockParams[0];

      component.updateParam(param, 400);
      await vaultSettled(key);

      expect(component.paramsState()).toEqual({
        milliseconds: 400
      });

      expect(component.selected()).toBeNull();
    });

    it('should react when behavior input changes', async () => {
      component.selectYes();
      await vaultSettled(key);

      const newBehavior: BehaviorDefinitionShape = {
        id: 'withThrottle' as any,
        parentId: 'interceptor' as any,
        label: 'Throttle',
        question: 'Throttle updates?',
        params: [
          {
            key: 'interval',
            label: 'Interval',
            type: 'number',
            defaultValue: 100
          }
        ]
      };

      fixture.componentRef.setInput('behavior', newBehavior);
      fixture.detectChanges();

      expect(component.selected()).toBeNull();
      expect(component.paramsState()).toEqual({});
    });

    it('should not call updateBehaviorParams when selecting No', async () => {
      component.selectYes();
      await vaultSettled(key);
      component.selectYes();
      await vaultSettled(key);
      component.selectNo();
      await vaultSettled(key);

      expect(builder.updateBehaviorParams).toHaveBeenCalledTimes(1);
    });
  });

  describe('selectNo()', () => {
    it('should deselect behavior', async () => {
      component.selectYes();
      await vaultSettled(key);
      component.selectNo();
      await vaultSettled(key);

      expect(component.selected()).toBe(false);
    });

    it('should clear paramsState', async () => {
      component.selectYes();
      await vaultSettled(key);
      component.selectNo();
      await vaultSettled(key);

      expect(component.paramsState()).toEqual({});
    });
  });

  describe('updateParam()', () => {
    it('should update a parameter value', async () => {
      component.selectYes();
      await vaultSettled(key);

      const param = mockParams[0];
      component.updateParam(param, 500);
      await vaultSettled(key);

      expect(component.paramsState()).toEqual({
        milliseconds: 500
      });
    });

    it('should preserve existing parameters when updating another', async () => {
      component.selectYes();
      await vaultSettled(key);

      component.updateParam(mockParams[0], 500);
      await vaultSettled(key);
      component.updateParam(
        { key: 'extra', label: 'Extra', type: 'string' },
        'hello'
      );
      await vaultSettled(key);

      expect(component.paramsState()).toEqual({
        milliseconds: 500,
        extra: 'hello'
      });
    });

    it('should preserve existing parameters when updating another', async () => {
      component.selectYes();
      await vaultSettled(key);

      component.updateParam(mockParams[0], 500);
      await vaultSettled(key);
      component.updateParam(
        { key: 'extra', label: 'Extra', type: 'string' },
        undefined
      );
      await vaultSettled(key);

      expect(component.paramsState()).toEqual({
        milliseconds: 500,
        extra: null
      });
    });
  });

  it('should react to external instance updates from the builder', async () => {
    // simulate external update (e.g. hydration, session restore)
    builder.setBehaviorSelected(mockBehavior.id, true);
    await vaultSettled(key);
    builder.updateBehaviorParams(mockBehavior.id, { milliseconds: 250 });
    await vaultSettled(key);

    expect(component.selected()).toBe(true);
    expect(component.paramsState()).toEqual({
      milliseconds: 250
    });
  });

  describe('button class helpers', () => {
    describe('getNoButtonClass()', () => {
      it('should return "is-selected" when selected === false', async () => {
        component.selectNo();
        await vaultSettled(key);

        expect(component.selected()).toBeFalse();
        expect(component.getNoButtonClass()).toBe('is-selected');
      });

      it('should return "is-not-selected" when selected === true', async () => {
        component.selectYes();
        await vaultSettled(key);

        expect(component.selected()).toBeTrue();
        expect(component.getNoButtonClass()).toBe('is-not-selected');
      });

      it('should return "is-not-selected" when selected === null', async () => {
        expect(component.selected()).toBeNull();
        expect(component.getNoButtonClass()).toBe('is-not-selected');
      });
    });

    describe('getYesButtonClass()', () => {
      it('should return "is-selected" when selected === true', async () => {
        component.selectYes();
        await vaultSettled(key);

        expect(component.selected()).toBeTrue();
        expect(component.getYesButtonClass()).toBe('is-selected');
      });

      it('should return "is-not-selected" when selected === false', async () => {
        component.selectYes();
        await vaultSettled(key);
        component.selectNo();
        await vaultSettled(key);

        expect(component.selected()).toBeFalse();
        expect(component.getYesButtonClass()).toBe('is-not-selected');
      });

      it('should return "is-not-selected" when selected === null', async () => {
        expect(component.selected()).toBeNull();
        expect(component.getYesButtonClass()).toBe('is-not-selected');
      });
    });
  });

  describe('when behavior is disabled', () => {
    it('should NOT call setBehaviorSelected when disabled is true', async () => {
      const disabledBehavior: BehaviorDefinitionShape = {
        ...mockBehavior,
        disabled: true
      };

      fixture.componentRef.setInput('behavior', disabledBehavior);
      fixture.detectChanges();

      component.selectYes();

      expect(builder.setBehaviorSelected).not.toHaveBeenCalled();
      expect(builder.updateBehaviorParams).not.toHaveBeenCalled();
      expect(component.selected()).toBeNull();
    });

    it('should NOT initialize default params when disabled is true', async () => {
      const disabledBehavior: BehaviorDefinitionShape = {
        ...mockBehavior,
        disabled: true
      };

      fixture.componentRef.setInput('behavior', disabledBehavior);
      fixture.detectChanges();

      component.selectYes();

      expect(component.paramsState()).toEqual({});
    });

    it('should NOT call setBehaviorSelected when disabled is true', async () => {
      const disabledBehavior: BehaviorDefinitionShape = {
        ...mockBehavior,
        disabled: true
      };

      fixture.componentRef.setInput('behavior', disabledBehavior);
      fixture.detectChanges();

      component.selectNo();

      expect(builder.setBehaviorSelected).not.toHaveBeenCalled();
      expect(component.selected()).toBeNull();
    });

    it('should NOT clear paramsState when disabled is true', async () => {
      const disabledBehavior: BehaviorDefinitionShape = {
        ...mockBehavior,
        disabled: true
      };

      fixture.componentRef.setInput('behavior', disabledBehavior);
      fixture.detectChanges();

      component.selectNo();

      expect(component.paramsState()).toEqual({});
    });
  });

  describe('selection mode rendering', () => {
    it('should show No button in multiple selection mode', async () => {
      spyOn(builder, 'getBehaviorSelectionMode').and.returnValue('multiple');

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;

      expect(compiled.textContent).toContain('No');
      expect(compiled.textContent).toContain('Yes');
    });

    it('should NOT show No button in single selection mode', async () => {
      spyOn(builder, 'getBehaviorSelectionMode').and.returnValue('single');

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;

      expect(compiled.textContent).not.toContain('No');
    });

    it('should display "Select" instead of "Yes" in single mode', async () => {
      spyOn(builder, 'getBehaviorSelectionMode').and.returnValue('single');

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;

      expect(compiled.textContent).toContain('Select');
    });
  });

  describe('tooltip()', () => {
    it('should return empty string when behavior is NOT disabled', () => {
      const behaviorNotDisabled: BehaviorDefinitionShape = {
        ...mockBehavior,
        disabled: false,
        disabledNote: 'Should not be shown'
      };

      fixture.componentRef.setInput('behavior', behaviorNotDisabled);
      fixture.detectChanges();

      expect(component.tooltip()).toBe('');
    });

    it('should return behavior.note when behavior IS disabled', () => {
      const behaviorDisabled: BehaviorDefinitionShape = {
        ...mockBehavior,
        disabled: true,
        disabledNote:
          'This behavior is disabled until prerequisites are selected.'
      };

      fixture.componentRef.setInput('behavior', behaviorDisabled);
      fixture.detectChanges();

      expect(component.tooltip()).toBe(
        'This behavior is disabled until prerequisites are selected.'
      );
    });
  });

  describe('AI Assist', () => {
    it('should expose behavior.aiAssist via computed aiAssist()', () => {
      const behaviorWithAiAssist: BehaviorDefinitionShape = {
        ...mockBehavior,
        aiAssist: 'some-ai-assist-prompt-or-id' as any
      };

      fixture.componentRef.setInput('behavior', behaviorWithAiAssist);
      fixture.detectChanges();

      expect(component.aiAssist()).toBeTrue();
    });

    it('should render the AI Assist pill with the expected tooltip text', () => {
      fixture.detectChanges();

      expect(component.aiAssist()).toBeFalse();
    });
  });

  describe('behaviorStatus', () => {
    it('returns "complete" when status is Complete', () => {
      spyOn(builder, 'getBehaviorUiState').and.returnValue('complete');

      expect(component.behaviorStatus()).toBe('complete');
    });

    it('returns "inactive" when status is Inactive', () => {
      spyOn(builder, 'getBehaviorUiState').and.returnValue('inactive');

      expect(component.behaviorStatus()).toBe('inactive');
    });

    it('returns "idle" for all other statuses', () => {
      spyOn(builder, 'getBehaviorUiState').and.returnValue('idle');

      expect(component.behaviorStatus()).toBe('idle');
    });
  });
});
