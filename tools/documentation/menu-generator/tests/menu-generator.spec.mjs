// example-generator.spec.js
// Node-based Jasmine tests for example-generator.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compareFiles } from '../../../utils/testing/compare-files.helper.mjs';
import { parseFilePath } from '../../../utils/testing/parse-file-path.helper.mjs';
import { MenuGenerator } from '../menu-generator.class.mjs';
import { ARTIFACTS } from './artifacts/input-files/artifact-file.ts.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('CLI: menu-generator.mjs', () => {
  let menuGenerator;
  let filesExist = [];
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

  it('should run the menu generator CLI and build an example', () => {
    filesExist = [true];

    menuGenerator = new MenuGenerator(
      'artifact-file',
      'output-dir',
      'barrel-file',
      'ts-file'
    );
    menuGenerator.run();

    expect(existsSync).withContext('existsSync').toEqual(['artifact-file']);

    expect(readFileSync).withContext('readFileSync').toEqual(['artifact-file']);

    expect(writeFileSync)
      .withContext('writeFileSync')
      .toEqual([
        'output-dir',
        'classes/references-classes.component.html',
        'classes/references-classes.component.ts',
        'shapes/references-shapes.component.html',
        'shapes/references-shapes.component.ts'
      ]);

    expect(compareFiles(output[0], '01-menu.golden.txt', __dirname))
      .withContext('output - menu')
      .toBeTrue();

    expect(compareFiles(output[1], '20-barrel-classes.golden.txt', __dirname))
      .withContext('output - barrel - classes')
      .toBeTrue();

    expect(
      compareFiles(output[2], '21-component-classes.golden.txt', __dirname)
    )
      .withContext('output - component - classes')
      .toBeTrue();

    expect(
      compareFiles(output[3], '30-barrel-interfaces.golden.txt', __dirname)
    )
      .withContext('output - barrel - classes')
      .toBeTrue();

    expect(
      compareFiles(output[4], '31-component-interfaces.golden.txt', __dirname)
    )
      .withContext('output - component - interfaces')
      .toBeTrue();

    expect(warnSpy).toHaveBeenCalledTimes(7);
    expect(warnSpy).toHaveBeenCalledWith('Loading index from: artifact-file');
    expect(warnSpy).toHaveBeenCalledWith('Generated HTML menu: output-dir');

    expect(warnSpy).toHaveBeenCalledWith(
      'Generated HTML barrel page: barrel-file/classes/references-classes.component.html'
    );
    expect(warnSpy).toHaveBeenCalledWith(
      'Generated ReferencesComponent: ts-file/classes/references-classes.component.ts'
    );

    expect(warnSpy).toHaveBeenCalledWith(
      'Generated HTML barrel page: barrel-file/shapes/references-shapes.component.html'
    );
    expect(warnSpy).toHaveBeenCalledWith(
      'Generated ReferencesComponent: ts-file/shapes/references-shapes.component.ts'
    );
    expect(warnSpy).toHaveBeenCalledWith('Menu generation complete.');
  });
});
