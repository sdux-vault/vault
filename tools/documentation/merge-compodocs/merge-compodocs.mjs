#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { CompodocMerger } from './merge-compodocs.class.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const monorepoRoot = path.resolve(__dirname, '../../../');
const configPath = path.join(monorepoRoot, '.documentation/config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const engineRoot = path.resolve(monorepoRoot, config.engineRoot);

const primaryPath = path.join(monorepoRoot, 'documentation/documentation.json');
const secondaryPath = path.join(engineRoot, 'documentation/documentation.json');
const outputPath = primaryPath;

const merger = new CompodocMerger({ primaryPath, secondaryPath, outputPath });
merger.run();
