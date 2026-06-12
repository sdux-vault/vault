import { Component, input, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PipelineRoutingDirective } from '../../docs/pipeline/directives/pipeline-routing.directive';
import { PipelineRelatedTopicComponent } from '../../docs/related-topic/related-topic.component';

/**
 * Reusable blog post layout wrapper.
 * Provides the standard blog chrome (header, meta, CTA footer)
 * around projected content.
 */
@Component({
  selector: 'sdux-blog-layout',
  standalone: true,
  imports: [RouterLink, PipelineRelatedTopicComponent],
  templateUrl: './blog-layout.component.html',
  styleUrls: ['./blog-layout.component.scss', '../../docs/scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogLayoutComponent extends PipelineRoutingDirective {
  readonly title = input.required<string>();
  readonly date = input.required<string>();
  readonly pillar = input.required<string>();
  readonly readingTime = input.required<string>();
}
