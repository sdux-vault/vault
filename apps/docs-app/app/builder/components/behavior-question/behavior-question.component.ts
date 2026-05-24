import { Component, computed, inject, input, Type } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PipelineBuilderService } from 'apps/docs-app/app/builder/services/pipeline-builder.service';
import { BehaviorDefinitionShape } from 'apps/docs-app/app/builder/shapes/behavior-definition.shape';
import { ParameterDefinition } from 'apps/docs-app/app/builder/shapes/parameter-definition.shape';
import { PipelineBuilderDocumentDialogService } from '../../services/dialog/pipeline-builder-document-dialog.service';
import { BehaviorSelectionModeTypes } from '../../types/behavior-selection-mode.type';
import { BehaviorStatusTypes } from '../../types/behavior-status.type';

@Component({
  selector: 'sdux-behavior-question',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './behavior-question.component.html',
  styleUrls: ['./behavior-question.component.scss']
})
export class BehaviorQuestionComponent {
  /** Static definition */
  readonly behavior = input.required<BehaviorDefinitionShape>();

  /** Builder service (single source of truth) */
  #pipelineBuilderService = inject(PipelineBuilderService);

  readonly #pipelineBuilderDocumentationDialogService = inject(
    PipelineBuilderDocumentDialogService
  );

  /** Live behavior instance from vault */
  readonly instance = computed(() =>
    this.#pipelineBuilderService.getBehaviorInstance(this.behavior().id)
  );

  /** Derived UI state */
  readonly isMultipleSelectionMode = computed(
    () =>
      this.#pipelineBuilderService.getBehaviorSelectionMode(
        this.behavior().parentId
      ) === BehaviorSelectionModeTypes.Multiple
  );
  readonly selected = computed(() => this.instance()?.selected ?? null);
  readonly paramsState = computed(() => this.instance()?.params ?? {});
  readonly disabled = computed(() => this.behavior()?.disabled ?? false);
  readonly tooltip = computed(() => {
    return this.disabled() ? (this.behavior().disabledNote ?? '') : '';
  });
  readonly aiAssist = computed(() => {
    return this.behavior().aiAssist ? true : false;
  });

  selectYes(): void {
    const behavior = this.behavior();

    if (!this.disabled()) {
      this.#pipelineBuilderService.setBehaviorSelected(behavior.id, true);

      const instance = this.instance(); // re-read AFTER mutation

      if (!instance?.params && behavior.params?.length) {
        const defaults: Record<string, unknown> = {};

        for (const param of behavior.params) {
          defaults[param.key] = param.defaultValue ?? null;
        }

        this.#pipelineBuilderService.updateBehaviorParams(
          behavior.id,
          defaults
        );
      }
    }
  }

  selectNo(): void {
    if (!this.disabled()) {
      this.#pipelineBuilderService.setBehaviorSelected(
        this.behavior().id,
        false
      );
    }
  }

  openDocumentation() {
    const component: Type<unknown> | undefined =
      this.behavior()?.documentationComponentReference;
    if (component) {
      this.#pipelineBuilderDocumentationDialogService.open(component);
    }
  }

  getNoButtonClass(): string {
    if (this.selected() === false) {
      return 'is-selected';
    } else {
      return 'is-not-selected';
    }
  }

  getYesButtonClass(): string {
    if (this.selected()) {
      return 'is-selected';
    } else {
      return 'is-not-selected';
    }
  }

  updateParam(param: ParameterDefinition, value: unknown): void {
    const current = this.paramsState();

    const update = {
      ...current,
      [param.key]: value === undefined ? null : value
    };

    this.#pipelineBuilderService.updateBehaviorParams(
      this.behavior().id,
      update
    );
  }

  behaviorStatus = computed<string | undefined>(() => {
    const status = this.#pipelineBuilderService.getBehaviorUiState(
      this.behavior().id
    );
    switch (status) {
      case BehaviorStatusTypes.Complete:
        return 'complete';

      case BehaviorStatusTypes.Inactive:
        return 'inactive';

      default:
        return 'idle';
    }
  });
}
