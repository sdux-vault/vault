import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

/**
 * Welcome blog post — introduces the blog and its content pillars.
 */
@Component({
  selector: 'sdux-blog-welcome',
  standalone: true,
  imports: [BlogLayoutComponent, RouterModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['../../../docs/scss/example.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogWelcomeComponent {}
