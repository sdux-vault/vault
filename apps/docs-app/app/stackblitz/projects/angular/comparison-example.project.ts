import { Project } from '@stackblitz/sdk';

export const comparisonExampleProject: Project = {
  title: 'angular-comparison-example',
  template: 'node',
  files: {
    'angular.json': `{
  "\$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "angular-demo": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss"
        }
      },
      "root": "./",
      "sourceRoot": "./src",
      "prefix": "example",
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "browser": "./src/main.ts",
            "tsConfig": "./tsconfig.json",
            "index": "./src/index.html",
            "inlineStyleLanguage": "scss",
            "assets": [
              {
                "glob": "**/*",
                "input": "./public"
              }
            ],
            "styles": ["./src/styles.scss"]
          },
          "configurations": {
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true
            }
          },
          "defaultConfiguration": "development"
        },
        "serve": {
          "builder": "@angular/build:dev-server",
          "configurations": {
            "development": {
              "buildTarget": "angular-demo:build:development"
            }
          },
          "defaultConfiguration": "development"
        }
      }
    }
  }
}
`,
    'dist/angular-demo/browser/example.component.css.map': `{
  "version": 3,
  "sources": ["src/app/example.component.scss"],
  "sourcesContent": ["\$gap: 0.75rem;\\n\$padding: 1rem;\\n\$data-height: 300px;\\n\$text-area-height: 175px;\\n\$border: 1px solid rgba(0, 0, 0, 0.08);\\n\$radius: 8px;\\n\$text-muted: #666;\\n\$title-font-size: 2rem;\\n\$sub-title-font-size: 1rem;\\n\$label-font-size: 1.1rem;\\n\$text-area-font-size: 0.8rem;\\n\$hint-font-size: 1rem;\\n\$hint-file-font-size: 0.9rem;\\n\$status-font-size: 0.85rem;\\n\\n.example-container {\\n  display: flex;\\n  flex-direction: column;\\n  gap: \$gap;\\n  padding: \$padding;\\n\\n  .header {\\n    display: flex;\\n    flex-direction: column;\\n    gap: 0.25rem;\\n\\n    .title {\\n      font-size: \$title-font-size;\\n      font-weight: 600;\\n      letter-spacing: 0.3px;\\n    }\\n\\n    .subtitle {\\n      font-size: \$sub-title-font-size;\\n      color: \$text-muted;\\n      max-width: 600px;\\n    }\\n  }\\n\\n  .section {\\n    padding: \$padding;\\n\\n    &.column {\\n      border: \$border;\\n      border-radius: \$radius;\\n      display: flex;\\n      gap: \$gap;\\n\\n      @media (max-width: 768px) {\\n        flex-direction: column;\\n\\n        .state-container {\\n          width: 100%;\\n        }\\n      }\\n    }\\n\\n    .state-container {\\n      flex: 1;\\n      display: flex;\\n      flex-direction: column;\\n      gap: 0.35rem;\\n      min-width: 0;\\n\\n      &.data-row {\\n        height: 430px;\\n      }\\n\\n      .textarea,\\n      .data-textarea {\\n        width: 100%;\\n        box-sizing: border-box;\\n        height: \$data-height;\\n        padding: 0.5rem;\\n        border: \$border;\\n        border-radius: 6px;\\n        font-family: monospace;\\n        font-size: \$text-area-font-size;\\n        background: #fafafa;\\n        color: #222;\\n\\n        &.empty {\\n          font-style: italic;\\n        }\\n\\n        &.error {\\n          color: #d33;\\n        }\\n      }\\n\\n      .textarea {\\n        height: \$text-area-height;\\n      }\\n    }\\n\\n    .label {\\n      font-size: \$label-font-size;\\n      font-weight: 600;\\n      text-transform: uppercase;\\n      letter-spacing: 0.5px;\\n      color: \$text-muted;\\n    }\\n\\n    .flow-hint {\\n      margin-top: 0.25rem;\\n      font-size: 1rem;\\n      letter-spacing: 0.3px;\\n      color: \$text-muted;\\n    }\\n\\n    .hint {\\n      font-size: \$hint-font-size;\\n      color: #777;\\n      margin-top: -0.15rem;\\n      margin-left: 0.5rem;\\n\\n      &.file {\\n        color: #999;\\n        font-family: monospace;\\n        font-size: \$hint-file-font-size;\\n        min-height: 16px;\\n      }\\n\\n      &.state {\\n        margin-top: 0.15rem;\\n      }\\n\\n      .emphasis {\\n        font-weight: 600;\\n        color: #555;\\n      }\\n    }\\n\\n    .actions {\\n      justify-content: flex-start;\\n      display: flex;\\n      align-items: center;\\n      gap: 3rem;\\n\\n      @media (max-width: 768px) {\\n        flex-direction: column;\\n        align-items: flex-start;\\n        gap: 2rem;\\n      }\\n\\n      .secondary-actions {\\n        display: flex;\\n        gap: 2rem;\\n\\n        @media (max-width: 768px) {\\n          gap: 1.5rem;\\n          flex-direction: column;\\n          align-items: flex-start;\\n        }\\n      }\\n    }\\n  }\\n\\n  .status {\\n    height: 300px;\\n    font-size: \$status-font-size;\\n    color: \$text-muted;\\n    display: flex;\\n    align-items: center;\\n    justify-content: center;\\n  }\\n\\n  .learn-more {\\n    display: flex;\\n    flex-direction: column;\\n    gap: 0.35rem;\\n\\n    .learn-more-links {\\n      display: flex;\\n      align-items: center;\\n      gap: 0.75rem;\\n      font-size: \$hint-font-size;\\n\\n      a {\\n        color: #555;\\n        text-decoration: none;\\n\\n        &:hover {\\n          text-decoration: underline;\\n          color: #222;\\n        }\\n      }\\n\\n      .separator {\\n        color: #ccc;\\n      }\\n    }\\n  }\\n}\\n"],
  "mappings": "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",
  "names": []
}
`,
    'dist/angular-demo/browser/index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8"/>
    <title>SDuX Angular Example</title>
    <base href="/"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link rel="icon" type="image/x-icon" href="favicon.ico"/>
  <link rel="stylesheet" href="styles.css"></head>
  <body>
    <example-view></example-view>
  <link rel="modulepreload" href="chunk-WA5JJV5Y.js"><script src="main.js" type="module"></script></body>
</html>
`,
    'dist/angular-demo/browser/styles.css': `/* src/styles.scss */
.example-container {
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.sdux-button {
  height: 40px !important;
  color: #ffffff !important;
  background-color: #1976d2 !important;
  border: 1px solid #004ba0 !important;
  border-radius: 0.3125rem !important;
  font-size: 0.875rem !important;
  padding: 0.5rem;
  gap: 0.25rem;
  font-weight: 600;
  min-width: 125px !important;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.sdux-button .mat-icon {
  transform: scale(0.75);
}
.sdux-button {
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sdux-button .button-text {
  height: 40px;
}
.sdux-button .mat-icon {
  width: 22px !important;
  height: 22px !important;
  position: relative;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  gap: 0.25rem;
}
.sdux-button:focus {
  outline: none;
}

/* angular:styles/global:styles */
/*# sourceMappingURL=styles.css.map */
`,
    'dist/angular-demo/browser/styles.css.map': `{
  "version": 3,
  "sources": ["src/styles.scss"],
  "sourcesContent": ["/* You can add global styles to this file, and also import other style files */\\n\$button-height: 40px;\\n\$color: #ffffff;\\n\$background: #1976d2;\\n\$border: #004ba0;\\n\$radius: 0.3125rem;\\n\$font-size: 0.875rem; // 14px\\n\$spacing-xs: 0.25rem; // 4px\\n\$padding: 0.5rem;\\n\$font-weight-semibold: 600;\\n\\n\$button-icon-size: 22px;\\n\$min-width: 30px !important;\\n\\n.example-container {\\n  padding: \$spacing-xs;\\n  display: flex;\\n  flex-direction: column;\\n  gap: \$spacing-xs;\\n}\\n\\n.sdux-button {\\n  height: \$button-height !important;\\n  color: \$color !important;\\n  background-color: \$background !important;\\n  border: 1px solid \$border !important;\\n  border-radius: \$radius !important;\\n  font-size: \$font-size !important;\\n  padding: \$padding;\\n  gap: \$spacing-xs;\\n  font-weight: \$font-weight-semibold;\\n\\n  min-width: 125px !important;\\n  display: flex;\\n  flex-direction: row;\\n  justify-content: center;\\n  align-items: center;\\n\\n  .mat-icon {\\n    transform: scale(0.75);\\n  }\\n\\n  cursor: pointer;\\n  white-space: nowrap;\\n  overflow: hidden;\\n  text-overflow: ellipsis;\\n\\n  .button-text {\\n    height: \$button-height;\\n  }\\n\\n  .mat-icon {\\n    width: \$button-icon-size !important;\\n    height: \$button-icon-size !important;\\n    position: relative;\\n    padding-left: \$spacing-xs;\\n    padding-right: \$spacing-xs;\\n    gap: \$spacing-xs; // Ensures uniform spacing\\n  }\\n\\n  &:focus {\\n    outline: none;\\n  }\\n}\\n"],
  "mappings": ";AAcA,CAAA;AACE,WARW;AASX,WAAA;AACA,kBAAA;AACA,OAXW;;AAcb,CAAA;AACE,UAAA;AACA,SAAA;AACA,oBAAA;AACA,UAAA,IAAA,MAAA;AACA,iBAAA;AACA,aAAA;AACA,WApBQ;AAqBR,OAtBW;AAuBX,eArBqB;AAuBrB,aAAA;AACA,WAAA;AACA,kBAAA;AACA,mBAAA;AACA,eAAA;;AAEA,CAjBF,YAiBE,CAAA;AACE,aAAA,MAAA;;AAlBJ,CAAA;AAqBE,UAAA;AACA,eAAA;AACA,YAAA;AACA,iBAAA;;AAEA,CA1BF,YA0BE,CAAA;AACE,UA/CY;;AAkDd,CA9BF,YA8BE,CAbA;AAcE,SAAA;AACA,UAAA;AACA,YAAA;AACA,gBAhDS;AAiDT,iBAjDS;AAkDT,OAlDS;;AAqDX,CAvCF,WAuCE;AACE,WAAA;;",
  "names": []
}
`,
    'dist/angular-demo/prerendered-routes.json': `{
  "routes": {}
}`,
    'package.json': `{
  "name": "angular-comparison-example",
  "version": "1.0.3",
  "private": true,
  "scripts": {
    "start": "ng serve --host 0.0.0.0 --port 4200"
  },
  "dependencies": {
    "@angular/cdk": "21.2.12",
    "@angular/cli": "21.2.11",
    "@angular/common": "21.2.13",
    "@angular/compiler": "21.2.13",
    "@angular/core": "21.2.13",
    "@angular/platform-browser": "21.2.13",
    "@sdux-vault/angular": "latest",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0"
  },
  "devDependencies": {
    "@angular/build": "21.2.11",
    "@angular/compiler-cli": "21.2.13",
    "typescript": "~5.9.2"
  }
}
`,
    'src/app/app.config.ts': `import { ApplicationConfig } from '@angular/core';
import { provideFeatureCell, provideVault } from '@sdux-vault/angular';
import { EmployeeCell } from './employee.service';

/**
 * Application-level configuration for the Angular standalone bootstrap.
 *
 * Registers the Vault runtime and the EmployeeCell FeatureCell
 * as dependency injection providers.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Creates the Vault runtime (state container + lifecycle)
    provideVault({
      /**
       * Controls the verbosity of internal logging.
       * Levels: \`'debug' | 'info' | 'warn' | 'error' | 'off'\`.
       * Set to \`'debug'\` during development to trace pipeline activity.
       */
      logLevel: 'off',

      /**
       * Enables development-mode diagnostics.
       * When \`true\`, the SDuX Debugger panel and Chrome Extension
       * receive real-time pipeline trace events.
       */
      devMode: false
    }),

    // Define a FeatureCell (state + behaviors + controllers)
    provideFeatureCell(
      // Service class that owns the FeatureCell instance
      EmployeeCell,

      // FeatureCell descriptor (identity + initial state)
      {
        // Unique state key used by the Vault
        key: 'employees',

        // Fallback Initial value for the state
        initialState: []
      },

      // Optional definition-time extensions
      [
        // --> Register add-on behaviors here <--
      ],
      [
        // --> Register add-on controllers here <--
      ]
    )
  ]
};
`,
    'src/app/employee.model.ts': `/** Shape representing an employee in the comparison example. */
export interface Employee {
  id: number;
  name: string;
}
`,
    'src/app/employee.service.ts': `import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { Employee } from './employee.model';

/**
 * FeatureCell service for the comparison example.
 *
 * The service owns the Vault-backed state and applies the filter and reducer
 * pipeline before exposing the resulting state to the component.
 */
@FeatureCell<Employee[]>('employees')
@Injectable({ providedIn: 'root' })
export class EmployeeCell {
  /** Internal Vault handle; components update state through service methods. */
  readonly #vault = injectVault<Employee[]>(EmployeeCell);

  /** Public reactive state snapshot consumed by the component. */
  readonly state = this.#vault.state;

  constructor() {
    // Runtime pipeline configuration.
    this.#vault
      // Filters remove entries before they reach the reducer.
      .filters([
        (employees: Employee[]) =>
          employees.filter((employee) => employee.id % 2 !== 0)
      ])
      // Reducers transform the filtered working state.
      .reducers([
        (employees: Employee[]) => {
          employees.sort((left, right) => left.name.localeCompare(right.name));
          return employees;
        }
      ])
      // Finalizes the pipeline and activates the FeatureCell.
      .initialize();
  }

  /** Replace the entire state synchronously. */
  replace(employees: Employee[]): void {
    this.#vault.replaceState({
      loading: false,
      value: employees,
      error: null
    });
  }

  /** Reset the FeatureCell to its configured initial state. */
  reset(): void {
    this.#vault.reset();
  }

  /** Toggle the loading flag while preserving the current value. */
  toggleLoading(loading: boolean): void {
    this.#vault.replaceState({ loading, value: this.state.value() });
  }

  /** Toggle an example error while preserving the current value. */
  toggleError(error: Error | null): void {
    this.#vault.replaceState({ error, value: this.state.value() });
  }
}
`,
    'src/app/example.component.html': `<div class="example-container">
  <div class="header">
    <div class="title">Angular - SDuX Vault Comparison Example</div>
    <div class="subtitle">
      This example shows how SDuX processes employee state through a pipeline:
      odd-numbered employees are filtered, then the remaining entries are sorted
      before becoming the final FeatureCell state.
    </div>
  </div>

  <div class="section">
    <div class="label">FeatureCell Flow</div>
    <div class="flow-hint">Input → Filter → Reducer → Output</div>
  </div>

  <div class="section column">
    <div class="state-container">
      <div class="label">Filter</div>
      <div class="hint">
        Removes or blocks data before it enters the pipeline
      </div>
      <div class="hint file">
        <span class="emphasis">File:</span> app/example.service.ts
      </div>
      <textarea class="textarea">
