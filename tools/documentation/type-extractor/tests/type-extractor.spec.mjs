// example-generator.spec.js
// Node-based Jasmine tests for example-generator.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compareFilesOrFail } from '../../../utils/compare-files-or-fail.util.mjs';
import { compareFiles } from '../../../utils/testing/compare-files.helper.mjs';
import { parseFilePath } from '../../../utils/testing/parse-file-path.helper.mjs';
import { TypeExtractor } from '../type-extractor.class.mjs';
import { COMPONENT } from './artifacts/input-files/component.ts.mjs';
import { PUBLIC_APIS } from './artifacts/input-files/public-api.ts.mjs';
import { SERVICE } from './artifacts/input-files/service.ts.mjs';
import { TYPES } from './artifacts/input-files/types.ts.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('CLI: type-extractor.mjs', () => {
  let typeExtractor;
  let filesExist = [];
  let directories = [];
  let stats = [];
  const statSync = [];
  const existsSync = [];
  const readFileSync = [];
  const writeFileSync = [];
  const output = [];
  const readdirSync = [];
  let warnSpy;

  let INDEX_JOBS = [];

  beforeEach(() => {
    spyOn(Date.prototype, 'toLocaleString').and.returnValue(
      '11/25/2025, 8:33:29 PM'
    );
    warnSpy = spyOn(console, 'warn');
    existsSync.length = 0;
    readFileSync.length = 0;
    readdirSync.length = 0;
    writeFileSync.length = 0;
    statSync.length = 0;
    output.length = 0;

    INDEX_JOBS = Object({
      projects: [
        {
          name: 'core',
          srcDir: '../projects/core/src/lib',
          publicApis: ['public-api.ts']
        }
      ],
      outputFile: './a-custom-file.json'
    });

    spyOn(compareFilesOrFail, 'compare').and.returnValue();

    spyOn(fs, 'readFileSync').and.callFake((filename) => {
      filename = parseFilePath(filename);
      readFileSync.push(filename);

      if (filename.match('dir_one_file_one.ts')) {
        return COMPONENT;
      } else if (filename.match('dir_one_file_two.ts')) {
        return SERVICE;
      } else if (filename.match('file_three.ts')) {
        return TYPES;
      } else if (filename.match('public-api.ts')) {
        return PUBLIC_APIS;
      }
    });
    spyOn(fs, 'statSync').and.callFake((filename) => {
      statSync.push(parseFilePath(filename));
      return stats.shift();
    });
    spyOn(fs, 'readdirSync').and.callFake((filename) => {
      readdirSync.push(parseFilePath(filename));
      return directories.shift();
    });
    spyOn(fs, 'writeFileSync').and.callFake((filename, data) => {
      output.push(data);
      writeFileSync.push(parseFilePath(filename));
    });
    spyOn(fs, 'existsSync').and.callFake((filename) => {
      existsSync.push(parseFilePath(filename));
      return filesExist.shift();
    });
  });

  it('should run the type extract CLI and build an example', () => {
    filesExist = [
      true,
      true,
      // interceptors/index.ts
      false,
      // interceptors/index/index.ts (barrel fallback)
      false,
      // pipeline-upstream-value.type.ts
      true,
      //with-object-shallow-merge.behavior.ts
      true,
      // behavior.type.ts
      true,
      // behavior.type.ts
      true
    ];
    stats = [
      // dir_one
      Object({
        isDirectory: () => true,
        isFile: () => false
      }),
      // dir_one_file_one
      Object({
        isDirectory: () => false,
        isFile: () => true
      }),
      // dir_one_file_two
      Object({
        isDirectory: () => false,
        isFile: () => true
      }),
      // dir_one_file_.
      Object({
        isDirectory: () => false,
        isFile: () => false
      }),
      // dire_two
      Object({
        isDirectory: () => true,
        isFile: () => false
      }),
      // file_three
      Object({
        isDirectory: () => false,
        isFile: () => true
      }),
      // dir_one_file_four
      Object({
        isDirectory: () => false,
        isFile: () => true
      }),
      // dir_one_file_five
      // not in public_apis
      Object({
        isDirectory: () => false,
        isFile: () => true
      })
    ];
    directories = [
      [
        'dir_one',
        'dir_two',
        'file_three.ts',
        'file_four.spec.ts',
        'file_five.ts'
      ],
      ['dir_one_file_one.ts', 'dir_one_file_two.ts', '.'],
      []
    ];
    typeExtractor = new TypeExtractor(INDEX_JOBS, 'the-dir');
    typeExtractor.run();

    expect(existsSync)
      .withContext('existsSync')
      .toEqual([
        'src/lib',
        'lib/public-api.ts',
        'interceptors/index.ts',
        'index/index.ts',
        'types/dir_one_file_one.ts',
        'object/dir_one_file_two.ts',
        'types/file_three.ts',
        'types/behavior.type.ts'
      ]);

    expect(readFileSync)
      .withContext('readFileSync')
      .toEqual([
        'lib/public-api.ts',
        'dir_one/dir_one_file_one.ts',
        'dir_one/dir_one_file_two.ts',
        'lib/file_three.ts'
      ]);

    expect(writeFileSync)
      .withContext('writeFileSync')
      .toEqual(['./a-custom-file.diff.json']);

    expect(statSync)
      .withContext('statSync')
      .toEqual([
        'lib/dir_one',
        'dir_one/dir_one_file_one.ts',
        'dir_one/dir_one_file_two.ts',
        'lib/dir_one',
        'lib/dir_two',
        'lib/file_three.ts',
        'lib/file_four.spec.ts',
        'lib/file_five.ts'
      ]);
    expect(readdirSync)
      .withContext('readdirSync')
      .toEqual(['src/lib', 'lib/dir_one', 'lib/dir_two']);

    expect(compareFiles(output[0], '01-type-extractor.golden.txt', __dirname))
      .withContext('output')
      .toBeTrue();

    expect(warnSpy).toHaveBeenCalledTimes(4);
    expect(warnSpy).toHaveBeenCalledWith('These files were not included:');
    expect(warnSpy).toHaveBeenCalledWith('\tfile_five.ts');
    expect(warnSpy).toHaveBeenCalledWith('Extracted 33 symbols');
    expect(warnSpy).toHaveBeenCalledWith(
      'Output written to ./a-custom-file.diff.json'
    );
  });

  describe('error', () => {
    it('should warn when no files exist', async () => {
      filesExist = [false, true];
      delete INDEX_JOBS.outputFile;
      typeExtractor = new TypeExtractor(INDEX_JOBS, 'the-dir');

      expect(() => typeExtractor.run()).toThrowError(
        'Project core: directory not found → ../projects/core/src/lib'
      );
    });

    it('should throw without a public api parameter', async () => {
      filesExist = [true];
      delete INDEX_JOBS.projects[0].publicApis;
      typeExtractor = new TypeExtractor(INDEX_JOBS, 'the-dir');

      expect(() => typeExtractor.run()).toThrowError(
        'No public api parameter supplied for "core"'
      );
    });

    it('should throw without a public api file', async () => {
      filesExist = [true, false];
      typeExtractor = new TypeExtractor(INDEX_JOBS, 'the-dir');

      expect(() => typeExtractor.run()).toThrowError(
        'Project "core" Public API file not found: "../projects/core/src/lib/public-api.ts"'
      );
    });
  });
});
