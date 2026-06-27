import { Project } from '@stackblitz/sdk';

export const tabSyncExampleProject: Project = {
  title: 'angular-tab-sync-example',
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
    'package.json': `{
  "name": "angular-tab-sync-example",
  "version": "1.0.0",
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
import {
  withTabSyncController,
  withTabSyncStateBehavior
} from '@sdux-vault/core';
import { ExampleService } from './example.service';

/**
 * Application-level configuration for the Tab Sync example.
 *
 * Registers the Vault runtime and the ExampleService FeatureCell
 * with cross-tab synchronization via withTabSyncStateBehavior
 * and withTabSyncController.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Creates the Vault runtime (state container + lifecycle)
    provideVault({ logLevel: 'off', devMode: true, bypassLicensing: true }),

    // Define a FeatureCell (state + behaviors + controllers)
    provideFeatureCell(
      // Service class that owns the FeatureCell instance
      ExampleService,

      // FeatureCell descriptor (identity + initial state)
      {
        // Unique state key used by the Vault
        key: 'example-feature-cell-key',

        // Fallback Initial value for the state
        initialState: []
      },

      // Optional definition-time extensions
      [
        // --> Register add-on behaviors here <--
        withTabSyncStateBehavior
      ],
      [
        // --> Register add-on controllers here <--
        withTabSyncController
      ]
    )
  ]
};
`,
    'src/app/example.component.html': `<div class="example-container">
  <div class="header">
    <div class="title">Angular - SDuX Vault Tab Sync Example</div>
    <div class="subtitle">
      This example demonstrates cross-tab state synchronization. Open this page
      in two browser tabs — updating state in one tab automatically propagates
      the change to the other via BroadcastChannel.
    </div>
  </div>

  <div class="section">
    <div class="label">Tab Sync Flow</div>
    <div class="flow-hint">Tab A → BroadcastChannel → Tab B</div>
  </div>
  <div class="section">
    <div class="state-container">
      <label class="label" for="sample-select">Sample Dataset</label>
      <div class="hint">
        Choose a character group to use as input state. Selecting a dataset
        updates the input preview — click Load Sample State to apply it.
      </div>
      <div class="hint">
        <select
          id="sample-select"
          class="sdux-select"
          (change)="onSampleChange(\$event)">
          @for (sample of samples; track \$index) {
            <option [value]="\$index" [selected]="\$index === 0">
              {{ sample[0].name }} {{ sample[0].lastName }},
              {{ sample[1].name }} {{ sample[1].lastName }},
              {{ sample[2].name }} {{ sample[2].lastName }}
            </option>
          }
        </select>
      </div>
    </div>
  </div>

  <div class="section column">
    <div class="state-container">
      <div class="label">Input State</div>
      <div class="hint">Data to replace and broadcast across tabs</div>
      <div class="hint file">
        <span class="emphasis">File:</span> app/example.component.ts
      </div>
      <textarea class="data-textarea">{{ activeSample() | json }}</textarea>
    </div>

    <div class="state-container data-row">
      <div class="label">Synced FeatureCell State</div>
      <div class="hint">State synchronized across tabs</div>
      <div class="hint file">
        <span class="emphasis">File:</span> app/example.service.ts
      </div>
      @if (state.hasValue()) {
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
          value for state.
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
        Load &amp; Sync State
      </button>

      <div class="secondary-actions">
        <button class="sdux-button" (click)="resetState()">Reset State</button>
      </div>
    </div>
  </div>

  <div class="section learn-more">
    <div class="label">Learn More</div>
    <div class="learn-more-links">
      <a
        href="https://www.sdux-vault.com/docs/pipeline/behaviors/state"
        target="_blank"
        rel="noopener noreferrer"
        >State</a
      >
      <span class="separator">·</span>
      <a
        href="https://www.sdux-vault.com/docs/pipeline/behaviors/tab-sync"
        target="_blank"
        rel="noopener noreferrer"
        >Tab Sync</a
      >
      <span class="separator">·</span>
      <a
        href="https://www.sdux-vault.com/docs/pipeline/behaviors/state/updating"
        target="_blank"
        rel="noopener noreferrer"
        >Updating State</a
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
    'src/app/example.component.ts': `import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ExampleService } from './example.service';

/**
 * UI component for the Tab Sync example.
 *
 * This component consumes the Vault-backed state exposed by ExampleService
 * and demonstrates cross-tab state synchronization. When state is updated
 * in one tab, the withTabSyncStateBehavior broadcasts the finalized snapshot
 * to other tabs via BroadcastChannel.
 *
 * The component does not manage state directly — it delegates all state
 * updates and lifecycle orchestration to the FeatureCell service.
 */
@Component({
  selector: 'example-view',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: 'example.component.html',
  styleUrls: ['../styles.scss', 'example.component.scss']
})
export class ExampleComponent {
  /**
   * Injected FeatureCell service.
   *
   * This provides access to the Vault instance and all
   * runtime pipeline behavior configured in the service.
   */
  #exampleService = inject(ExampleService);

