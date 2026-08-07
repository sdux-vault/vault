import { SitemapLastmodResolver } from '../sitemap-lastmod.class.mjs';

const projectRoot = process.cwd();

function createResolver(changedFiles, date = '2026-08-07') {
  const calls = [];
  const resolver = new SitemapLastmodResolver({
    projectRoot,
    appDir: 'apps/docs-app/app',
    routeFile: 'apps/docs-app/app/vault.routes.ts',
    git: {
      run(args) {
        calls.push(args);
        if (args[0] === 'merge-base') return 'merge-base-sha\n';
        if (args[0] === 'diff') return `${changedFiles.join('\n')}\n`;
        return `${date}\n`;
      }
    }
  });

  return { resolver, calls };
}

describe('CLI: sitemap-lastmod', () => {
  it('should map a landing-page template change to the matching route', () => {
    const { resolver } = createResolver([
      'apps/docs-app/app/docs/docs-landingpage.component.html'
    ]);

    const dates = resolver.resolve(
      ['/docs/welcome/core-concepts', '/about'],
      ''
    );

    expect(dates.get('/docs/welcome/core-concepts')).toBe('2026-08-07');
    expect(dates.has('/about')).toBeFalse();
  });

  it('should map a selected child component change through the landing template', () => {
    const { resolver } = createResolver([
      'apps/docs-app/app/docs/top-tier/core-concepts.component.ts'
    ]);

    const dates = resolver.resolve(['/docs/welcome/core-concepts'], '');

    expect(dates.get('/docs/welcome/core-concepts')).toBe('2026-08-07');
  });

  it('should include a component template when its TypeScript file changes', () => {
    const { resolver } = createResolver([
      'apps/docs-app/app/docs/docs-landingpage.component.ts'
    ]);

    const dates = resolver.resolve(['/docs/welcome/core-concepts'], '');

    expect(dates.get('/docs/welcome/core-concepts')).toBe('2026-08-07');
  });

  it('should preserve existing dates for URLs with no changed source files', () => {
    const { resolver } = createResolver([]);

    const dates = resolver.resolve(
      ['/docs/welcome/core-concepts', '/about'],
      [
        '<url><loc>https://www.sdux-vault.com/docs/welcome/core-concepts</loc><lastmod>2026-06-01</lastmod></url>',
        '<url><loc>https://www.sdux-vault.com/about</loc><lastmod>2026-06-02</lastmod></url>'
      ].join('\n')
    );

    expect(dates.get('/docs/welcome/core-concepts')).toBe('2026-06-01');
    expect(dates.get('/about')).toBe('2026-06-02');
  });

  it('should compare the diff against the main merge base', () => {
    const { resolver, calls } = createResolver([]);

    resolver.resolve(['/about'], '');

    expect(calls[0]).toEqual(['merge-base', 'main', 'HEAD']);
    expect(calls[1]).toEqual([
      'diff',
      '--name-only',
      'merge-base-sha',
      'HEAD',
      '--',
      'apps/docs-app/app'
    ]);
  });
});
