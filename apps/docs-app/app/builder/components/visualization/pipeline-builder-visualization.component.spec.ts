// pipeline-builder-splashpage.component.spec
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { clearSessionStorage } from '@sdux-vault/testing-utils';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { PIPELINE_BUILDER_BEHAVIOR_TOKEN } from '../../tokens/pipeline-builder-behaviors.token';
import { PIPELINE_BUILDER_STAGE_TOKEN } from '../../tokens/pipeline-builder-stages.token';
import { BehaviorIdTypes } from '../../types/id/behavior-id.type';
import { StageIdTypes } from '../../types/id/stage-id.type';
import { PipelineBuilderVisualizationComponent } from './pipeline-builder-visualization.component';

describe('Component: PipelineBuilderVisualization', () => {
  const key = 'pipeline-builder';
  let fixture: ComponentFixture<PipelineBuilderVisualizationComponent>;
  let component: PipelineBuilderVisualizationComponent;

  const MOCK_STAGES = [
    {
      id: 'policy',
      kind: 'stage',
      stageLabel: 'Policy',
      label: 'Policy Controllers',
      description: 'Policy stage',
      selectionQuestion: 'Enable policy?',
      behaviors: [
        'withDelayController',
        BehaviorIdTypes.WithCoreFromStreamBehavior
      ],
      selectionMode: 'single',
      mode: 'basic'
    },
    {
      id: StageIdTypes.Interceptor,
      kind: 'core',
      stageLabel: 'Stream',
      label: 'Resolve (From Stream Source Code)',
      description: 'Receives values from observable stream',
      selectionQuestion: 'Will this state receive values from a stream?',
      behaviors: [], // IMPORTANT: no children
      selectionMode: 'single',
      mode: 'basic'
    }
  ];

  const MOCK_BEHAVIORS = [
    {
      id: BehaviorIdTypes.WithCoreFromStreamBehavior,
      parentId: 'policy',
      label: 'Delay Controller',
      question: 'Enable delay?',
      params: [],
      mode: 'basic'
    },
    {
      id: 'withDelayController',
      parentId: 'policy',
      label: 'Delay Controller',
      question: 'Enable delay?',
      params: [],
      mode: 'basic'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipelineBuilderVisualizationComponent, sduxTestingModule],
      providers: [
        provideVaultTesting(),
        provideRouter([]),
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

    fixture = TestBed.createComponent(PipelineBuilderVisualizationComponent);
    component = fixture.componentInstance;

    TestBed.tick();
    await vaultSettled(key);
  });

  afterEach(async () => {
    clearSessionStorage(
      `vault::sessionstorage::${key}::SDUX::Behavior::Persist::SessionStorage`
    );
  });

  describe('displayPreviewPage', () => {
    it('should handle displayPreviewPage events', () => {
      spyOn(component.pipelineBuilderService, 'stepNumber').and.returnValues(
        2,
        3
      );
      expect(component.displayPreviewPage()).toBeFalse();
      expect(component.displayPreviewPage()).toBeTrue();
    });
  });

  describe('isFromStreamSelected', () => {
    const FROM_STREAM_ID = BehaviorIdTypes.WithCoreFromStreamBehavior;

    it('should return false by default', () => {
      expect(component.isFromStreamSelected()).toBeFalse();
    });

    it('should become true when FromStream behavior is selected', async () => {
      component.pipelineBuilderService.setBehaviorSelected(
        FROM_STREAM_ID,
        true
      );
      await vaultSettled(key);

      expect(component.isFromStreamSelected()).toBeTrue();
    });

    it('should become false again when FromStream behavior is deselected', async () => {
      component.pipelineBuilderService.setBehaviorSelected(
        FROM_STREAM_ID,
        true
      );
      await vaultSettled(key);

      expect(component.isFromStreamSelected()).toBeTrue();

      component.pipelineBuilderService.setBehaviorSelected(
        FROM_STREAM_ID,
        false
      );
      await vaultSettled(key);

      expect(component.isFromStreamSelected()).toBeFalse();
    });

    it('should react correctly when toggled multiple times', async () => {
      component.pipelineBuilderService.setBehaviorSelected(
        FROM_STREAM_ID,
        true
      );
      await vaultSettled(key);

      expect(component.isFromStreamSelected()).toBeTrue();

      component.pipelineBuilderService.setBehaviorSelected(
        FROM_STREAM_ID,
        false
      );
      await vaultSettled(key);
      expect(component.isFromStreamSelected()).toBeFalse();

      component.pipelineBuilderService.setBehaviorSelected(
        FROM_STREAM_ID,
        true
      );
      await vaultSettled(key);
      expect(component.isFromStreamSelected()).toBeTrue();
    });
  });
});
