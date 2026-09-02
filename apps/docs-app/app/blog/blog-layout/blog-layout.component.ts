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
  readonly id = input<string>();

  /** Blog post title displayed in the header. Overrides the entry title. */
  readonly title = input<string>();

  /** Publication date rendered in the meta bar. Overrides the entry date. */
  readonly date = input<string>();

  /** Content pillar code used for related-topic categorization. */
  readonly pillar = input<string>();

  /** Estimated reading time in minutes. Overrides the entry reading time. */
  readonly readingTime = input<string>();

  /** Try it now - default is true. */
  readonly tryItNow = input<boolean>(true);

  /** Router instance used to derive the canonical share URL. */
  readonly #router = inject(Router);

  /** Blog entry resolved from the supplied id. */
  readonly #entry = computed<BlogEntry | undefined>(() => {
    const id = this.id();
    return id ? BLOG_ENTRIES.find((entry) => entry.slug === id) : undefined;
  });

  /** Resolved title, using the explicit input before the entry metadata. */
  readonly displayTitle = computed(
    () => this.title() ?? this.#entry()?.title ?? this.#missingMetadata('title')
  );

  /** Resolved publication date, using the explicit input before the entry metadata. */
  readonly displayDate = computed(
    () => this.date() ?? this.#entry()?.date ?? this.#missingMetadata('date')
  );

  /** Resolved reading time, using the explicit input before the entry metadata. */
  readonly displayReadingTime = computed(() => {
    const readingTime = this.readingTime() ?? this.#entry()?.readingTime;
    return readingTime === undefined
      ? this.#missingMetadata('readingTime')
      : String(readingTime);
  });

  /** Canonical share URL constructed from the current route path. */
  readonly shareUrl = computed(() => {
    const path = this.#router.url.split('?')[0];
    return `https://www.sdux-vault.com${path}`;
  });

  #missingMetadata(field: string): never {
    throw new Error(
      `BlogLayoutComponent requires an ${field} input or a valid blog entry id.`
    );
  }
}
