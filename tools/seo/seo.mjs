/**
 * SEO audit tool for SDuX Vault documentation.
 *
 * Validates that every docs route has a corresponding registry entry
 * and that all registry entries have title and description metadata.
 *
 * @example
 * ```sh
 * node tools/seo/seo.mjs
 * ```
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SeoAuditor } from './seo.class.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '../../');
const docsAppDir = path.join(projectRoot, 'apps', 'docs-app', 'app');

const registryDir = path.join(docsAppDir, 'docs', 'related-topic', 'constants');

/**
 * Landing page template definitions.
 *
 * Each template maps to one or more route prefixes and declares
 * how the template switches on route params.
 */
const templates = [
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
];

const auditor = new SeoAuditor({
  registryDir,
  templates,
  routeAliases: {
    '/docs/pipeline/apis/cell-builder':
      '/docs/pipeline/apis/feature-cell-api/cell-builder',
    '/docs/pipeline/apis/react': '/docs/pipeline/apis/feature-cell-api',
    '/docs/pipeline/apis/vue': '/docs/pipeline/apis/feature-cell-api',
    '/docs/pipeline/apis/svelte': '/docs/pipeline/apis/feature-cell-api'
  }
});
const result = auditor.audit();

if (result.missingRoutes.length > 0) {
  console.error('\n--- Missing Registry Entries ---');
  console.error(
    'The following docs routes have no corresponding registry item:\n'
  );
  for (const route of result.missingRoutes) {
    console.error(`  • ${route}`);
  }
}

if (result.missingCategoryMeta.length > 0) {
  console.error('\n--- Missing Category SEO Meta ---');
  console.error(
    'The following registry files are missing title and/or description:\n'
  );
  for (const entry of result.missingCategoryMeta) {
    console.error(`  • ${entry.file}`);
    if (!entry.hasTitle) console.error(`      ↳ missing: title`);
    if (!entry.hasDescription) console.error(`      ↳ missing: description`);
  }
}

if (result.missingItemMeta.length > 0) {
  console.error('\n--- Missing Item SEO Meta ---');
  console.error(
    'The following registry items are missing title and/or description:\n'
  );
  for (const entry of result.missingItemMeta) {
    console.error(`  • ${entry.file} → "${entry.display}"`);
    if (!entry.hasTitle) console.error(`      ↳ missing: title`);
    if (!entry.hasDescription) console.error(`      ↳ missing: description`);
  }
}

if (result.hasErrors) {
  console.error(`\nSEO audit failed with ${result.errorCount} error(s).`);
  process.exit(1);
} else {
  console.info(
    `\nSEO audit passed. ${result.indexedCount} docs pages indexed.`
  );
}
