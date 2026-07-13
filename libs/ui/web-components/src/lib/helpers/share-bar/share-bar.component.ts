import {
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { AnalyticsSharePlatforms } from '../../services/analytics/types/analytics-share-platform.type';

/**
 * Reusable social-media share bar component.
 *
 * Renders share links for X, Bluesky, Mastodon, LinkedIn, Reddit,
 * Hacker News, Facebook, email, and a copy-to-clipboard button.
 */
@Component({
  selector: 'sdux-share-bar',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './share-bar.component.html',
  styleUrls: ['./share-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShareBarComponent {
  /** Records share-bar interactions for the configured content. */
  readonly #analyticsService = inject(AnalyticsService);

  /** The title/text to share. */
  readonly title = input.required<string>();

  /** The canonical URL to share. */
  readonly url = input.required<string>();

  /** The content type label (e.g. 'post', 'video', 'diagram'). */
  readonly type = input<string>('post');

  /** Map of platform-specific share intent URLs. */
  readonly shareLinks = computed(() => {
    const title = this.title();
    const rawUrl = this.url();
    const text = encodeURIComponent(`SDuX Vault: ${title}`);
    const url = encodeURIComponent(rawUrl);
    return {
      x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      bluesky: `https://bsky.app/intent/compose?text=${text}%20${url}`,
      mastodon: `https://mastodon.social/share?text=${text}%20${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      reddit: `https://www.reddit.com/submit?url=${url}&title=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      hackernews: `https://news.ycombinator.com/submitlink?u=${url}&t=${text}`,
      email: `mailto:?subject=${text}&body=${url}`
    };
  });

  /**
   * Records selection of a social sharing destination.
   *
   * @param platform Supplies the selected sharing destination.
   */
  trackShare(platform: Exclude<AnalyticsSharePlatforms, 'clipboard'>): void {
    this.#analyticsService.trackShareInteraction({
      contentType: this.type(),
      contentUrl: this.url(),
      platform,
      action: 'share'
    });
  }

  /** Copies the canonical URL to the system clipboard and records the action. */
  copyLink(): void {
    this.#analyticsService.trackShareInteraction({
      contentType: this.type(),
      contentUrl: this.url(),
      platform: 'clipboard',
      action: 'copy'
    });
    navigator.clipboard.writeText(this.url());
  }
}