[
  (employees: Employee[]) => {
    return employees.filter(
      (employee: Employee) => employee.id % 2 !== 0
    );
  }
]
      </textarea>
    </div>

    <div class="state-container">
      <div class="label">Reducer</div>
      <div class="hint">Transforms each item in the state</div>
      <div class="hint file">
        <span class="emphasis">File:</span> app/example.service.ts
      </div>
      <textarea class="textarea">
[
  (employees: Employee[]) => {
    return employees.sort(
      (left, right) => left.name.localeCompare(right.name)
    );
  }
]
      </textarea>
    </div>
  </div>

  <div class="section column">
    <div class="state-container">
      <div class="label">Input State</div>
      <div class="hint">Raw data before processing</div>
      <div class="hint file">
        <span class="emphasis">File:</span> app/example.component.ts
      </div>
      <textarea class="data-textarea">{{ sample | json }}</textarea>
    </div>

    <div class="state-container data-row">
      <div class="label">FeatureCell State</div>
      <div class="hint">Final state after filters and reducers run</div>
      <div class="hint file">
        <span class="emphasis">File:</span> app/example.service.ts
      </div>
      @if (state.isLoading()) {
        <div class="status">Loading...</div>
      } @else if (state.error()) {
        <textarea class="data-textarea error" readonly
          >{{ state.error() | json }}
        </textarea>
        <div class="hint state">This is a VaultError display</div>
      } @else if (state.hasValue()) {
        <textarea class="data-textarea" readonly
          >{{ state.value() | json }}
        </textarea>
        <div class="hint state">
          <span class="emphasis">State:</span> {{ activeStateHint() }}
        </div>
        <div class="hint file">
          @if (displayActiveStateHint()) {
            <span class="emphasis">File:</span> app/app.config.ts
          } @else {
            &nbsp;
          }
        </div>
      } @else {
        <textarea class="data-textarea" readonly> </textarea>
        <div class="hint state">
          <span class="emphasis">State:</span> cleared - pipeline has no active
          value, error or loading status.
        </div>
        <div class="hint file">
          <span class="emphasis">File:</span> app/app.config.ts &nbsp;
        </div>
      }
    </div>
  </div>

  <div class="section">
    <div class="actions">
      <button class="sdux-button primary" (click)="loadSample()">
        Load Sample State
      </button>

      <div class="secondary-actions">
        <button class="sdux-button" (click)="resetState()">Reset State</button>
        <button class="sdux-button" (click)="toggleLoading()">
          Loading ({{ state.isLoading() }})
        </button>
        <button class="sdux-button" (click)="toggleError()">
          Error ({{ hasError() }})
        </button>
      </div>
    </div>
  </div>

  <div class="section learn-more">
    <div class="label">Learn More</div>
    <div class="learn-more-links">
      <a
        href="https://www.sdux-vault.com/docs/pipeline/behaviors/filters"
        target="_blank"
        rel="noopener noreferrer"
        >Filters</a
      >
      <span class="separator">·</span>
      <a
        href="https://www.sdux-vault.com/docs/pipeline/behaviors/reducers"
        target="_blank"
        rel="noopener noreferrer"
        >Reducers</a
      >
      <span class="separator">·</span>
      <a
        href="https://www.sdux-vault.com/docs/pipeline/apis/provide-feature-cell"
        target="_blank"
        rel="noopener noreferrer"
        >FeatureCell</a
      >
    </div>
  </div>
