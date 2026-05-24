import { Component, inject } from '@angular/core';
import { StackBlitzService } from './service/stackblitz.service';

@Component({
  selector: 'sdux-pipeline-builder-stackblitz',
  standalone: true,
  templateUrl: 'pipeline-builder-stackblitz.component.html',
  styleUrls: ['pipeline-builder-stackblitz.component.scss']
})
export class PipelineBuilderStackBlitzComponent {
  readonly #stackBlitzService = inject(StackBlitzService);

  viewOnStackBlitz(): void {
    this.#stackBlitzService.buildProject();
  }
}
