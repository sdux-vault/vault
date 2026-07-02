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

  const MOCK_COMPODOCS = {
    classes: [],
    injectables: [],
    interfaces: [],
    components: [
      {
        name: 'ValueResolveExampleComponent',
        rawdescription:
          'Defines configuration options that control state cache behavior.'
      }
    ],
    modules: [],
    pipes: [],
    directives: [],
    miscellaneous: {
      functions: [
        {
          name: 'withAes256EncryptBehavior',
          rawdescription:
            'Encrypts persisted state snapshots using AES-256 encryption with authenticated key derivation and integrity verification at every pipeline boundary.'
        }
      ],
      variables: [],
      enumerations: [],
      typealiases: []
    }
  };

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

      if (filename === 'the-compodocs') {
        return JSON.stringify(MOCK_COMPODOCS);
      }

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

  it('should load compodoc descriptions when compodocsPath is provided', () => {
    filesExist = [true, true];
    searchIndex = new SearchIndexGenerator(
      'the-index',
      'the-output',
      'the-compodocs'
    );
    searchIndex.run();

    expect(existsSync)
      .withContext('existsSync')
      .toEqual(['the-index', 'the-compodocs']);

    expect(readFileSync)
      .withContext('readFileSync')
      .toEqual(['the-index', 'the-compodocs']);
  });

  it('should skip compodoc loading when compodocsPath is not provided', () => {
    filesExist = [true];
    searchIndex = new SearchIndexGenerator('the-index', 'the-output');
    searchIndex.run();

    expect(readFileSync).withContext('readFileSync').toEqual(['the-index']);
  });

  it('should skip compodoc loading when compodocs file does not exist', () => {
    filesExist = [true, false];
    searchIndex = new SearchIndexGenerator(
      'the-index',
      'the-output',
      'missing-compodocs'
    );
    searchIndex.run();

    expect(readFileSync).withContext('readFileSync').toEqual(['the-index']);
  });

  describe('description integration', () => {
    it('should populate description from compodocs when match exists', () => {
      filesExist = [true, true];
      searchIndex = new SearchIndexGenerator(
        'the-index',
        'the-output',
        'the-compodocs'
      );
      searchIndex.run();

      const result = JSON.parse(output[0]);
      const component = result.documents.find(
        (d) => d.title === 'ValueResolveExampleComponent'
      );
      expect(component.description).toBe(
        'Defines configuration options that control state cache behavior.'
      );
    });

    it('should truncate descriptions longer than 80 characters', () => {
      filesExist = [true, true];
      searchIndex = new SearchIndexGenerator(
        'the-index',
        'the-output',
        'the-compodocs'
      );
      searchIndex.run();

      const result = JSON.parse(output[0]);
      const behavior = result.documents.find(
        (d) => d.title === 'withAes256EncryptBehavior'
      );
      expect(behavior.description.length).toBeLessThanOrEqual(80);
      expect(behavior.description).toContain('...');
    });

    it('should return empty string when no compodoc description exists', () => {
      filesExist = [true, true];
      searchIndex = new SearchIndexGenerator(
        'the-index',
        'the-output',
        'the-compodocs'
      );
      searchIndex.run();

      const result = JSON.parse(output[0]);
      const noDesc = result.documents.find(
        (d) => d.title === 'BankEmployeeModel'
      );
      expect(noDesc.description).toBe('');
    });
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
