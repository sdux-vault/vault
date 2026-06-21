#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'url';
import { BlogIndexGenerator } from './blog-index-generator.class.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../../');

const routesPath = path.join(
  projectRoot,
  'apps',
  'docs-app',
  'app',
  'blog',
  'blog.routes.ts'
);
const postsDir = path.join(
  projectRoot,
  'apps',
  'docs-app',
  'app',
  'blog',
  'posts'
);
const outputPath = path.join(
  projectRoot,
  'apps',
  'docs-app',
  'assets',
  'search-index',
  'blog-search-index.json'
);

const generator = new BlogIndexGenerator(routesPath, postsDir, outputPath);
generator.run();
