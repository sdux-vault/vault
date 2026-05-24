import { Component } from '@angular/core';
import {
  BrandNameComponent,
  FeatureCellBrandNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-pipeline-builder-source-code-svelte-explanation',
  standalone: true,
  templateUrl: 'pipeline-builder-source-code-explanation.svelte.component.html',
  imports: [BrandNameComponent, FeatureCellBrandNameComponent]
})
export class PipelineBuilderSourceCodeExplanationSvelteComponent {}
