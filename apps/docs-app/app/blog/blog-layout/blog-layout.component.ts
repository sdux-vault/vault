import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
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
  imports: [RouterLink, MatTooltip, PipelineRelatedTopicComponent],
  templateUrl: './blog-layout.component.html',
  styleUrls: ['./blog-layout.component.scss', '../../docs/scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogLayoutComponent extends PipelineRoutingDirective {
  readonly title = input.required<string>();
  readonly date = input.required<string>();
  readonly pillar = input.required<string>();
  readonly readingTime = input.required<string>();

  readonly #pillarLabels: Record<string, string> = {
    TA: 'Technical Authority',
    ED: 'Educational Series',
    SP: 'Social Proof/Momentum',
    CE: 'Community Engagement'
  };

  readonly pillarLabel = computed(
    () => this.#pillarLabels[this.pillar()] ?? this.pillar()
  );
}
