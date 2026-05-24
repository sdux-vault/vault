import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { StageDefinitionShape } from 'apps/docs-app/app/builder/shapes/stage-definition.shape';
import { SelectionModeTypes } from 'apps/docs-app/app/builder/types/selection-mode.type';
import { PipelineBuilderService } from '../../services/pipeline-builder.service';
import { StageStatusTypes } from '../../types/stage-status.type';

@Component({
  selector: 'sdux-stage-question',
  standalone: true,
  imports: [MatIconModule, MatTooltip],
  templateUrl: './stage-question.component.html',
  styleUrls: ['./stage-question.component.scss']
})
export class StageQuestionComponent {
  /** Stage definition (signal input) */
  readonly stage = input.required<StageDefinitionShape>();

  /** Local selection state (Step 1 only) */
  readonly #isSelected = signal<boolean | null>(null);

  /** Convenience */
  readonly isSingleSelection = () =>
    this.stage().selectionMode === SelectionModeTypes.Single;

  readonly pipelineBuilderService = inject(PipelineBuilderService);

  readonly disabled = computed(() => this.stage()?.disabled ?? false);

  readonly tooltip = computed(() => {
    return this.disabled() ? (this.stage().note ?? '') : '';
  });

  readonly noButtonClass = computed<string>(() => {
    const isNoButtonSelected = this.#isSelected();
    if (isNoButtonSelected === false) {
      return 'is-selected';
    } else {
      return 'is-not-selected';
    }
  });

  readonly yesButtonClass = computed<string>(() => {
    const isYesButtonSelected = this.#isSelected();
    if (isYesButtonSelected) {
      return 'is-selected';
    } else {
      return 'is-not-selected';
    }
  });

  readonly active = computed<boolean>(() => {
    return this.pipelineBuilderService.viewingStageId() === this.stage().id;
  });

  constructor() {
    effect(() => {
      this.#isSelected.set(
        this.pipelineBuilderService.getStageSelectedState(this.stage().id)
      );
    });
  }

  onStageClick() {
    this.pipelineBuilderService.setViewingStage(this.stage().id);
  }

  selectYes(): void {
    if (!this.disabled()) {
      this.#isSelected.set(true);
      this.pipelineBuilderService.selectStageQuestion(this.stage().id);
      this.pipelineBuilderService.setViewingStage(this.stage().id);
    }
  }

  selectNo(): void {
    if (!this.disabled()) {
      this.#isSelected.set(false);
      this.pipelineBuilderService.deSelectStageQuestion(this.stage().id);
      this.pipelineBuilderService.setViewingStage(this.stage().id);
    }
  }

  stageStatus = computed<string | undefined>(() => {
    const status = this.pipelineBuilderService.getStageUiState(this.stage().id);
    if (this.active()) {
      switch (status) {
        case StageStatusTypes.Complete:
          return this.pipelineBuilderService.getStageSelectedState(
            this.stage().id
          )
            ? 'complete'
            : 'idle';

        case StageStatusTypes.Inactive:
          return 'inactive';

        default:
          return 'active';
      }
    } else {
      switch (status) {
        case StageStatusTypes.Complete:
          return 'complete';

        case StageStatusTypes.Inactive:
          return 'inactive';

        default:
          return 'idle';
      }
    }
  });
}
