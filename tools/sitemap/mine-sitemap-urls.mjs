#!/usr/bin/env node

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SitemapUrlMiner } from './sitemap-url-miner.class.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '../../');
const navigationDir = path.join(
  projectRoot,
  'apps',
  'docs-app',
  'app',
  'navigation'
);
const outputPath = path.join(__dirname, 'sitemap-urls.mjs');

/**
 * Pages that are not reachable through the sidenav navigation
 * but should appear in the sitemap.
 */
const SUPPLEMENT_URLS = [
  '/',
  '/about',
  '/contact',
  '/blog/welcome',
  '/blog/what-is-sdux-vault'
];

const miner = new SitemapUrlMiner({
  navigationDir,
  supplementUrls: SUPPLEMENT_URLS
});

miner.write(outputPath);