</div>
`,
    'src/app/example.component.scss': `\$gap: 0.75rem;
\$padding: 1rem;
\$data-height: 300px;
\$text-area-height: 175px;
\$border: 1px solid rgba(0, 0, 0, 0.08);
\$radius: 8px;
\$text-muted: #666;
\$title-font-size: 2rem;
\$sub-title-font-size: 1rem;
\$label-font-size: 1.1rem;
\$text-area-font-size: 0.8rem;
\$hint-font-size: 1rem;
\$hint-file-font-size: 0.9rem;
\$status-font-size: 0.85rem;

.example-container {
  display: flex;
  flex-direction: column;
  gap: \$gap;
  padding: \$padding;

  .header {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    .title {
      font-size: \$title-font-size;
      font-weight: 600;
      letter-spacing: 0.3px;
    }

    .subtitle {
      font-size: \$sub-title-font-size;
      color: \$text-muted;
      max-width: 600px;
    }
  }

  .section {
    padding: \$padding;

    &.column {
      border: \$border;
      border-radius: \$radius;
      display: flex;
      gap: \$gap;

      @media (max-width: 768px) {
        flex-direction: column;

        .state-container {
          width: 100%;
        }
      }
    }

    .state-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      min-width: 0;

      &.data-row {
        height: 430px;
      }

      .textarea,
      .data-textarea {
        width: 100%;
        box-sizing: border-box;
        height: \$data-height;
        padding: 0.5rem;
        border: \$border;
        border-radius: 6px;
        font-family: monospace;
        font-size: \$text-area-font-size;
        background: #fafafa;
        color: #222;

        &.empty {
          font-style: italic;
        }

        &.error {
          color: #d33;
        }
      }

      .textarea {
        height: \$text-area-height;
      }
    }

    .label {
      font-size: \$label-font-size;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: \$text-muted;
    }

    .flow-hint {
      margin-top: 0.25rem;
      font-size: 1rem;
      letter-spacing: 0.3px;
      color: \$text-muted;
    }

    .hint {
      font-size: \$hint-font-size;
      color: #777;
      margin-top: -0.15rem;
      margin-left: 0.5rem;

      &.file {
        color: #999;
        font-family: monospace;
        font-size: \$hint-file-font-size;
        min-height: 16px;
      }

      &.state {
        margin-top: 0.15rem;
      }

      .emphasis {
        font-weight: 600;
        color: #555;
      }
    }

    .actions {
      justify-content: flex-start;
      display: flex;
      align-items: center;
      gap: 3rem;

      @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 2rem;
      }

      .secondary-actions {
        display: flex;
        gap: 2rem;

        @media (max-width: 768px) {
          gap: 1.5rem;
          flex-direction: column;
          align-items: flex-start;
        }
      }
    }
  }

  .status {
    height: 300px;
    font-size: \$status-font-size;
    color: \$text-muted;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .learn-more {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;

    .learn-more-links {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: \$hint-font-size;

      a {
        color: #555;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
          color: #222;
        }
      }

      .separator {
        color: #ccc;
      }
    }
  }
}
`,
    'src/app/example.component.ts': `import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Employee } from './employee.model';
