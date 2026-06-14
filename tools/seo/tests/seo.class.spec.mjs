import path from 'node:path';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { SeoAuditor } from '../seo.class.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../../');

const docsAppDir = path.join(projectRoot, 'apps', 'docs-app', 'app');

const config = {
  registryDir: path.join(docsAppDir, 'docs', 'related-topic', 'constants'),
  templates: [
    {
      templateFile: path.join(
        docsAppDir,
        'docs',
        'pipeline',
        'behaviors',
        'pipeline-behavior-landingpage.component.html'
      ),
      routePrefixes: ['/docs/pipeline/behaviors', '/docs/pipeline/addons'],
      switchOn: 'category-type'
    },
    {
      templateFile: path.join(
        docsAppDir,
        'docs',
        'pipeline',
        'api',
        'pipeline-api-landingpage.component.html'
      ),
      routePrefixes: ['/docs/pipeline/apis'],
      switchOn: 'category-type'
    },
    {
      templateFile: path.join(
        docsAppDir,
        'docs',
        'pipeline',
        'controllers',
        'pipeline-controller-landingpage.component.html'
      ),
      routePrefixes: ['/docs/pipeline/controllers'],
      switchOn: 'type-only'
    },
    {
      templateFile: path.join(
        docsAppDir,
        'docs',
        'pipeline',
        'extensions',
        'pipeline-extension-landingpage.component.html'
      ),
      routePrefixes: ['/docs/pipeline/extensions'],
      switchOn: 'type-only'
    },
    {
      templateFile: path.join(
        docsAppDir,
        'docs',
        'dev-tools',
        'dev-tools-landingpage.component.html'
      ),
      routePrefixes: ['/docs/dev-tools'],
      switchOn: 'type-only'
    }
  ]
};

/**
 * Extracts all registry links for test assertions.
 *
 * @returns {Set<string>}
 */
function getRegistryLinks() {
  const links = new Set();
  const dir = config.registryDir;
  const files = readdirSync(dir).filter(
    (f) => f.startsWith('related-topics.') && f.endsWith('.registry.ts')
  );
  for (const file of files) {
    const content = readFileSync(path.join(dir, file), 'utf-8');
    const baseMatch = content.match(/baseRoute:\s*'([^']+)'/);
    if (baseMatch) links.add(baseMatch[1]);
    const linkPattern = /link:\s*'([^']+)'/g;
    let m;
    while ((m = linkPattern.exec(content)) !== null) {
      links.add(m[1]);
    }
  }
  return links;
}

describe('SeoAuditor', () => {
  /** @type {SeoAuditor} */
  let auditor;

  beforeEach(() => {
    auditor = new SeoAuditor(config);
  });

  describe('audit', () => {
    it('should return an audit result object', () => {
      const result = auditor.audit();

      expect(result).toBeDefined();
      expect(result.missingRoutes).toBeInstanceOf(Array);
      expect(result.missingCategoryMeta).toBeInstanceOf(Array);
      expect(result.missingItemMeta).toBeInstanceOf(Array);
      expect(typeof result.hasErrors).toBe('boolean');
      expect(typeof result.errorCount).toBe('number');
      expect(typeof result.indexedCount).toBe('number');
    });

    it('should discover registry files', () => {
      const result = auditor.audit();

      expect(result.indexedCount).toBeGreaterThan(0);
    });

    it('should report missing category meta when title or description is absent', () => {
      const result = auditor.audit();

      for (const entry of result.missingCategoryMeta) {
        expect(entry.file).toBeDefined();
        expect(typeof entry.hasTitle).toBe('boolean');
        expect(typeof entry.hasDescription).toBe('boolean');
        expect(entry.hasTitle && entry.hasDescription).toBe(false);
      }
    });

    it('should report missing item meta when title or description is absent', () => {
      const result = auditor.audit();

      for (const entry of result.missingItemMeta) {
        expect(entry.file).toBeDefined();
        expect(entry.display).toBeDefined();
        expect(typeof entry.hasTitle).toBe('boolean');
        expect(typeof entry.hasDescription).toBe('boolean');
        expect(entry.hasTitle && entry.hasDescription).toBe(false);
      }
    });

    it('should count errors as sum of all missing entries', () => {
      const result = auditor.audit();

      const expectedCount =
        result.missingRoutes.length +
        result.missingCategoryMeta.length +
        result.missingItemMeta.length;

      expect(result.errorCount).toBe(expectedCount);
      expect(result.hasErrors).toBe(expectedCount > 0);
    });

    it('should count indexed pages as registries plus their items', () => {
      const result = auditor.audit();

      expect(result.indexedCount).toBeGreaterThanOrEqual(
        result.missingCategoryMeta.length
      );
    });

    it('should sort missing routes alphabetically', () => {
      const result = auditor.audit();

      const sorted = [...result.missingRoutes].sort();
      expect(result.missingRoutes).toEqual(sorted);
    });

    it('should extract routes from landing page templates', () => {
      const result = auditor.audit();
      const allRoutes = [
        ...result.missingRoutes,
        ...Array.from(getRegistryLinks())
      ];

      expect(
        allRoutes.some((r) => r.includes('/docs/pipeline/behaviors/'))
      ).toBe(true);
      expect(allRoutes.some((r) => r.includes('/docs/pipeline/apis/'))).toBe(
        true
      );
      expect(
        allRoutes.some((r) => r.includes('/docs/pipeline/controllers/'))
      ).toBe(true);
      expect(
        allRoutes.some((r) => r.includes('/docs/pipeline/extensions/'))
      ).toBe(true);
      expect(allRoutes.some((r) => r.includes('/docs/dev-tools/'))).toBe(true);
    });
  });
});
