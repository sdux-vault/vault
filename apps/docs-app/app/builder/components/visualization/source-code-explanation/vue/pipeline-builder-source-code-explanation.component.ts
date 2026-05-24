import { Component } from '@angular/core';
import {
  BrandNameComponent,
  FeatureCellBrandNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-pipeline-builder-source-code-vue-explanation',
  standalone: true,
  templateUrl: 'pipeline-builder-source-code-explanation.vue.component.html',
  imports: [BrandNameComponent, FeatureCellBrandNameComponent]
})
export class PipelineBuilderSourceCodeExplanationVueComponent {}
