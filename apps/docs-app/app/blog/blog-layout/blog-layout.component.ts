import {
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { PipelineRoutingDirective } from '../../docs/pipeline/directives/pipeline-routing.directive';
import { PipelineRelatedTopicComponent } from '../../docs/related-topic/related-topic.component';

/**
 * Reusable blog post layout wrapper that provides standard blog chrome
 * (header, meta bar, social share links, and CTA footer) around projected
 * content. Extends PipelineRoutingDirective to inherit pipeline-aware
 * navigation behavior.
 */
@Component({
  selector: 'sdux-blog-layout',
  standalone: true,
  imports: [RouterLink, MatTooltipModule, PipelineRelatedTopicComponent],
  templateUrl: './blog-layout.component.html',
  styleUrls: ['./blog-layout.component.scss', '../../docs/scss/example.scss'],
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

  /** Map of platform-specific share intent URLs keyed by platform identifier. */
  readonly shareLinks = computed(() => {
    const text = encodeURIComponent(this.title());
    const url = encodeURIComponent(this.shareUrl());
    const rawUrl = this.shareUrl();
    return {
      x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      bluesky: `https://bsky.app/intent/compose?text=${text}%20${url}`,
      mastodon: `https://mastodon.social/share?text=${text}%20${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      reddit: `https://www.reddit.com/submit?url=${url}&title=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      hackernews: `https://news.ycombinator.com/submitlink?u=${url}&t=${text}`,
      devto: rawUrl,
      email: `mailto:?subject=${text}&body=${url}`
    };
  });

  /** Copies the canonical share URL to the system clipboard. */
  copyLink(): void {
    navigator.clipboard.writeText(this.shareUrl());
  }
}
