import { execSync } from 'child_process';
import { existsSync, writeFileSync } from 'fs';
import path from 'node:path';

/**
 * compareFiles
 *
 * @returns A true if the files are the same. A collection of errors lines if not the same
 */

export function compareFiles(actual, expectedFilePath, srcDir) {
  const fileNameBase = expectedFilePath.replace(/\.golden.txt/g, '');
  const artifactPath = path.join(srcDir, 'artifacts', 'output-files');
  const diffFileName = path.join(artifactPath, `${fileNameBase}.diff.txt`);
  const comparisonFile = path.join(
    artifactPath,
    `${fileNameBase}.comparison.txt`
  );
  const goldenFileName = path.join(artifactPath, expectedFilePath);

  /*
  if (!existsSync(comparisonFile)) {
    throw new Error(`The "${comparisonFile}" file does not exist.`);
  }
    */

  if (!existsSync(goldenFileName)) {
    throw new Error(`The "${goldenFileName}" file does not exist.`);
  }

  writeFileSync(comparisonFile, actual, 'utf8');

  try {
    execSync(
      `/usr/bin/diff ${goldenFileName} ${comparisonFile} > ${diffFileName}`
    );
    return true;
  } catch (_) {
    console.warn('\n\n*****************************************\n\n');

    console.warn('*     You have a new golden file!       *');

    console.warn('\n\n*****************************************\n\n');
    return false;
  }
}
