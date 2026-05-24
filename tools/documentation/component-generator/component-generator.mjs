#!/usr/bin/env node

import path from 'node:path';
import { fileURLToPath } from 'url';
import { ComponentGenerator } from './component-generator.class.mjs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '../../../'); // ← go up 2 levels
const artifactRoot = path.resolve(
  __dirname,
  '..',
  'artifacts',
  'type-index.json'
); // ← go up 2 levels
const documentRoot = path.join(
  projectRoot,
  'apps/docs-app/app/docs/references'
);
const compodocsPath = path.join(
  projectRoot,
  'documentation/documentation.json'
);

const tool = new ComponentGenerator(artifactRoot, documentRoot, compodocsPath);
await tool.run();
