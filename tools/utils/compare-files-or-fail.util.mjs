import fs from 'fs';

/**
 * Compares two files and throws if any diff exists.
 *
 * - Reads both files
 * - Produces a unified diff style output
 * - Logs the diff (original first, then new)
 * - Throws an error to stop the script
 *
 * @param {string} originalPath - Path to the original file
 * @param {string} newPath - Path to the newly generated file
 */
export const compareFilesOrFail = {
  compare: (originalPath, newPath) => {
    if (!fs.existsSync(originalPath)) {
      throw new Error(`Original file not found: ${originalPath}`);
    }

    if (!fs.existsSync(newPath)) {
      throw new Error(`New file not found: ${newPath}`);
    }

    const original = fs.readFileSync(originalPath, 'utf8');
    const generated = fs.readFileSync(newPath, 'utf8');

    if (original === generated) {
      // No diff — success
      return;
    }

    // Produce unified diff output
    const diff = createUnifiedDiff(original, generated, originalPath, newPath);

    console.error('❌ Output mismatch detected!\n');
    console.error(diff);

    throw new Error(
      'Generated file does not match the original. See diff above.'
    );
  }
};

/**
 * Generates a unified diff (no dependencies).
 */
function createUnifiedDiff(a, b, aLabel = 'original', bLabel = 'new') {
  const aLines = a.split('\n');
  const bLines = b.split('\n');

  let diffOutput = `--- ${aLabel}\n+++ ${bLabel}\n`;

  const max = Math.max(aLines.length, bLines.length);

  for (let i = 0; i < max; i++) {
    const left = aLines[i];
    const right = bLines[i];

    if (left === right) continue;

    if (left !== undefined) diffOutput += `- ${left}\n`;
    if (right !== undefined) diffOutput += `+ ${right}\n`;
  }

  return diffOutput;
}
