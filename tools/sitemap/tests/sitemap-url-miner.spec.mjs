import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SitemapUrlMiner } from '../sitemap-url-miner.class.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fixturesDir = path.join(__dirname, 'artifacts', 'navigation-fixtures');

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
  });

  afterAll(() => {
    fs.rmSync(fixturesDir, { recursive: true, force: true });
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

  describe('write', () => {
    it('should generate a valid ESM module file', () => {
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
      const miner = new SitemapUrlMiner({
        navigationDir: realNavDir,
        supplementUrls: [
          '/',
          '/about',
          '/contact',
          '/blog/welcome',
          '/blog/what-is-sdux-vault'
        ]
      });

      const urls = miner.mine();

      expect(urls.length).toBeGreaterThan(100);
      expect(urls).toContain('/');
      expect(urls).toContain('/docs/pipeline/builder');
      expect(urls).toContain(
        '/docs/references/abstracts/abstract-active-controller'
      );
    });
  });
});
