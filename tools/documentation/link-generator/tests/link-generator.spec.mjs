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
import { SOURCE_TS } from './artifacts/input-files/source-file.ts.mjs';

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
      } else if (filename === 'docs/page.ts') {
        return SOURCE_TS;
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

  it('should preserve Angular example-viewer bindings inside TypeScript template literals', () => {
    readFiles = ['page.ts'];
    generator = new DocumentationLinkGenerator({
      typeIndexPath: '/index.json',
      sourceDirs: ['/docs']
    });

    generator.run();

    expect(readFileSync)
      .withContext('readFileSync')
      .toEqual(['index.json', 'docs/page.ts']);

    expect(writeFileSync).withContext('writeFileSync').toEqual([]);

    expect(output).withContext('output').toEqual([]);

    expect(generator.linkContent(SOURCE_TS))
      .withContext('linkContent')
      .toEqual(SOURCE_TS);

    expect(infoSpy).toHaveBeenCalledWith('\tIgnored');
    expect(infoSpy).toHaveBeenCalledWith('✔ Documentation linking complete');
    expect(infoSpy).toHaveBeenCalledWith('Processing File: /docs/page.ts');
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
      'withDebounce',
      'state'
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

  it('should exclude configured directories from link mapping', () => {
    readFiles = ['included.html', 'excluded'];
    fs.readdirSync.and.callFake((directory) => {
      if (directory === '/docs') return ['included.html', 'excluded'];
      if (directory === '/docs/excluded') return ['excluded.html'];
      return [];
    });
    fs.statSync.and.callFake((filename) => ({
      isDirectory: () => filename === '/docs/excluded'
    }));

    generator = new DocumentationLinkGenerator({
      typeIndexPath: '/index.json',
      sourceDirs: ['/docs'],
      excludeDirs: ['/docs/excluded']
    });

    generator.run();

    expect(readFileSync).toEqual(['index.json', 'docs/included.html']);
    expect(writeFileSync).toEqual(['docs/included.html']);
    expect(infoSpy).not.toHaveBeenCalledWith(
      'Processing File: /docs/excluded/excluded.html'
    );
  });

  it('should skip a source directory when it is excluded', () => {
    generator = new DocumentationLinkGenerator({
      typeIndexPath: '/index.json',
      sourceDirs: ['/docs'],
      excludeDirs: ['/docs']
    });

    generator.run();

    expect(readFileSync).toEqual(['index.json']);
    expect(writeFileSync).toEqual([]);
  });
});
