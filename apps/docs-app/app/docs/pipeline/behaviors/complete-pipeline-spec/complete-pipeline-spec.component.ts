import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  DiagramComponent
} from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-full-pipeline-spec',
  standalone: true,
  imports: [RouterModule, DiagramComponent, BrandNameComponent],
  templateUrl: './complete-pipeline-spec.component.html',
  styleUrls: ['../../../scss/example.scss']
})
export class CompletePipelineSpecComponent {}
