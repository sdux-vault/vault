// example-generator.spec.js
// Node-based Jasmine tests for example-generator.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compareFiles } from '../../../utils/testing/compare-files.helper.mjs';
import { parseFilePath } from '../../../utils/testing/parse-file-path.helper.mjs';
import { SearchIndexGenerator } from '../search-index-genenerator.class.mjs';
import { ARTIFACTS } from './artifacts/input-files/artifact-file.ts.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('CLI: search-index-generator.mjs', () => {
  let searchIndex;
  let filesExist = [];
  let directories = [];
  const existsSync = [];
  const readFileSync = [];
  const writeFileSync = [];
  const output = [];
  let warnSpy;

  beforeEach(() => {
    spyOn(Date.prototype, 'toLocaleString').and.returnValue(
      '11/25/2025, 8:33:29 PM'
    );
    warnSpy = spyOn(console, 'warn');
    existsSync.length = 0;
    readFileSync.length = 0;
    writeFileSync.length = 0;
    output.length = 0;

    spyOn(fs, 'readFileSync').and.callFake((filename) => {
      filename = parseFilePath(filename);
      readFileSync.push(filename);

      return JSON.stringify(ARTIFACTS);
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
    filesExist = [true];
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
    searchIndex = new SearchIndexGenerator('the-index', 'the-output');
    searchIndex.run();

    expect(existsSync).withContext('existsSync').toEqual(['the-index']);

    expect(readFileSync).withContext('readFileSync').toEqual(['the-index']);

    expect(writeFileSync).withContext('writeFileSync').toEqual(['the-output']);

    expect(compareFiles(output[0], '01-search-index.golden.txt', __dirname))
      .withContext('output')
      .toBeTrue();

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      'Search index written to "the-output"'
    );
  });

  describe('error', () => {
    it('should warn when no files exist', async () => {
      filesExist = [false];
      searchIndex = new SearchIndexGenerator('the-index', 'the-output');

      expect(() => searchIndex.run()).toThrowError(
        'Type index file not found: "the-index".'
      );
    });
  });
});
