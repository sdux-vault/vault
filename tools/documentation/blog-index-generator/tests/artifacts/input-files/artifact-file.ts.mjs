export const MOCK_ROUTES_CONTENT = `import { Routes } from '@angular/router';

export const blogRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./blog-index/blog-index.component').then(
        (m) => m.BlogIndexComponent
      )
  },
  {
    path: 'welcome',
    data: { category: 'blogs', type: 'welcome' },
    loadComponent: () =>
      import('./posts/2026-06-01-welcome/welcome.component').then(
        (m) => m.BlogWelcomeComponent
      )
  },
  {
    path: 'pipeline-anatomy',
    data: { category: 'blogs', type: 'pipeline-anatomy' },
    loadComponent: () =>
      import('./posts/2026-06-06-pipeline-anatomy/pipeline-anatomy.component').then(
        (m) => m.BlogPipelineAnatomyComponent
      )
  }
];`;

export const MOCK_WELCOME_TS = `import { Component } from '@angular/core';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-welcome',
  standalone: true,
  imports: [BlogLayoutComponent],
  template: \`
    <sdux-blog-layout
      title="Welcome to the SDuX Vault Blog"
      date="2026-06-01"
      pillar="CE"
      readingTime="3">
      <h2>Getting Started</h2>
      <p>Content here.</p>
      <h3>What to Expect</h3>
    </sdux-blog-layout>
  \`,
  encapsulation: ViewEncapsulation.None
})
export class BlogWelcomeComponent {}`;

export const MOCK_PIPELINE_TS = `import { Component } from '@angular/core';
import { BlogLayoutComponent } from '../../blog-layout/blog-layout.component';

@Component({
  selector: 'sdux-blog-pipeline-anatomy',
  standalone: true,
  imports: [BlogLayoutComponent],
  template: \`
    <sdux-blog-layout
      title="Pipeline Anatomy: How State Flows Through Stages"
      date="2026-06-06"
      pillar="ED"
      readingTime="7">
      <h2>The Five Stages</h2>
      <h2>Resolve Stage</h2>
      <h3>Merge Stage</h3>
    </sdux-blog-layout>
  \`,
  encapsulation: ViewEncapsulation.None
})
export class BlogPipelineAnatomyComponent {}`;
