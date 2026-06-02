import { SitemapGenerator } from '../sitemap-generator.class.mjs';
import { SITEMAP_URLS } from '../sitemap-urls.mjs';
import { EXPECTED_SITEMAP_SNIPPET } from './artifacts/expected-sitemap-snippet.mjs';

describe('CLI: sitemap-generator', () => {
  describe('validate', () => {
    it('should pass validation for the production URL registry', () => {
      const generator = new SitemapGenerator({
        baseUrl: 'https://www.sdux-vault.com',
        urls: SITEMAP_URLS
      });

      const errors = generator.validate();

      expect(errors).toEqual([]);
    });

    it('should reject URLs that do not start with /', () => {
      const generator = new SitemapGenerator({
        baseUrl: 'https://example.com',
        urls: ['docs/page']
      });

      const errors = generator.validate();

      expect(errors).toEqual(['URL must start with "/": docs/page']);
    });

    it('should reject URLs that end with /', () => {
      const generator = new SitemapGenerator({
        baseUrl: 'https://example.com',
        urls: ['/docs/page/']
      });

      const errors = generator.validate();

      expect(errors).toEqual(['URL must not end with "/": /docs/page/']);
    });

    it('should allow the root URL ending with /', () => {
      const generator = new SitemapGenerator({
        baseUrl: 'https://example.com',
        urls: ['/']
      });

      const errors = generator.validate();

      expect(errors).toEqual([]);
    });

    it('should reject URLs containing route parameter placeholders', () => {
      const generator = new SitemapGenerator({
        baseUrl: 'https://example.com',
        urls: ['/docs/:type']
      });

      const errors = generator.validate();

      expect(errors).toEqual([
        'URL contains a route parameter placeholder: /docs/:type'
      ]);
    });

    it('should reject duplicate URLs', () => {
      const generator = new SitemapGenerator({
        baseUrl: 'https://example.com',
        urls: ['/about', '/about']
      });

      const errors = generator.validate();

      expect(errors).toEqual(['Duplicate URL: /about']);
    });

    it('should report multiple errors at once', () => {
      const generator = new SitemapGenerator({
        baseUrl: 'https://example.com',
        urls: ['no-slash', '/trailing/', '/docs/:id']
      });

      const errors = generator.validate();

      expect(errors.length).toBe(3);
    });
  });

  describe('generate', () => {
    it('should generate valid XML for a small URL list', () => {
      const generator = new SitemapGenerator({
        baseUrl: 'https://www.sdux-vault.com',
        urls: ['/', '/about', '/contact']
      });

      const xml = generator.generate();

      expect(xml).toBe(EXPECTED_SITEMAP_SNIPPET);
    });

    it('should set priority 1.0 for homepage and 0.8 for all others', () => {
      const generator = new SitemapGenerator({
        baseUrl: 'https://example.com',
        urls: ['/', '/docs']
      });

      const xml = generator.generate();

      expect(xml).toContain('<priority>1.0</priority>');
      expect(xml).toContain('<priority>0.8</priority>');
    });

    it('should escape XML special characters in URLs', () => {
      const generator = new SitemapGenerator({
        baseUrl: 'https://example.com',
        urls: ['/search?q=a&b=c']
      });

      const xml = generator.generate();

      expect(xml).toContain(
        '<loc>https://example.com/search?q=a&amp;b=c</loc>'
      );
    });

    it('should strip trailing slash from base URL', () => {
      const generator = new SitemapGenerator({
        baseUrl: 'https://example.com/',
        urls: ['/about']
      });

      const xml = generator.generate();

      expect(xml).toContain('<loc>https://example.com/about</loc>');
    });

    it('should include all URLs from the production registry', () => {
      const generator = new SitemapGenerator({
        baseUrl: 'https://www.sdux-vault.com',
        urls: SITEMAP_URLS
      });

      const xml = generator.generate();

      for (const url of SITEMAP_URLS) {
        const expectedLoc =
          url === '/'
            ? 'https://www.sdux-vault.com/'
            : `https://www.sdux-vault.com${url}`;

        expect(xml).toContain(`<loc>${expectedLoc}</loc>`);
      }
    });

    it('should produce well-formed XML with header and closing tag', () => {
      const generator = new SitemapGenerator({
        baseUrl: 'https://example.com',
        urls: ['/']
      });

      const xml = generator.generate();

      expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(xml).toContain(
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
      );
      expect(xml).toContain('</urlset>');
    });
  });

  describe('URL registry integrity', () => {
    it('should contain the homepage', () => {
      expect(SITEMAP_URLS).toContain('/');
    });

    it('should contain blog routes', () => {
      expect(SITEMAP_URLS).toContain('/blog');
      expect(SITEMAP_URLS).toContain('/blog/what-is-sdux-vault');
    });

    it('should not contain authenticated routes', () => {
      expect(SITEMAP_URLS).not.toContain('/dashboard');
      expect(SITEMAP_URLS).not.toContain('/login');
      expect(SITEMAP_URLS).not.toContain('/signup');
    });

    it('should not contain route parameter placeholders', () => {
      const paramRoutes = SITEMAP_URLS.filter((url) => url.includes(':'));

      expect(paramRoutes).toEqual([]);
    });

    it('should not contain duplicate entries', () => {
      const unique = new Set(SITEMAP_URLS);

      expect(unique.size).toBe(SITEMAP_URLS.length);
    });

    it('should have all URLs starting with /', () => {
      const invalid = SITEMAP_URLS.filter((url) => !url.startsWith('/'));

      expect(invalid).toEqual([]);
    });
  });
});
