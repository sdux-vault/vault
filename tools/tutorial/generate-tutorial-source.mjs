#!/usr/bin/env node
// --- AI Model File Path (DO NOT DELETE) ---
// FilePath: tools > tutorial > generate-tutorial-source.mjs
// Updated: 2026-07-17
// --- END AI MODEL FILE PATH ---

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { TutorialSourceGenerator } from './generate-tutorial-source.class.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');

const sourceGroups = [
  {
    exportName: 'STAR_WARS_COMPLETE_CHARACTER_MANAGEMENT',
    sourceDirectory: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/examples/complete-character-management'
    ),
    outputFile: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/generated/complete-character-management.generated.ts'
    )
  },
  {
    exportName: 'STAR_WARS_CHARACTER_STATE',
    sourceFile: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/examples/star-wars-character.state.ts'
    ),
    outputFile: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/examples/generated/star-wars-character-state.generated.ts'
    )
  },
  {
    exportName: 'INITIAL_SERVICE',
    sourceFile: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/examples/service-creation/example.service.ts'
    ),
    outputFile: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/generated/initial-service.generated.ts'
    )
  },
  {
    exportName: 'INITIAL_APP_CONFIG',
    sourceFile: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/examples/initial-app-config/initial-app.config.ts'
    ),
    outputFile: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/generated/initial-app-config.generated.ts'
    )
  },
  {
    exportName: 'REGISTERED_APP_CONFIG',
    sourceFile: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/examples/registered-app-config/registered-app.config.ts'
    ),
    outputFile: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/generated/registered-app-config.generated.ts'
    )
  }
];

const generator = new TutorialSourceGenerator({
  projectRoot,
  sourceGroups
});

generator.run();
