// --- AI Model File Path (DO NOT DELETE) ---
// FilePath: tools > stackblitz > tests > generate-inline-projects.spec.js
// Updated: 2026-07-30
// --- END AI MODEL FILE PATH ---

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { InlineProjectsGenerator } from '../generate-inline-projects.class.mjs';

const TEST_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(TEST_DIRECTORY, '../../..');
const ARTIFACTS_ROOT = path.join(TEST_DIRECTORY, '../artifacts');
const INLINE_PROJECT_EXAMPLES = [
  {
    language: 'angular',
    directory: path.join(
      PROJECT_ROOT,
      'apps/docs-app/app/docs/tutorial/angular/examples/display-character'
    ),
    name: 'display-character-example'
  }
];

function directoryEntry(name) {
  return {
    name,
    isDirectory: () => true
  };
}

function fileEntry(name) {
  return {
    name,
    isDirectory: () => false
  };
}

function createGenerator(overrides = {}) {
  return new InlineProjectsGenerator({
    sourceRoot: '/workspace/stackblitz',
    outputDir: '/workspace/output',
    projectRootPath: '/workspace',
    navDir: '/workspace/nav',
    importsOutput: '/workspace/generated/imports.ts',
    urlsOutput: '/workspace/generated/urls.mjs',
    artifactsRoot: ARTIFACTS_ROOT,
    configuredExamples: [],
    ...overrides
  });
}

const generator = createGenerator();
const collectFiles = (...args) => generator.collectFiles(...args);
const toExportName = (...args) => generator.toExportName(...args);
const generateTsFile = (...args) => generator.generateTsFile(...args);
const buildProject = (...args) => generator.buildProject(...args);
const generateNavComponent = (...args) =>
  generator.generateNavComponent(...args);
const generateNavHtml = (...args) => generator.generateNavHtml(...args);
const generateProjectImports = (...args) =>
  generator.generateProjectImports(...args);
const generateSitemapUrls = (...args) => generator.generateSitemapUrls(...args);
const applyFrameworkAliases = (...args) =>
  generator.applyFrameworkAliases(...args);
const buildProjectDefinitions = ({ sourceRoot, configuredExamples }) =>
  createGenerator({ sourceRoot, configuredExamples }).buildProjectDefinitions();
const discoverExamples = ({ sourceRoot, configuredExamples }) =>
  createGenerator({ sourceRoot, configuredExamples }).discoverExamples();
const run = (options) => createGenerator(options).run();

