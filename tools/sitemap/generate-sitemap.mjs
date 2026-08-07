#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SitemapGenerator } from './sitemap-generator.class.mjs';
import { SitemapLastmodResolver } from './sitemap-lastmod.class.mjs';
import { SITEMAP_URLS } from './sitemap-urls.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '../../');
const outputPath = path.join(projectRoot, 'public', 'sitemap.xml');
const appDir = path.join(projectRoot, 'apps', 'docs-app', 'app');
const existingSitemap = fs.existsSync(outputPath)
  ? fs.readFileSync(outputPath, 'utf8')
  : '';
const lastmodByUrl = new SitemapLastmodResolver({
  projectRoot,
  appDir,
  routeFile: path.join(appDir, 'vault.routes.ts')
}).resolve(SITEMAP_URLS, existingSitemap);

const generator = new SitemapGenerator({
  baseUrl: 'https://www.sdux-vault.com',
  urls: SITEMAP_URLS,
  lastmodByUrl
});

generator.write(outputPath);
