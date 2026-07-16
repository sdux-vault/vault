import { Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  MobileLayoutService,
  SDUX_BRAND_NAME
} from '@sdux-vault/ui/web-components';
import { BehaviorQuestionComponent } from './components/behavior-question/behavior-question.component';
import { StageQuestionComponent } from './components/stage-question/stage-question.component';
import { StageReviewComponent } from './components/stage-review/stage-review.component';
import { BuilderStartComponent } from './components/start/builder-start.component';
import { StateDefinitionFormComponent } from './components/state-definition-form/state-definition-form.component';
import { PipelineBuilderVisualizationComponent } from './components/visualization/pipeline-builder-visualization.component';
import { PipelineBuilderService } from './services/pipeline-builder.service';
import { PipelineStepService } from './services/pipeline-step.service';

@Component({
  selector: 'sdux-pipeline-builder-splashpage',
  standalone: true,
  imports: [
    RouterModule,
    MatTabsModule,
    BrandNameComponent,
    MatIconModule,
    MatTooltipModule,
    StageQuestionComponent,
    BehaviorQuestionComponent,
    StateDefinitionFormComponent,
    StageReviewComponent,
    BuilderStartComponent,
    PipelineBuilderVisualizationComponent
  ],
  templateUrl: './pipeline-builder-splashpage.component.html',
  styleUrls: [
    '../docs/scss/documentation.scss',
    './pipeline-builder-splashpage.component.scss'
  ]
})
export class PipelineBuilderSplashpageComponent {
  brandName = inject(SDUX_BRAND_NAME);
  readonly pipelineBuilderService = inject(PipelineBuilderService);

  readonly pipelineStepService = inject(PipelineStepService);

  readonly stageQuestions = this.pipelineBuilderService.stageQuestions;

  readonly visibleStageBehaviors = computed(() => {
    return this.pipelineBuilderService.visibleBehaviorContent();
  });

  readonly visibleStageController = computed(() => {
    return this.pipelineBuilderService.visibleStageContent();
  });

  private mobile = inject(MobileLayoutService);

  /** Responsive mode */
  readonly isSmallScreen = computed(() => this.mobile.isMobile());

  readonly framework = computed(() =>
    this.pipelineBuilderService.getStateFramework()
  );

  /** Layout math */
  readonly leftPanelWidth = computed(() =>
    this.isRightPanelDisplayed() ? (this.isSmallScreen() ? '0%' : '22%') : '0%'
  );

  readonly rightPanelWidth = computed(() =>
    this.isRightPanelDisplayed()
      ? this.isSmallScreen()
        ? '100%'
        : '78%'
      : '100%'
  );

  get hasChildren(): boolean {
    return this.pipelineBuilderService.viewingStageHasChildren();
  }

  continue() {
    if (this.isAboutState()) {
      if (this.pipelineBuilderService.stateInputComplete()) {
        this.pipelineBuilderService.incrementStep();
      }
    } else if (this.isBehaviorConfiguration()) {
      if (this.isBehaviorConfigurationFinished()) {
        this.pipelineBuilderService.incrementStep();
      }
    }
  }

  continueBehaviorStage() {
    if (!this.isBehaviorConfiguration()) return false;
    return this.pipelineBuilderService.finalizeActiveBehaviorStage();
  }

  restart() {
    this.pipelineBuilderService.restartBuilder();
  }

  back() {
    this.pipelineBuilderService.decrementStep();
  }

  isRightPanelDisplayed(): boolean {
    return !this.isAboutState();
  }

  isAboutState(): boolean {
    return this.pipelineBuilderService.stepNumber() === 1;
  }

  isBehaviorConfiguration(): boolean {
    return this.pipelineBuilderService.stepNumber() === 2;
  }

  isBehaviorConfigurationFinished(): boolean {
    return this.pipelineBuilderService.allStagesResolved();
  }

  isPreviewCode(): boolean {
    return this.pipelineBuilderService.stepNumber() === 3;
  }

  isBuilderAvailable(): boolean {
    return !this.isPreviewCode();
  }

  get stepInstruction(): string {
    return this.pipelineStepService.getStepInstruction(
      this.pipelineBuilderService.stepNumber()
    );
  }

  resetStage(): void {
    if (!this.isBehaviorConfiguration()) return;
    this.pipelineBuilderService.resetActiveBehaviorStage();
  }

  isActiveBehaviorStageContinueDisabled(): boolean {
    if (!this.isBehaviorConfiguration()) return false;

    return !this.pipelineBuilderService.isViewingStageContinueEnabled();
  }

  isContinueButtonDisabled(): boolean {
    if (this.isAboutState()) {
      return !this.pipelineBuilderService.stateInputComplete();
    }

    if (
      this.pipelineStepService.isEndStep(
        this.pipelineBuilderService.stepNumber()
      )
    )
      return true;

    const allStagesResolved = this.pipelineBuilderService.allStagesResolved();
    if (this.isBehaviorConfiguration() && !allStagesResolved) {
      return true;
    }

    return false;
  }

  isDisplayBehaviors = computed<boolean>(() => {
    return (
      this.pipelineBuilderService.getStageSelectedState(
        this.pipelineBuilderService.viewingStageId()
      ) === true
    );
  });
}
