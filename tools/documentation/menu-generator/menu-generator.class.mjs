#!/usr/bin/env node
import fs from 'fs';
import path from 'node:path';
import {
  getSafeClassName,
  getSafeName,
  setSafeNamePrefix
} from '../../utils/get-safe-name.util.mjs';
import { toKebabCase } from '../../utils/to-kebab-case.util.mjs';

/**
 * MenuGenerator
 * -------------
 * Consumes the artifacts/type-index.json and outputs a full HTML nav tree.
 *
 */
export class MenuGenerator {
  constructor(
    indexPath,
    outputHtmlFile,
    outputHtmlBarrelFile,
    outputComponentFile
  ) {
    this.indexPath = indexPath;
    this.outputHtmlFile = outputHtmlFile;
    this.outputHtmlBarrelFilePath = outputHtmlBarrelFile;
    this.outputComponentFilePath = outputComponentFile;
    // setSafeNamePrefix('References');
    setSafeNamePrefix('');

    if (!fs.existsSync(this.indexPath)) {
      throw new Error(`Artifact file not found: ${this.indexPath}`);
    }
  }

  /** Load and parse type-index.json */
  loadIndex() {
    const raw = fs.readFileSync(this.indexPath, 'utf8');
    return JSON.parse(raw);
  }

  /** Convert symbol name → routerLink path (types/…, classes/…, etc.) */
  toRouterLink(entry) {
    return `/docs/references/${entry.docLink}/${toKebabCase(getSafeName(entry.name))}`;
  }

  /**
   * Generate a single HTML file containing a switch(type)
   * with a case for EVERY auto-generated documentation component.
   */
  generateBarrelHtmlPage(items) {
    let cases = [];

    for (const entry of items) {
      if (entry.docLink) {
        const safeName = toKebabCase(getSafeName(entry.name));
        const selector = `sdux-${safeName}`;
        const caseName = safeName;

        cases.push(`
@case ('${caseName}') {
  <${selector} />
}`);
      }
    }

    cases.push(`
@default {
  <sdux-not-found />
}`);

    return `
    <!--
AUTO-GENERATED DOCUMENTATION COMPONENT
Tools/documentation/menu-generator
-->
    @switch (type) {${cases.join('\n')}}`;
  }

