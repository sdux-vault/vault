#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// ---------------------------------------------
// 🧩 CONFIG: Define your domains here
// ---------------------------------------------
const DOMAINS = [
  { name: 'core-engine', dir: 'libs/core' },
  { name: 'addons', dir: 'libs/addons' },
  { name: 'shared', dir: 'libs/shared' },
  { name: 'testing', dir: 'libs/testing' }
];

// ---------------------------------------------
// File type classification (easy to extend)
// ---------------------------------------------
function classifyFile(filePath) {
  const lower = filePath.toLowerCase();

  switch (true) {
    case lower.endsWith('.shape.ts'):
      return 'shape';

    case lower.endsWith('.type.ts'):
    case lower.endsWith('.types.ts'):
      return 'type';

    case lower.endsWith('.interface.ts'):
      return 'interface';

    case lower.endsWith('.model.ts'):
      return 'model';

    case lower.endsWith('.constant.ts'):
    case lower.endsWith('.constants.ts'):
      return 'constant';

    case lower.endsWith('.enum.ts'):
      return 'enum';

    default:
      return 'source';
  }
}

// ---------------------------------------------
// Meter infoic
// ---------------------------------------------
function getTypeMeter(type, count) {
  switch (type) {
    case 'source':
      return count > 80 ? 'HIGH' : count > 40 ? 'MEDIUM' : 'LOW';

    case 'shape':
    case 'type':
    case 'interface':
      return count > 100 ? 'HIGH' : count > 50 ? 'MEDIUM' : 'LOW';

    case 'model':
      return count > 60 ? 'HIGH' : count > 30 ? 'MEDIUM' : 'LOW';

    case 'constant':
    case 'enum':
      return count > 150 ? 'HIGH' : count > 80 ? 'MEDIUM' : 'LOW';

    default:
      return count > 100 ? 'HIGH' : count > 50 ? 'MEDIUM' : 'LOW';
  }
}

function getOverallMeter(total) {
  if (total > 150) return 'HIGH';
  if (total > 75) return 'MEDIUM';
  return 'LOW';
}

// ---------------------------------------------
// Copy infoic
// ---------------------------------------------
function copyTsFiles(srcDir, outDir, statsMap) {
  if (!fs.existsSync(srcDir)) return;

  const stats = fs.statSync(srcDir);

  if (stats.isDirectory()) {
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    const entries = fs.readdirSync(srcDir);

    for (const entry of entries) {
      copyTsFiles(path.join(srcDir, entry), path.join(outDir, entry), statsMap);
    }
  } else if (stats.isFile()) {
    if (srcDir.endsWith('.ts') && !srcDir.endsWith('.spec.ts')) {
      const type = classifyFile(srcDir);
      statsMap[type] = (statsMap[type] || 0) + 1;

      fs.copyFileSync(srcDir, outDir);
    }
  }
}

// ---------------------------------------------
// Zip helper
// ---------------------------------------------
function zipDirectory(sourceDir, outPath) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.info(`📦 Zipped: ${outPath} (${archive.pointer()} bytes)`);
      resolve();
    });

    archive.on('error', reject);

    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize();
  });
}

// ---------------------------------------------
// MAIN
// ---------------------------------------------
async function main() {
  const [, , srcRoot, outRoot] = process.argv;

  if (!srcRoot || !outRoot) {
    console.error('Usage: node script.js <srcRoot> <outRoot>');
    process.exit(1);
  }

  const resolvedSrc = path.resolve(srcRoot);
  const resolvedOut = path.resolve(outRoot);

  if (!fs.existsSync(resolvedOut)) {
    fs.mkdirSync(resolvedOut, { recursive: true });
  }

  console.info('\n🚀 Processing Domains...\n');

  for (const domain of DOMAINS) {
    const srcDir = path.join(resolvedSrc, domain.dir);
    const outDir = path.join(resolvedOut, domain.name);

    const statsMap = {};

    console.info(`\n📦 Domain: ${domain.name}`);

    copyTsFiles(srcDir, outDir, statsMap);

    // ---- Stats ----
    let total = 0;

    console.info('\n📊 File Types:');

    for (const [type, count] of Object.entries(statsMap)) {
      const meter = getTypeMeter(type, count);
      total += count;

      console.info(
        `  ${type.padEnd(12)} : ${String(count).padStart(4)} → ${meter}`
      );
    }

    const overall = getOverallMeter(total);

    console.info(`\n  TOTAL FILES : ${total}`);
    console.info(`  AI LOAD     : ${overall}`);

    // ---- Zip ----
    const zipPath = path.join(resolvedOut, `${domain.name}.zip`);
    await zipDirectory(outDir, zipPath);
  }

  console.info('\n✅ All domains processed and archived.\n');
}

main();
