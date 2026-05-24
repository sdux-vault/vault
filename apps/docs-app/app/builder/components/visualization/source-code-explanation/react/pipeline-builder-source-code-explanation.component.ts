import { Component } from '@angular/core';
import {
  BrandNameComponent,
  FeatureCellBrandNameComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-pipeline-builder-source-code-react-explanation',
  standalone: true,
  templateUrl: 'pipeline-builder-source-code-explanation.react.component.html',
  imports: [BrandNameComponent, FeatureCellBrandNameComponent]
})
export class PipelineBuilderSourceCodeExplanationReactComponent {}
