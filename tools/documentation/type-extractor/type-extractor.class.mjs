#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { compareFilesOrFail } from '../../utils/compare-files-or-fail.util.mjs';

/**
 * TypeExtractor
 * -------------
 * Scans project source directories, extracts symbols (class, interface, type, enum, etc.)
 * and outputs a master JSON index file used by the documentation tools.
 */
export class TypeExtractor {
  constructor(config, projectRoot, engineRoot) {
    this.projectRoot = projectRoot;
    this.engineRoot = engineRoot;
    this.projects = config.projects || [];
    this.originalOutputFile = config.outputFile;
    this.outputFile = this.buildOutputFile(config.outputFile);
    this.filesNotIncluded = [];
    this.reExports = [];
  }

  buildOutputFile(file) {
    const raw = file || 'type-index.json';
    const base = raw.replace(/\.json$/i, '');

    return `${base}.diff.json`;
  }

  /**
   * Recursively walk directories for .ts files (excluding .spec.ts)
   */
  walkDir(dir, fileList = [], allowedFiles) {
    const files = fs.readdirSync(dir);

    for (const filename of files) {
      const fullPath = path.join(dir, filename);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        this.walkDir(fullPath, fileList, allowedFiles);
      } else if (
        stat.isFile() &&
        filename.endsWith('.ts') &&
        !filename.endsWith('.spec.ts')
      ) {
        // Only include if this file is explicitly exported
        if (allowedFiles.has(filename)) {
          fileList.push(fullPath);
        } else {
          this.filesNotIncluded.push(filename);
        }
      }
    }

