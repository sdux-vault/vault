#!/usr/bin/env node
// --- AI Model File Path (DO NOT DELETE) ---
// FilePath: tools > stackblitz > generate-inline-projects.mjs
// Updated: 2026-07-30
// --- END AI MODEL FILE PATH ---

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

export const SOURCE_ROOT = path.resolve(
  projectRoot,
  '../../sdux-vault/stackblitz-examples/stackblitz'
);

export const OUTPUT_DIR = path.join(
  projectRoot,
  'apps/docs-app/app/stackblitz/projects'
);

export const NAV_DIR = path.join(
  projectRoot,
  'apps/docs-app/app/navigation/sub-navigation/stackblitz-examples'
);

export const IMPORTS_OUTPUT = path.join(
  projectRoot,
  'apps/docs-app/app/docs/stack-blitz/constants/stackblitz-project-imports.generated.ts'
);

export const URLS_OUTPUT = path.join(
  __dirname,
  'stackblitz-example-urls.generated.mjs'
);

export const ARTIFACTS_ROOT = path.join(__dirname, 'artifacts');

export const INLINE_PROJECT_EXAMPLES = [
  {
    language: 'angular',
    directory: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/examples/display-character'
    ),
    name: 'display-character-example'
  },
  {
    language: 'angular',
    directory: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/examples/display-characters'
    ),
    name: 'display-characters-example'
  },
  {
    language: 'angular',
    directory: path.join(
      projectRoot,
      'apps/docs-app/app/docs/tutorial/angular/examples/add-edit-characters'
    ),
    name: 'add-edit-characters-example'
  }
];

const EXCLUDE_DIRS = new Set(['node_modules', '.angular', '.git', '__MACOSX']);
const EXCLUDE_FILES = new Set([
  '.DS_Store',
  'favicon.ico',
  'package-lock.json'
]);
const EXCLUDE_EXTENSIONS = new Set(['.js', '.js.map', '.d.ts']);
const FRAMEWORK_ALIASES = new Map([['typescript', 'nodejs']]);
const FRAMEWORK_APP_TARGETS = new Map([
  ['angular', 'src'],
  ['react', 'src'],
  ['svelte', 'src'],
  ['vue', 'src']
]);

function normalizeProjectPath(filePath) {
  return filePath.split(path.sep).join('/');
}

function getArtifactFramework(language) {
  return FRAMEWORK_ALIASES.get(language) ?? language;
}

function getArtifactDirectory(language) {
  return path.join(ARTIFACTS_ROOT, getArtifactFramework(language));
}

function getExampleTargetBasePath(language) {
  return FRAMEWORK_APP_TARGETS.get(getArtifactFramework(language)) ?? '';
}

function isReservedExampleDirectory(entryName) {
  return entryName === '_artifacts';
}

export function collectFiles(
  dirPath,
  {
    basePath = dirPath,
    targetBasePath = '',
    excludedRelativePaths = new Set()
  } = {}
) {
  const files = {};

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (EXCLUDE_DIRS.has(entry.name) || EXCLUDE_FILES.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      Object.assign(
        files,
        collectFiles(fullPath, { basePath, targetBasePath })
      );
      continue;
    }

    const ext = path.extname(entry.name);
    const doubleExt = entry.name.endsWith('.js.map')
      ? '.js.map'
      : entry.name.endsWith('.d.ts')
        ? '.d.ts'
        : ext;

    if (EXCLUDE_EXTENSIONS.has(doubleExt)) {
      continue;
    }

    const sourceRelativePath = normalizeProjectPath(
      path.relative(basePath, fullPath)
    );

    if (excludedRelativePaths.has(sourceRelativePath)) {
      continue;
    }

    const relativePath = normalizeProjectPath(
      path.join(targetBasePath, sourceRelativePath)
    );
    files[relativePath] = fs.readFileSync(fullPath, 'utf-8');
  }

  return files;
}

