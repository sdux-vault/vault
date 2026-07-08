#!/usr/bin/env node
// --- AI Model File Path (DO NOT DELETE) ---
// FilePath: tools > stackblitz > generate-inline-projects.mjs
// Updated: 2026-04-22
// --- END AI MODEL FILE PATH ---

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

const SOURCE_ROOT = path.resolve(
  projectRoot,
  '../../sdux-vault/stackblitz-examples/stackblitz'
);
const OUTPUT_DIR = path.join(
  projectRoot,
  'apps/docs-app/app/stackblitz/projects'
);

const EXCLUDE_DIRS = new Set(['node_modules', '.angular', '.git', '__MACOSX']);
const EXCLUDE_FILES = new Set([
  '.DS_Store',
  'favicon.ico',
  'package-lock.json'
]);
const EXCLUDE_EXTENSIONS = new Set(['.js', '.js.map', '.d.ts']);

function collectFiles(dirPath, basePath = dirPath) {
  const files = {};

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (EXCLUDE_DIRS.has(entry.name) || EXCLUDE_FILES.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.relative(basePath, fullPath);

    if (entry.isDirectory()) {
      Object.assign(files, collectFiles(fullPath, basePath));
    } else {
      const ext = path.extname(entry.name);
      const doubleExt = entry.name.endsWith('.js.map')
        ? '.js.map'
        : entry.name.endsWith('.d.ts')
          ? '.d.ts'
          : ext;
      if (EXCLUDE_EXTENSIONS.has(doubleExt)) {
        continue;
      }
      files[relativePath] = fs.readFileSync(fullPath, 'utf-8');
    }
  }

  return files;
}

function toExportName(folderName) {
  return folderName
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .map((word, i) =>
      i === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');
}

function generateTsFile(exampleName, files, packageJson) {
  const title = packageJson.name || exampleName;
  const fileEntries = Object.entries(files)
    .map(([filePath, content]) => {
      const escaped = content
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\$/g, '\\$');
      return `    '${filePath}': \`${escaped}\``;
    })
    .join(',\n');

  return `import { Project } from '@stackblitz/sdk';

export const ${toExportName(exampleName)}Project: Project = {
  title: '${title.replace(/'/g, "\\'")}',
  template: 'node',
  files: {
${fileEntries}
  }
};
`;
}

function run() {
  if (!fs.existsSync(SOURCE_ROOT)) {
    console.error(`❌ Source not found: ${SOURCE_ROOT}`);
    process.exit(1);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const frameworks = fs
    .readdirSync(SOURCE_ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !EXCLUDE_DIRS.has(d.name));

  let count = 0;

  for (const framework of frameworks) {
    const frameworkPath = path.join(SOURCE_ROOT, framework.name);
    const examples = fs
      .readdirSync(frameworkPath, { withFileTypes: true })
      .filter((d) => d.isDirectory() && !EXCLUDE_DIRS.has(d.name));

    for (const example of examples) {
      const examplePath = path.join(frameworkPath, example.name);
      const files = collectFiles(examplePath);

      const pkgPath = path.join(examplePath, 'package.json');
      const packageJson = fs.existsSync(pkgPath)
        ? JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
        : { name: example.name };

      const outputSubDir = path.join(OUTPUT_DIR, framework.name);
      fs.mkdirSync(outputSubDir, { recursive: true });

      const outputFile = path.join(outputSubDir, `${example.name}.project.ts`);
      const tsContent = generateTsFile(example.name, files, packageJson);

      fs.writeFileSync(outputFile, tsContent, 'utf-8');
      console.info(`✅ Generated: ${path.relative(projectRoot, outputFile)}`);
      count++;
    }
  }

  console.info(`\n✅ Generated ${count} inline StackBlitz project file(s)\n`);
}

run();
