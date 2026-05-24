import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { clearSessionStorage } from '@sdux-vault/testing-utils';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { StageDefinitionShape } from 'apps/docs-app/app/builder/shapes/stage-definition.shape';
import { SelectionModeTypes } from 'apps/docs-app/app/builder/types/selection-mode.type';
import { PipelineBuilderService } from '../../services/pipeline-builder.service';
import { PIPELINE_BUILDER_BEHAVIOR_TOKEN } from '../../tokens/pipeline-builder-behaviors.token';
import { PIPELINE_BUILDER_STAGE_TOKEN } from '../../tokens/pipeline-builder-stages.token';
import { BehaviorSelectionModeTypes } from '../../types/behavior-selection-mode.type';
import { StageQuestionComponent } from './stage-question.component';

describe('Component: StageQuestion - Step One', () => {
  const key = 'pipeline-builder';
  let component: StageQuestionComponent;
  let fixture: ComponentFixture<StageQuestionComponent>;
  let builder: PipelineBuilderService;

  const mockStage: StageDefinitionShape = {
    id: 'withReplayGlobalErrorController' as any,
    description: 'Test description',
    question: 'Do you need to control global error replay?',
    behaviors: ['withGlobalErrorPauseBehavior'] as any,
    selectionMode: SelectionModeTypes.Single,
    behaviorSelectionMode: BehaviorSelectionModeTypes.Single,
    label: 'Policy',
    mode: 'basic'
  };

  afterEach(() => {
    clearSessionStorage(
      `vault::sessionstorage::${key}::SDUX::Behavior::Persist::SessionStorage`
    );
  });

  describe('Single', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [StageQuestionComponent, sduxTestingModule],
        providers: [
          provideVaultTesting(),
          {
            provide: PIPELINE_BUILDER_STAGE_TOKEN,
            useValue: [mockStage]
          },
          {
            provide: PIPELINE_BUILDER_BEHAVIOR_TOKEN,
            useValue: []
          }
        ]
      }).compileComponents();

      builder = TestBed.inject(PipelineBuilderService);

      fixture = TestBed.createComponent(StageQuestionComponent);
      component = fixture.componentInstance;

      fixture.componentRef.setInput('stage', mockStage);

      fixture.detectChanges();

      TestBed.tick();
      await vaultSettled(key);
    });

    describe('onStageClick', () => {
      it('should call setViewingStage when NOT in select mode', async () => {
        // Arrange
        fixture.detectChanges();

        const service = TestBed.inject(PipelineBuilderService);
        spyOn(service, 'setViewingStage');

        // Act
        component.onStageClick();

        // Assert
        expect(service.setViewingStage).toHaveBeenCalledTimes(1);
        expect(service.setViewingStage).toHaveBeenCalledWith(mockStage.id);
      });
    });

    it('should expose the stage input as a signal', () => {
      expect(component.stage()).toEqual(mockStage);
    });

    it('should initialize selection signal to null', async () => {
      expect(component.noButtonClass()).toBe('is-not-selected');
      expect(component.yesButtonClass()).toBe('is-not-selected');
    });

    it('should report single selection mode correctly', () => {
      expect(component.isSingleSelection()).toBeTrue();
    });

    it('should call PipelineBuilderService.selectStageQuestion when selectYes is invoked', () => {
      spyOn(builder, 'selectStageQuestion');
      expect(component.noButtonClass()).toBe('is-not-selected');
      expect(component.yesButtonClass()).toBe('is-not-selected');
      component.selectYes();

      expect(builder.selectStageQuestion).toHaveBeenCalledTimes(1);
      expect(builder.selectStageQuestion).toHaveBeenCalledWith(mockStage.id);
      expect(component.noButtonClass()).toBe('is-not-selected');
      expect(component.yesButtonClass()).toBe('is-selected');
    });

    it('should call PipelineBuilderService.deSelectStageQuestion when selectNo is invoked', () => {
      spyOn(builder, 'deSelectStageQuestion');
      expect(component.noButtonClass()).toBe('is-not-selected');
      expect(component.yesButtonClass()).toBe('is-not-selected');
      component.selectNo();

      expect(builder.deSelectStageQuestion).toHaveBeenCalledTimes(1);
      expect(builder.deSelectStageQuestion).toHaveBeenCalledWith(mockStage.id);
      expect(component.noButtonClass()).toBe('is-selected');
      expect(component.yesButtonClass()).toBe('is-not-selected');
    });

    it('should not mutate the stage definition when selecting yes or no', () => {
      const originalStage = structuredClone(component.stage());

      component.selectYes();
      component.selectNo();

      expect(component.stage()).toEqual(originalStage);
    });

    describe('active', () => {
      it('should be true when viewingStageId matches stage id', async () => {
        component.pipelineBuilderService.setViewingStage(
          'withReplayGlobalErrorController' as any
        );
        await vaultSettled(key);

        expect(component.active()).toBeTrue();
      });

      it('should be false when viewingStageId does not match stage id', () => {
        const service = TestBed.inject(PipelineBuilderService);

        spyOn(service, 'viewingStageId').and.returnValue(
          'some-other-id' as any
        );

        expect(component.active()).toBeFalse();
      });

      it('should be false when viewingStageId is null', () => {
        const service = TestBed.inject(PipelineBuilderService);

        spyOn(service, 'viewingStageId').and.returnValue(null as any);

        expect(component.active()).toBeFalse();
      });
    });

    describe('disabled behavior', () => {
      it('should default disabled() to false when stage.disabled is undefined', () => {
        expect(component.disabled()).toBeFalse();
      });

      it('should compute disabled() as true when stage.disabled is true', () => {
        const disabledStage: StageDefinitionShape = {
          ...mockStage,
          disabled: true
        };

        fixture.componentRef.setInput('stage', disabledStage);
        fixture.detectChanges();

        expect(component.disabled()).toBeTrue();
      });

      it('should NOT call selectStageQuestion when disabled is true', () => {
        const disabledStage: StageDefinitionShape = {
          ...mockStage,
          disabled: true
        };

        fixture.componentRef.setInput('stage', disabledStage);
        fixture.detectChanges();

        spyOn(builder, 'selectStageQuestion');
        expect(component.noButtonClass()).toBe('is-not-selected');
        expect(component.yesButtonClass()).toBe('is-not-selected');

        component.selectYes();

        expect(builder.selectStageQuestion).not.toHaveBeenCalled();
        expect(component.noButtonClass()).toBe('is-not-selected');
        expect(component.yesButtonClass()).toBe('is-not-selected');
      });

      it('should NOT call deSelectStageQuestion when disabled is true', () => {
        const disabledStage: StageDefinitionShape = {
          ...mockStage,
          disabled: true
        };

        fixture.componentRef.setInput('stage', disabledStage);
        fixture.detectChanges();

        spyOn(builder, 'deSelectStageQuestion');

        expect(component.noButtonClass()).toBe('is-not-selected');
        expect(component.yesButtonClass()).toBe('is-not-selected');

        component.selectNo();

        expect(builder.deSelectStageQuestion).not.toHaveBeenCalled();

        expect(component.noButtonClass()).toBe('is-not-selected');
        expect(component.yesButtonClass()).toBe('is-not-selected');
      });
    });

    describe('tooltip()', () => {
      it('should return empty string when stage is NOT disabled', () => {
        const stageNotDisabled: StageDefinitionShape = {
          ...mockStage,
          disabled: false,
          note: 'Should not be shown'
        };

        fixture.componentRef.setInput('stage', stageNotDisabled);
        fixture.detectChanges();

        expect(component.tooltip()).toBe('');
      });

      it('should return stage.note when stage IS disabled', () => {
        const stageDisabled: StageDefinitionShape = {
          ...mockStage,
          disabled: true,
          note: 'This stage is disabled until prerequisites are selected.'
        };

        fixture.componentRef.setInput('stage', stageDisabled);
        fixture.detectChanges();

        expect(component.tooltip()).toBe(
          'This stage is disabled until prerequisites are selected.'
        );
      });
    });

    describe('stageStatus', () => {
      describe('when active() is true', () => {
        beforeEach(() => {
          spyOn(component, 'active').and.returnValue(true);
        });

        it('returns "complete" when status is Complete and selected is true', () => {
          spyOn(builder, 'getStageUiState').and.returnValue('complete');
          spyOn(builder, 'getStageSelectedState').and.returnValue(true);

          expect(component.stageStatus()).toBe('complete');
        });

        it('returns "idle" when status is Complete and selected is false', () => {
          spyOn(builder, 'getStageUiState').and.returnValue('complete');
          spyOn(builder, 'getStageSelectedState').and.returnValue(false);

          expect(component.stageStatus()).toBe('idle');
        });

        it('returns "inactive" when status is Inactive', () => {
          spyOn(builder, 'getStageUiState').and.returnValue('inactive');

          expect(component.stageStatus()).toBe('inactive');
        });

        it('returns "active" for all other statuses', () => {
          spyOn(builder, 'getStageUiState').and.returnValue('idle');

          expect(component.stageStatus()).toBe('active');
        });
      });

      describe('when active() is false', () => {
        beforeEach(() => {
          spyOn(component, 'active').and.returnValue(false);
        });

        it('returns "complete" when status is Complete', () => {
          spyOn(builder, 'getStageUiState').and.returnValue('complete');

          expect(component.stageStatus()).toBe('complete');
        });

        it('returns "inactive" when status is Inactive', () => {
          spyOn(builder, 'getStageUiState').and.returnValue('inactive');

          expect(component.stageStatus()).toBe('inactive');
        });

        it('returns "idle" for all other statuses', () => {
          spyOn(builder, 'getStageUiState').and.returnValue('idle');

          expect(component.stageStatus()).toBe('idle');
        });
      });
    });
  });

  describe('StageQuestionComponent – non-single selection mode', () => {
    let component: StageQuestionComponent;
    let fixture: ComponentFixture<StageQuestionComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [StageQuestionComponent, sduxTestingModule],
        providers: [provideVaultTesting(), PipelineBuilderService]
      }).compileComponents();

      builder = TestBed.inject(PipelineBuilderService);

      fixture = TestBed.createComponent(StageQuestionComponent);
      component = fixture.componentInstance;

      const multipleMockState = structuredClone(mockStage);
      multipleMockState.selectionMode = SelectionModeTypes.Multiple;

      fixture.componentRef.setInput('stage', multipleMockState);

      fixture.detectChanges();

      TestBed.tick();
      await vaultSettled(key);
    });

    it('should return false for non-single selection modes', () => {
      expect(component.isSingleSelection()).toBeFalse();
    });
  });
});
