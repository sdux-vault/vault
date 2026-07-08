#!/usr/bin/env node
// --- AI Model File Path (DO NOT DELETE) ---
// FilePath: tools > stackblitz > generate-inline-projects.mjs
// Updated: 2026-07-08
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

const NAV_DIR = path.join(
  projectRoot,
  'apps/docs-app/app/navigation/sub-navigation/stackblitz-examples'
);

const IMPORTS_OUTPUT = path.join(
  projectRoot,
  'apps/docs-app/app/docs/stack-blitz/constants/stackblitz-project-imports.generated.ts'
);

const URLS_OUTPUT = path.join(
  __dirname,
  'stackblitz-example-urls.generated.mjs'
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

  console.info(`\n✅ Generated ${count} inline StackBlitz project file(s)`);

  // ── Phase 2: Generate example page artifacts ──

  const frameworkExamples = discoverExamples();

  // Sub-navigation HTML
  const navHtml = generateNavHtml(frameworkExamples);
  ensureDir(path.join(NAV_DIR, 'placeholder'));
  fs.writeFileSync(
    path.join(NAV_DIR, 'stackblitz-examples.sub-navigation.component.html'),
    navHtml,
    'utf-8'
  );
  console.info('✅ Generated: sub-navigation HTML');

  // Sub-navigation TypeScript component
  const navTs = generateNavComponent();
  fs.writeFileSync(
    path.join(NAV_DIR, 'stackblitz-examples.sub-navigation.component.ts'),
    navTs,
    'utf-8'
  );
  console.info('✅ Generated: sub-navigation component');

  // Project imports map
  const importsTs = generateProjectImports(frameworkExamples);
  ensureDir(IMPORTS_OUTPUT);
  fs.writeFileSync(IMPORTS_OUTPUT, importsTs, 'utf-8');
  console.info('✅ Generated: project imports map');

  // Sitemap URLs
  const sitemapMjs = generateSitemapUrls(frameworkExamples);
  ensureDir(URLS_OUTPUT);
  fs.writeFileSync(URLS_OUTPUT, sitemapMjs, 'utf-8');
  console.info('✅ Generated: sitemap URLs');

  const totalExamples = Object.values(frameworkExamples).reduce(
    (sum, arr) => sum + arr.length,
    0
  );
  console.info(
    `\n✅ ${totalExamples} example pages across ${Object.keys(frameworkExamples).length} frameworks\n`
  );
}

// ────────────────────────────────────────────────────────────────
// Phase 2 helpers — example page generation
// ────────────────────────────────────────────────────────────────

/** Convert example folder name to a URL-friendly slug (strip trailing -example). */
function toSlug(folderName) {
  return folderName.replace(/-example$/, '');
}

/** Convert example folder name to a display title. */
function toTitle(folderName) {
  return folderName
    .replace(/-example$/, '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/** Capitalize first letter. */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

/** Discover all framework/example pairs from the source tree. */
function discoverExamples() {
  const frameworks = fs
    .readdirSync(SOURCE_ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !EXCLUDE_DIRS.has(d.name))
    .map((d) => d.name)
    .sort();

  const result = {};
  for (const framework of frameworks) {
    const frameworkPath = path.join(SOURCE_ROOT, framework);
    result[framework] = fs
      .readdirSync(frameworkPath, { withFileTypes: true })
      .filter((d) => d.isDirectory() && !EXCLUDE_DIRS.has(d.name))
      .map((d) => d.name)
      .sort();
  }
  return result;
}

/** Generate sub-navigation HTML grouped by framework. */
function generateNavHtml(frameworkExamples) {
  const frameworkSections = Object.entries(frameworkExamples)
    .map(([framework, examples]) => {
      const links = examples
        .map((example) => {
          const slug = toSlug(example);
          const title = toTitle(example);
          return `      <a
        mat-list-item
        routerLink="/examples/${framework}/${slug}"
        routerLinkActive="active"
        (click)="closeSidenav()">
        <div class="menu-content">${title}</div>
      </a>`;
        })
        .join('\n');

      return `    <mat-expansion-panel class="nav-expansion" [expanded]="forceExpanded()">
      <mat-expansion-panel-header>
        <span class="sub-menu-content sub-item sub-header">${capitalize(framework)}</span>
      </mat-expansion-panel-header>

${links}
    </mat-expansion-panel>`;
    })
    .join('\n\n');

  return `<!--
  AUTO-GENERATED — do not edit manually.
  Generated by: tools/stackblitz/generate-inline-projects.mjs
-->
<nav aria-label="StackBlitz Examples">
  <mat-expansion-panel class="nav-expansion" [expanded]="forceExpanded()">
    <mat-expansion-panel-header>
      <span class="nav-section-label">StackBlitz Examples</span>
    </mat-expansion-panel-header>

${frameworkSections}
  </mat-expansion-panel>
</nav>
`;
}

/** Generate the sub-navigation Angular component TypeScript file. */
function generateNavComponent() {
  return `/**
 * AUTO-GENERATED — do not edit manually.
 * Generated by: tools/stackblitz/generate-inline-projects.mjs
 * @ignore
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationDirective } from '../../directive/navigation.directive';

@Component({
  selector: 'sdux-stackblitz-examples-subnavigation',
  standalone: true,
  imports: [MatExpansionModule, RouterLink, RouterLinkActive, MatListModule],
  templateUrl: './stackblitz-examples.sub-navigation.component.html',
  encapsulation: ViewEncapsulation.None
})
export class StackBlitzExamplesSubNavigationComponent extends NavigationDirective {}
`;
}

/** Generate the project imports map as a TypeScript file. */
function generateProjectImports(frameworkExamples) {
  const entries = [];
  for (const [framework, examples] of Object.entries(frameworkExamples)) {
    for (const example of examples) {
      const key = `${framework}/${example}`;
      const importPath = `../../../stackblitz/projects/${framework}/${example}.project`;
      entries.push(`  '${key}': () => import('${importPath}')`);
    }
  }

  return `/**
 * StackBlitz Project Imports Map
 * ------------------------------
 * AUTO-GENERATED — do not edit manually.
 * Generated by: tools/stackblitz/generate-inline-projects.mjs
 */
export const STACKBLITZ_PROJECT_IMPORTS: Record<string, () => Promise<unknown>> = {
${entries.join(',\n')}
};
`;
}

/** Generate sitemap URLs for all example pages. */
function generateSitemapUrls(frameworkExamples) {
  const urls = [];
  for (const [framework, examples] of Object.entries(frameworkExamples)) {
    for (const example of examples) {
      urls.push(`  '/examples/${framework}/${toSlug(example)}'`);
    }
  }

  return `/**
 * StackBlitz Example Sitemap URLs
 * --------------------------------
 * AUTO-GENERATED — do not edit manually.
 * Generated by: tools/stackblitz/generate-inline-projects.mjs
 */
export const STACKBLITZ_EXAMPLE_URLS = [
${urls.join(',\n')}
];
`;
}

run();
