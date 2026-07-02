#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'url';
import { SearchIndexGenerator } from './search-index-genenerator.class.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../../');
const typeIndexPath = path.join(
  __dirname,
  '..',
  'artifacts',
  'type-index.json'
);
const compodocsPath = path.join(
  projectRoot,
  'documentation',
  'documentation.json'
);
const outputPath = path.join(
  projectRoot,
  'apps',
  'docs-app',
  'assets',
  'search-index',
  'search-index.json'
);

const generator = new SearchIndexGenerator(
  typeIndexPath,
  outputPath,
  compodocsPath
);
generator.run();
