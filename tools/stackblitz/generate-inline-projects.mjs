#!/usr/bin/env node
// --- AI Model File Path (DO NOT DELETE) ---
// FilePath: tools > stackblitz > generate-inline-projects.mjs
// Updated: 2026-07-31
// --- END AI MODEL FILE PATH ---

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { InlineProjectsGenerator } from './generate-inline-projects.class.mjs';
import { AngularTutorialExamplesConstants } from './constants/angular-tutorial-examples.constant.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

const sourceRoot = path.resolve(
  projectRoot,
  '../../sdux-vault/stackblitz-examples/stackblitz'
);
const outputDir = path.join(
  projectRoot,
  'apps/docs-app/app/stackblitz/projects'
);
const navDir = path.join(
  projectRoot,
  'apps/docs-app/app/navigation/sub-navigation/stackblitz-examples'
);
const importsOutput = path.join(
  projectRoot,
  'apps/docs-app/app/docs/stack-blitz/constants/stackblitz-project-imports.generated.ts'
);
const urlsOutput = path.join(
  __dirname,
  'stackblitz-example-urls.generated.mjs'
);
const artifactsRoot = path.join(__dirname, 'artifacts');

const configuredExamples = AngularTutorialExamplesConstants(projectRoot);

const generator = new InlineProjectsGenerator({
  sourceRoot,
  outputDir,
  projectRootPath: projectRoot,
  navDir,
  importsOutput,
  urlsOutput,
  artifactsRoot,
  configuredExamples
});

generator.run();
