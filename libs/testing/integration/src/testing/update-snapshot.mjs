#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import process from 'process';
import { VAULT_NOOP } from '@sdux-vault/shared';

export class SnapshotGenerator {
  static START = 'SNAPSHOT_UPDATE_PAYLOAD_START::';
  static END = '::SNAPSHOT_UPDATE_PAYLOAD_END';

  constructor(logFilePath) {
    if (!logFilePath) {
      throw new Error('SnapshotGenerator requires a log file path');
    }

    this.logFilePath = logFilePath;
    this.rawLog = '';
    this.snapshots = [];
  }

  run() {
    this.readLog();
    this.extractSnapshots();
    this.writeSnapshots();
  }

  readLog() {
    this.rawLog = fs.readFileSync(this.logFilePath, 'utf8');
  }

  extractSnapshots() {
    const startIdx = this.rawLog.indexOf(SnapshotGenerator.START);
    const endIdx = this.rawLog.indexOf(SnapshotGenerator.END);

    if (startIdx === -1 || endIdx === -1) {
      throw new Error('Snapshot payload markers not found in log');
    }

    let payload = this.rawLog
      .slice(startIdx + SnapshotGenerator.START.length, endIdx)
      .trim();

    // Karma logs JSON as a string argument → strip quotes
    if (payload.startsWith("'") && payload.endsWith("'")) {
      payload = payload.slice(1, -1);
    }

    this.snapshots = JSON.parse(payload);
  }

  writeSnapshots() {
    for (const entry of this.snapshots) {
      this.writeSingleSnapshot(entry);
    }
  }

  writeSingleSnapshot(entry) {
    const { testName, fileName, snapshot } = entry;

    if (!fileName || !snapshot) return;

    const outputPath = this.convertSpecToSnapshotPath(fileName);
    const exportName = this.exportNameFromFileName(fileName);

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    const content = this.buildSnapshotFile(exportName, snapshot);

    fs.writeFileSync(outputPath, content, 'utf8');

    console.info(`✔ wrote ${outputPath}`);
  }

  convertSpecToSnapshotPath(fileUrl) {
    // Remove Karma base prefix
    const withoutBase = fileUrl.replace(/^http:\/\/localhost:\d+\/base\//, '');

    const parsed = path.parse(withoutBase);

    const snapshotDir = path.join(parsed.dir, 'snap-shots');

    const snapshotFile = parsed.name.replace(/\.spec$/, '') + '.snapshot.ts';

    return path.join(snapshotDir, snapshotFile);
  }

  exportNameFromFileName(fileName) {
    const baseName = fileName
      .replace(/^.*\/base\//, '')
      .split('/')
      .pop();
    if (!baseName) throw new Error(`Invalid fileName: ${fileName}`);
    return `${baseName.split('-')[0]}Snapshot`;
  }

  buildSnapshotFile(exportName, snapshot) {
    const UNDEFINED_SENTINEL = '"__UNDEFINED__"';
    const json = JSON.stringify(
      snapshot,
      (key, value) => {
        return key === 'candidate' && value === undefined
          ? '__UNDEFINED__'
          : value;
      },
      2
    );
    return `// AUTO-GENERATED – DO NOT EDIT
export const ${exportName} = ${restored};
`;
  }
}

/* -----------------------------------------------------
 * Auto-run when executed directly
 * --------------------------------------------------- */
const isMain = true;
// const isMain = process.argv[1] === url.fileURLToPath(import.meta.url);

if (isMain) {
  const logFile = 'libs/testing/integration/src/testing/snapshot-output.log';

  if (!logFile) {
    console.error('Usage: node snapshot-generator.mjs <snapshot-output.log>');
    process.exit(1);
  }

  try {
    new SnapshotGenerator(logFile).run();
    execSync('npm run format:all', { stdio: 'inherit' });
  } catch (err) {
    console.error('Snapshot generation failed:\n', err);
    process.exit(1);
  }
}
