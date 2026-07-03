import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BLOG_ENTRIES } from './constants/blog-entries.constant';

/**
 * Blog index page listing all published blog posts.
 */
@Component({
  selector: 'sdux-blog-index',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog-index.component.html',
  styleUrls: [
    './blog-index.component.scss',
    '../../docs/scss/documentation.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class BlogIndexComponent {
  readonly entries = [...BLOG_ENTRIES].sort((a, b) =>
    b.date.localeCompare(a.date)
  );
}
