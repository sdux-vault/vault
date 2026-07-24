import fs from 'node:fs';
import { TutorialSourceGenerator } from '../generate-tutorial-source.class.mjs';

describe('CLI: TutorialSourceGenerator', () => {
  const projectRoot = '/repo';
  const sourceGroup = {
    exportName: 'TUTORIAL_SOURCE',
    sourceDirectory: '/repo/source',
    outputFile: '/repo/output/tutorial-source.generated.ts'
  };
  const sourceFileGroup = {
    exportName: 'STAR_WARS_CHARACTER_STATE',
    sourceFile: '/repo/source/star-wars-character.state.ts',
    outputFile: '/repo/output/star-wars-character-state.generated.ts'
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
    new TutorialSourceGenerator({ projectRoot, sourceGroups });

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
        new TutorialSourceGenerator({
          projectRoot: '',
          sourceGroups: [sourceGroup]
        })
    ).toThrowError('projectRoot is required');
  });

  it('should require at least one source group', () => {
    expect(
      () => new TutorialSourceGenerator({ projectRoot, sourceGroups: [] })
    ).toThrowError('At least one tutorial source group is required');
  });

  it('should recursively collect supported files in semantic order', () => {
    directories['/repo/source'] = [
      file('example.service.spec.ts'),
      directory('nested'),
      file('example.component.html'),
      file('README.md')
    ];
    directories['/repo/source/nested'] = [
      file('example.component.scss'),
      file('example.service.ts'),
      file('example.component.spec.ts'),
      file('example.component.ts')
    ];
    fileContents['/repo/source/example.component.html'] = '<p>Example</p>';
    fileContents['/repo/source/example.service.spec.ts'] =
      "describe('ExampleService', () => {});";
    fileContents['/repo/source/nested/example.component.scss'] = '.example {}';
    fileContents['/repo/source/nested/example.service.ts'] =
      'export class ExampleService {}';
    fileContents['/repo/source/nested/example.component.spec.ts'] =
      "describe('ExampleComponent', () => {});";
    fileContents['/repo/source/nested/example.component.ts'] =
      'export class ExampleComponent {}';

    const files = createGenerator().collectFiles('/repo/source');

    expect(files).toEqual([
      {
        type: 'component',
        fileName: 'nested/example.component.ts',
        source: 'export class ExampleComponent {}'
      },
      {
        type: 'service',
        fileName: 'nested/example.service.ts',
        source: 'export class ExampleService {}'
      },
      {
        type: 'html',
        fileName: 'example.component.html',
        source: '<p>Example</p>'
      },
      {
        type: 'scss',
        fileName: 'nested/example.component.scss',
        source: '.example {}'
      },
      {
        type: 'componentSpec',
        fileName: 'nested/example.component.spec.ts',
        source: "describe('ExampleComponent', () => {});"
      },
      {
        type: 'serviceSpec',
        fileName: 'example.service.spec.ts',
        source: "describe('ExampleService', () => {});"
      }
    ]);
    expect(fs.readFileSync).toHaveBeenCalledTimes(6);
  });

  it('should exclude generated and operating-system directories and files', () => {
    directories['/repo/source'] = [
      directory('node_modules'),
      directory('.angular'),
      directory('.git'),
      directory('__MACOSX'),
      file('.DS_Store'),
      file('example.component.ts')
    ];
    fileContents['/repo/source/example.component.ts'] =
      'export class ExampleComponent {}';

    const files = createGenerator().collectFiles('/repo/source');

    expect(files).toEqual([
      {
        type: 'component',
        fileName: 'example.component.ts',
        source: 'export class ExampleComponent {}'
      }
    ]);
    expect(fs.readFileSync).toHaveBeenCalledTimes(1);
  });

  it('should serialize source safely into an exported TypeScript constant', () => {
    const source = 'const value = `${name}`;\\n<div>{value}</div>';

    const generated = createGenerator().generateSourceFile('EXAMPLE_SOURCE', [
      {
        type: 'component',
        fileName: 'example.component.ts',
        source
      }
    ]);

    expect(generated).toContain('AUTO-GENERATED — do not edit manually.');
    expect(generated).toContain('export const EXAMPLE_SOURCE =');
    expect(generated).toContain(JSON.stringify(source));
    expect(generated).toContain('as const satisfies ReadonlyArray<{');
    expect(generated).toContain("readonly type: 'component' | 'service'");
  });

  it('should serialize a single source file into an exported string', () => {
    const source = 'export interface StarWarsCharacterState {}';

    const generated = createGenerator().generateSingleSourceFile(
      'STAR_WARS_CHARACTER_STATE',
      source
    );

    expect(generated).toContain('AUTO-GENERATED — do not edit manually.');
    expect(generated).toContain(
      `export const STAR_WARS_CHARACTER_STATE = ${JSON.stringify(source)};`
    );
  });

  it('should require exactly one source path for each source group', () => {
    expect(() =>
      createGenerator([
        {
          ...sourceGroup,
          sourceFile: '/repo/source/example.component.ts'
        }
      ]).run()
    ).toThrowError(
      'Tutorial source group "TUTORIAL_SOURCE" must define exactly one sourceDirectory or sourceFile'
    );

    expect(() =>
      createGenerator([
        {
          exportName: 'NO_SOURCE',
          outputFile: '/repo/output/no-source.generated.ts'
        }
      ]).run()
    ).toThrowError(
      'Tutorial source group "NO_SOURCE" must define exactly one sourceDirectory or sourceFile'
    );
  });

  it('should fail when a configured source directory does not exist', () => {
    fs.existsSync.and.returnValue(false);

    expect(() => createGenerator().run()).toThrowError(
      'Tutorial source directory was not found: /repo/source'
    );
    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });

  it('should generate, write, and report a configured source file', () => {
    const source = 'export interface StarWarsCharacterState {}';
    fileContents[sourceFileGroup.sourceFile] = source;

    createGenerator([sourceFileGroup]).run();

    expect(fs.readdirSync).not.toHaveBeenCalled();
    expect(fs.readFileSync).toHaveBeenCalledOnceWith(
      sourceFileGroup.sourceFile,
      'utf8'
    );
    expect(fs.mkdirSync).toHaveBeenCalledOnceWith('/repo/output', {
      recursive: true
    });
    expect(writtenFiles).toEqual([
      {
        filePath: sourceFileGroup.outputFile,
        content: jasmine.stringContaining(
          `export const STAR_WARS_CHARACTER_STATE = ${JSON.stringify(source)};`
        ),
        encoding: 'utf8'
      }
    ]);
    expect(consoleInfo).toEqual([
      'Generated 1 tutorial source file(s): output/star-wars-character-state.generated.ts'
    ]);
  });

  it('should generate, write, and report every configured source group', () => {
    const secondSourceGroup = {
      exportName: 'SECOND_SOURCE',
      sourceDirectory: '/repo/second-source',
      outputFile: '/repo/second-output/second.generated.ts'
    };
    directories['/repo/source'] = [file('example.component.ts')];
    directories['/repo/second-source'] = [file('example.component.html')];
    fileContents['/repo/source/example.component.ts'] =
      'export class ExampleComponent {}';
    fileContents['/repo/second-source/example.component.html'] =
      '<p>Example</p>';

    createGenerator([sourceGroup, secondSourceGroup]).run();

    expect(fs.mkdirSync.calls.allArgs()).toEqual([
      ['/repo/output', { recursive: true }],
      ['/repo/second-output', { recursive: true }]
    ]);
    expect(writtenFiles.length).toBe(2);
    expect(writtenFiles[0]).toEqual({
      filePath: sourceGroup.outputFile,
      content: jasmine.stringContaining('export const TUTORIAL_SOURCE ='),
      encoding: 'utf8'
    });
    expect(writtenFiles[1]).toEqual({
      filePath: secondSourceGroup.outputFile,
      content: jasmine.stringContaining('export const SECOND_SOURCE ='),
      encoding: 'utf8'
    });
    expect(consoleInfo).toEqual([
      'Generated 1 tutorial source file(s): output/tutorial-source.generated.ts',
      'Generated 1 tutorial source file(s): second-output/second.generated.ts'
    ]);
  });
});
