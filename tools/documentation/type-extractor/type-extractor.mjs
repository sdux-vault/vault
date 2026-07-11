#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { TypeExtractor } from './type-extractor.class.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const monorepoRoot = path.resolve(__dirname, '../../../');
const configPath = path.join(monorepoRoot, '.documentation/config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const projectRoot = path.resolve(monorepoRoot, config.projectRoot);
const engineRoot = path.resolve(monorepoRoot, config.engineRoot);

const INDEX_JOBS = Object({
  projects: [
    {
      name: 'addons',
      srcDir: 'libs/addons/src/lib',
      publicApis: [
        './behaviors/entity-access/cache/index.ts',
        './behaviors/entity-access/query/index.ts',
        './behaviors/entity-access/lookup/index.ts',
        './behaviors/interceptors/index.ts',
        './behaviors/merge/index.ts',
        './behaviors/operators/index.ts',
        './behaviors/stepwise/index.ts',
        './controllers/index.ts',
        './controllers/stepwise/index.ts',
        './vault/persist/index.ts',
        './vault/encrypt/index.ts'
      ]
    },
    {
      name: 'angular',
      srcDir: 'libs/core-extensions/angular/src',
      publicApis: ['./public-api.ts', './documentation-api.ts']
    },
    {
      name: 'core',
      srcDir: 'libs/core/src/lib',
      publicApis: ['../public-api.ts', '../documentation-api.ts']
    },
    {
      name: 'dev-tools',
      srcDir: 'libs/devtools/tooling/src/lib',
      publicApis: ['../public-api.ts', '../documentation-api.ts']
    },
    {
      name: 'react',
      srcDir: 'libs/core-extensions/react/src',
      publicApis: ['./documentation-api.ts']
    },
    {
      name: 'shared',
      srcDir: 'libs/shared/src/lib',
      publicApis: ['../public-api.ts']
    },
    {
      name: 'engine',
      isEngine: true,
      srcDir: 'lib',
      publicApis: ['./documentation-api.ts']
    }
  ],
  outputFile: path.join(__dirname, '../artifacts/type-index.json')
});

const extractor = new TypeExtractor(INDEX_JOBS, projectRoot, engineRoot);
extractor.run();
