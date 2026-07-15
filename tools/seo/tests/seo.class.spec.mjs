import path from 'node:path';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { SeoAuditor } from '../seo.class.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../../');

const docsAppDir = path.join(projectRoot, 'apps', 'docs-app', 'app');
const artifactsDir = path.join(__dirname, 'artifacts', 'input-files');

const config = {
  registryDir: path.join(docsAppDir, 'docs', 'related-topic', 'constants'),
  templates: [
    {
      templateFile: path.join(
        artifactsDir,
        'pipeline-behavior-landingpage.component.html.mjs'
      ),
      routePrefixes: ['/docs/pipeline/behaviors', '/docs/pipeline/addons'],
      switchOn: 'category-type'
    },
    {
      templateFile: path.join(
        artifactsDir,
        'pipeline-api-landingpage.component.html.mjs'
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
  ],
  routeAliases: {
    '/docs/pipeline/apis/cell-builder':
      '/docs/pipeline/apis/feature-cell-api/cell-builder',
    '/docs/pipeline/apis/react': '/docs/pipeline/apis/feature-cell-api'
  }
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

    it('should not treat the Angular category as a feature-cell-api type', () => {
      const result = auditor.audit();

      expect(result.missingRoutes).not.toContain(
        '/docs/pipeline/apis/feature-cell-api/angular'
      );
    });

    it('should not treat the React category as a feature-cell-api type', () => {
      const result = auditor.audit();

      expect(result.missingRoutes).not.toContain(
        '/docs/pipeline/apis/feature-cell-api/react'
      );
    });

    it('should not generate addon routes for behavior-only categories', () => {
      const result = auditor.audit();
      const falsePositiveRoutes = [
        '/docs/pipeline/addons/encrypt',
        '/docs/pipeline/addons/entity-access/with-lookup-behavior',
        '/docs/pipeline/addons/merge/with-array-append-merge-behavior',
        '/docs/pipeline/addons/resolve/with-core-value-behavior',
        '/docs/pipeline/addons/taps/with-core-before-tap-behavior'
      ];

      for (const route of falsePositiveRoutes) {
        expect(result.missingRoutes).not.toContain(route);
      }
    });

    it('should not generate behavior routes for addon-only types', () => {
      const result = auditor.audit();
      const falsePositiveRoutes = [
        '/docs/pipeline/behaviors/error/with-core-error-callback-behavior',
        '/docs/pipeline/behaviors/error/with-error-transform-behavior',
        '/docs/pipeline/behaviors/state/with-core-emit-state-behavior'
      ];

      for (const route of falsePositiveRoutes) {
        expect(result.missingRoutes).not.toContain(route);
      }
    });

    it('should find registry entries for behavior routes represented by the artifact', () => {
      const result = auditor.audit();
      const registeredRoutes = [
        '/docs/pipeline/behaviors/operators/with-distinct-until-changed',
        '/docs/pipeline/behaviors/state/updating'
      ];

      for (const route of registeredRoutes) {
        expect(result.missingRoutes).not.toContain(route);
      }
    });

    it('should not report top-level API categories without registry entries', () => {
      const result = auditor.audit();
      const falsePositiveRoutes = [
        '/docs/pipeline/apis/cell-builder',
        '/docs/pipeline/apis/react'
      ];

      for (const route of falsePositiveRoutes) {
        expect(result.missingRoutes).not.toContain(route);
      }
    });
  });
});
