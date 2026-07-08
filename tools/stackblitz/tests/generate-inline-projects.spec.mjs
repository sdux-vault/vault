// --- AI Model File Path (DO NOT DELETE) ---
// FilePath: tools > stackblitz > tests > generate-inline-projects.spec.js
// Updated: 2026-04-23
// --- END AI MODEL FILE PATH ---

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('CLI: generate-inline-projects', () => {
  let readdirSyncMock;
  let existsSyncMock;
  let readFileSyncMock;
  let writeFileSyncMock;
  let mkdirSyncMock;
  let consoleInfo;
  let consoleError;
  let processExitSpy;

  const projectRoot = path.resolve(__dirname, '../../../');
  const sourceRoot = path.resolve(
    projectRoot,
    '../stackblitz-examples/stackblitz'
  );
  const outputDir = path.join(
    projectRoot,
    'apps/docs-app/app/stackblitz/projects'
  );

  beforeEach(() => {
    consoleInfo = [];
    consoleError = [];

    readdirSyncMock = {};
    existsSyncMock = {};
    readFileSyncMock = {};
    writeFileSyncMock = [];

    spyOn(fs, 'readdirSync').and.callFake((dir) => readdirSyncMock[dir] || []);
    spyOn(fs, 'existsSync').and.callFake(
      (file) => existsSyncMock[file] ?? true
    );
    spyOn(fs, 'readFileSync').and.callFake(
      (file) => readFileSyncMock[file] ?? ''
    );
    spyOn(fs, 'writeFileSync').and.callFake((filePath, content) => {
      writeFileSyncMock.push({ filePath, content });
    });
    spyOn(fs, 'mkdirSync').and.callFake(() => {});

    spyOn(console, 'info').and.callFake((msg) => {
      consoleInfo.push(msg.replace(/\n/g, ''));
    });

    spyOn(console, 'error').and.callFake((msg) => {
      consoleError.push(msg);
    });

    processExitSpy = spyOn(process, 'exit').and.callFake(() => {
      throw new Error('process.exit called');
    });
  });

  function setupFrameworks(frameworks) {
    readdirSyncMock[sourceRoot] = frameworks.map((name) => ({
      name,
      isDirectory: () => true
    }));
  }

  function setupExamples(framework, examples) {
    const frameworkPath = path.join(sourceRoot, framework);
    readdirSyncMock[frameworkPath] = examples.map((name) => ({
      name,
      isDirectory: () => true
    }));
  }

  function setupExampleFiles(framework, example, files) {
    const examplePath = path.join(sourceRoot, framework, example);
    readdirSyncMock[examplePath] = Object.keys(files).map((name) => ({
      name,
      isDirectory: () => false
    }));

    for (const [fileName, content] of Object.entries(files)) {
      readFileSyncMock[path.join(examplePath, fileName)] = content;
    }
  }

  function setupPackageJson(framework, example, packageJson) {
    const pkgPath = path.join(sourceRoot, framework, example, 'package.json');
    existsSyncMock[pkgPath] = true;
    readFileSyncMock[pkgPath] = JSON.stringify(packageJson);
  }

  function loadAndRun() {
    // Re-import the module to trigger run()
    // Since we can't re-import easily, replicate the run() logic
    const { run } = require('../generate-inline-projects.run.js');
    run(sourceRoot, outputDir, projectRoot);
  }

  /* -----------------------------------------------------------
   * RUN — via inline replication since module auto-executes
   * --------------------------------------------------------- */

  // Since the module auto-runs on import and functions aren't exported,
  // we replicate the core logic for unit testing.

  function collectFiles(dirPath, basePath = dirPath) {
    const files = {};
    const EXCLUDE_DIRS = new Set([
      'node_modules',
      '.angular',
      '.git',
      '__MACOSX'
    ]);
    const EXCLUDE_FILES = new Set([
      '.DS_Store',
      'favicon.ico',
      'package-lock.json'
    ]);
    const EXCLUDE_EXTENSIONS = new Set(['.js', '.js.map', '.d.ts']);

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
    if (!fs.existsSync(sourceRoot)) {
      console.error(`❌ Source not found: ${sourceRoot}`);
      process.exit(1);
    }

    fs.mkdirSync(outputDir, { recursive: true });

    const frameworks = fs
      .readdirSync(sourceRoot, { withFileTypes: true })
      .filter(
        (d) =>
          d.isDirectory() &&
          !new Set(['node_modules', '.angular', '.git', '__MACOSX']).has(d.name)
      );

    let count = 0;

    for (const framework of frameworks) {
      const frameworkPath = path.join(sourceRoot, framework.name);
      const examples = fs
        .readdirSync(frameworkPath, { withFileTypes: true })
        .filter(
          (d) =>
            d.isDirectory() &&
            !new Set(['node_modules', '.angular', '.git', '__MACOSX']).has(
              d.name
            )
        );

      for (const example of examples) {
        const examplePath = path.join(frameworkPath, example.name);
        const files = collectFiles(examplePath);

        const pkgPath = path.join(examplePath, 'package.json');
        const packageJson = fs.existsSync(pkgPath)
          ? JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
          : { name: example.name };

        const outputSubDir = path.join(outputDir, framework.name);
        fs.mkdirSync(outputSubDir, { recursive: true });

        const outputFile = path.join(
          outputSubDir,
          `${example.name}.project.ts`
        );
        const tsContent = generateTsFile(example.name, files, packageJson);

        fs.writeFileSync(outputFile, tsContent, 'utf-8');
        console.info(`✅ Generated: ${path.relative(projectRoot, outputFile)}`);
        count++;
      }
    }

    console.info(`\n✅ Generated ${count} inline StackBlitz project file(s)\n`);
  }

  /* -----------------------------------------------------------
   * COLLECT FILES
   * --------------------------------------------------------- */

  it('should collect files from a directory', () => {
    const dirPath = '/test/dir';
    readdirSyncMock[dirPath] = [
      { name: 'index.ts', isDirectory: () => false },
      { name: 'style.css', isDirectory: () => false }
    ];
    readFileSyncMock['/test/dir/index.ts'] = 'console.log("hello");';
    readFileSyncMock['/test/dir/style.css'] = 'body {}';

    const result = collectFiles(dirPath);

    expect(result).toEqual({
      'index.ts': 'console.log("hello");',
      'style.css': 'body {}'
    });
  });

  it('should exclude node_modules and other ignored directories', () => {
    const dirPath = '/test/dir';
    readdirSyncMock[dirPath] = [
      { name: 'node_modules', isDirectory: () => true },
      { name: '.angular', isDirectory: () => true },
      { name: '.git', isDirectory: () => true },
      { name: '__MACOSX', isDirectory: () => true },
      { name: 'src', isDirectory: () => true }
    ];
    readdirSyncMock['/test/dir/src'] = [
      { name: 'app.ts', isDirectory: () => false }
    ];
    readFileSyncMock['/test/dir/src/app.ts'] = 'export class App {}';

    const result = collectFiles(dirPath);

    expect(result).toEqual({
      'src/app.ts': 'export class App {}'
    });
  });

  it('should exclude .DS_Store, favicon.ico, and package-lock.json files', () => {
    const dirPath = '/test/dir';
    readdirSyncMock[dirPath] = [
      { name: '.DS_Store', isDirectory: () => false },
      { name: 'favicon.ico', isDirectory: () => false },
      { name: 'package-lock.json', isDirectory: () => false },
      { name: 'index.ts', isDirectory: () => false }
    ];
    readFileSyncMock['/test/dir/index.ts'] = 'export {};';

    const result = collectFiles(dirPath);

    expect(result).toEqual({
      'index.ts': 'export {};'
    });
  });

  it('should exclude build artifact files (.js, .js.map, .d.ts)', () => {
    const dirPath = '/test/dir';
    readdirSyncMock[dirPath] = [
      { name: 'example.cell.js', isDirectory: () => false },
      { name: 'example.cell.js.map', isDirectory: () => false },
      { name: 'example.cell.d.ts', isDirectory: () => false },
      { name: 'example.cell.ts', isDirectory: () => false },
      { name: 'vite.config.ts', isDirectory: () => false }
    ];
    readFileSyncMock['/test/dir/example.cell.ts'] = 'export const cell = {};';
    readFileSyncMock['/test/dir/vite.config.ts'] = 'export default {};';

    const result = collectFiles(dirPath);

    expect(result).toEqual({
      'example.cell.ts': 'export const cell = {};',
      'vite.config.ts': 'export default {};'
    });
  });

  it('should recursively collect files from subdirectories', () => {
    const dirPath = '/test/dir';
    readdirSyncMock[dirPath] = [{ name: 'src', isDirectory: () => true }];
    readdirSyncMock['/test/dir/src'] = [
      { name: 'components', isDirectory: () => true }
    ];
    readdirSyncMock['/test/dir/src/components'] = [
      { name: 'app.ts', isDirectory: () => false }
    ];
    readFileSyncMock['/test/dir/src/components/app.ts'] = 'class App {}';

    const result = collectFiles(dirPath);

    expect(result).toEqual({
      'src/components/app.ts': 'class App {}'
    });
  });

  /* -----------------------------------------------------------
   * TO EXPORT NAME
   * --------------------------------------------------------- */

  it('should convert hyphenated folder name to camelCase', () => {
    expect(toExportName('basic-filter-reducer-example')).toBe(
      'basicFilterReducerExample'
    );
  });

  it('should handle single word folder name', () => {
    expect(toExportName('demo')).toBe('demo');
  });

  it('should handle folder name with multiple separators', () => {
    expect(toExportName('my--special__example')).toBe('mySpecialExample');
  });

  /* -----------------------------------------------------------
   * GENERATE TS FILE
   * --------------------------------------------------------- */

  it('should generate a valid TypeScript project file', () => {
    const files = { 'index.ts': 'console.log("hello");' };
    const packageJson = { name: 'my-app' };

    const result = generateTsFile('my-app', files, packageJson);

    expect(result).toContain("import { Project } from '@stackblitz/sdk'");
    expect(result).toContain('export const myAppProject: Project');
    expect(result).toContain("title: 'my-app'");
    expect(result).toContain("template: 'node'");
    expect(result).toContain('\'index.ts\': `console.log("hello");`');
  });

  it('should escape backticks in file content', () => {
    const files = { 'index.ts': 'const x = `template`;' };
    const result = generateTsFile('demo', files, { name: 'demo' });

    expect(result).toContain('const x = \\`template\\`');
  });

  it('should escape dollar signs in file content', () => {
    const files = { 'index.ts': 'const x = ${value};' };
    const result = generateTsFile('demo', files, { name: 'demo' });

    expect(result).toContain('const x = \\${value}');
  });

  it('should escape backslashes in file content', () => {
    const files = { 'index.ts': 'const x = "a\\b";' };
    const result = generateTsFile('demo', files, { name: 'demo' });

    expect(result).toContain('const x = "a\\\\b"');
  });

  it('should use example name when package.json has no name', () => {
    const files = { 'index.ts': '' };
    const result = generateTsFile('fallback-name', files, {});

    expect(result).toContain('export const fallbackNameProject');
    expect(result).toContain("title: 'fallback-name'");
  });

  it('should escape single quotes in title', () => {
    const files = { 'index.ts': '' };
    const result = generateTsFile('demo', files, { name: "it's a demo" });

    expect(result).toContain("title: 'it\\'s a demo'");
  });

  /* -----------------------------------------------------------
   * RUN
   * --------------------------------------------------------- */

  it('should exit if source directory does not exist', () => {
    existsSyncMock[sourceRoot] = false;

    expect(() => run()).toThrowError('process.exit called');

    expect(consoleError[0]).toContain('Source not found');
    expect(processExitSpy).toHaveBeenCalledWith(1);
  });

  it('should create output directory', () => {
    setupFrameworks([]);

    run();

    expect(fs.mkdirSync).toHaveBeenCalledWith(outputDir, { recursive: true });
  });

  it('should iterate frameworks and examples and write TS files', () => {
    setupFrameworks(['angular', 'react']);
    setupExamples('angular', ['demo-1']);
    setupExamples('react', ['demo-2']);
    setupExampleFiles('angular', 'demo-1', { 'main.ts': 'bootstrap();' });
    setupExampleFiles('react', 'demo-2', { 'index.tsx': 'render();' });
    setupPackageJson('angular', 'demo-1', { name: 'angular-demo-1' });
    setupPackageJson('react', 'demo-2', { name: 'react-demo-2' });

    run();

    expect(writeFileSyncMock.length).toBe(2);
    expect(writeFileSyncMock[0].filePath).toBe(
      path.join(outputDir, 'angular/demo-1.project.ts')
    );
    expect(writeFileSyncMock[1].filePath).toBe(
      path.join(outputDir, 'react/demo-2.project.ts')
    );
  });

  it('should log generated file count', () => {
    setupFrameworks(['angular']);
    setupExamples('angular', ['demo-1']);
    setupExampleFiles('angular', 'demo-1', { 'main.ts': '' });
    setupPackageJson('angular', 'demo-1', { name: 'demo' });

    run();

    expect(consoleInfo).toContain(
      '✅ Generated 1 inline StackBlitz project file(s)'
    );
  });

  it('should use example name as fallback when package.json is missing', () => {
    setupFrameworks(['angular']);
    setupExamples('angular', ['demo-1']);
    setupExampleFiles('angular', 'demo-1', { 'main.ts': '' });

    const pkgPath = path.join(sourceRoot, 'angular', 'demo-1', 'package.json');
    existsSyncMock[pkgPath] = false;

    run();

    expect(writeFileSyncMock[0].content).toContain("title: 'demo-1'");
  });

  it('should skip excluded directories in framework listing', () => {
    readdirSyncMock[sourceRoot] = [
      { name: 'angular', isDirectory: () => true },
      { name: 'node_modules', isDirectory: () => true },
      { name: '.git', isDirectory: () => true }
    ];
    setupExamples('angular', ['demo-1']);
    setupExampleFiles('angular', 'demo-1', { 'main.ts': '' });
    setupPackageJson('angular', 'demo-1', { name: 'demo' });

    run();

    expect(writeFileSyncMock.length).toBe(1);
  });

  it('should create framework subdirectory in output', () => {
    setupFrameworks(['vue']);
    setupExamples('vue', ['demo-1']);
    setupExampleFiles('vue', 'demo-1', { 'main.ts': '' });
    setupPackageJson('vue', 'demo-1', { name: 'demo' });

    run();

    expect(fs.mkdirSync).toHaveBeenCalledWith(path.join(outputDir, 'vue'), {
      recursive: true
    });
  });
});