  /**
   * Reactive StateSnapshotShape<T> accessor exposed by the Vault.
   *
   * Provides reactive access to:
   * - value()
   * - hasValue()
   *
   * The template binds directly to these signals for rendering.
   *
   * Components may read from state,
   * but must call service methods to modify it.
   */
  state = this.#exampleService.state;

  /**
   * Sample datasets used to demonstrate state replacement.
   */
  samples = [
    [
      { id: 11, name: 'Luke', lastName: 'Skywalker' },
      { id: 38, name: 'Leia', lastName: 'Organa' },
      { id: 9, name: 'Han', lastName: 'Solo' }
    ],
    [
      { id: 22, name: 'Anakin', lastName: 'Skywalker' },
      { id: 44, name: 'Padmé', lastName: 'Amidala' },
      { id: 66, name: 'Obi-Wan', lastName: 'Kenobi' }
    ],
    [
      { id: 77, name: 'Din', lastName: 'Djarin' },
      { id: 88, name: 'Ahsoka', lastName: 'Tano' },
      { id: 99, name: 'Bo-Katan', lastName: 'Kryze' }
    ]
  ];

  /** Currently selected sample dataset. */
  readonly activeSample = signal(this.samples[0]);

  /** Hint text describing the current active state. */
  readonly activeStateHint = signal('Initial value is [] (empty array)');

  /** Whether to display the active state hint. */
  readonly displayActiveStateHint = signal(true);

  /**
   * Delegate a full state replacement to the FeatureCell service.
   *
   * The component does NOT mutate state directly.
   * Instead, it forwards the intent to the service,
   * which owns the Vault and pipeline configuration.
   *
   * When Tab Sync is enabled, the pipeline broadcasts the
   * finalized snapshot to all other tabs via BroadcastChannel.
   *
   * Architectural Flow:
   * Button Click
   *   → Component method
   *   → Service method
   *   → Vault update
   *   → Pipeline execution
   *   → BroadcastChannel broadcast
   *   → Reactive UI refresh (all tabs)
   */
  loadSample(): void {
    this.displayActiveStateHint.set(false);
    this.activeStateHint.set('State updated and broadcast to all tabs.');
    this.#exampleService.replace(this.activeSample());
  }

  /**
   * Updates the active sample when the dropdown selection changes.
   */
  onSampleChange(event: Event): void {
    const index = Number((event.target as HTMLSelectElement).value);
    this.activeSample.set(this.samples[index]);
  }

  /**
   * Resets the FeatureCell state to its initial value.
   */
  resetState(): void {
    this.#exampleService.reset();
  }
}
`,
    'src/app/example.service.ts': `import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';

/**
 * Shape representing a single example entity in the FeatureCell state.
 */
export interface Example {
  /** Unique identifier for the example entry. */
  id: number;

  /** First name of the character. */
  name: string;

  /** Last name of the character. */
  lastName: string;
}

/**
 * FeatureCell service for the Tab Sync example.
 *
 * This service owns the Vault-backed state and demonstrates cross-tab
 * state synchronization using withTabSyncStateBehavior and
 * withTabSyncController. State changes made through this service are
 * automatically broadcast to other browser tabs via BroadcastChannel.
 */
@FeatureCell<Example[]>('example-feature-cell-key')
@Injectable({ providedIn: 'root' })
export class ExampleService {
  /**
   * Internal Vault handle for this FeatureCell.
   *
   * ⚠️ Architectural Boundary:
   * The Vault instance is owned exclusively by this service.
   * Components must NEVER access the Vault directly.
   *
   * This ensures:
   * - Centralized state mutation
   * - Controlled pipeline configuration
   * - Proper lifecycle management
   * - Clear separation of concerns
   *
   * All state updates must go through service methods.
   */
  readonly #vault = injectVault<Example[]>(ExampleService);

  /**
   * Public reactive state snapshot exposed to consumers.
   *
   * This is the ONLY surface components should use.
   *
   * Provides read-only reactive access to:
   * - value()
   * - isLoading()
   * - error()
   * - hasValue()
   *
   * Components may read from state,
   * but must call service methods to modify it.
   */
  readonly state = this.#vault.state;

  /**
   * Configures the Vault runtime pipeline with filters, reducers,
   * and finalizes the FeatureCell initialization.
   */
  constructor() {
    // Runtime pipeline configuration
    this.#vault
      // Finalizes configuration and activates the FeatureCell pipeline.
      //
      // After initialize() is called:
      //
      // - The pipeline structure becomes immutable
      // - No additional behaviors or operators may be registered
      // - All subsequent state updates flow through the configured pipeline
      //
      // No state updates will be processed before initialize() is called.
      .initialize();
  }

  /**
   * Replace the entire state synchronously.
   */
  replace(input: Example[]): void {
    this.#vault.replaceState({
      loading: false,
      value: input,
      error: null
    });
  }

  /**
   * Resets the FeatureCell state to its initial value.
   */
  reset(): void {
    this.#vault.reset();
  }
}
`,
    'src/index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>SDuX Vault Tab Sync Example</title>
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
