import { DOCUMENT } from '@angular/common';
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
import { BLOG_ENTRIES } from '../blog-index/constants/blog-entries.constant';
import { BlogEntry } from '../blog-index/shapes/blog-entry.shape';
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
  /** Blog entry slug used to populate metadata from BLOG_ENTRIES. */
  readonly id = input.required<string>();

  /** Try it now - default is true. */
  readonly tryItNow = input<boolean>(true);

  /** Router instance used to derive the canonical share URL. */
  readonly #router = inject(Router);

  /** Current document used to derive the active site's origin. */
  readonly #document = inject(DOCUMENT);

  /** Blog entry resolved from the supplied id. */
  readonly #entry = computed<BlogEntry | undefined>(() => {
    return BLOG_ENTRIES.find((entry) => entry.slug === this.id());
  });

  /** Resolved title from the blog entry metadata. */
  readonly displayTitle = computed(() => this.#entry()?.title ?? '');

  /** Resolved publication date from the blog entry metadata. */
  readonly displayDate = computed(() => this.#entry()?.date ?? '');

  /** Resolved reading time from the blog entry metadata. */
  readonly displayReadingTime = computed(() =>
    String(this.#entry()?.readingTime ?? '')
  );

  /** Canonical share URL constructed from the current route path. */
  readonly shareUrl = computed(() => {
    const path = this.#router.url.split('?')[0];
    return `${this.#document.location?.origin}${path}`;
  });
}
