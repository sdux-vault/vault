import fs from 'node:fs';
import { SduxComparisonSourceGenerator } from '../sdux-comparison.class.mjs';

describe('CLI: SduxComparisonSourceGenerator', () => {
  const projectRoot = '/repo';
  const sourceGroup = {
    exportName: 'ANGULAR_SDUX_OUTPUT',
    frameworkName: 'sdux',
    sourceDirectory: '/repo/examples/angular/sdux',
    outputFile: '/repo/examples/angular/sdux/sdux-output.ts'
  };

  let directories;
  let fileContents;
  let writtenFiles;
  let consoleInfo;

  const file = (name) => ({
    name,
    isDirectory: () => false
  });

  const directory = (name) => ({
    name,
    isDirectory: () => true
  });

  const createGenerator = (sourceGroups = [sourceGroup]) =>
    new SduxComparisonSourceGenerator({ projectRoot, sourceGroups });

  beforeEach(() => {
    directories = {};
    fileContents = {};
    writtenFiles = [];
    consoleInfo = [];

    spyOn(fs, 'existsSync').and.returnValue(true);
    spyOn(fs, 'readdirSync').and.callFake(
      (directoryPath) => directories[directoryPath] ?? []
    );
    spyOn(fs, 'readFileSync').and.callFake(
      (filePath) => fileContents[filePath] ?? ''
    );
    spyOn(fs, 'mkdirSync');
    spyOn(fs, 'writeFileSync').and.callFake((filePath, content, encoding) => {
      writtenFiles.push({ filePath, content, encoding });
    });
    spyOn(console, 'info').and.callFake((message) => {
      consoleInfo.push(message);
    });
  });

  it('should require a project root', () => {
    expect(
      () =>
        new SduxComparisonSourceGenerator({
          projectRoot: '',
          sourceGroups: [sourceGroup]
        })
    ).toThrowError('projectRoot is required');
  });

  it('should require at least one source group', () => {
    expect(
      () => new SduxComparisonSourceGenerator({ projectRoot, sourceGroups: [] })
    ).toThrowError('At least one comparison source group is required');
  });

  it('should recursively collect supported txt-backed source files', () => {
    directories['/repo/examples/angular/sdux'] = [
      file('main.ts.txt'),
      directory('nested'),
      file('README.md.txt'),
      file('ignored.ts')
    ];
    directories['/repo/examples/angular/sdux/nested'] = [
      file('example.component.html.txt'),
      file('example.component.scss.txt')
    ];
    fileContents['/repo/examples/angular/sdux/main.ts.txt'] =
      'bootstrapApplication(AppComponent, appConfig);';
    fileContents['/repo/examples/angular/sdux/README.md.txt'] =
      '# SDuX example';
    fileContents[
      '/repo/examples/angular/sdux/nested/example.component.html.txt'
    ] = '<p>Example</p>';
    fileContents[
      '/repo/examples/angular/sdux/nested/example.component.scss.txt'
    ] = '.example {}';

    const files = createGenerator().collectFiles('/repo/examples/angular/sdux');

    expect(files).toEqual([
      {
        type: 'typescript',
        fileName: 'main.ts',
        source: 'bootstrapApplication(AppComponent, appConfig);',
        numberedSource: '1 | bootstrapApplication(AppComponent, appConfig);'
      },
      {
        type: 'html',
        fileName: 'nested/example.component.html',
        source: '<p>Example</p>',
        numberedSource: '1 | <p>Example</p>'
      },
      {
        type: 'scss',
        fileName: 'nested/example.component.scss',
        source: '.example {}',
        numberedSource: '1 | .example {}'
      },
      {
        type: 'markdown',
        fileName: 'README.md',
        source: '# SDuX example',
        numberedSource: '1 | # SDuX example'
      }
    ]);
  });

  it('should collect tsx-backed files as typescript sources', () => {
    directories['/repo/examples/react/redux'] = [
      file('main.tsx.txt'),
      file('example.component.tsx.txt')
    ];
    fileContents['/repo/examples/react/redux/main.tsx.txt'] =
      'createRoot(document.getElementById("root")!).render(<App />);';
    fileContents['/repo/examples/react/redux/example.component.tsx.txt'] =
      'export function App() { return <div />; }';

    const files = createGenerator().collectFiles('/repo/examples/react/redux');

    expect(files).toEqual([
      {
        type: 'typescript',
        fileName: 'example.component.tsx',
        source: 'export function App() { return <div />; }',
        numberedSource: '1 | export function App() { return <div />; }'
      },
      {
        type: 'typescript',
        fileName: 'main.tsx',
        source: 'createRoot(document.getElementById("root")!).render(<App />);',
        numberedSource:
          '1 | createRoot(document.getElementById("root")!).render(<App />);'
      }
    ]);
  });

  it('should order files using the framework-specific comparison sequence', () => {
    directories['/repo/examples/angular/redux'] = [
      file('example.component.ts.txt'),
      file('main.ts.txt'),
      file('employee.reducer.ts.txt'),
      file('employee.model.ts.txt'),
      file('app.config.ts.txt'),
      file('employee.facade.ts.txt'),
      file('employee.selectors.ts.txt'),
      file('employee.actions.ts.txt'),
      file('employee.state.ts.txt'),
      file('example.component.html.txt')
    ];
    fileContents['/repo/examples/angular/redux/example.component.ts.txt'] =
      'component';
    fileContents['/repo/examples/angular/redux/main.ts.txt'] = 'main';
    fileContents['/repo/examples/angular/redux/employee.reducer.ts.txt'] =
      'reducer';
    fileContents['/repo/examples/angular/redux/employee.model.ts.txt'] =
      'model';
    fileContents['/repo/examples/angular/redux/app.config.ts.txt'] = 'config';
    fileContents['/repo/examples/angular/redux/employee.facade.ts.txt'] =
      'facade';
    fileContents['/repo/examples/angular/redux/employee.selectors.ts.txt'] =
      'selectors';
    fileContents['/repo/examples/angular/redux/employee.actions.ts.txt'] =
      'actions';
    fileContents['/repo/examples/angular/redux/employee.state.ts.txt'] =
      'state';
    fileContents['/repo/examples/angular/redux/example.component.html.txt'] =
      'template';

    const files = createGenerator().collectFiles(
      '/repo/examples/angular/redux',
      '/repo/examples/angular/redux',
      'redux'
    );

    expect(files.map((fileEntry) => fileEntry.fileName)).toEqual([
      'main.ts',
      'app.config.ts',
      'employee.facade.ts',
      'example.component.ts',
      'example.component.html',
      'employee.model.ts',
      'employee.actions.ts',
      'employee.state.ts',
      'employee.reducer.ts',
      'employee.selectors.ts'
    ]);
  });

  it('should order React Redux files using the same comparison sequence aliases', () => {
    directories['/repo/examples/react/redux'] = [
      file('employee.reducer.ts.txt'),
      file('main.tsx.txt'),
      file('employee.model.ts.txt'),
      file('store.ts.txt'),
      file('useEmployeeFacade.ts.txt'),
      file('employee.selectors.ts.txt'),
      file('employee.actions.ts.txt'),
      file('employee.state.ts.txt'),
      file('ExampleView.tsx.txt')
    ];
    fileContents['/repo/examples/react/redux/employee.reducer.ts.txt'] =
      'reducer';
    fileContents['/repo/examples/react/redux/main.tsx.txt'] = 'main';
    fileContents['/repo/examples/react/redux/employee.model.ts.txt'] = 'model';
    fileContents['/repo/examples/react/redux/store.ts.txt'] = 'store';
    fileContents['/repo/examples/react/redux/useEmployeeFacade.ts.txt'] =
      'hook';
    fileContents['/repo/examples/react/redux/employee.selectors.ts.txt'] =
      'selectors';
    fileContents['/repo/examples/react/redux/employee.actions.ts.txt'] =
      'actions';
    fileContents['/repo/examples/react/redux/employee.state.ts.txt'] = 'state';
    fileContents['/repo/examples/react/redux/ExampleView.tsx.txt'] =
      'component';

    const files = createGenerator().collectFiles(
      '/repo/examples/react/redux',
      '/repo/examples/react/redux',
      'redux'
    );

    expect(files.map((fileEntry) => fileEntry.fileName)).toEqual([
      'main.tsx',
      'store.ts',
      'useEmployeeFacade.ts',
      'ExampleView.tsx',
      'employee.model.ts',
      'employee.actions.ts',
      'employee.state.ts',
      'employee.reducer.ts',
      'employee.selectors.ts'
    ]);
  });

  it('should order React SDuX files without an Angular-style app config file', () => {
    directories['/repo/examples/react/sdux'] = [
      file('employee.model.ts.txt'),
      file('main.tsx.txt'),
      file('ExampleView.tsx.txt'),
      file('employee.cell.ts.txt')
    ];
    fileContents['/repo/examples/react/sdux/employee.model.ts.txt'] = 'model';
    fileContents['/repo/examples/react/sdux/main.tsx.txt'] = 'main';
    fileContents['/repo/examples/react/sdux/ExampleView.tsx.txt'] = 'component';
    fileContents['/repo/examples/react/sdux/employee.cell.ts.txt'] = 'cell';

    const files = createGenerator().collectFiles(
      '/repo/examples/react/sdux',
      '/repo/examples/react/sdux',
      'sdux'
    );

    expect(files.map((fileEntry) => fileEntry.fileName)).toEqual([
      'main.tsx',
      'employee.cell.ts',
      'ExampleView.tsx',
      'employee.model.ts'
    ]);
  });

  it('should order future Svelte SDuX files using the shared SDuX comparison sequence aliases', () => {
    directories['/repo/examples/svelte/sdux'] = [
      file('employee.model.ts.txt'),
      file('main.ts.txt'),
      file('example.component.svelte.txt'),
      file('employee.cell.ts.txt')
    ];
    fileContents['/repo/examples/svelte/sdux/employee.model.ts.txt'] = 'model';
    fileContents['/repo/examples/svelte/sdux/main.ts.txt'] = 'main';
    fileContents['/repo/examples/svelte/sdux/example.component.svelte.txt'] =
      'component';
    fileContents['/repo/examples/svelte/sdux/employee.cell.ts.txt'] = 'cell';

    const files = createGenerator().collectFiles(
      '/repo/examples/svelte/sdux',
      '/repo/examples/svelte/sdux',
      'sdux'
    );

    expect(files.map((fileEntry) => fileEntry.fileName)).toEqual([
      'main.ts',
      'employee.cell.ts',
      'example.component.svelte',
      'employee.model.ts'
    ]);
  });

  it('should order future Vue Pinia files using the Pinia comparison sequence aliases', () => {
    directories['/repo/examples/vue/pinia'] = [
      file('employee.model.ts.txt'),
      file('example.component.vue.txt'),
      file('employee.store.ts.txt'),
      file('main.ts.txt')
    ];
    fileContents['/repo/examples/vue/pinia/employee.model.ts.txt'] = 'model';
    fileContents['/repo/examples/vue/pinia/example.component.vue.txt'] =
      'component';
    fileContents['/repo/examples/vue/pinia/employee.store.ts.txt'] = 'store';
    fileContents['/repo/examples/vue/pinia/main.ts.txt'] = 'main';

    const files = createGenerator().collectFiles(
      '/repo/examples/vue/pinia',
      '/repo/examples/vue/pinia',
      'pinia'
    );

    expect(files.map((fileEntry) => fileEntry.fileName)).toEqual([
      'main.ts',
      'employee.store.ts',
      'example.component.vue',
      'employee.model.ts'
    ]);
  });

  it('should exclude generated and operating-system directories and files', () => {
    directories['/repo/examples/angular/sdux'] = [
      directory('node_modules'),
      directory('.angular'),
      directory('.git'),
      directory('__MACOSX'),
      file('.DS_Store'),
      file('main.ts.txt')
    ];
    fileContents['/repo/examples/angular/sdux/main.ts.txt'] = 'const app = 1;';

    const files = createGenerator().collectFiles('/repo/examples/angular/sdux');

    expect(files).toEqual([
      {
        type: 'typescript',
        fileName: 'main.ts',
        source: 'const app = 1;',
        numberedSource: '1 | const app = 1;'
      }
    ]);
  });

  it('should prefix each source line with a left-aligned line number', () => {
    const numberedSource = createGenerator().createNumberedSource(
      ['const a = 1;', '', 'const b = 2;'].join('\n')
    );

    expect(numberedSource).toBe(
      ['1 | const a = 1;', '2 | ', '3 | const b = 2;'].join('\n')
    );
  });

  it('should serialize comparison files into an exported TypeScript constant', () => {
    const generated = createGenerator().generateSourceFile(
      'ANGULAR_SDUX_OUTPUT',
      [
        {
          type: 'typescript',
          fileName: 'main.ts',
          source: 'bootstrapApplication(AppComponent, appConfig);',
          numberedSource: '1 | bootstrapApplication(AppComponent, appConfig);'
        }
      ]
    );

    expect(generated).toContain('AUTO-GENERATED — do not edit manually.');
    expect(generated).toContain(
      'Generated by: tools/sdux-comparison/sdux-comparison.mjs'
    );
    expect(generated).toContain('export const ANGULAR_SDUX_OUTPUT =');
    expect(generated).toContain("readonly type: 'typescript' | 'html'");
    expect(generated).toContain('readonly numberedSource: string;');
  });

  it('should require every source group to define a source directory', () => {
    expect(() =>
      createGenerator([
        {
          exportName: 'BROKEN',
          outputFile: '/repo/examples/angular/sdux/sdux-output.ts'
        }
      ]).run()
    ).toThrowError(
      'Comparison source group "BROKEN" must define sourceDirectory'
    );
  });

  it('should fail when a configured source directory does not exist', () => {
    fs.existsSync.and.returnValue(false);

    expect(() => createGenerator().run()).toThrowError(
      'Comparison source directory was not found: /repo/examples/angular/sdux'
    );
    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });

  it('should generate, write, and report every configured source group', () => {
    const secondSourceGroup = {
      exportName: 'ANGULAR_REDUX_OUTPUT',
      frameworkName: 'redux',
      sourceDirectory: '/repo/examples/angular/redux',
      outputFile: '/repo/examples/angular/redux/redux-output.ts'
    };
    directories['/repo/examples/angular/sdux'] = [file('main.ts.txt')];
    directories['/repo/examples/angular/redux'] = [
      file('example.component.html.txt')
    ];
    fileContents['/repo/examples/angular/sdux/main.ts.txt'] =
      'const sdux = true;';
    fileContents['/repo/examples/angular/redux/example.component.html.txt'] =
      '<p>Redux</p>';

    createGenerator([sourceGroup, secondSourceGroup]).run();

    expect(fs.mkdirSync.calls.allArgs()).toEqual([
      ['/repo/examples/angular/sdux', { recursive: true }],
      ['/repo/examples/angular/redux', { recursive: true }]
    ]);
    expect(writtenFiles.length).toBe(2);
    expect(writtenFiles[0]).toEqual({
      filePath: '/repo/examples/angular/sdux/sdux-output.ts',
      content: jasmine.stringContaining('export const ANGULAR_SDUX_OUTPUT ='),
      encoding: 'utf8'
    });
    expect(writtenFiles[1]).toEqual({
      filePath: '/repo/examples/angular/redux/redux-output.ts',
      content: jasmine.stringContaining('export const ANGULAR_REDUX_OUTPUT ='),
      encoding: 'utf8'
    });
    expect(consoleInfo).toEqual([
      'Generated 1 comparison source file(s): examples/angular/sdux/sdux-output.ts',
      'Generated 1 comparison source file(s): examples/angular/redux/redux-output.ts'
    ]);
  });
});
