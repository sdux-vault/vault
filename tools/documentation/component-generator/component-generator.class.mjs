#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import {
  getSafeClassName,
  getSafeName,
  setSafeNamePrefix
} from '../../utils/get-safe-name.util.mjs';
import { toKebabCase } from '../../utils/to-kebab-case.util.mjs';
import { renderClassDocumentation } from './web-pages/class-generator.function.mjs';

/**
 * Utility: Convert "AppStateService" → "app-state-service"
 */
/**
 * Generates Angular doc components based on type-index.json output.
 */
export class ComponentGenerator {
  constructor(indexPath, outputDir, compodocsPath) {
    this.indexPath = indexPath;
    this.outputDir = outputDir;
    this.compodocsPath = compodocsPath;
    //setSafeNamePrefix('References');
    setSafeNamePrefix('');

    if (!fs.existsSync(this.indexPath)) {
      throw new Error(`Artifact file not found: ${this.indexPath}`);
    }

    if (!fs.existsSync(this.outputDir)) {
      throw new Error(`Output directory not found: ${this.outputDir}`);
    }
  }

  /**
   * Read & parse the type index file.
   */
  loadIndex() {
    const raw = fs.readFileSync(this.indexPath, 'utf8');
    return JSON.parse(raw);
  }

  /**
   * Finds a Compodoc entry by symbol name.
   *
   * Searches all known Compodoc sections, including:
   * - classes
   * - injectables
   * - interfaces
   * - components
   * - modules
   * - miscellaneous: types, functions, enums, variables
   *
   * When `relativePath` is provided and multiple entries share the same name,
   * the entry whose `file` field matches the relative path is preferred.
   *
   * @param {string} symbolName - The exact TypeScript symbol name.
   * @param {string} [relativePath] - Optional source file path for disambiguation.
   * @returns The matching Compodoc entry object or `null` if not found.
   */
  findCompodocEntry(symbolName, relativePath) {
    if (!this.compodocs) {
      throw new Error(
        `Compodocs JSON has not been loaded. Call loadCompodocs() first.`
      );
    }

    const doc = this.compodocs;
    const candidates = [];

    // Primary top-level categories
    const topLevelSections = [
      'classes',
      'injectables',
      'interfaces',
      'components',
      'modules',
      'pipes',
      'directives'
    ];

    for (const section of topLevelSections) {
      const items = doc[section];
      if (Array.isArray(items)) {
        for (const e of items) {
          if (e.name === symbolName) candidates.push(e);
        }
      }
    }

    // Miscellaneous items
    if (doc.miscellaneous) {
      const miscGroups = [
        'functions',
        'variables',
        'enumerations',
        'typealiases',
        'groupedVariables'
      ];

      for (const misc of miscGroups) {
        const items = doc.miscellaneous[misc];
        if (Array.isArray(items)) {
          for (const e of items) {
            if (e.name === symbolName) candidates.push(e);
          }
        }
      }
    }

    if (candidates.length === 0) return null;
    if (candidates.length === 1) return candidates[0];

    // Multiple candidates — disambiguate by file path
    if (relativePath) {
      const pathMatch = candidates.find(
        (e) => e.file && relativePath.endsWith(e.file)
      );
      if (pathMatch) return pathMatch;
    }

    // Fallback to first match
    return candidates[0];
  }

  /**
   * Create very simple Angular component content.
   */
  async createComponentContent(symbolName, entry) {
    const safeName = getSafeName(symbolName);
    const safeClassName = getSafeClassName(symbolName);
    const kebab = toKebabCase(safeName);

    const className = safeName.endsWith('Component')
      ? safeClassName
      : safeClassName + 'Component';

    return `/**
 * AUTO-GENERATED DOCUMENTATION COMPONENT
 * Symbol: ${safeClassName}
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { BrandNameComponent } from '@sdux-vault/ui/web-components';

@Component({
  selector: 'sdux-${kebab}',
  standalone: true,
  imports: [BrandNameComponent],
  template: \`${await renderClassDocumentation(entry, this.findCompodocEntry(symbolName, entry.relativePath))}\`,
  styleUrl: '../../scss/documentation.scss',
  encapsulation: ViewEncapsulation.None
})
export class ${className}{}
`;
  }

  /**
   * Write a component file to disk.
   */
  async writeComponent(symbolName, entry) {
    try {
      const kebab = toKebabCase(getSafeName(symbolName));
      const targetDir = path.join(this.outputDir, entry.docLink);
      const fileName = `${kebab}.component.ts`;
      const fullPath = path.join(targetDir, fileName);

      fs.mkdirSync(targetDir, { recursive: true });

      const content = await this.createComponentContent(symbolName, entry);
      fs.writeFileSync(fullPath, content, 'utf8');

      console.warn(`Generated: ${fullPath}`);
    } catch (err) {
      console.error(`❌ Failed to generate ${symbolName}`);
      console.error(err);
    }
  }

  /**
   * Read & parse the Compodocs JSON file.
   */
  loadCompodocs() {
    if (!this.compodocsPath) {
      throw new Error(`Compodocs path was not provided.`);
    }

    if (!fs.existsSync(this.compodocsPath)) {
      throw new Error(`Compodocs file not found: ${this.compodocsPath}`);
    }

    const raw = fs.readFileSync(this.compodocsPath, 'utf8');

    try {
      return JSON.parse(raw);
    } catch (err) {
      throw new Error(
        `Failed to parse Compodocs JSON at ${this.compodocsPath}: ${err.message}`
      );
    }
  }

  /**
   * Main execution: scans all kinds & symbols and generates components.
   */
  async run() {
    console.warn(`Loaded type index: ${this.indexPath}`);
    console.warn(`Output directory: ${this.outputDir}`);

    this.compodocs = this.loadCompodocs();

    const indexJson = this.loadIndex();
    const kinds = Object.keys(indexJson);

    for (const kind of kinds) {
      const items = indexJson[kind];

      for (const symbolName of Object.keys(items)) {
        const entry = items[symbolName];
        const docLink = entry.docLink;

        if (!docLink) {
          console.warn(`Skipping ${symbolName} (missing docLink)`);
          continue;
        }

        await this.writeComponent(symbolName, entry);
      }
    }

    console.warn('Documentation components created successfully!');
  }
}
