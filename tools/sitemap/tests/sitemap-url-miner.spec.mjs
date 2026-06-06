import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SitemapUrlMiner } from '../sitemap-url-miner.class.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fixturesDir = path.join(__dirname, 'artifacts', 'navigation-fixtures');
const blogFixturePath = path.join(
  __dirname,
  'artifacts',
  'blog-routes-fixture.ts'
);

describe('CLI: sitemap-url-miner', () => {
  beforeAll(() => {
    fs.mkdirSync(path.join(fixturesDir, 'sub-navigation'), { recursive: true });

    fs.writeFileSync(
      path.join(fixturesDir, 'navigation.component.html'),
      [
        '<a routerLink="docs/pipeline/builder" routerLinkActive="active">Builder</a>',
        '<a routerLink="/docs/global-error-handler" routerLinkActive="active">Error</a>',
        '<!-- <a routerLink="/docs/auto-vaulting/get" routerLinkActive="active">Auto Get</a> -->',
        '<a routerLink="/blog" routerLinkActive="active">Blog</a>'
      ].join('\n'),
      'utf-8'
    );

    fs.writeFileSync(
      path.join(fixturesDir, 'sub-navigation', 'getting-started.html'),
      [
        '<a routerLink="/docs/welcome/getting-started" routerLinkActive="active">Getting Started</a>',
        '<a routerLink="/docs/welcome/core-concepts" routerLinkActive="active">Core Concepts</a>'
      ].join('\n'),
      'utf-8'
    );

    fs.writeFileSync(
      blogFixturePath,
      [
        "import { Routes } from '@angular/router';",
        '',
        'export const blogRoutes: Routes = [',
        '  {',
        "    path: '',",
        '    loadComponent: () =>',
        "      import('./blog-index/blog-index.component').then(",
        '        (m) => m.BlogIndexComponent',
        '      )',
        '  },',
        '  {',
        "    path: 'welcome',",
        "    data: { category: 'blogs', type: 'welcome' },",
        '    loadComponent: () =>',
        "      import('./posts/2026-06-01-welcome/welcome.component').then(",
        '        (m) => m.BlogWelcomeComponent',
        '      )',
        '  },',
        '  {',
        "    path: 'mutation-bugs-eliminated',",
        "    data: { category: 'blogs', type: 'mutation-bugs-eliminated' },",
        '    loadComponent: () =>',
        "      import('./posts/2026-06-06-mutation-bugs-eliminated/mutation-bugs-eliminated.component').then(",
        '        (m) => m.BlogMutationBugsEliminatedComponent',
        '      )',
        '  }',
        '  // Example:',
        '  // {',
        "  //   path: 'pipeline-anatomy',",
        '  //   loadComponent: () =>',
        "  //     import('./posts/2026-06-02-pipeline-anatomy/pipeline-anatomy.component')",
        '  //       .then(m => m.BlogPipelineAnatomyComponent),',
        '  // },',
        '];'
      ].join('\n'),
      'utf-8'
    );
  });

  afterAll(() => {
    fs.rmSync(fixturesDir, { recursive: true, force: true });
    fs.rmSync(blogFixturePath, { force: true });
  });

  describe('mine', () => {
    it('should extract routerLink values from HTML files', () => {
      const miner = new SitemapUrlMiner({
        navigationDir: fixturesDir,
        supplementUrls: []
      });

      const urls = miner.mine();

      expect(urls).toContain('/docs/pipeline/builder');
      expect(urls).toContain('/docs/global-error-handler');
      expect(urls).toContain('/blog');
      expect(urls).toContain('/docs/welcome/getting-started');
      expect(urls).toContain('/docs/welcome/core-concepts');
    });

    it('should normalize routes without leading slash', () => {
      const miner = new SitemapUrlMiner({
        navigationDir: fixturesDir,
        supplementUrls: []
      });

      const urls = miner.mine();

      expect(urls).toContain('/docs/pipeline/builder');
      expect(urls).not.toContain('docs/pipeline/builder');
    });

    it('should exclude routerLinks inside HTML comments', () => {
      const miner = new SitemapUrlMiner({
        navigationDir: fixturesDir,
        supplementUrls: []
      });

      const urls = miner.mine();

      expect(urls).not.toContain('/docs/auto-vaulting/get');
    });

    it('should merge supplement URLs', () => {
      const miner = new SitemapUrlMiner({
        navigationDir: fixturesDir,
        supplementUrls: ['/', '/about', '/contact']
      });

      const urls = miner.mine();

      expect(urls).toContain('/');
      expect(urls).toContain('/about');
      expect(urls).toContain('/contact');
    });

    it('should deduplicate URLs from supplement and HTML', () => {
      const miner = new SitemapUrlMiner({
        navigationDir: fixturesDir,
        supplementUrls: ['/blog']
      });

      const urls = miner.mine();
      const blogCount = urls.filter((u) => u === '/blog').length;

      expect(blogCount).toBe(1);
    });

    it('should return URLs in sorted order', () => {
      const miner = new SitemapUrlMiner({
        navigationDir: fixturesDir,
        supplementUrls: ['/zzz', '/aaa']
      });

      const urls = miner.mine();
      const sorted = [...urls].sort((a, b) => a.localeCompare(b));

      expect(urls).toEqual(sorted);
    });
  });

  describe('blogRoutesFile', () => {
    it('should extract blog route paths and prefix with /blog/', () => {
      const miner = new SitemapUrlMiner({
        navigationDir: fixturesDir,
        supplementUrls: [],
        blogRoutesFile: blogFixturePath
      });

      const urls = miner.mine();

      expect(urls).toContain('/blog/welcome');
      expect(urls).toContain('/blog/mutation-bugs-eliminated');
    });

    it('should exclude empty path routes', () => {
      const miner = new SitemapUrlMiner({
        navigationDir: fixturesDir,
        supplementUrls: [],
        blogRoutesFile: blogFixturePath
      });

      const urls = miner.mine();

      expect(urls).not.toContain('/blog/');
    });

    it('should exclude commented-out route paths', () => {
      const miner = new SitemapUrlMiner({
        navigationDir: fixturesDir,
        supplementUrls: [],
        blogRoutesFile: blogFixturePath
      });

      const urls = miner.mine();

      expect(urls).not.toContain('/blog/pipeline-anatomy');
    });

    it('should deduplicate blog routes with supplement URLs', () => {
      const miner = new SitemapUrlMiner({
        navigationDir: fixturesDir,
        supplementUrls: ['/blog/welcome'],
        blogRoutesFile: blogFixturePath
      });

      const urls = miner.mine();
      const count = urls.filter((u) => u === '/blog/welcome').length;

      expect(count).toBe(1);
    });

    it('should produce no blog routes when blogRoutesFile is not provided', () => {
      const miner = new SitemapUrlMiner({
        navigationDir: fixturesDir,
        supplementUrls: []
      });

      const urls = miner.mine();

      expect(urls).not.toContain('/blog/welcome');
      expect(urls).not.toContain('/blog/mutation-bugs-eliminated');
    });
  });

  describe('write', () => {
    it('should generate a valid ESM module file', () => {
      spyOn(console, 'info');
      const outputPath = path.join(
        __dirname,
        'artifacts',
        'generated-urls.mjs'
      );
      const miner = new SitemapUrlMiner({
        navigationDir: fixturesDir,
        supplementUrls: ['/']
      });

      miner.write(outputPath);

      expect(console.info).toHaveBeenCalledTimes(1);
      expect(console.info).toHaveBeenCalledWith(
        jasmine.stringContaining('Sitemap URL registry written to')
      );

      const content = fs.readFileSync(outputPath, 'utf-8');

      expect(content).toContain('export const SITEMAP_URLS');
      expect(content).toContain("'/'");
      expect(content).toContain('AUTO-GENERATED');

      fs.rmSync(outputPath);
    });
  });

  describe('production navigation', () => {
    it('should mine all URLs from the real navigation directory', () => {
      const realNavDir = path.resolve(
        __dirname,
        '../../../apps/docs-app/app/navigation'
      );
      const realBlogRoutes = path.resolve(
        __dirname,
        '../../../apps/docs-app/app/blog/blog.routes.ts'
      );
      const miner = new SitemapUrlMiner({
        navigationDir: realNavDir,
        supplementUrls: ['/', '/about', '/contact', '/blog'],
        blogRoutesFile: realBlogRoutes
      });

      const urls = miner.mine();

      expect(urls.length).toBeGreaterThan(100);
      expect(urls).toContain('/');
      expect(urls).toContain('/docs/pipeline/builder');
      expect(urls).toContain(
        '/docs/references/abstracts/abstract-active-controller'
      );
      expect(urls).toContain('/blog/welcome');
      expect(urls).toContain('/blog/mutation-bugs-eliminated');
    });
  });
});
