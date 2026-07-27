// --- AI Model File Path (DO NOT DELETE) ---
// FilePath: tools > sdux-comparison > sdux-comparison.class.mjs
// Updated: 2026-07-24
// --- END AI MODEL FILE PATH ---

import fs from 'node:fs';
import path from 'node:path';

const EXCLUDED_DIRECTORIES = new Set([
  '.angular',
  '.git',
  '__MACOSX',
  'node_modules'
]);
const EXCLUDED_FILES = new Set(['.DS_Store']);
const SOURCE_FILE_TYPES = [
  { type: 'typescript', suffix: '.ts.txt' },
  { type: 'typescript', suffix: '.tsx.txt' },
  { type: 'html', suffix: '.html.txt' },
  { type: 'svelte', suffix: '.svelte.txt' },
  { type: 'vue', suffix: '.vue.txt' },
  { type: 'scss', suffix: '.scss.txt' },
  { type: 'json', suffix: '.json.txt' },
  { type: 'markdown', suffix: '.md.txt' }
];
const SOURCE_FILE_TYPE_ORDER = new Map(
  SOURCE_FILE_TYPES.map(({ type }, index) => [type, index])
);
const SOURCE_FILE_TYPE_UNION = SOURCE_FILE_TYPES.map(({ type }) => `'${type}'`)
  .filter((type, index, values) => values.indexOf(type) === index)
  .join(' | ');
const FRAMEWORK_FILE_ORDER = {
  redux: [
    ['main.ts', 'main.tsx', 'store.ts'],
    ['app.config.ts', 'App.vue'],
    ['employee.facade.ts', 'employee.hook.ts', 'useEmployeeFacade.ts'],
    [
      'example.component.ts',
      'example.component.tsx',
      'ExampleView.tsx',
      'ExampleView.vue'
    ],
    ['example.component.html'],
    ['employee.model.ts'],
    ['employee.effects.ts'],
    ['employee.actions.ts'],
    ['employee.state.ts'],
    ['employee.reducer.ts'],
    ['employee.selectors.ts']
  ],
  sdux: [
    ['main.ts', 'main.tsx'],
    ['app.config.ts', 'App.svelte', 'App.vue'],
    ['employee.service.ts', 'employee.cell.ts', 'employee.hook.ts'],
    [
      'example.component.ts',
      'example.component.tsx',
      'example.component.svelte',
      'ExampleView.svelte',
      'ExampleView.tsx',
      'ExampleView.vue'
    ],
    ['example.component.html'],
    ['employee.model.ts']
  ],
  pinia: [
    ['main.ts'],
    ['App.vue'],
    ['employee.store.ts'],
    ['example.component.ts', 'example.component.vue', 'ExampleView.vue'],
    ['example.component.html'],
    ['employee.model.ts']
  ],
  stores: [
    ['main.ts'],
    ['App.svelte'],
    ['employee.store.ts'],
    ['example.component.svelte', 'ExampleView.svelte'],
    ['employee.model.ts']
  ]
};

export class SduxComparisonSourceGenerator {
  constructor({ projectRoot, sourceGroups }) {
    if (!projectRoot) {
      throw new Error('projectRoot is required');
    }

    if (!Array.isArray(sourceGroups) || sourceGroups.length === 0) {
      throw new Error('At least one comparison source group is required');
    }

    this.projectRoot = projectRoot;
    this.sourceGroups = sourceGroups;
  }

  collectFiles(directory, baseDirectory = directory, frameworkName) {
    const files = [];
    const entries = fs
      .readdirSync(directory, { withFileTypes: true })
      .sort((left, right) => left.name.localeCompare(right.name));

    for (const entry of entries) {
      if (
        EXCLUDED_DIRECTORIES.has(entry.name) ||
        EXCLUDED_FILES.has(entry.name)
      ) {
        continue;
      }

      const absolutePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        files.push(
          ...this.collectFiles(absolutePath, baseDirectory, frameworkName)
        );
        continue;
      }

      const sourceFileType = SOURCE_FILE_TYPES.find(({ suffix }) =>
        entry.name.endsWith(suffix)
      );

      if (!sourceFileType) {
        continue;
      }

      const relativePath = path
        .relative(baseDirectory, absolutePath)
        .split(path.sep)
        .join('/');

      files.push({
        type: sourceFileType.type,
        fileName: relativePath.replace(/\.txt$/, ''),
        source: fs.readFileSync(absolutePath, 'utf8')
      });
    }