import { EmployeeCell } from './employee.service';

/**
 * UI component responsible for rendering the comparison FeatureCell state.
 *
 * The component delegates state updates to EmployeeCell and reads the
 * resulting reactive snapshot for display.
 */
@Component({
  selector: 'example-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'example.component.html',
  styleUrls: ['../styles.scss', 'example.component.scss']
})
export class ExampleComponent {
  /** Injected FeatureCell service that owns the state pipeline. */
  #employeeCell = inject(EmployeeCell);

  /** Reactive state exposed by the FeatureCell. */
  state = this.#employeeCell.state;

  /** Sample dataset used to demonstrate filter and reducer processing. */
  sample: Employee[] = [
    { id: 11, name: 'Luke' },
    { id: 38, name: 'Leia' },
    { id: 9, name: 'Han' }
  ];

  /** Hint text describing the current active state. */
  readonly activeStateHint = signal('Initial value is [] (empty array)');

  /** Whether to show the state hint file reference. */
  readonly displayActiveStateHint = signal(true);

  /** Whether the loading toggle is active. */
  readonly isLoading = signal(false);

  /** Whether the example error state is currently set. */
  readonly hasError = computed<boolean>(() => this.state.error() !== null);

  /** Delegate a state replacement to the FeatureCell service. */
  loadSample(): void {
    this.displayActiveStateHint.set(false);
    this.activeStateHint.set(
      'State updated with sample data after filters and reducers run.'
    );
    this.#employeeCell.replace(this.sample);
  }

