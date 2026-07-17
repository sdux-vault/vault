import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';
import { PipelineRelatedTopicComponent } from 'apps/docs-app/app/docs/related-topic/related-topic.component';

@Component({
  selector: 'sdux-full-tutorial-spec',
  standalone: true,
  imports: [RouterModule, BrandNameComponent, PipelineRelatedTopicComponent],
  templateUrl: './tutorial.component.html',
  styleUrls: ['../scss/documentation.scss']
})
export class TutorialComponent {}