    return files
      .sort((left, right) => {
        const leftFrameworkIndex = this.getFrameworkOrderIndex(
          frameworkName,
          left.fileName
        );
        const rightFrameworkIndex = this.getFrameworkOrderIndex(
          frameworkName,
          right.fileName
        );

        if (leftFrameworkIndex !== rightFrameworkIndex) {
          return leftFrameworkIndex - rightFrameworkIndex;
        }

        const typeDifference =
          SOURCE_FILE_TYPE_ORDER.get(left.type) -
          SOURCE_FILE_TYPE_ORDER.get(right.type);

        return typeDifference || left.fileName.localeCompare(right.fileName);
      })
      .map((fileEntry) => ({
        ...fileEntry,
        numberedSource: this.createNumberedSource(fileEntry.source)
      }));
  }

  createNumberedSource(source) {
    const sourceLines = source.split('\n');
    const lineNumberWidth = String(sourceLines.length).length;

    return sourceLines
      .map(
        (line, index) =>
          `${String(index + 1).padStart(lineNumberWidth, ' ')} | ${line}`
      )
      .join('\n');
  }

  getTotalLines(files) {
    return files.reduce(
      (totalLines, file) => totalLines + file.source.split('\n').length,
      0
    );
  }

  createOutputMetadata(competitorFiles, sduxFiles) {
    const competitorTotalLines = this.getTotalLines(competitorFiles);
    const sduxTotalLines = this.getTotalLines(sduxFiles);
    const lineDifference = competitorTotalLines - sduxTotalLines;
    const percentageSavings = competitorTotalLines
      ? Number(((lineDifference / competitorTotalLines) * 100).toFixed(2))
      : 0;

    return {
      competitorTotalLines,
      sduxTotalLines,
      lineDifference,
      percentageSavings
    };
  }

  getFrameworkOrderIndex(frameworkName, fileName) {
    if (!frameworkName) {
      return Number.POSITIVE_INFINITY;
    }

    const normalizedFrameworkName = frameworkName.toLowerCase();
    const orderedFiles = FRAMEWORK_FILE_ORDER[normalizedFrameworkName];

    if (!orderedFiles) {
      return Number.POSITIVE_INFINITY;
    }

    const matchingIndex = orderedFiles.findIndex((orderedFileGroup) => {
      return orderedFileGroup.some(
        (orderedFile) =>
          fileName === orderedFile || fileName.endsWith(`/${orderedFile}`)
      );
    });

    return matchingIndex === -1 ? Number.POSITIVE_INFINITY : matchingIndex;
  }

  generateSourceFile(
    exportName,
    files,
    metadata = {
      competitorTotalLines: 0,
      sduxTotalLines: 0,
      lineDifference: 0,
      percentageSavings: 0
    }
  ) {
    return `/**
 * AUTO-GENERATED — do not edit manually.
 * Generated by: tools/sdux-comparison/sdux-comparison.mjs
 */
export const ${exportName}_METADATA = ${JSON.stringify(metadata, null, 2)} as const;

export const ${exportName} = ${JSON.stringify(files, null, 2)} as const satisfies ReadonlyArray<{
  readonly type: ${SOURCE_FILE_TYPE_UNION};
  readonly fileName: string;
  readonly source: string;
  readonly numberedSource: string;
}>;
`;
  }

  run() {
    for (const sourceGroup of this.sourceGroups) {
      if (!sourceGroup.sourceDirectory) {
        throw new Error(
          `Comparison source group "${sourceGroup.exportName}" must define sourceDirectory`
        );
      }
    }

    const sourceGroupsByComparison = new Map();

    for (const sourceGroup of this.sourceGroups) {
      const comparisonKey = path.dirname(sourceGroup.sourceDirectory);
      const comparisonGroups =
        sourceGroupsByComparison.get(comparisonKey) ?? [];

      comparisonGroups.push(sourceGroup);
      sourceGroupsByComparison.set(comparisonKey, comparisonGroups);
    }

    for (const sourceGroup of this.sourceGroups) {
      if (!fs.existsSync(sourceGroup.sourceDirectory)) {
        throw new Error(
          `Comparison source directory was not found: ${sourceGroup.sourceDirectory}`
        );
      }

      const files = this.collectFiles(
        sourceGroup.sourceDirectory,
        sourceGroup.sourceDirectory,
        sourceGroup.frameworkName
      );
      const comparisonGroups = sourceGroupsByComparison.get(
        path.dirname(sourceGroup.sourceDirectory)
      );
      const sduxGroup = comparisonGroups?.find(
        (group) => group.frameworkName?.toLowerCase() === 'sdux'
      );
      const competitorGroup = comparisonGroups?.find(
        (group) => group.frameworkName?.toLowerCase() !== 'sdux'
      );
      const sduxFiles = sduxGroup
        ? this.collectFiles(
            sduxGroup.sourceDirectory,
            sduxGroup.sourceDirectory,
            sduxGroup.frameworkName
          )
        : [];
      const competitorFiles = competitorGroup
        ? this.collectFiles(
            competitorGroup.sourceDirectory,
            competitorGroup.sourceDirectory,
            competitorGroup.frameworkName
          )
        : [];
      const metadata = this.createOutputMetadata(competitorFiles, sduxFiles);
      const generatedSource = this.generateSourceFile(
        sourceGroup.exportName,
        files,
        metadata
      );

      fs.mkdirSync(path.dirname(sourceGroup.outputFile), { recursive: true });
      fs.writeFileSync(sourceGroup.outputFile, generatedSource, 'utf8');

      console.info(
        `Generated ${files.length} comparison source file(s): ${path.relative(this.projectRoot, sourceGroup.outputFile)}`
      );
    }
  }
}
