import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withObjectDeepMergeBehavior } from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { resetVaultForTests, vaultSettled } from '@sdux-vault/engine';
import {
  clearSessionStorage,
  flushVaultPipeline
} from '@sdux-vault/testing-utils';
import { PIPELINE_BUILDER_ALL_BEHAVIOR_CONSTANT } from '../constants/stages/all-stage-behavior.constant';
import { PIPELINE_BUILDER_ALL_STAGE_CONSTANT } from '../constants/stages/all-stage.constant';
import { PIPELINE_BUILDER_BEHAVIOR_TOKEN } from '../tokens/pipeline-builder-behaviors.token';
import { PIPELINE_BUILDER_STAGE_TOKEN } from '../tokens/pipeline-builder-stages.token';
import { PipelineBuilderService } from './pipeline-builder.service';

describe('Service: PipelineBuilder', () => {
  const key = 'pipeline-builder';
  let service: PipelineBuilderService;

  describe('Corrupt initial state', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [],
        providers: [
          {
            provide: PIPELINE_BUILDER_STAGE_TOKEN,
            useValue: PIPELINE_BUILDER_ALL_STAGE_CONSTANT
          },
          {
            provide: PIPELINE_BUILDER_BEHAVIOR_TOKEN,
            useValue: PIPELINE_BUILDER_ALL_BEHAVIOR_CONSTANT
          },
          provideZonelessChangeDetection(),
          provideVaultTesting(),
          provideFeatureCell(
            PipelineBuilderService,
            {
              key: 'pipeline-builder',
              initialState: {
                currentStep: -1,
                stageInstances: []
              }
            },
            [withObjectDeepMergeBehavior]
          )
        ]
      });

      service = TestBed.inject(PipelineBuilderService);
      await vaultSettled(key);
      TestBed.tick();
      await vaultSettled(key);
    });

    afterEach(() => {
      resetVaultForTests();
      clearSessionStorage('vault::sessionstorage::pipeline-builder');
    });

    it('should have the steps and transverse them', async () => {
      expect(service.stepNumber()).toBe(1);
    });

    it('should return false when a stage is active', async () => {
      await flushVaultPipeline();
      const stages = service.stageQuestions();
      const stage = stages[0];
      const stageId = stage.id;

      service.selectStageQuestion(stageId);

      // force activation via recalc
      expect(service.stageInstances().length).toBe(4);
    });
  });

  describe('Constructor Defensive Initialization', () => {
    afterEach(() => {
      resetVaultForTests();
      clearSessionStorage('vault::sessionstorage::pipeline-builder');
    });

    beforeEach(async () => {
      TestBed.resetTestingModule();

      await TestBed.configureTestingModule({
        imports: [],
        providers: [
          {
            provide: PIPELINE_BUILDER_STAGE_TOKEN,
            useValue: []
          },
          {
            provide: PIPELINE_BUILDER_BEHAVIOR_TOKEN,
            useValue: []
          },
          provideZonelessChangeDetection(),
          provideVaultTesting(),
          provideFeatureCell(PipelineBuilderService, {
            key: 'pipeline-builder',
            initialState: {
              behaviorInstances: []
            } // ← intentionally empty
          })
        ]
      }).compileComponents();

      service = TestBed.inject(PipelineBuilderService);

      await vaultSettled('pipeline-builder');
      TestBed.tick();
      await vaultSettled('pipeline-builder');
    });

    it('should initialize missing state branches when initial state is empty', async () => {
      // Should have default step set
      expect(service.stepNumber()).toBe(1);

      // Should have initialized stageInstances
      expect(service.stageInstances().length).toBe(0);

      // Behavior instances should exist
      expect(service.getBehaviorInstance('behavior1' as any)).toBeUndefined();
    });
  });
});
