import fs from 'node:fs';

/**
 * Top-level Compodoc keys whose values are arrays of symbol objects.
 */
const ARRAY_KEYS = [
  'pipes',
  'interfaces',
  'injectables',
  'guards',
  'interceptors',
  'classes',
  'directives',
  'components',
  'modules'
];

/**
 * Sub-keys inside the `miscellaneous` object whose values are arrays.
 */
const MISC_ARRAY_KEYS = [
  'variables',
  'functions',
  'typealiases',
  'enumerations'
];

export class CompodocMerger {
  #primaryPath;
  #secondaryPath;
  #outputPath;

  /**
   * @param {{ primaryPath: string, secondaryPath: string, outputPath: string }} options
   */
  constructor({ primaryPath, secondaryPath, outputPath }) {
    this.#primaryPath = primaryPath;
    this.#secondaryPath = secondaryPath;
    this.#outputPath = outputPath;
  }

  run() {
    const primary = this.#readJson(this.#primaryPath);
    const secondary = this.#readJson(this.#secondaryPath);
    const merged = this.merge(primary, secondary);

    fs.writeFileSync(this.#outputPath, JSON.stringify(merged, null, 2));
    console.info('✔ Compodoc merge complete');
  }

  /**
   * Merges two Compodoc documentation.json structures.
   *
   * @param {object} primary - The primary (state) Compodoc output.
   * @param {object} secondary - The secondary (engine) Compodoc output.
   * @returns {object} The merged documentation object.
   */
  merge(primary, secondary) {
    const merged = {};

    for (const key of ARRAY_KEYS) {
      merged[key] = [...(primary[key] ?? []), ...(secondary[key] ?? [])];
    }

    merged.miscellaneous = {};
    for (const key of MISC_ARRAY_KEYS) {
      merged.miscellaneous[key] = [
        ...(primary.miscellaneous?.[key] ?? []),
        ...(secondary.miscellaneous?.[key] ?? [])
      ];
    }

    merged.miscellaneous.groupedVariables = {
      ...(primary.miscellaneous?.groupedVariables ?? {}),
      ...(secondary.miscellaneous?.groupedVariables ?? {})
    };

    merged.routes = primary.routes;
    merged.coverage = primary.coverage;

    return merged;
  }

  #readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
}
