#!/usr/bin/env node

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SitemapGenerator } from './sitemap-generator.class.mjs';
import { SITEMAP_URLS } from './sitemap-urls.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '../../');
const outputPath = path.join(projectRoot, 'public', 'sitemap.xml');

const generator = new SitemapGenerator({
  baseUrl: 'https://www.sdux-vault.com',
  urls: SITEMAP_URLS
});

generator.write(outputPath);
