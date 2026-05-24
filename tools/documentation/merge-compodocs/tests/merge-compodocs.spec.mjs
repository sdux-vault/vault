import fs from 'node:fs';
import { CompodocMerger } from '../merge-compodocs.class.mjs';
import { PRIMARY_DOC } from './artifacts/primary-doc.mjs';
import { SECONDARY_DOC } from './artifacts/secondary-doc.mjs';

describe('CLI: merge-compodocs', () => {
  let merger;

  beforeEach(() => {
    spyOn(fs, 'readFileSync').and.callFake((filePath) => {
      if (filePath.includes('primary')) {
        return JSON.stringify(PRIMARY_DOC);
      }
      return JSON.stringify(SECONDARY_DOC);
    });
    spyOn(fs, 'writeFileSync');

    merger = new CompodocMerger({
      primaryPath: '/primary.json',
      secondaryPath: '/secondary.json',
      outputPath: '/merged.json'
    });
  });

  it('should concatenate top-level array keys', () => {
    const result = merger.merge(PRIMARY_DOC, SECONDARY_DOC);

    expect(result.classes.length)
      .withContext('classes')
      .toBe(PRIMARY_DOC.classes.length + SECONDARY_DOC.classes.length);

    expect(result.interfaces.length)
      .withContext('interfaces')
      .toBe(PRIMARY_DOC.interfaces.length + SECONDARY_DOC.interfaces.length);

    expect(result.components.length)
      .withContext('components')
      .toBe(PRIMARY_DOC.components.length + SECONDARY_DOC.components.length);

    expect(result.injectables.length)
      .withContext('injectables')
      .toBe(PRIMARY_DOC.injectables.length + SECONDARY_DOC.injectables.length);

    expect(result.pipes).withContext('pipes').toEqual([]);
    expect(result.guards).withContext('guards').toEqual([]);
    expect(result.interceptors).withContext('interceptors').toEqual([]);
    expect(result.directives).withContext('directives').toEqual([]);
    expect(result.modules.length)
      .withContext('modules')
      .toBe(PRIMARY_DOC.modules.length + SECONDARY_DOC.modules.length);
  });

  it('should preserve primary entries before secondary entries', () => {
    const result = merger.merge(PRIMARY_DOC, SECONDARY_DOC);

    expect(result.classes[0].name)
      .withContext('first class from primary')
      .toBe('AbstractActiveController');

    expect(result.classes[1].name)
      .withContext('second class from secondary')
      .toBe('Conductor');
  });

  it('should merge miscellaneous sub-arrays', () => {
    const result = merger.merge(PRIMARY_DOC, SECONDARY_DOC);
    const misc = result.miscellaneous;

    expect(misc.variables.length)
      .withContext('variables')
      .toBe(
        PRIMARY_DOC.miscellaneous.variables.length +
          SECONDARY_DOC.miscellaneous.variables.length
      );

    expect(misc.functions.length)
      .withContext('functions')
      .toBe(
        PRIMARY_DOC.miscellaneous.functions.length +
          SECONDARY_DOC.miscellaneous.functions.length
      );

    expect(misc.typealiases.length)
      .withContext('typealiases')
      .toBe(
        PRIMARY_DOC.miscellaneous.typealiases.length +
          SECONDARY_DOC.miscellaneous.typealiases.length
      );

    expect(misc.enumerations).withContext('enumerations').toEqual([]);
  });

  it('should merge groupedVariables by file path key', () => {
    const result = merger.merge(PRIMARY_DOC, SECONDARY_DOC);
    const gv = result.miscellaneous.groupedVariables;

    expect(Object.keys(gv).length)
      .withContext('groupedVariables key count')
      .toBe(2);

    expect(gv['libs/core/src/lib/provide-feature-cell.ts'])
      .withContext('primary grouped variable')
      .toBeDefined();

    expect(gv['lib/src/constants/defaults.ts'])
      .withContext('secondary grouped variable')
      .toBeDefined();
  });

  it('should keep primary routes and coverage', () => {
    const result = merger.merge(PRIMARY_DOC, SECONDARY_DOC);

    expect(result.routes)
      .withContext('routes from primary')
      .toEqual(PRIMARY_DOC.routes);

    expect(result.coverage)
      .withContext('coverage from primary')
      .toEqual(PRIMARY_DOC.coverage);
  });

  it('should handle missing miscellaneous gracefully', () => {
    const sparse = { classes: [{ name: 'Bare' }] };
    const result = merger.merge(PRIMARY_DOC, sparse);

    expect(result.classes.length).toBe(PRIMARY_DOC.classes.length + 1);
    expect(result.miscellaneous.variables.length).toBe(
      PRIMARY_DOC.miscellaneous.variables.length
    );
    expect(result.miscellaneous.groupedVariables).toEqual(
      PRIMARY_DOC.miscellaneous.groupedVariables
    );
  });

  it('should write merged output via run()', () => {
    const infoSpy = spyOn(console, 'info');

    merger.run();

    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);

    const [outputPath, jsonString] = fs.writeFileSync.calls.argsFor(0);
    expect(outputPath).toBe('/merged.json');

    const written = JSON.parse(jsonString);
    expect(written.classes.length).toBe(2);
    expect(written.interfaces.length).toBe(3);

    expect(infoSpy).toHaveBeenCalledWith('✔ Compodoc merge complete');
  });
});
