import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTooltip } from '@angular/material/tooltip';

/**
 * Blog index page listing all published blog posts.
 */
@Component({
  selector: 'sdux-blog-index',
  standalone: true,
  imports: [RouterLink, MatTooltip],
  templateUrl: './blog-index.component.html',
  styleUrls: ['./blog-index.component.scss', '../../docs/scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogIndexComponent {}
