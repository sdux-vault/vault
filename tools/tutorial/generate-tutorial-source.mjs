#!/usr/bin/env node
// --- AI Model File Path (DO NOT DELETE) ---
// FilePath: tools > tutorial > generate-tutorial-source.mjs
// Updated: 2026-07-17
// --- END AI MODEL FILE PATH ---

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { TutorialSourceGenerator } from './generate-tutorial-source.class.mjs';
import { TutorialSourceGroupsConstants } from './constants/tutorial-source-groups.constant.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');

const sourceGroups = TutorialSourceGroupsConstants(projectRoot);

const generator = new TutorialSourceGenerator({
  projectRoot,
  sourceGroups
});

generator.run();
