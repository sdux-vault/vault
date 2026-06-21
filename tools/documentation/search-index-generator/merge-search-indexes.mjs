#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.resolve(
  __dirname,
  '../../../apps/docs-app/assets/search-index'
);

const mainIndexPath = path.join(assetsDir, 'search-index.json');
const blogIndexPath = path.join(assetsDir, 'blog-search-index.json');

const mainIndex = JSON.parse(readFileSync(mainIndexPath, 'utf-8'));
const blogIndex = JSON.parse(readFileSync(blogIndexPath, 'utf-8'));

mainIndex.documents.push(...blogIndex.documents);

writeFileSync(mainIndexPath, JSON.stringify(mainIndex, null, 2) + '\n');

console.log(
  `Merged ${blogIndex.documents.length} blog document(s) into search-index.json`
);
