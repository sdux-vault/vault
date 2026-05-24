// stage-review.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import {
  clearSessionStorage,
  flushVaultPipeline
} from '@sdux-vault/testing-utils';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { PipelineBuilderDocumentDialogService } from '../../services/dialog/pipeline-builder-document-dialog.service';
import { PipelineBuilderService } from '../../services/pipeline-builder.service';
import { StageDefinitionShape } from '../../shapes/stage-definition.shape';
import { PIPELINE_BUILDER_BEHAVIOR_TOKEN } from '../../tokens/pipeline-builder-behaviors.token';
import { PIPELINE_BUILDER_STAGE_TOKEN } from '../../tokens/pipeline-builder-stages.token';
import { BehaviorSelectionModeTypes } from '../../types/behavior-selection-mode.type';
import { SelectionModeTypes } from '../../types/selection-mode.type';
import { StageReviewComponent } from './stage-review.component';

describe('Component: StageReview', () => {
  class MockDocumentationDialogService {
    open = jasmine.createSpy('open');
  }

  const key = 'pipeline-builder';
  let component: StageReviewComponent;
  let fixture: ComponentFixture<StageReviewComponent>;
  let builder: PipelineBuilderService;
  let dialogService: MockDocumentationDialogService;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [sduxTestingModule, StageReviewComponent],
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
        },
        {
          provide: PipelineBuilderDocumentDialogService,
          useClass: MockDocumentationDialogService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StageReviewComponent);
    component = fixture.componentInstance;
    builder = TestBed.inject(PipelineBuilderService);

    dialogService = TestBed.inject(PipelineBuilderDocumentDialogService) as any;

    fixture.componentRef.setInput('stage', mockStage);

    fixture.detectChanges();

    TestBed.tick();
    await vaultSettled(key);
  });

  it('should toggle the explanations', async () => {
    expect(component.isExpanded()).toBeTrue();

    component.toggle();
    fixture.detectChanges();

    expect(component.isExpanded()).toBeTrue();

    component.toggle();
    fixture.detectChanges();

    expect(component.isExpanded()).toBeFalse();
  });

  it('should auto-collapse when the stage becomes selected', async () => {
    // Initially stage is not selected → isExpanded should be true
    expect(component.isExpanded()).toBeTrue();

    // Select the stage
    builder.selectStageQuestion(mockStage.id);
    await flushVaultPipeline();

    fixture.detectChanges();

    // Effect should re-run → stage selected → isExpanded = !true = false
    expect(component.isExpanded()).toBeFalse();
  });

  it('should auto-expand when the stage becomes deselected', async () => {
    // Select first
    builder.selectStageQuestion(mockStage.id);
    fixture.detectChanges();
    await flushVaultPipeline();

    expect(component.isExpanded()).toBeFalse();

    // Now deselect
    builder.deSelectStageQuestion(mockStage.id);
    fixture.detectChanges();
    await flushVaultPipeline();

    // Effect should re-run → not selected → expanded
    expect(component.isExpanded()).toBeTrue();
  });

  it('should safely return from effect when stage input is null', async () => {
    // Create a fresh component instance
    const freshFixture = TestBed.createComponent(StageReviewComponent);
    const freshComponent = freshFixture.componentInstance;

    // Explicitly set stage to null
    freshFixture.componentRef.setInput('stage', null);

    freshFixture.detectChanges();

    TestBed.tick();

    // Should not throw and should keep default value
    expect(freshComponent.isExpanded()).toBeFalse();
  });

  describe('openDocumentation', () => {
    it('should NOT call dialog service if no documentationComponentReference exists', () => {
      // mockStage has no documentationComponentReference
      component.openDocumentation();

      expect(dialogService.open).not.toHaveBeenCalled();
    });

    it('should call dialog service when documentationComponentReference exists', () => {
      const mockDocComponent = class {};

      const stageWithDocs = {
        ...mockStage,
        documentationComponentReference: mockDocComponent
      };

      fixture.componentRef.setInput('stage', stageWithDocs);
      fixture.detectChanges();

      component.openDocumentation();

      expect(dialogService.open).toHaveBeenCalledTimes(1);
      expect(dialogService.open).toHaveBeenCalledWith(mockDocComponent);
    });

    it('should safely handle undefined stage', () => {
      fixture.componentRef.setInput('stage', {
        id: 'fake-id'
      });
      fixture.detectChanges();

      component.openDocumentation();

      expect(dialogService.open).not.toHaveBeenCalled();
    });
  });
});
