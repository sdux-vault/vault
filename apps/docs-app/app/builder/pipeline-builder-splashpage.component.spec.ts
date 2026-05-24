import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { clearSessionStorage } from '@sdux-vault/testing-utils';
import {
  MobileLayoutService,
  sduxTestingModule
} from '@sdux-vault/ui/web-components';
import { PipelineBuilderSplashpageComponent } from './pipeline-builder-splashpage.component';
import { PIPELINE_BUILDER_BEHAVIOR_TOKEN } from './tokens/pipeline-builder-behaviors.token';
import { PIPELINE_BUILDER_STAGE_TOKEN } from './tokens/pipeline-builder-stages.token';
import { BehaviorIdTypes } from './types/id/behavior-id.type';
import { StageIdTypes } from './types/id/stage-id.type';

/**
 * --------------------------------------------
 * Mock MobileLayoutService (Signal-based)
 * --------------------------------------------
 */
class MockMobileLayoutService {
  readonly isMobile = signal(false);
}

describe('Component: PipelineBuilderSplashpageComponent', () => {
  const key = 'pipeline-builder';
  let fixture: ComponentFixture<PipelineBuilderSplashpageComponent>;
  let component: PipelineBuilderSplashpageComponent;
  let mobile: MockMobileLayoutService;

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
      imports: [PipelineBuilderSplashpageComponent, sduxTestingModule],
      providers: [
        provideVaultTesting(),
        provideRouter([]),
        {
          provide: MobileLayoutService,
          useClass: MockMobileLayoutService
        },
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

    fixture = TestBed.createComponent(PipelineBuilderSplashpageComponent);
    component = fixture.componentInstance;
    mobile = TestBed.inject(
      MobileLayoutService
    ) as unknown as MockMobileLayoutService;

    TestBed.tick();
    await vaultSettled(key);
  });

  afterEach(async () => {
    clearSessionStorage(
      `vault::sessionstorage::${key}::SDUX::Behavior::Persist::SessionStorage`
    );
  });

  /**
   * --------------------------------------------
   * Initial State
   * --------------------------------------------
   */
  it('should start on step one', () => {
    expect(component.isAboutState()).toBeTrue();
  });

  it('should default to non-mobile layout', () => {
    expect(component.isSmallScreen()).toBeFalse();
  });

  it('should set correct layout widths on step one (desktop)', () => {
    expect(component.leftPanelWidth()).toBe('0%');
    expect(component.rightPanelWidth()).toBe('100%');
  });

  it('should have stage questions', () => {
    const stageQuestions = component.stageQuestions();

    expect(stageQuestions[0]).toEqual(
      Object({
        id: 'policy',
        kind: 'stage',
        label: 'Policy Controllers',
        description: jasmine.any(String),
        selectionQuestion: jasmine.any(String),
        behaviors: ['withDelayController', 'withCoreFromStreamBehavior'],
        selectionMode: 'single',
        stageLabel: 'Policy',
        mode: 'basic'
      })
    );
  });

  /**
   * --------------------------------------------
   * Layout Logic – Desktop
   * --------------------------------------------
   */
  describe('layout', () => {
    describe('desktop', () => {
      it('should compute correct widths on step two (desktop)', async () => {
        spyOn(
          component.pipelineBuilderService,
          'stateInputComplete'
        ).and.returnValue(true);
        expect(component.leftPanelWidth()).toBe('0%');
        expect(component.rightPanelWidth()).toBe('100%');

        component.continue();
        await vaultSettled(key);

        expect(component.leftPanelWidth()).toBe('22%');
        expect(component.rightPanelWidth()).toBe('78%');
      });
    });

    describe('mobile', () => {
      /**
       * --------------------------------------------
       * Layout Logic – Mobile
       * --------------------------------------------
       */
      it('should treat mobile layout as small screen', () => {
        mobile.isMobile.set(true);

        expect(component.isSmallScreen()).toBeTrue();
      });

      it('should keep right panel at 100% on step one (mobile)', () => {
        mobile.isMobile.set(true);

        expect(component.leftPanelWidth()).toBe('0%');
        expect(component.rightPanelWidth()).toBe('100%');
      });

      it('should keep right panel at 100% on step two (mobile)', async () => {
        mobile.isMobile.set(true);
        component.continue();

        expect(component.leftPanelWidth()).toBe('0%');
        expect(component.rightPanelWidth()).toBe('100%');
      });

      it('should make a reset call', async () => {
        spyOn(component.pipelineBuilderService, 'restartBuilder');
        component.restart(); // step 2 desktop
        expect(
          component.pipelineBuilderService.restartBuilder
        ).toHaveBeenCalledWith();
      });
    });

    /**
     * --------------------------------------------
     * Reactive Consistency
     * --------------------------------------------
     */
    describe('Reactive Consistency', () => {
      it('should react immediately to mobile layout changes', async () => {
        spyOn(
          component.pipelineBuilderService,
          'stateInputComplete'
        ).and.returnValue(true);
        component.continue();
        await vaultSettled(key);

        // Desktop first
        expect(component.leftPanelWidth()).toBe('22%');
        expect(component.rightPanelWidth()).toBe('78%');

        // Switch to mobile
        mobile.isMobile.set(true);

        expect(component.leftPanelWidth()).toBe('0%');
        expect(component.rightPanelWidth()).toBe('100%');
      });
    });
  });

  describe('isDisplayBehaviors', () => {
    it('should return false when no viewing stage is set', () => {
      expect(component.isDisplayBehaviors()).toBeFalse();
    });

    it('should return false when viewing stage is not selected', async () => {
      component.pipelineBuilderService.setViewingStage('policy');
      await vaultSettled(key);

      // stage exists but not selected
      expect(component.isDisplayBehaviors()).toBeFalse();
    });

    it('should return true when viewing stage is selected', async () => {
      component.pipelineBuilderService.selectStageQuestion('policy');
      await vaultSettled(key);

      component.pipelineBuilderService.setViewingStage('policy');
      await vaultSettled(key);

      expect(component.isDisplayBehaviors()).toBeTrue();
    });

    it('should reactively update when stage is deselected', async () => {
      component.pipelineBuilderService.selectStageQuestion('policy');
      await vaultSettled(key);

      component.pipelineBuilderService.setViewingStage('policy');
      await vaultSettled(key);

      expect(component.isDisplayBehaviors()).toBeTrue();

      component.pipelineBuilderService.deSelectStageQuestion('policy');
      await vaultSettled(key);

      expect(component.isDisplayBehaviors()).toBeFalse();
    });

    it('should return false if viewingStageId becomes null', async () => {
      component.pipelineBuilderService.selectStageQuestion('policy');
      await vaultSettled(key);

      component.pipelineBuilderService.setViewingStage('policy');
      await vaultSettled(key);

      expect(component.isDisplayBehaviors()).toBeTrue();

      component.pipelineBuilderService.setViewingStage(null);
      await vaultSettled(key);

      expect(component.isDisplayBehaviors()).toBeFalse();
    });
  });

  it('should compute steps correctly', async () => {
    spyOn(
      component.pipelineBuilderService,
      'allStagesResolved'
    ).and.returnValues(
      false,
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true
    );

    expect(component.stepInstruction).toBe('Step 1: Describe your state');

    expect(component.isRightPanelDisplayed())
      .withContext('isRightPanelDisplayed')
      .toBeFalse();
    expect(component.isAboutState()).withContext('isAboutState').toBeTrue();
    expect(component.isBehaviorConfiguration())
      .withContext('isBehaviorConfiguration')
      .toBeFalse();
    expect(component.isBehaviorConfigurationFinished())
      .withContext('isBehaviorConfigurationFinished')
      .toBeFalse();
    expect(component.isPreviewCode()).withContext('isPreviewCode').toBeFalse();
    expect(component.isBuilderAvailable())
      .withContext('isBuilderAvailable')
      .toBeTrue();
    expect(component.isContinueButtonDisabled())
      .withContext('isContinueButtonDisabled')
      .toBeTrue();
    expect(component.isActiveBehaviorStageContinueDisabled())
      .withContext('isActiveBehaviorStageContinueDisabled')
      .toBeFalse();

    component.continue();

    spyOn(
      component.pipelineBuilderService,
      'stateInputComplete'
    ).and.returnValue(true);

    expect(component.stepInstruction).toBe('Step 1: Describe your state');

    expect(component.isRightPanelDisplayed())
      .withContext('isRightPanelDisplayed')
      .toBeFalse();
    expect(component.isAboutState()).withContext('isAboutState').toBeTrue();
    expect(component.isBehaviorConfiguration())
      .withContext('isBehaviorConfiguration')
      .toBeFalse();
    expect(component.isBehaviorConfigurationFinished())
      .withContext('isBehaviorConfigurationFinished')
      .toBeFalse();
    expect(component.isPreviewCode()).withContext('isPreviewCode').toBeFalse();
    expect(component.isBuilderAvailable())
      .withContext('isBuilderAvailable')
      .toBeTrue();
    expect(component.isContinueButtonDisabled())
      .withContext('isContinueButtonDisabled')
      .toBeFalse();
    expect(component.isActiveBehaviorStageContinueDisabled())
      .withContext('isActiveBehaviorStageContinueDisabled')
      .toBeFalse();

    component.continue();
    await vaultSettled(key);

    expect(component.stepInstruction).toBe('Step 2: Choose how it behaves');

    expect(component.isRightPanelDisplayed())
      .withContext('isRightPanelDisplayed')
      .toBeTrue();
    expect(component.isAboutState()).withContext('isAboutState').toBeFalse();
    expect(component.isBehaviorConfiguration())
      .withContext('isBehaviorConfiguration')
      .toBeTrue();
    expect(component.isBehaviorConfigurationFinished())
      .withContext('isBehaviorConfigurationFinished')
      .toBeFalse();
    expect(component.isPreviewCode()).withContext('isPreviewCode').toBeFalse();
    expect(component.isBuilderAvailable())
      .withContext('isBuilderAvailable')
      .toBeTrue();
    expect(component.isContinueButtonDisabled())
      .withContext('isContinueButtonDisabled')
      .toBeTrue();
    expect(component.isActiveBehaviorStageContinueDisabled())
      .withContext('isActiveBehaviorStageContinueDisabled')
      .toBeTrue();

    component.continue();
    await vaultSettled(key);

    expect(component.stepInstruction).toBe(
      'Step 3: Preview the generated code'
    );

    spyOn(
      component.pipelineBuilderService,
      'isViewingStageContinueEnabled'
    ).and.returnValue(false);

    expect(component.isRightPanelDisplayed())
      .withContext('isRightPanelDisplayed')
      .toBeTrue();
    expect(component.isAboutState()).withContext('isAboutState').toBeFalse();
    expect(component.isBehaviorConfiguration())
      .withContext('isBehaviorConfiguration')
      .toBeFalse();
    expect(component.isBehaviorConfigurationFinished())
      .withContext('isBehaviorConfigurationFinished')
      .toBeTrue();
    expect(component.isPreviewCode()).withContext('isPreviewCode').toBeTrue();
    expect(component.isBuilderAvailable())
      .withContext('isBuilderAvailable')
      .toBeFalse();
    expect(component.isContinueButtonDisabled())
      .withContext('isContinueButtonDisabled')
      .toBeTrue();
    expect(component.isActiveBehaviorStageContinueDisabled())
      .withContext('isActiveBehaviorStageContinueDisabled')
      .toBeFalse();

    component.continue();

    expect(component.stepInstruction).toBe(
      'Step 3: Preview the generated code'
    );

    expect(component.isRightPanelDisplayed())
      .withContext('isRightPanelDisplayed')
      .toBeTrue();
    expect(component.isAboutState()).withContext('isAboutState').toBeFalse();
    expect(component.isBehaviorConfiguration())
      .withContext('isBehaviorConfiguration')
      .toBeFalse();
    expect(component.isBehaviorConfigurationFinished())
      .withContext('isBehaviorConfigurationFinished')
      .toBeTrue();
    expect(component.isPreviewCode()).withContext('isPreviewCode').toBeTrue();
    expect(component.isBuilderAvailable())
      .withContext('isBuilderAvailable')
      .toBeFalse();
    expect(component.isContinueButtonDisabled())
      .withContext('isContinueButtonDisabled')
      .toBeTrue();
    expect(component.isActiveBehaviorStageContinueDisabled())
      .withContext('isActiveBehaviorStageContinueDisabled')
      .toBeFalse();

    component.back();
    await vaultSettled(key);

    expect(component.stepInstruction).toBe('Step 2: Choose how it behaves');
    expect(component.isRightPanelDisplayed())
      .withContext('isRightPanelDisplayed')
      .toBeTrue();
    expect(component.isAboutState()).withContext('isAboutState').toBeFalse();
    expect(component.isBehaviorConfiguration())
      .withContext('isBehaviorConfiguration')
      .toBeTrue();
    expect(component.isBehaviorConfigurationFinished())
      .withContext('isBehaviorConfigurationFinished')
      .toBeTrue();
    expect(component.isPreviewCode()).withContext('isPreviewCode').toBeFalse();
    expect(component.isBuilderAvailable())
      .withContext('isBuilderAvailable')
      .toBeTrue();
    expect(component.isContinueButtonDisabled())
      .withContext('isContinueButtonDisabled')
      .toBeFalse();
    expect(component.isActiveBehaviorStageContinueDisabled())
      .withContext('isActiveBehaviorStageContinueDisabled')
      .toBeTrue();

    component.back();
    await vaultSettled(key);
    expect(component.stepInstruction).toBe('Step 1: Describe your state');

    component.back();
    expect(component.stepInstruction).toBe('Step 1: Describe your state');
  });

  it('should not change layout widths when instructions are toggled', async () => {
    component.continue(); // step 2 desktop

    const left = component.leftPanelWidth();
    const right = component.rightPanelWidth();

    component.pipelineStepService.toggleInstructions();

    expect(component.leftPanelWidth()).toBe(left);
    expect(component.rightPanelWidth()).toBe(right);
  });

  describe('finishStage', () => {
    it('should return false when finishStage is called outside behavior configuration step', async () => {
      // Step 1 by default
      expect(component.isBehaviorConfiguration()).toBeFalse();

      const spy = spyOn(
        component.pipelineBuilderService,
        'finalizeActiveBehaviorStage'
      );

      const result = component.continueBehaviorStage();

      expect(result).toBeFalse();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should call finishBehaviorStage and return its result when in behavior configuration step', async () => {
      // Move to step 3
      component.pipelineBuilderService.incrementStep(); // step 2
      await vaultSettled(key);

      /*
      component.pipelineBuilderService.incrementStep(); // step 3
      await vaultSettled(key);
      */

      expect(component.isBehaviorConfiguration()).toBeTrue();

      const spy = spyOn(
        component.pipelineBuilderService,
        'finalizeActiveBehaviorStage'
      );

      component.continueBehaviorStage();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('resetStage', () => {
    it('should NOT reset stage when not in behavior configuration step', () => {
      spyOn(component, 'isBehaviorConfiguration').and.returnValue(false);
      const resetSpy = spyOn(
        component.pipelineBuilderService,
        'resetActiveBehaviorStage'
      );

      component.resetStage();

      expect(resetSpy).not.toHaveBeenCalled();
    });

    it('should reset active behavior stage when in behavior configuration step', () => {
      spyOn(component, 'isBehaviorConfiguration').and.returnValue(true);
      const resetSpy = spyOn(
        component.pipelineBuilderService,
        'resetActiveBehaviorStage'
      );

      component.resetStage();

      expect(resetSpy).toHaveBeenCalledTimes(1);
    });

    it('should not throw even if resetActiveBehaviorStage is a no-op', () => {
      spyOn(component, 'isBehaviorConfiguration').and.returnValue(true);
      spyOn(
        component.pipelineBuilderService,
        'resetActiveBehaviorStage'
      ).and.stub();

      expect(() => component.resetStage()).not.toThrow();
    });
  });

  describe('Stage Visibility APIs', () => {
    describe('visibleStageController', () => {
      it('should return null when no viewing stage is set', () => {
        expect(component.visibleStageController()).toBeNull();
      });

      it('should return stage definition when viewing stage is set', async () => {
        component.pipelineBuilderService.setViewingStage('policy');
        await vaultSettled(key);

        const stage = component.visibleStageController();

        expect(stage).toBeTruthy();
        expect(stage?.id).toBe('policy');
      });
    });

    describe('visibleStageBehaviors', () => {
      it('should return null when no viewing stage is set', () => {
        expect(component.visibleStageBehaviors()).toBeNull();
      });

      it('should return behaviors for stage with children', async () => {
        component.pipelineBuilderService.setViewingStage('policy');
        await vaultSettled(key);

        const behaviors = component.visibleStageBehaviors();

        expect(behaviors).toBeTruthy();
        expect(behaviors?.length).toBe(2);
        expect(behaviors?.[0].id).toBe('withDelayController');
      });

      it('should return empty array for stage without children', async () => {
        component.pipelineBuilderService.setViewingStage(
          StageIdTypes.Interceptor
        );
        await vaultSettled(key);

        const behaviors = component.visibleStageBehaviors();

        expect(behaviors).toEqual([]);
      });
    });

    describe('hasChildren', () => {
      it('should return false when no viewing stage is set', () => {
        expect(component.hasChildren).toBeFalse();
      });

      it('should return true when viewing stage has behaviors', async () => {
        component.pipelineBuilderService.setViewingStage('policy');
        await vaultSettled(key);

        expect(component.hasChildren).toBeTrue();
      });

      it('should return false when viewing stage has no behaviors', async () => {
        component.pipelineBuilderService.setViewingStage(
          StageIdTypes.Interceptor
        );
        await vaultSettled(key);

        expect(component.hasChildren).toBeFalse();
      });
    });
  });
});
