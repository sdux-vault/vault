import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import {
  clearSessionStorage,
  flushVaultPipeline
} from '@sdux-vault/testing-utils';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { StageDefinitionShape } from 'apps/docs-app/app/builder/shapes/stage-definition.shape';
import { SelectionModeTypes } from 'apps/docs-app/app/builder/types/selection-mode.type';
import { PipelineBuilderService } from '../../services/pipeline-builder.service';
import { PIPELINE_BUILDER_BEHAVIOR_TOKEN } from '../../tokens/pipeline-builder-behaviors.token';
import { PIPELINE_BUILDER_STAGE_TOKEN } from '../../tokens/pipeline-builder-stages.token';
import { BehaviorSelectionModeTypes } from '../../types/behavior-selection-mode.type';
import { StageQuestionComponent } from './stage-question.component';

describe('Component: StageQuestion - Step Two', () => {
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
        imports: [sduxTestingModule, StageQuestionComponent],
        providers: [
          provideVaultTesting(),
          PipelineBuilderService,
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

      fixture = TestBed.createComponent(StageQuestionComponent);
      component = fixture.componentInstance;

      builder = TestBed.inject(PipelineBuilderService);
      fixture.componentRef.setInput('stage', mockStage);

      fixture.detectChanges();

      TestBed.tick();
      await vaultSettled(key);
    });

    it('should expose the stage input as a signal', () => {
      expect(component.stage()).toEqual(mockStage);
    });

    it('should initialize selection signal to null', () => {
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

    it('should call PipelineBuilderService.deSelectStageQuestion when selectNo is invoked', async () => {
      spyOn(builder, 'deSelectStageQuestion');
      await flushVaultPipeline();
      expect(component.noButtonClass()).toBe('is-not-selected');
      expect(component.yesButtonClass()).toBe('is-not-selected');
      component.selectNo();
      await flushVaultPipeline();

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
});
