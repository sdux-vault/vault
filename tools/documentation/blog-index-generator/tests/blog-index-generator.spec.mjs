import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compareFiles } from '../../../utils/testing/compare-files.helper.mjs';
import { parseFilePath } from '../../../utils/testing/parse-file-path.helper.mjs';
import { BlogIndexGenerator } from '../blog-index-generator.class.mjs';
import {
  MOCK_ROUTES_CONTENT,
  MOCK_WELCOME_TS,
  MOCK_PIPELINE_TS
} from './artifacts/input-files/artifact-file.ts.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('CLI: blog-index-generator.mjs', () => {
  let generator;
  let filesExist = [];
  const existsSync = [];
  const readFileSync = [];
  const writeFileSync = [];
  const output = [];
  let warnSpy;

  beforeEach(() => {
    warnSpy = spyOn(console, 'warn');
    existsSync.length = 0;
    readFileSync.length = 0;
    writeFileSync.length = 0;
    output.length = 0;

    spyOn(fs, 'readFileSync').and.callFake((filename) => {
      filename = parseFilePath(filename);
      readFileSync.push(filename);

      if (filename === 'the-routes') {
        return MOCK_ROUTES_CONTENT;
      }
      if (filename.includes('welcome')) {
        return MOCK_WELCOME_TS;
      }
      if (filename.includes('pipeline-anatomy')) {
        return MOCK_PIPELINE_TS;
      }
      return '';
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

  it('should parse routes and build blog search index', () => {
    filesExist = [true, true, true];
    generator = new BlogIndexGenerator('the-routes', 'the-posts', 'the-output');
    generator.run();

    expect(writeFileSync).withContext('writeFileSync').toEqual(['the-output']);

    expect(compareFiles(output[0], '01-blog-index.golden.txt', __dirname))
      .withContext('output')
      .toBeTrue();

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      'Blog search index written to "the-output"'
    );
  });

  it('should handle missing template gracefully', () => {
    filesExist = [true, false, false];
    generator = new BlogIndexGenerator('the-routes', 'the-posts', 'the-output');
    generator.run();

    const result = JSON.parse(output[0]);
    expect(result.documents.length).toBe(2);
    expect(result.documents[0].title).toBe('welcome');
    expect(result.documents[1].title).toBe('pipeline anatomy');
  });

  describe('error', () => {
    it('should throw when routes file does not exist', () => {
      filesExist = [false];
      generator = new BlogIndexGenerator(
        'the-routes',
        'the-posts',
        'the-output'
      );

      expect(() => generator.run()).toThrowError(
        'Blog routes file not found: "the-routes".'
      );
    });
  });
});
