// --- AI Model File Path (DO NOT DELETE) ---
// FilePath: tools > stackblitz > generate-inline-projects.class.mjs
// Updated: 2026-07-31
// --- END AI MODEL FILE PATH ---

import fs from 'node:fs';
import path from 'node:path';

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

export class InlineProjectsGenerator {
  constructor({
    sourceRoot,
    outputDir,
    projectRootPath,
    navDir,
    importsOutput,
    urlsOutput,
    artifactsRoot,
    configuredExamples
  }) {
    if (!sourceRoot || !outputDir || !projectRootPath || !navDir) {
      throw new Error(
        'sourceRoot, outputDir, projectRootPath, and navDir are required.'
      );
    }

    if (!importsOutput || !urlsOutput || !artifactsRoot) {
      throw new Error(
        'importsOutput, urlsOutput, and artifactsRoot are required.'
      );
    }

    if (!Array.isArray(configuredExamples)) {
      throw new Error('configuredExamples must be an array.');
    }

    this.sourceRoot = sourceRoot;
    this.outputDir = outputDir;
    this.projectRootPath = projectRootPath;
    this.navDir = navDir;
    this.importsOutput = importsOutput;
    this.urlsOutput = urlsOutput;
    this.artifactsRoot = artifactsRoot;
    this.configuredExamples = configuredExamples;
  }

  normalizeProjectPath(filePath) {
    return filePath.split(path.sep).join('/');
  }

  getArtifactFramework(language) {
    return FRAMEWORK_ALIASES.get(language) ?? language;
  }

  getArtifactDirectory(language) {
    return path.join(this.artifactsRoot, this.getArtifactFramework(language));
  }

  getExampleTargetBasePath(language) {
    return FRAMEWORK_APP_TARGETS.get(this.getArtifactFramework(language)) ?? '';
  }