  /** Reset the FeatureCell to its initial value. */
  resetState(): void {
    this.#employeeCell.reset();
  }

  /** Toggle the loading state for the UI demonstration. */
  toggleLoading(): void {
    this.isLoading.update((loading) => !loading);
    this.#employeeCell.toggleLoading(this.isLoading());
  }

  /** Toggle an example error for the UI demonstration. */
  toggleError(): void {
    const error = this.hasError() ? null : new Error('Example error message');
    this.#employeeCell.toggleError(error);
  }
}
`,
    'src/index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>SDuX Angular Comparison Example</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
  </head>
  <body>
    <example-view></example-view>
  </body>
</html>
`,
    'src/main.ts': `/**
 * Application bootstrap entry point.
 *
 * Bootstraps the root ExampleComponent as a standalone Angular application
 * using the provider configuration defined in appConfig.
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ExampleComponent } from './app/example.component';

// eslint-disable-next-line
bootstrapApplication(ExampleComponent, appConfig).catch((err: any) =>
  console.error(err)
);
`,
    'src/styles.scss': `/* You can add global styles to this file, and also import other style files */
\$button-height: 40px;
\$color: #ffffff;
\$background: #1976d2;
\$border: #004ba0;
\$radius: 0.3125rem;
\$font-size: 0.875rem; // 14px
\$spacing-xs: 0.25rem; // 4px
\$padding: 0.5rem;
\$font-weight-semibold: 600;

\$button-icon-size: 22px;
\$min-width: 30px !important;

.example-container {
  padding: \$spacing-xs;
  display: flex;
  flex-direction: column;
  gap: \$spacing-xs;
}

.sdux-button {
  height: \$button-height !important;
  color: \$color !important;
  background-color: \$background !important;
  border: 1px solid \$border !important;
  border-radius: \$radius !important;
  font-size: \$font-size !important;
  padding: \$padding;
  gap: \$spacing-xs;
  font-weight: \$font-weight-semibold;

  min-width: 125px !important;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .mat-icon {
    transform: scale(0.75);
  }

  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  .button-text {
    height: \$button-height;
  }

  .mat-icon {
    width: \$button-icon-size !important;
    height: \$button-icon-size !important;
    position: relative;
    padding-left: \$spacing-xs;
    padding-right: \$spacing-xs;
    gap: \$spacing-xs; // Ensures uniform spacing
  }

  &:focus {
    outline: none;
  }
}
`,
    'tsconfig.json': `{
  "compileOnSave": false,
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist/out-tsc",
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": false,
    "noImplicitReturns": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "ES2022",
    "module": "preserve"
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "typeCheckHostBindings": true,
    "strictTemplates": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["src/**/*.spec.ts"]
}
`
  }
};
