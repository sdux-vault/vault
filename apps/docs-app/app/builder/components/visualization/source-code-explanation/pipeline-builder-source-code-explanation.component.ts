import { Component, computed, inject } from '@angular/core';
import { PipelineBuilderService } from 'apps/docs-app/app/builder/services/pipeline-builder.service';
import { StateFrameworkTypes } from 'apps/docs-app/app/builder/types/state-framework.type';
import { PipelineBuilderSourceCodeExplanationAngularComponent } from './angular/pipeline-builder-source-code-explanation.component';
import { PipelineBuilderSourceCodeExplanationReactComponent } from './react/pipeline-builder-source-code-explanation.component';
import { PipelineBuilderSourceCodeExplanationSvelteComponent } from './svelte/pipeline-builder-source-code-explanation.component';
import { PipelineBuilderSourceCodeExplanationVueComponent } from './vue/pipeline-builder-source-code-explanation.component';

@Component({
  selector: 'sdux-pipeline-builder-source-code-explanation',
  standalone: true,
  imports: [
    PipelineBuilderSourceCodeExplanationAngularComponent,
    PipelineBuilderSourceCodeExplanationReactComponent,
    PipelineBuilderSourceCodeExplanationSvelteComponent,
    PipelineBuilderSourceCodeExplanationVueComponent
  ],
  styles: `
    @use 'global' as global;
    .explanation {
      padding: global.$spacing_md;
      font-size: global.$font-size-sm;
      @include global.sdux-elevate(hover);
    }
  `,
  templateUrl: 'pipeline-builder-source-code-explanation.component.html'
})
export class PipelineBuilderSourceCodeExplanationComponent {
  readonly pipelineBuilderService = inject(PipelineBuilderService);

  readonly isAngular = computed(() => {
    return (
      this.pipelineBuilderService.getStateFramework() ===
      StateFrameworkTypes.Angular
    );
  });

  readonly isReact = computed(() => {
    return (
      this.pipelineBuilderService.getStateFramework() ===
      StateFrameworkTypes.React
    );
  });

  readonly isVue = computed(() => {
    return (
      this.pipelineBuilderService.getStateFramework() ===
      StateFrameworkTypes.Vue
    );
  });

  readonly isSvelte = computed(() => {
    return (
      this.pipelineBuilderService.getStateFramework() ===
      StateFrameworkTypes.Svelte
    );
  });
}
