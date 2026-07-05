import { Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';
import { PipelineBuilderService } from '../../services/pipeline-builder.service';
import { BehaviorIdTypes } from '../../types/id/behavior-id.type';
import { PipelineBuilderSourceCodeVisualizationComponent } from './source-code/pipeline-builder-visualization-source-code.component';

@Component({
  selector: 'sdux-pipeline-builder-visualization',
  standalone: true,
  imports: [
    RouterModule,
    MatTabsModule,
    BrandNameComponent,
    MatIconModule,
    MatTooltipModule,
    PipelineBuilderSourceCodeVisualizationComponent
  ],
  templateUrl: './pipeline-builder-visualization.component.html',
  styleUrls: [
    '../../../docs/scss/documentation.scss',
    './pipeline-builder-visualization.component.scss'
  ]
})
export class PipelineBuilderVisualizationComponent {
  readonly pipelineBuilderService = inject(PipelineBuilderService);

  displayPreviewPage(): boolean {
    return this.pipelineBuilderService.stepNumber() === 3;
  }

  readonly isFromStreamSelected = computed(() => {
    const instance = this.pipelineBuilderService.getBehaviorInstance(
      BehaviorIdTypes.WithCoreFromStreamBehavior
    );

    return instance?.selected === true;
  });
}
