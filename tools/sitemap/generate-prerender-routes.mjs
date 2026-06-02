#!/usr/bin/env node

/**
 * Generates a plain-text routes file for Angular prerendering
 * from the sitemap URL registry. Each line is one route path.
 *
 * Output: apps/docs-app/prerender-routes.txt
 * Usage:  npm run prerender:routes
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITEMAP_URLS } from './sitemap-urls.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '../../');
const outputPath = path.join(
  projectRoot,
  'apps',
  'docs-app',
  'prerender-routes.txt'
);

const content = SITEMAP_URLS.join('\n') + '\n';

fs.writeFileSync(outputPath, content, 'utf-8');
console.info(
  `Prerender routes written to ${outputPath} (${SITEMAP_URLS.length} routes)`
);
