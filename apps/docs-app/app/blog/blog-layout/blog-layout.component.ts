import {
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ShareBarComponent } from '@sdux-vault/ui/web-components';
import { PipelineRoutingDirective } from '../../docs/pipeline/directives/pipeline-routing.directive';
import { PipelineRelatedTopicComponent } from '../../docs/related-topic/related-topic.component';
import { BlogKeepReadingComponent } from '../blog-keep-reading/blog-keep-reading.component';

/**
 * Reusable blog post layout wrapper that provides standard blog chrome
 * (header, meta bar, social share links, and CTA footer) around projected
 * content. Extends PipelineRoutingDirective to inherit pipeline-aware
 * navigation behavior.
 */
@Component({
  selector: 'sdux-blog-layout',
  standalone: true,
  imports: [
    RouterLink,
    ShareBarComponent,
    PipelineRelatedTopicComponent,
    BlogKeepReadingComponent
  ],
  templateUrl: './blog-layout.component.html',
  styleUrls: [
    './blog-layout.component.scss',
    '../../docs/scss/documentation.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class BlogLayoutComponent extends PipelineRoutingDirective {
  /** Blog post title displayed in the header. */
  readonly title = input.required<string>();

  /** Publication date rendered in the meta bar. */
  readonly date = input.required<string>();

  /** Content pillar code used for related-topic categorization. */
  readonly pillar = input.required<string>();

  /** Estimated reading time in minutes. */
  readonly readingTime = input.required<string>();

  /** Router instance used to derive the canonical share URL. */
  readonly #router = inject(Router);

  /** Canonical share URL constructed from the current route path. */
  readonly shareUrl = computed(() => {
    const path = this.#router.url.split('?')[0];
    return `https://www.sdux-vault.com${path}`;
  });
}
