import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  BrandNameComponent,
  FeatureCellBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { NavigationDirective } from 'apps/docs-app/app/navigation/directive/navigation.directive';
import { PipelineStepService } from '../../services/pipeline-step.service';

@Component({
  selector: 'sdux-builder-start',
  standalone: true,
  imports: [
    MatIconModule,
    MatTooltipModule,
    BrandNameComponent,
    FeatureCellBrandNameComponent
  ],
  templateUrl: './builder-start.component.html',
  styleUrls: ['./builder-start.component.scss']
})
export class BuilderStartComponent extends NavigationDirective {
  readonly pipelineStepService = inject(PipelineStepService);

  start(): void {
    this.pipelineStepService.start();
    this.closeSidenav(true);
  }
}