  collectFiles(
    dirPath,
    {
      basePath = dirPath,
      targetBasePath = '',
      excludedRelativePaths = new Set()
    } = {}
  ) {
    const files = {};

    for (const entry of fs
      .readdirSync(dirPath, { withFileTypes: true })
      .sort((left, right) => left.name.localeCompare(right.name))) {
      if (EXCLUDE_DIRS.has(entry.name) || EXCLUDE_FILES.has(entry.name)) {
        continue;
      }

      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        Object.assign(
          files,
          this.collectFiles(fullPath, {
            basePath,
            targetBasePath,
            excludedRelativePaths
          })
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

      const sourceRelativePath = this.normalizeProjectPath(
        path.relative(basePath, fullPath)
      );

      if (excludedRelativePaths.has(sourceRelativePath)) {
        continue;
      }

      const relativePath = this.normalizeProjectPath(
        path.join(targetBasePath, sourceRelativePath)
      );
      files[relativePath] = fs.readFileSync(fullPath, 'utf-8');
    }

    return files;
  }

  toExportName(folderName) {
    return folderName
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      .trim()
      .split(' ')
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join('');
  }

  generateTsFile(exampleName, files, packageJson) {
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

export const ${this.toExportName(exampleName)}Project: Project = {
  title: '${title.replace(/'/g, "\\'")}',
  template: 'node',
  files: {
${fileEntries}
  }
};
`;
  }

  readPackageJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  resolveProjectPackageJson(definition) {
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

      const packageJson = this.readPackageJson(packageJsonPath);
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

  buildProject(definition) {
    const { packageJson, packageJsonPath } =
      this.resolveProjectPackageJson(definition);

    if (definition.sourceType === 'full-project') {
      return {
        files: this.collectFiles(definition.sourceDirectory),
        packageJson
      };
    }

    const artifactFiles = this.collectFiles(definition.artifactDirectory);
    const exampleFiles = this.collectFiles(definition.sourceDirectory, {
      targetBasePath: definition.exampleTargetBasePath,
      excludedRelativePaths: new Set(['main.ts'])
    });
    const files = { ...artifactFiles, ...exampleFiles };

    if (
      packageJsonPath &&
      packageJsonPath ===
        path.join(definition.artifactDirectory, 'package.json')
    ) {
      files['package.json'] = `${JSON.stringify(packageJson, null, 2)}\n`;
    }

    return { files, packageJson };
  }

  createConfiguredProjectDefinition(definition) {
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
      artifactDirectory: this.getArtifactDirectory(language),
      exampleTargetBasePath: this.getExampleTargetBasePath(language)
    };
  }

  discoverFullProjectDefinitions() {
    const frameworks = fs
      .readdirSync(this.sourceRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && !EXCLUDE_DIRS.has(entry.name));

    return frameworks.flatMap((framework) => {
      const frameworkPath = path.join(this.sourceRoot, framework.name);
      const examples = fs
        .readdirSync(frameworkPath, { withFileTypes: true })
        .filter(
          (entry) =>
            entry.isDirectory() &&
            !EXCLUDE_DIRS.has(entry.name) &&
            entry.name !== '_artifacts'
        );

      return examples.map((example) => ({
        language: framework.name,
        name: example.name,
        sourceDirectory: path.join(frameworkPath, example.name),
        sourceType: 'full-project'
      }));
    });
  }

  buildProjectDefinitions() {
    const definitions = [
      ...this.discoverFullProjectDefinitions(),
      ...this.configuredExamples.map((definition) =>
        this.createConfiguredProjectDefinition(definition)
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

  applyFrameworkAliases(frameworkExamples) {
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

  discoverExamples() {
    const groupedExamples = {};

    for (const definition of this.buildProjectDefinitions()) {
      groupedExamples[definition.language] ??= [];
      groupedExamples[definition.language].push(definition.name);
    }

    for (const language of Object.keys(groupedExamples)) {
      groupedExamples[language].sort();
    }

    return this.applyFrameworkAliases(groupedExamples);
  }

  toSlug(folderName) {
    return folderName.replace(/-example$/, '');
  }

  toTitle(folderName) {
    return folderName
      .replace(/-example$/, '')
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  ensureDir(filePath) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  generateNavHtml(frameworkExamples) {
    const frameworkSections = Object.entries(frameworkExamples)
      .map(([framework, examples]) => {
        const links = examples
          .map((example) => {
            const slug = this.toSlug(example);
            const title = this.toTitle(example);
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
        <span class="sub-menu-content sub-item sub-header">${this.capitalize(framework)}</span>
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

  generateNavComponent() {
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

  generateProjectImports(frameworkExamples) {
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

  generateSitemapUrls(frameworkExamples) {
    const urls = [];

    for (const [framework, examples] of Object.entries(frameworkExamples)) {
      for (const example of examples) {
        urls.push(`  '/examples/${framework}/${this.toSlug(example)}'`);
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

  run() {
    if (!fs.existsSync(this.sourceRoot)) {
      console.error(`❌ Source not found: ${this.sourceRoot}`);
      process.exit(1);
    }

    fs.mkdirSync(this.outputDir, { recursive: true });

    const projectDefinitions = this.buildProjectDefinitions();
    let count = 0;

    for (const definition of projectDefinitions) {
      const { files, packageJson } = this.buildProject(definition);
      const outputSubDir = path.join(this.outputDir, definition.language);
      fs.mkdirSync(outputSubDir, { recursive: true });

      const outputFile = path.join(
        outputSubDir,
        `${definition.name}.project.ts`
      );
      const tsContent = this.generateTsFile(
        definition.name,
        files,
        packageJson
      );

      fs.writeFileSync(outputFile, tsContent, 'utf-8');
      console.info(
        `✅ Generated: ${path.relative(this.projectRootPath, outputFile)}`
      );
      count++;
    }

    console.info(`\n✅ Generated ${count} inline StackBlitz project file(s)`);

    const frameworkExamples = this.discoverExamples();
    const navHtml = this.generateNavHtml(frameworkExamples);
    this.ensureDir(path.join(this.navDir, 'placeholder'));
    fs.writeFileSync(
      path.join(
        this.navDir,
        'stackblitz-examples.sub-navigation.component.html'
      ),
      navHtml,
      'utf-8'
    );
    console.info('✅ Generated: sub-navigation HTML');

    fs.writeFileSync(
      path.join(this.navDir, 'stackblitz-examples.sub-navigation.component.ts'),
      this.generateNavComponent(),
      'utf-8'
    );
    console.info('✅ Generated: sub-navigation component');

    this.ensureDir(this.importsOutput);
    fs.writeFileSync(
      this.importsOutput,
      this.generateProjectImports(frameworkExamples),
      'utf-8'
    );
    console.info('✅ Generated: project imports map');

    this.ensureDir(this.urlsOutput);
    fs.writeFileSync(
      this.urlsOutput,
      this.generateSitemapUrls(frameworkExamples),
      'utf-8'
    );
    console.info('✅ Generated: sitemap URLs');

    const totalExamples = Object.values(frameworkExamples).reduce(
      (sum, examples) => sum + examples.length,
      0
    );
    console.info(
      `\n✅ ${totalExamples} example pages across ${Object.keys(frameworkExamples).length} frameworks\n`
    );
  }
}