describe('generate-inline-projects', () => {
  let readdirSyncMock;
  let existsSyncMock;
  let readFileSyncMock;
  let writeFileSyncMock;
  let consoleInfo;
  let consoleError;
  let processExitSpy;

  beforeEach(() => {
    readdirSyncMock = {};
    existsSyncMock = {};
    readFileSyncMock = {};
    writeFileSyncMock = [];
    consoleInfo = [];
    consoleError = [];

    spyOn(fs, 'readdirSync').and.callFake((targetPath) => {
      return readdirSyncMock[targetPath] ?? [];
    });
    spyOn(fs, 'existsSync').and.callFake((targetPath) => {
      return existsSyncMock[targetPath] ?? false;
    });
    spyOn(fs, 'readFileSync').and.callFake((targetPath) => {
      return readFileSyncMock[targetPath] ?? '';
    });
    spyOn(fs, 'writeFileSync').and.callFake((targetPath, content) => {
      writeFileSyncMock.push({ targetPath, content });
    });
    spyOn(fs, 'mkdirSync').and.callFake(() => {});
    spyOn(console, 'info').and.callFake((message) => {
      consoleInfo.push(String(message).replace(/\n/g, ''));
    });
    spyOn(console, 'error').and.callFake((message) => {
      consoleError.push(String(message));
    });
    processExitSpy = spyOn(process, 'exit').and.callFake(() => {
      throw new Error('process.exit called');
    });
  });

  describe('collectFiles', () => {
    it('should collect files recursively', () => {
      readdirSyncMock['/test/example'] = [directoryEntry('src')];
      readdirSyncMock['/test/example/src'] = [fileEntry('main.ts')];
      readFileSyncMock['/test/example/src/main.ts'] = 'bootstrap();';

      expect(collectFiles('/test/example')).toEqual({
        'src/main.ts': 'bootstrap();'
      });
    });

    it('should mount collected files under a target base path', () => {
      readdirSyncMock['/test/tutorial'] = [fileEntry('example.component.ts')];
      readFileSyncMock['/test/tutorial/example.component.ts'] =
        'export class ExampleComponent {}';

      expect(
        collectFiles('/test/tutorial', { targetBasePath: 'src/app' })
      ).toEqual({
        'src/app/example.component.ts': 'export class ExampleComponent {}'
      });
    });

    it('should exclude ignored files and extensions', () => {
      readdirSyncMock['/test/example'] = [
        fileEntry('.DS_Store'),
        fileEntry('package-lock.json'),
        fileEntry('main.js'),
        fileEntry('main.ts')
      ];
      readFileSyncMock['/test/example/main.ts'] = 'export {};';

      expect(collectFiles('/test/example')).toEqual({
        'main.ts': 'export {};'
      });
    });
  });

  describe('naming and file generation', () => {
    it('should convert folder names to camelCase export names', () => {
      expect(toExportName('complete-character-management-example')).toBe(
        'completeCharacterManagementExample'
      );
    });

    it('should generate a project file and escape template characters', () => {
      const output = generateTsFile(
        'demo-example',
        {
          'src/main.ts': 'const value = `x`;\nconsole.log(${value});\\n'
        },
        { name: "demo's title" }
      );

      expect(output).toContain('export const demoExampleProject: Project');
      expect(output).toContain("title: 'demo\\'s title'");
      expect(output).toContain('const value = \\`x\\`');
      expect(output).toContain('console.log(\\${value});');
      expect(output).toContain('\\\\n');
    });
  });

  describe('project definition discovery', () => {
    it('should register the default display-character artifact-backed example', () => {
      const example = INLINE_PROJECT_EXAMPLES.find(
        ({ language, name }) =>
          language === 'angular' && name === 'display-character-example'
      );

      expect(example).toEqual(
        jasmine.objectContaining({
          language: 'angular',
          name: 'display-character-example'
        })
      );
      expect(path.normalize(example?.directory ?? '')).toEqual(
        jasmine.stringMatching(
          new RegExp(
            `${path
              .normalize(
                'apps/docs-app/app/docs/tutorial/angular/examples/display-character'
              )
              .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`
          )
        )
      );
    });

    it('should combine full-project and configured artifact-backed examples', () => {
      const sourceRoot = '/workspace/stackblitz';
      const tutorialDirectory =
        '/workspace/tutorials/complete-character-management';

      readdirSyncMock[sourceRoot] = [
        directoryEntry('angular'),
        directoryEntry('nodejs')
      ];
      readdirSyncMock[path.join(sourceRoot, 'angular')] = [
        directoryEntry('full-demo')
      ];
      readdirSyncMock[path.join(sourceRoot, 'nodejs')] = [
        directoryEntry('promise-example')
      ];

      const definitions = buildProjectDefinitions({
        sourceRoot,
        configuredExamples: [
          {
            language: 'angular',
            directory: tutorialDirectory,
            name: 'complete-character-management-example'
          }
        ]
      });

      expect(definitions).toEqual([
        jasmine.objectContaining({
          language: 'angular',
          name: 'complete-character-management-example',
          sourceType: 'artifact-merge',
          sourceDirectory: tutorialDirectory,
          artifactDirectory: path.join(ARTIFACTS_ROOT, 'angular'),
          exampleTargetBasePath: 'src'
        }),
        jasmine.objectContaining({
          language: 'angular',
          name: 'full-demo',
          sourceType: 'full-project'
        }),
        jasmine.objectContaining({
          language: 'nodejs',
          name: 'promise-example',
          sourceType: 'full-project'
        })
      ]);
    });

    it('should reject duplicate example ids across source types', () => {
      const sourceRoot = '/workspace/stackblitz';

      readdirSyncMock[sourceRoot] = [directoryEntry('angular')];
      readdirSyncMock[path.join(sourceRoot, 'angular')] = [
        directoryEntry('demo-example')
      ];

      expect(() =>
        buildProjectDefinitions({
          sourceRoot,
          configuredExamples: [
            {
              language: 'angular',
              directory: '/workspace/tutorials/demo-example',
              name: 'demo-example'
            }
          ]
        })
      ).toThrowError(
        'Duplicate StackBlitz example definition found for angular/demo-example.'
      );
    });
  });

  describe('artifact-backed project assembly', () => {
    it('should merge framework artifacts with example files and rewrite the package name', () => {
      const artifactDirectory = path.join(ARTIFACTS_ROOT, 'angular');
      const exampleDirectory =
        '/workspace/tutorials/complete-character-management';

      readdirSyncMock[artifactDirectory] = [
        fileEntry('package.json'),
        directoryEntry('src')
      ];
      readdirSyncMock[path.join(artifactDirectory, 'src')] = [
        fileEntry('main.ts'),
        fileEntry('styles.scss')
      ];
      readdirSyncMock[exampleDirectory] = [
        fileEntry('main.ts'),
        fileEntry('example.component.ts'),
        fileEntry('example.component.html')
      ];

      const artifactPackageJsonPath = path.join(
        artifactDirectory,
        'package.json'
      );
      existsSyncMock[artifactPackageJsonPath] = true;
      readFileSyncMock[artifactPackageJsonPath] = JSON.stringify({
        name: 'shared-angular-shell',
        private: true
      });
      readFileSyncMock[path.join(artifactDirectory, 'src/main.ts')] =
        'bootstrapApplication(AppComponent);';
      readFileSyncMock[path.join(artifactDirectory, 'src/styles.scss')] =
        'body {}';
      readFileSyncMock[path.join(exampleDirectory, 'main.ts')] =
        "import { ExampleComponent } from './app/example.component';";
      readFileSyncMock[path.join(exampleDirectory, 'example.component.ts')] =
        'export class ExampleComponent {}';
      readFileSyncMock[path.join(exampleDirectory, 'example.component.html')] =
        '<p>Example</p>';

      const project = buildProject({
        language: 'angular',
        name: 'complete-character-management-example',
        sourceDirectory: exampleDirectory,
        sourceType: 'artifact-merge',
        artifactDirectory,
        exampleTargetBasePath: 'src'
      });

      expect(project.packageJson).toEqual({
        name: 'complete-character-management-example',
        private: true
      });
      expect(project.files).toEqual({
        'package.json':
          '{\n  "name": "complete-character-management-example",\n  "private": true\n}\n',
        'src/main.ts': 'bootstrapApplication(AppComponent);',
        'src/styles.scss': 'body {}',
        'src/example.component.ts': 'export class ExampleComponent {}',
        'src/example.component.html': '<p>Example</p>'
      });
    });
  });

  describe('example discovery and aliases', () => {
    it('should include configured examples and duplicate nodejs examples under typescript', () => {
      const sourceRoot = '/workspace/stackblitz';

      readdirSyncMock[sourceRoot] = [
        directoryEntry('angular'),
        directoryEntry('nodejs')
      ];
      readdirSyncMock[path.join(sourceRoot, 'angular')] = [
        directoryEntry('full-demo')
      ];
      readdirSyncMock[path.join(sourceRoot, 'nodejs')] = [
        directoryEntry('promise-example')
      ];

      const discovered = discoverExamples({
        sourceRoot,
        configuredExamples: [
          {
            language: 'angular',
            directory: '/workspace/tutorials/complete-character-management',
            name: 'complete-character-management-example'
          }
        ]
      });

      expect(discovered.angular).toEqual([
        'complete-character-management-example',
        'full-demo'
      ]);
      expect(discovered.nodejs).toEqual(['promise-example']);
      expect(discovered.typescript).toEqual(['promise-example']);
      expect(discovered.typescript).not.toBe(discovered.nodejs);
    });

    it('should fail clearly when an aliased source framework is missing', () => {
      expect(() =>
        applyFrameworkAliases({ angular: ['demo-example'] })
      ).toThrowError(
        'Cannot create the typescript framework alias: nodejs examples were not found.'
      );
    });
  });

  describe('run', () => {
    it('should exit when the source root does not exist', () => {
      const sourceRoot = '/workspace/stackblitz';

      existsSyncMock[sourceRoot] = false;

      expect(() => run({ sourceRoot })).toThrowError('process.exit called');
      expect(consoleError).toEqual([`❌ Source not found: ${sourceRoot}`]);
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it('should generate full-project outputs, artifact-backed outputs, and phase-2 artifacts', () => {
      const sourceRoot = '/workspace/stackblitz';
      const outputDir = '/workspace/output';
      const navDir = '/workspace/nav';
      const importsOutput =
        '/workspace/generated/stackblitz-project-imports.generated.ts';
      const urlsOutput =
        '/workspace/generated/stackblitz-example-urls.generated.mjs';
      const tutorialDirectory =
        '/workspace/tutorials/complete-character-management';

      existsSyncMock[sourceRoot] = true;

      readdirSyncMock[sourceRoot] = [
        directoryEntry('angular'),
        directoryEntry('nodejs')
      ];
      readdirSyncMock[path.join(sourceRoot, 'angular')] = [
        directoryEntry('full-demo')
      ];
      readdirSyncMock[path.join(sourceRoot, 'nodejs')] = [
        directoryEntry('promise-example')
      ];
      readdirSyncMock[path.join(sourceRoot, 'angular', 'full-demo')] = [
        fileEntry('package.json'),
        fileEntry('main.ts')
      ];
      readdirSyncMock[path.join(sourceRoot, 'nodejs', 'promise-example')] = [
        fileEntry('package.json'),
        fileEntry('index.ts')
      ];
      const artifactDirectory = path.join(ARTIFACTS_ROOT, 'angular');
      readdirSyncMock[artifactDirectory] = [
        fileEntry('package.json'),
        directoryEntry('src')
      ];
      readdirSyncMock[path.join(artifactDirectory, 'src')] = [
        fileEntry('main.ts')
      ];
      readdirSyncMock[tutorialDirectory] = [
        fileEntry('main.ts'),
        fileEntry('example.component.ts')
      ];

      const fullDemoPackageJsonPath = path.join(
        sourceRoot,
        'angular',
        'full-demo',
        'package.json'
      );
      const nodePromisePackageJsonPath = path.join(
        sourceRoot,
        'nodejs',
        'promise-example',
        'package.json'
      );
      const artifactPackageJsonPath = path.join(
        artifactDirectory,
        'package.json'
      );

      existsSyncMock[fullDemoPackageJsonPath] = true;
      existsSyncMock[nodePromisePackageJsonPath] = true;
      existsSyncMock[artifactPackageJsonPath] = true;

      readFileSyncMock[fullDemoPackageJsonPath] = JSON.stringify({
        name: 'full-demo'
      });
      readFileSyncMock[
        path.join(sourceRoot, 'angular', 'full-demo', 'main.ts')
      ] = 'bootstrap();';
      readFileSyncMock[nodePromisePackageJsonPath] = JSON.stringify({
        name: 'promise-example'
      });
      readFileSyncMock[
        path.join(sourceRoot, 'nodejs', 'promise-example', 'index.ts')
      ] = 'console.log("promise");';
      readFileSyncMock[artifactPackageJsonPath] = JSON.stringify({
        name: 'shared-angular-shell',
        private: true
      });
      readFileSyncMock[path.join(artifactDirectory, 'src', 'main.ts')] =
        'bootstrapApplication(AppComponent);';
      readFileSyncMock[path.join(tutorialDirectory, 'main.ts')] =
        "import { ExampleComponent } from './app/example.component';";
      readFileSyncMock[path.join(tutorialDirectory, 'example.component.ts')] =
        'export class ExampleComponent {}';

      run({
        sourceRoot,
        outputDir,
        projectRootPath: '/workspace',
        navDir,
        importsOutput,
        urlsOutput,
        configuredExamples: [
          {
            language: 'angular',
            directory: tutorialDirectory,
            name: 'complete-character-management-example'
          }
        ]
      });

      const projectWrites = writeFileSyncMock.filter(({ targetPath }) =>
        targetPath.endsWith('.project.ts')
      );
      expect(projectWrites.map(({ targetPath }) => targetPath)).toEqual([
        path.join(
          outputDir,
          'angular',
          'complete-character-management-example.project.ts'
        ),
        path.join(outputDir, 'angular', 'full-demo.project.ts'),
        path.join(outputDir, 'nodejs', 'promise-example.project.ts')
      ]);
      expect(projectWrites[0].content).toContain(
        "'src/main.ts': `bootstrapApplication(AppComponent);`"
      );
      expect(projectWrites[0].content).toContain(
        "'src/example.component.ts': `export class ExampleComponent {}`"
      );
      expect(projectWrites[0].content).not.toContain('./app/example.component');
      expect(projectWrites[0].content).toContain(
        "title: 'complete-character-management-example'"
      );

      const importsFile = writeFileSyncMock.find(({ targetPath }) => {
        return targetPath === importsOutput;
      });
      expect(importsFile.content).toContain(
        "'typescript/promise-example': () => import('../../../stackblitz/projects/nodejs/promise-example.project')"
      );

      const navFile = writeFileSyncMock.find(({ targetPath }) => {
        return (
          targetPath ===
          path.join(navDir, 'stackblitz-examples.sub-navigation.component.html')
        );
      });
      expect(navFile.content).toContain(
        'routerLink="/examples/angular/complete-character-management"'
      );

      const sitemapFile = writeFileSyncMock.find(({ targetPath }) => {
        return targetPath === urlsOutput;
      });
      expect(sitemapFile.content).toContain("'/examples/typescript/promise'");

      expect(consoleInfo).toContain(
        '✅ Generated 3 inline StackBlitz project file(s)'
      );
      expect(consoleInfo).toContain('✅ Generated: sub-navigation HTML');
      expect(consoleInfo).toContain('✅ Generated: project imports map');
    });
  });

  describe('phase-2 helpers', () => {
    it('should generate navigation, imports, and sitemap artifacts', () => {
      const frameworkExamples = applyFrameworkAliases({
        angular: ['complete-character-management-example'],
        nodejs: ['promise-example']
      });

      expect(generateNavHtml(frameworkExamples)).toContain(
        'StackBlitz Examples'
      );
      expect(generateNavComponent()).toContain(
        'StackBlitzExamplesSubNavigationComponent'
      );
      expect(generateProjectImports(frameworkExamples)).toContain(
        "'angular/complete-character-management-example': () => import('../../../stackblitz/projects/angular/complete-character-management-example.project')"
      );
      expect(generateSitemapUrls(frameworkExamples)).toContain(
        "'/examples/angular/complete-character-management'"
      );
    });
  });
});