  capitalize(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Generate the main ReferencesComponent file that imports ALL
   * auto-generated documentation components and registers them
   * in the Angular `imports: []` array.
   */
  generateReferencesComponent(items, kind) {
    let importStatements = [];
    let importClassNames = [];

    for (const entry of items) {
      if (entry.docLink) {
        const safeName = getSafeName(entry.name);
        const className = `${getSafeClassName(entry.name)}Component`;
        const kebab = toKebabCase(safeName);

        // Path = local sibling file (no subfolders)
        importStatements.push(
          `import { ${className} } from './${kebab}.component';`
        );

        importClassNames.push(className);
      }
    }

    const componentName = `References${this.capitalize(kind)}LandingPageComponent`;

    const componentSource = `
/**
* AUTO-GENERATED DOCUMENTATION COMPONENT
* Tools/documentation/menu-generator
*/
    
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { NotFoundComponent } from '../../../not-found/not-found.component';

${importStatements.join('\n')}

@Component({
  selector: 'sdux-references-${kind}-splashpage',
  standalone: true,
  imports: [
    NotFoundComponent,
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    ${importClassNames.join(',\n    ')}
  ],
  templateUrl: './references-${kind}.component.html',
  styleUrls: ['../../scss/example.scss']
})
export class ${componentName}{
  type!: string;

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.route.paramMap.subscribe((params) => {
      this.type = params.get('type') ?? 'value';
      this.cdr.markForCheck(); // forces UI update
    });
  }
}
`;

    return componentSource;
  }

  /** Build a menu section */
  buildSection(label, items) {
    if (items) {
      const links = items
        ?.filter((entry) => entry.docLink) // ← NEW: only include documented symbols
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(
          (entry) =>
            `<a mat-list-item routerLink="${this.toRouterLink(entry)}" routerLinkActive="active" (click)="closeSidenav()"><span class="menu-content">${entry.name}</span></a>`
        )
        .join('\n');

      return `
    <mat-expansion-panel class="nav-expansion" [expanded]="false">
      <mat-expansion-panel-header>
        <div class="menu-icon">
          <span class="sub-menu-content sub-item sub-header">${label}</span>
        </div>
      </mat-expansion-panel-header>

      <div class="submenu">
        ${links}
      </div>
    </mat-expansion-panel>`;
    } else {
      return '';
    }
  }

  /** Generate full HTML document */
  /** Generate full HTML document */
  generateHtml(index) {
    // Flatten all symbols into a single list
    const allSymbols = [];

    for (const kind of Object.keys(index)) {
      for (const symbol of Object.values(index[kind])) {
        allSymbols.push(symbol);
      }
    }

    // Group by docLink (the folder name)
    const groups = allSymbols.reduce((acc, s) => {
      if (!s.docLink) return acc;
      acc[s.docLink] ??= [];
      acc[s.docLink].push(s);
      return acc;
    }, {});

    return `
<!--
AUTO-GENERATED DOCUMENTATION COMPONENT
Tools/documentation/menu-generator
-->
<nav aria-labelledby="types-section-label">
  <mat-expansion-panel class="nav-expansion grandparent">
    <mat-expansion-panel-header>
      <span class="sub-menu-content sub-item sub-header">API Reference</span>
    </mat-expansion-panel-header>

    <div class="sub-menu">
      ${this.buildSection('Abstracts', groups.abstracts)}
      ${this.buildSection('Behaviors', groups.behaviors)}
      ${this.buildSection('Classes', groups.classes)}

      ${this.buildSection('Config', groups.config)}
      ${this.buildSection('Constants', groups.const)}
      ${this.buildSection('Contexts', groups.contexts)}
      ${this.buildSection('Contracts', groups.contracts)}
      ${this.buildSection('Controllers', groups.controllers)}

      ${this.buildSection('Decorators', groups.decorators)}
      ${this.buildSection('Enums', groups.enums)}
      ${this.buildSection('Functions', groups.functions)}

      ${this.buildSection('Options', groups.options)}
      ${this.buildSection('Services', groups.services)}
      ${this.buildSection('Shapes', groups.shapes)}

      ${this.buildSection('Types', groups.types)}
    </div>

  </mat-expansion-panel>
</nav>`;
  }

  /** Write out the HTML */
  writeOutput(html) {
    fs.writeFileSync(this.outputHtmlFile, html, 'utf8');
    console.warn(`Generated HTML menu: ${this.outputHtmlFile}`);
  }

  convertKindToFolderPath(kind) {
    switch (kind) {
      case 'behaviors':
        return 'behaviors';
      case 'decorators':
        return 'decorators';
      case 'classes':
        return 'classes';
      case 'functions':
        return 'functions';
      case 'interfaces':
        return 'interfaces';
      case 'types':
        return 'types';
      case 'enum':
        return 'enums';
      case 'contracts':
        return 'contracts';
      case 'const':
        return 'const';
      case 'options':
        return 'options';
      case 'shapes':
        return 'shapes';
      case 'contexts':
        return 'contexts';
      case 'config':
        return 'config';
      case 'controllers':
        return 'controllers';
      case 'services':
        return 'services';
      case 'abstracts':
        return 'abstracts';
      default:
        throw new Error(`Unknown kind of "${kind}"`);
    }
  }

  writeBarrelOutput(html, kind) {
    const file = path.join(
      this.outputHtmlBarrelFilePath,
      this.convertKindToFolderPath(kind),
      `references-${kind}.component.html`
    );
    fs.writeFileSync(file, html, 'utf8');
    console.warn(`Generated HTML barrel page: ${file}`);
  }

  writeBarrelComponent(componentSource, kind) {
    const file = path.join(
      this.outputComponentFilePath,
      this.convertKindToFolderPath(kind),
      `references-${kind}.component.ts`
    );
    fs.writeFileSync(file, componentSource, 'utf8');
    console.warn(`Generated ReferencesComponent: ${file}`);
  }

  /** Main execution */
  run() {
    console.warn(`Loading index from: ${this.indexPath}`);

    const index = this.loadIndex();
    const html = this.generateHtml(index);
    this.writeOutput(html);

    const kinds = Object.keys(index);

    for (const kind of kinds) {
      const items = Object.values(index[kind]).sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      const barrelHtml = this.generateBarrelHtmlPage(items);
      this.writeBarrelOutput(barrelHtml, kind);

      const referenceComponentTs = this.generateReferencesComponent(
        items,
        kind
      );
      this.writeBarrelComponent(referenceComponentTs, kind);
    }

    console.warn('Menu generation complete.');
  }
}
