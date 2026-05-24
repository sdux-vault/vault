import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input
} from '@angular/core';
import {
  ExampleViewerSourceComponent,
  ExampleViewerTabComponent
} from '@sdux-vault/ui/web-components';
import { PipelineFileBuilderService } from 'apps/docs-app/app/builder/services/files/pipeline-file-builder.service';
import { GeneratedFileShape } from 'apps/docs-app/app/builder/shapes/file-builder/generated-file.shape';
import {
  FileType,
  FileTypes
} from 'apps/docs-app/app/builder/types/file-builder/file.type';
import { PipelineBuilderStackBlitzComponent } from '../../stackblitz/pipeline-builder-stackblitz.component';
import { PipelineBuilderSourceCodeExplanationComponent } from '../source-code-explanation/pipeline-builder-source-code-explanation.component';

@Component({
  selector: 'sdux-pipeline-builder-source-code-visualization',
  standalone: true,
  imports: [
    ExampleViewerSourceComponent,
    ExampleViewerTabComponent,
    PipelineBuilderSourceCodeExplanationComponent,
    PipelineBuilderStackBlitzComponent
  ],
  templateUrl: './pipeline-builder-visualization-source-code.component.html',
  styleUrls: ['../../../../docs/scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipelineBuilderSourceCodeVisualizationComponent {
  readonly #fileBuilderService = inject(PipelineFileBuilderService);
  type = input<FileType>(FileTypes.Simple);

  readonly generatedFiles = computed(() => {
    const type = this.type();
    const generatedFiles = this.#fileBuilderService.generatedFiles();

    return generatedFiles.filter((file: GeneratedFileShape) => {
      // All tab: show everything except AI Assist
      if (type === FileTypes.All) {
        return file.type !== FileTypes.AiAssist;
      }

      // AI Assist tab: show only AI Assist (do NOT include "All" files)
      if (type === FileTypes.AiAssist) {
        return file.type === FileTypes.AiAssist;
      }

      // Other tabs: show type-specific files + shared "All" files
      return file.type === type || file.type === FileTypes.All;
    });
  });

  readonly displayGeneratedExampleFiles = computed(() => {
    return this.type() !== FileTypes.AiAssist;
  });
}
