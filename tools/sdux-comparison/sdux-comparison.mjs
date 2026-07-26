#!/usr/bin/env node
// --- AI Model File Path (DO NOT DELETE) ---
// FilePath: tools > sdux-comparison > sdux-comparison.mjs
// Updated: 2026-07-24
// --- END AI MODEL FILE PATH ---

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SduxComparisonSourceGenerator } from './sdux-comparison.class.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');
const examplesRoot = path.join(
  projectRoot,
  'apps/docs-app/app/splash-page/dev/examples'
);

const toExportName = (languageName, frameworkName) =>
  `${languageName}_${frameworkName}_output`
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .toUpperCase();

const buildSourceGroups = (rootDirectory) => {
  const languages = fs
    .readdirSync(rootDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((left, right) => left.name.localeCompare(right.name));

  return languages.flatMap((languageEntry) => {
    const languageDirectory = path.join(rootDirectory, languageEntry.name);
    const frameworks = fs
      .readdirSync(languageDirectory, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .sort((left, right) => left.name.localeCompare(right.name));

    return frameworks.map((frameworkEntry) => {
      const frameworkDirectory = path.join(
        languageDirectory,
        frameworkEntry.name
      );

      return {
        exportName: toExportName(languageEntry.name, frameworkEntry.name),
        frameworkName: frameworkEntry.name,
        sourceDirectory: frameworkDirectory,
        outputFile: path.join(
          frameworkDirectory,
          `${frameworkEntry.name}-output.ts`
        )
      };
    });
  });
};

const generator = new SduxComparisonSourceGenerator({
  projectRoot,
  sourceGroups: buildSourceGroups(examplesRoot)
});

generator.run();
