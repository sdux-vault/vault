// stage-review.component.ts
import { Component, effect, inject, input, signal, Type } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StageDefinitionShape } from 'apps/docs-app/app/builder/shapes/stage-definition.shape';
import { PipelineBuilderDocumentDialogService } from '../../services/dialog/pipeline-builder-document-dialog.service';
import { PipelineBuilderService } from '../../services/pipeline-builder.service';

@Component({
  selector: 'sdux-stage-review',
  imports: [MatIconModule, MatTooltipModule],
  standalone: true,
  templateUrl: './stage-review.component.html',
  styleUrls: ['./stage-review.component.scss']
})
export class StageReviewComponent {
  /** Stage definition (signal input) */
  readonly stage = input.required<StageDefinitionShape | null>();

  readonly builder = inject(PipelineBuilderService);

  readonly isExpanded = signal(false);

  readonly #pipelineBuilderDocumentationDialogService = inject(
    PipelineBuilderDocumentDialogService
  );

  constructor() {
    effect(() => {
      const stage = this.stage();
      if (!stage) return;

      const selected = this.builder.getStageSelectedState(stage.id) === true;
      this.isExpanded.set(!selected);
    });
  }

  toggle(): void {
    this.isExpanded.update((toggle) => !toggle);
  }

  openDocumentation() {
    const component: Type<unknown> | undefined =
      this.stage()?.documentationComponentReference;
    if (component) {
      this.#pipelineBuilderDocumentationDialogService.open(component);
    }
  }
}
