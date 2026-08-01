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
    exportName: 'STAR_WARS_DISPLAY_CHARACTER',
    sourceDirectory: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/examples/display-character'
    ),
    outputFile: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/generated/display-character.generated.ts'
    )
  },
  {
    exportName: 'STAR_WARS_DISPLAY_CHARACTERS',
    sourceDirectory: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/examples/display-characters'
    ),
    outputFile: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/generated/display-characters.generated.ts'
    )
  },
  {
    exportName: 'STAR_WARS_ADD_EDIT_CHARACTERS',
    sourceDirectory: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/examples/add-edit-characters'
    ),
    outputFile: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/generated/add-edit-characters.generated.ts'
    )
  },
  {
    exportName: 'STAR_WARS_DELETE_CHARACTERS',
    sourceDirectory: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/examples/delete-characters'
    ),
    outputFile: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/generated/delete-characters.generated.ts'
    )
  },
  {
    exportName: 'STAR_WARS_LIFECYCLE_CHARACTERS',
    sourceDirectory: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/examples/lifecycle'
    ),
    outputFile: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/generated/lifecycle.generated.ts'
    )
  },
  {
    exportName: 'STAR_WARS_FILTERS_AND_REDUCERS_CHARACTERS',
    sourceDirectory: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/examples/filters-and-reducers'
    ),
    outputFile: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/generated/filters-and-reducers.generated.ts'
    )
  },
  {
    exportName: 'STAR_WARS_ERRORS_CHARACTERS',
    sourceDirectory: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/examples/errors'
    ),
    outputFile: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/generated/errors.generated.ts'
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
  }
];

const generator = new TutorialSourceGenerator({
  projectRoot,
  sourceGroups
});

generator.run();