export function toExportName(folderName) {
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

export function generateTsFile(exampleName, files, packageJson) {
  const title = packageJson.name || exampleName;
  const fileEntries = Object.entries(files)
    .sort(([leftPath], [rightPath]) => leftPath.localeCompare(rightPath))
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

function readPackageJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function resolveProjectPackageJson(definition) {
  const packageJsonPaths = [
    path.join(definition.sourceDirectory, 'package.json')
  ];

  if (definition.sourceType === 'artifact-merge') {
    packageJsonPaths.push(
      path.join(definition.artifactDirectory, 'package.json')
    );
  }

  for (const packageJsonPath of packageJsonPaths) {
    if (!fs.existsSync(packageJsonPath)) {
      continue;
    }

    const packageJson = readPackageJson(packageJsonPath);
    return {
      packageJson: {
        ...packageJson,
        name:
          definition.sourceType === 'artifact-merge'
            ? definition.name
            : packageJson.name || definition.name
      },
      packageJsonPath
    };
  }

  return {
    packageJson: { name: definition.name },
    packageJsonPath: null
  };
}

export function buildProject(definition) {
  const { packageJson, packageJsonPath } =
    resolveProjectPackageJson(definition);

  if (definition.sourceType === 'full-project') {
    return {
      files: collectFiles(definition.sourceDirectory),
      packageJson
    };
  }

  const artifactFiles = collectFiles(definition.artifactDirectory);
  const exampleFiles = collectFiles(definition.sourceDirectory, {
    targetBasePath: definition.exampleTargetBasePath,
    excludedRelativePaths: new Set(['main.ts'])
  });
  const files = {
    ...artifactFiles,
    ...exampleFiles
  };

  if (
    packageJsonPath &&
    packageJsonPath === path.join(definition.artifactDirectory, 'package.json')
  ) {
    files['package.json'] = `${JSON.stringify(packageJson, null, 2)}\n`;
  }

  return { files, packageJson };
}

function createConfiguredProjectDefinition(definition) {
  if (!definition || typeof definition !== 'object') {
    throw new Error('Configured inline project examples must be objects.');
  }

  const { language, directory, name } = definition;

  if (!language || typeof language !== 'string') {
    throw new Error(
      'Configured inline project examples require a language string.'
    );
  }

  if (!directory || typeof directory !== 'string') {
    throw new Error(
      'Configured inline project examples require a directory string.'
    );
  }

  if (!name || typeof name !== 'string') {
    throw new Error(
      'Configured inline project examples require a name string.'
    );
  }

  return {
    language,
    name,
    sourceDirectory: path.resolve(directory),
    sourceType: 'artifact-merge',
    artifactDirectory: getArtifactDirectory(language),
    exampleTargetBasePath: getExampleTargetBasePath(language)
  };
}

function discoverFullProjectDefinitions(sourceRoot) {
  const frameworks = fs
    .readdirSync(sourceRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !EXCLUDE_DIRS.has(entry.name));

  return frameworks.flatMap((framework) => {
    const frameworkPath = path.join(sourceRoot, framework.name);
    const examples = fs
      .readdirSync(frameworkPath, { withFileTypes: true })
      .filter(
        (entry) =>
          entry.isDirectory() &&
          !EXCLUDE_DIRS.has(entry.name) &&
          !isReservedExampleDirectory(entry.name)
      );

    return examples.map((example) => ({
      language: framework.name,
      name: example.name,
      sourceDirectory: path.join(frameworkPath, example.name),
      sourceType: 'full-project'
    }));
  });
}

export function buildProjectDefinitions({
  sourceRoot = SOURCE_ROOT,
  configuredExamples = INLINE_PROJECT_EXAMPLES
} = {}) {
  const definitions = [
    ...discoverFullProjectDefinitions(sourceRoot),
    ...configuredExamples.map((definition) =>
      createConfiguredProjectDefinition(definition)
    )
  ];

  const seenDefinitions = new Set();

  for (const definition of definitions) {
    const key = `${definition.language}/${definition.name}`;

    if (seenDefinitions.has(key)) {
      throw new Error(
        `Duplicate StackBlitz example definition found for ${key}.`
      );
    }

    seenDefinitions.add(key);
  }

  return definitions.sort((left, right) => {
    const languageDifference = left.language.localeCompare(right.language);
    return languageDifference || left.name.localeCompare(right.name);
  });
}

export function applyFrameworkAliases(frameworkExamples) {
  const aliasedExamples = { ...frameworkExamples };

  for (const [framework, sourceFramework] of FRAMEWORK_ALIASES) {
    const sourceExamples = aliasedExamples[sourceFramework];

    if (!sourceExamples) {
      throw new Error(
        `Cannot create the ${framework} framework alias: ${sourceFramework} examples were not found.`
      );
    }

    aliasedExamples[framework] = [...sourceExamples];
  }

  return aliasedExamples;
}

export function discoverExamples({
  sourceRoot = SOURCE_ROOT,
  configuredExamples = INLINE_PROJECT_EXAMPLES
} = {}) {
  const groupedExamples = {};

  for (const definition of buildProjectDefinitions({
    sourceRoot,
    configuredExamples
  })) {
    groupedExamples[definition.language] ??= [];
    groupedExamples[definition.language].push(definition.name);
  }

  for (const language of Object.keys(groupedExamples)) {
    groupedExamples[language].sort();
  }

  return applyFrameworkAliases(groupedExamples);
}

function toSlug(folderName) {
  return folderName.replace(/-example$/, '');
}

function toTitle(folderName) {
  return folderName
    .replace(/-example$/, '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

export function generateNavHtml(frameworkExamples) {
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

export function generateNavComponent() {
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

export function generateProjectImports(frameworkExamples) {
  const entries = [];

  for (const [framework, examples] of Object.entries(frameworkExamples)) {
    const projectFramework = FRAMEWORK_ALIASES.get(framework) ?? framework;

    for (const example of examples) {
      const key = `${framework}/${example}`;
      const importPath = `../../../stackblitz/projects/${projectFramework}/${example}.project`;
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

export function generateSitemapUrls(frameworkExamples) {
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

export function run({
  sourceRoot = SOURCE_ROOT,
  outputDir = OUTPUT_DIR,
  projectRootPath = projectRoot,
  navDir = NAV_DIR,
  importsOutput = IMPORTS_OUTPUT,
  urlsOutput = URLS_OUTPUT,
  configuredExamples = INLINE_PROJECT_EXAMPLES
} = {}) {
  if (!fs.existsSync(sourceRoot)) {
    console.error(`❌ Source not found: ${sourceRoot}`);
    process.exit(1);
  }

  fs.mkdirSync(outputDir, { recursive: true });

  const projectDefinitions = buildProjectDefinitions({
    sourceRoot,
    configuredExamples
  });
  let count = 0;

  for (const definition of projectDefinitions) {
    const { files, packageJson } = buildProject(definition);
    const outputSubDir = path.join(outputDir, definition.language);
    fs.mkdirSync(outputSubDir, { recursive: true });

    const outputFile = path.join(outputSubDir, `${definition.name}.project.ts`);
    const tsContent = generateTsFile(definition.name, files, packageJson);

    fs.writeFileSync(outputFile, tsContent, 'utf-8');
    console.info(`✅ Generated: ${path.relative(projectRootPath, outputFile)}`);
    count++;
  }

  console.info(`\n✅ Generated ${count} inline StackBlitz project file(s)`);

  const frameworkExamples = discoverExamples({
    sourceRoot,
    configuredExamples
  });

  const navHtml = generateNavHtml(frameworkExamples);
  ensureDir(path.join(navDir, 'placeholder'));
  fs.writeFileSync(
    path.join(navDir, 'stackblitz-examples.sub-navigation.component.html'),
    navHtml,
    'utf-8'
  );
  console.info('✅ Generated: sub-navigation HTML');

  const navTs = generateNavComponent();
  fs.writeFileSync(
    path.join(navDir, 'stackblitz-examples.sub-navigation.component.ts'),
    navTs,
    'utf-8'
  );
  console.info('✅ Generated: sub-navigation component');

  const importsTs = generateProjectImports(frameworkExamples);
  ensureDir(importsOutput);
  fs.writeFileSync(importsOutput, importsTs, 'utf-8');
  console.info('✅ Generated: project imports map');

  const sitemapMjs = generateSitemapUrls(frameworkExamples);
  ensureDir(urlsOutput);
  fs.writeFileSync(urlsOutput, sitemapMjs, 'utf-8');
  console.info('✅ Generated: sitemap URLs');

  const totalExamples = Object.values(frameworkExamples).reduce(
    (sum, examples) => sum + examples.length,
    0
  );
  console.info(
    `\n✅ ${totalExamples} example pages across ${Object.keys(frameworkExamples).length} frameworks\n`
  );
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  run();
}
