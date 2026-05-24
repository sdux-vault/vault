// documentation-link-generator.spec.mjs
// Node-based Jasmine tests for documentation-link-generator.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compareFiles } from '../../../utils/testing/compare-files.helper.mjs';
import { parseFilePath } from '../../../utils/testing/parse-file-path.helper.mjs';
import { DocumentationLinkGenerator } from '../link-generator.class.mjs';
import { ARTIFACTS } from './artifacts/input-files/artifacts-file.ts.mjs';
import { NO_CHANGE_HTML } from './artifacts/input-files/no-change-file.html.mjs';
import { SOURCE_HTML } from './artifacts/input-files/source-file.html.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Minimal documentation page (HTML)
 */

describe('CLI: link-generator', () => {
  let generator;
  const readFileSync = [];
  let readFiles = [];
  const writeFileSync = [];
  const output = [];
  let infoSpy;

  beforeEach(() => {
    readFiles = ['page.html'];
    infoSpy = spyOn(console, 'info');

    readFileSync.length = 0;
    writeFileSync.length = 0;
    output.length = 0;

    // Fake filesystem
    spyOn(fs, 'readdirSync').and.callFake(() => readFiles);

    spyOn(fs, 'statSync').and.callFake(() => ({
      isDirectory: () => false
    }));

    spyOn(fs, 'readFileSync').and.callFake((filename) => {
      filename = parseFilePath(filename);
      readFileSync.push(filename);
      if (filename === 'index.json') {
        return JSON.stringify(ARTIFACTS);
      } else if (filename === 'docs/no-change.html') {
        return NO_CHANGE_HTML;
      } else {
        return SOURCE_HTML;
      }
    });
    spyOn(fs, 'writeFileSync').and.callFake((filename, data) => {
      output.push(data);
      writeFileSync.push(parseFilePath(filename));
    });
  });

  it('should link known symbols and preserve protected blocks', () => {
    generator = new DocumentationLinkGenerator({
      typeIndexPath: '/index.json',
      sourceDirs: ['/docs']
    });

    generator.run();

    expect(readFileSync)
      .withContext('readFileSync')
      .toEqual(['index.json', 'docs/page.html']);

    expect(writeFileSync)
      .withContext('writeFileSync')
      .toEqual(['docs/page.html']);

    expect(
      compareFiles(output.join('\n'), '01-link-generator.golden.txt', __dirname)
    )
      .withContext('output')
      .toBeTrue();

    expect(infoSpy).toHaveBeenCalledWith('\tLinked');
    expect(infoSpy).toHaveBeenCalledWith('✔ Documentation linking complete');
    expect(infoSpy).toHaveBeenCalledWith('Processing File: /docs/page.html');
  });

  it('should NOT rewrite file if no changes are needed', () => {
    readFiles = ['no-change.html'];
    generator = new DocumentationLinkGenerator({
      typeIndexPath: '/index.json',
      sourceDirs: ['/docs']
    });

    generator.run();

    expect(readFileSync)
      .withContext('readFileSync')
      .toEqual(['index.json', 'docs/no-change.html']);

    expect(writeFileSync).withContext('writeFileSync').toEqual([]);

    expect(output).withContext('output').toEqual([]);

    expect(infoSpy).toHaveBeenCalledWith('✔ Documentation linking complete');
  });

  it('should build symbol map sorted longest-first', () => {
    generator = new DocumentationLinkGenerator({
      typeIndexPath: '/index.json',
      sourceDirs: []
    });

    generator.loadIndex();

    expect(generator.symbols).toEqual([
      'withReplayGlobalErrorController',
      'provideFeatureCell',
      'FeatureCellConfig',
      'InsightConfig',
      'withDebounce'
    ]);
  });

  it('should safely handle empty directories', () => {
    fs.readdirSync.and.returnValue([]);

    generator = new DocumentationLinkGenerator({
      typeIndexPath: '/index.json',
      sourceDirs: ['/docs']
    });

    generator.run();

    expect(readFileSync).withContext('readFileSync').toEqual(['index.json']);

    expect(writeFileSync).withContext('writeFileSync').toEqual([]);

    expect(output).withContext('output').toEqual([]);

    expect(infoSpy).toHaveBeenCalledWith('✔ Documentation linking complete');
  });
});
