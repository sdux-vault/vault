import { Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { BLOG_ENTRIES } from '../blog-index/constants/blog-entries.constant';
import { BlogEntry } from '../blog-index/shapes/blog-entry.shape';

/**
 * Displays a "Keep Reading" section at the bottom of blog posts with up to
 * 3 recommended posts. Shows the previous post, next post, and a random
 * pick — excluding the current post. Falls back gracefully when fewer
 * than 3 other posts exist.
 */
@Component({
  selector: 'sdux-blog-keep-reading',
  standalone: true,
  imports: [RouterLink, MatTooltip],
  templateUrl: './blog-keep-reading.component.html',
  styleUrls: ['./blog-keep-reading.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogKeepReadingComponent {
  readonly #router = inject(Router);

  /** Sorted entries, newest first (matches blog index order). */
  readonly #sorted = [...BLOG_ENTRIES].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  /** Up to 3 recommended posts: previous, next, and a random pick. */
  readonly recommendations = computed<BlogEntry[]>(() => {
    const currentSlug = this.#router.url.split('?')[0].replace('/blog/', '');
    const currentIndex = this.#sorted.findIndex((e) => e.slug === currentSlug);

    const picks = new Map<string, BlogEntry>();

    // Next (newer) post
    if (currentIndex > 0) {
      const next = this.#sorted[currentIndex - 1];
      picks.set(next.slug, next);
    }

    // Previous (older) post
    if (currentIndex < this.#sorted.length - 1) {
      const prev = this.#sorted[currentIndex + 1];
      picks.set(prev.slug, prev);
    }

    // Random pick from remaining posts
    const remaining = this.#sorted.filter(
      (e) => e.slug !== currentSlug && !picks.has(e.slug)
    );

    if (remaining.length > 0) {
      const random = remaining[Math.floor(Math.random() * remaining.length)];
      picks.set(random.slug, random);
    }

    return [...picks.values()].slice(0, 3);
  });

  /** Scrolls the page to the top when navigating to a new post. */
  scrollToTop(): void {
    const container = document.querySelector('mat-sidenav-content');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
