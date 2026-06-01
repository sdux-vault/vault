import { Routes } from '@angular/router';

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
    path: 'what-is-sdux-vault',
    data: { category: 'blogs', type: 'what-is-sdux-vault' },
    loadComponent: () =>
      import('./posts/2026-06-01-what-is-sdux-vault/what-is-sdux-vault.component').then(
        (m) => m.BlogWhatIsSduxVaultComponent
      )
  }
  // Blog posts are lazy-loaded by slug.
  // Add new entries here when a post is created by the write-blog-post prompt.
  //
  // Example:
  // {
  //   path: 'pipeline-anatomy',
  //   loadComponent: () =>
  //     import('./posts/2026-06-02-pipeline-anatomy/pipeline-anatomy.component')
  //       .then(m => m.BlogPipelineAnatomyComponent),
  // },
];