    return fileList;
  }

  classifyDocKind(symbol) {
    const file = (symbol.file ?? '').toLowerCase();
    const name = symbol.name ?? '';

    // ---- Interfaces ----
    if (symbol.kind === 'interface') {
      if (file.endsWith('.context.ts')) return 'context';
      if (file.endsWith('.shape.ts')) return 'shape';
      if (file.endsWith('.contract.ts') || name.endsWith('Contract'))
        return 'contract';
      if (file.endsWith('.config.ts')) return 'config';
      if (file.endsWith('.options.ts')) return 'options';

      return 'interface'; // fallback
    }

    // ---- Types ----
    if (symbol.kind === 'type') {
      return 'type';
    }

    // ---- Constants ----
    if (symbol.kind === 'const') {
      return 'constant';
    }

    // ---- Functions ----
    if (symbol.kind === 'function') {
      if (file.endsWith('.decorator.ts')) return 'decorator';
      if (file.endsWith('.behavior.ts')) return 'behavior';
      return 'function';
    }

    if (symbol.kind === 'behavior') {
      if (file.endsWith('.controller.ts')) return 'controller';
      return 'behavior';
    }

    // ---- Classes ----
    if (symbol.kind === 'class') {
      if (file.endsWith('.abstract.ts')) return 'abstract';
      if (file.endsWith('.service.ts')) return 'service';
      return 'class';
    }

    return symbol.kind;
  }

  // Compute documentation link based on naming conventions
  computeDocLink(kind, docKind) {
    if (kind === 'interface') {
      if (docKind === 'contract') return 'contracts';
      if (docKind === 'shape') return 'shapes';
      if (docKind === 'context') return 'contexts';
      if (docKind === 'config') return 'config';
      if (docKind === 'options') return 'options';
      return 'interfaces';
    }

    if (kind === 'function') {
      if (docKind === 'decorator') return 'decorators';
      if (docKind === 'function') return 'functions';
      if (docKind === 'behavior') return 'behaviors';
      throw new Error(`Unknown docKind: ${docKind}`);
    }

    if (kind === 'const') return 'const';

    if (kind === 'type') return 'types';
    if (kind === 'enum') return 'enums';

    if (kind === 'class') {
      if (docKind === 'abstract') return 'abstracts';
      if (docKind === 'service') return 'services';
      return 'classes';
    }

    if (kind === 'behavior') {
      if (docKind === 'behavior') return 'behaviors';
      if (docKind === 'controller') return 'controllers';
      throw new Error(`Unknown docKind: ${docKind}`);
    }

    throw new Error(`Unsupported symbol kind "${kind}" (${docKind})`);
  }

  /**
   * Parse a TypeScript file and extract symbols using regex patterns.
   */
  parseFile(filePath) {
    const text = fs.readFileSync(filePath, 'utf8');
    const results = [];
    const seen = new Set();

    const patterns = [
      // --------------------------------------------------
      // CLASS (excluding "with*" behaviors)
      // --------------------------------------------------
      {
        kind: 'class',
        regex:
          /^(?:export\s+)?(?:abstract\s+)?class\s+(?!with)([A-Za-z0-9_]+)(?:<[^>]+>)?/gm
      },

      {
        kind: 'function',
        regex:
          /^export\s+const\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?(?:function(?:\s*<[^>]+>)?\s*\(|(?:<[^>]+>\s*)?(?:\([^)]*\)|[A-Za-z_$][\w$]*)\s*(?::\s*[^=]+?)?\s*=>)/gm
      },

      {
        kind: 'const',
        regex: /^export\s+const\s+([A-Za-z0-9_]+)\s*=/gm
      },

      // --------------------------------------------------
      // BEHAVIOR CLASSES: "withXYZBehavior"
      // --------------------------------------------------
      {
        kind: 'behavior',
        regex: /^export\s+class\s+(with[A-Za-z0-9_]+)(?:<[^>]+>)?/gm
      },

      // --------------------------------------------------
      // DEFAULT CLASS
      // --------------------------------------------------
      {
        kind: 'class',
        regex: /^export\s+default\s+class\s+([A-Za-z0-9_]+)(?:<[^>]+>)?/gm
      },

      // --------------------------------------------------
      // INTERFACE
      // --------------------------------------------------
      {
        kind: 'interface',
        regex: /^(?:export\s+)?interface\s+([A-Za-z0-9_]+)(?:<[^>]+>)?/gm
      },

      // --------------------------------------------------
      // TYPE ALIAS
      // --------------------------------------------------
      {
        kind: 'type',
        regex: /^(?:export\s+)?type\s+([A-Za-z0-9_]+)(?:<[^>]+>)?\s*=/gm
      },

      // --------------------------------------------------
      // ENUM
      // --------------------------------------------------
      {
        kind: 'enum',
        regex: /^(?:export\s+)?enum\s+([A-Za-z0-9_]+)(?:<[^>]+>)?/gm
      },

      // --------------------------------------------------
      // FUNCTION
      // e.g. export function foo<T>(...)
      // --------------------------------------------------
      {
        kind: 'function',
        regex: /^export\s+function\s+([A-Za-z0-9_]+)(?:<[^>]+>)?\s*\(/gm
      }
    ];

    const add = (kind, name) => {
      if (seen.has(name)) return;
      seen.add(name);

      const symbol = {
        kind,
        name,
        file: filePath
      };

      const docKind = this.classifyDocKind(symbol);

      results.push({
        ...symbol,
        docKind,
        docLink: this.computeDocLink(kind, docKind)
      });
    };

    // Apply regex patterns
    for (const { kind, regex } of patterns) {
      let match;
      while ((match = regex.exec(text))) add(kind, match[1]);
    }

    // Handle export { A, B, C }
    const reExportRegex = /export\s*{\s*([A-Za-z0-9_,\s]+)\s*}/g;
    let reMatch;

    while ((reMatch = reExportRegex.exec(text))) {
      const names = reMatch[1].split(',').map((n) => n.trim());

      for (const name of names) {
        if (!name) continue;

        this.reExports.push({
          name,
          file: filePath
        });
      }
    }

    return results;
  }

  collectAllowedFilesFromPublicApis(project) {
    const allowed = new Set();
    const root = project.isEngine ? this.engineRoot : this.projectRoot;

    for (const apiPath of project.publicApis || []) {
      const absApi = path.resolve(root, project.srcDir, apiPath);
      if (!fs.existsSync(absApi)) {
        throw new Error(
          `Project "${project.name}" Public API file not found: "${path.join(project.srcDir, apiPath)}"`
        );
      }

      const apiText = fs.readFileSync(absApi, 'utf8');

      const re =
        /export\s+(?:\*|{[^}]+}|type\s+{[^}]+})\s+from\s+['"]([^'"]+)['"]/g;
      let m;
      while ((m = re.exec(apiText))) {
        const rel = m[1]; // './lib/...'
        const resolved = path.resolve(path.dirname(absApi), rel);

        if (fs.existsSync(resolved + '.ts')) {
          const filenameOnly = path.basename(resolved + '.ts');
          allowed.add(filenameOnly);
        } else if (fs.existsSync(path.join(resolved, 'index.ts'))) {
          // Barrel index — recurse into the index file to collect its exports
          this.#collectFromBarrel(path.join(resolved, 'index.ts'), allowed);
        }
      }
    }

    if (allowed.size === 0) {
      throw new Error(`No public api parameter supplied for "${project.name}"`);
    }

    return allowed;
  }

  /**
   * Recursively collects allowed filenames from a barrel index file.
   */
  #collectFromBarrel(indexPath, allowed) {
    const text = fs.readFileSync(indexPath, 'utf8');
    const re =
      /export\s+(?:\*|{[^}]+}|type\s+{[^}]+})\s+from\s+['"]([^'"]+)['"]/g;
    let m;
    while ((m = re.exec(text))) {
      const rel = m[1];
      const resolved = path.resolve(path.dirname(indexPath), rel);

      if (fs.existsSync(resolved + '.ts')) {
        allowed.add(path.basename(resolved + '.ts'));
      } else if (fs.existsSync(path.join(resolved, 'index.ts'))) {
        this.#collectFromBarrel(path.join(resolved, 'index.ts'), allowed);
      }
    }
  }

  /**
   * Load all TS files from configured projects and extract symbols.
   */
  collectSymbols() {
    const finalList = [];

    for (const project of this.projects) {
      const root = project.isEngine ? this.engineRoot : this.projectRoot;
      const absDir = path.resolve(root, project.srcDir);

      if (!fs.existsSync(absDir)) {
        throw new Error(
          `Project ${project.name}: directory not found → ${project.srcDir}`
        );
      }

      // ------------------------------------------
      // NEW: Build the allowed export symbol set
      // ------------------------------------------

      const files = this.walkDir(
        absDir,
        [],
        this.collectAllowedFilesFromPublicApis(project)
      );

      for (const file of files) {
        const symbols = this.parseFile(file);

        for (const symbol of symbols) {
          if (
            symbol.name === 'VaultPrivateErrorService' ||
            symbol.name === 'VaultPrivateErrorClass'
          )
            continue;

          if (symbol.name === 'VaultPrivateErrorService') {
            throw new Error('hmm');
          }

          // Skip internal marker constants (e.g. __fromObservable)
          if (symbol.name.startsWith('__')) continue;

          finalList.push({
            ...symbol,
            project: project.name,
            relativePath: path.relative(process.cwd(), file)
          });
        }
      }
    }

    return finalList;
  }

  resolveReExports(symbols) {
    const byName = new Map(symbols.map((s) => [s.name, s]));

    for (const r of this.reExports) {
      const target = byName.get(r.name);
      if (target) {
        target.reExportedFrom ??= [];
        target.reExportedFrom.push(path.relative(process.cwd(), r.file));
      }
    }
  }

  convertToGroupKey(symbol) {
    // Interfaces split by docKind
    if (symbol.kind === 'interface') {
      return this.computeDocLink('interface', symbol.docKind);
    }

    // Functions split by docKind
    if (symbol.kind === 'function') {
      return this.computeDocLink('function', symbol.docKind);
    }

    if (symbol.kind === 'behavior') {
      return this.computeDocLink('behavior', symbol.docKind);
    }

    // Everything else is 1:1
    return this.computeDocLink(symbol.kind, symbol.docKind);
  }

  organizeSymbols(symbols) {
    const grouped = {};

    for (const symbol of symbols) {
      const groupKey = this.convertToGroupKey(symbol);

      if (!groupKey) {
        throw new Error(
          `Failed to compute groupKey for symbol "${symbol.name}" (${symbol.kind}/${symbol.docKind})`
        );
      }

      if (!grouped[groupKey]) grouped[groupKey] = {};
      grouped[groupKey][symbol.name] = {
        kind: symbol.kind,
        docKind: symbol.docKind,
        name: symbol.name,
        project: symbol.project,
        relativePath: symbol.relativePath,
        docLink: symbol.docLink,
        reExportedFrom: symbol.reExportedFrom
      };
    }

    // Alphabetize keys inside each kind
    for (const kind of Object.keys(grouped)) {
      const sorted = {};
      for (const name of Object.keys(grouped[kind]).sort()) {
        sorted[name] = grouped[kind][name];
      }
      grouped[kind] = sorted;
    }

    return grouped;
  }

  /**
   * Write JSON output to disk.
   */
  writeOutput(symbols) {
    fs.writeFileSync(
      this.outputFile,
      JSON.stringify(this.organizeSymbols(symbols), null, 2) + '\n',
      'utf8'
    );
  }

  /**
   * Run the extractor workflow.
   */
  run() {
    const symbols = this.collectSymbols();
    this.resolveReExports(symbols);
    this.writeOutput(symbols);

    if (this.filesNotIncluded.length > 0) {
      console.warn(`These files were not included:`);
      this.filesNotIncluded
        .sort((a, b) => (a > b ? 1 : -1))
        .forEach((filename) => {
          console.warn(`\t${filename}`);
        });
    }

    compareFilesOrFail.compare(this.originalOutputFile, this.outputFile);

    console.warn(`Extracted ${symbols.length} symbols`);
    console.warn(`Output written to ${this.outputFile}`);
  }
}
