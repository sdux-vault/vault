import { Project } from '@stackblitz/sdk';

export const debuggerExampleProject: Project = {
  title: 'angular-debugger-example',
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
  "name": "angular-debugger-example",
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
import { InsightConfig } from '@sdux-vault/shared';
import { ExampleService } from './example.service';

/**
 * Application-level configuration for the Angular standalone bootstrap.
 *
 * Registers the Vault runtime and the ExampleService FeatureCell
 * as dependency injection providers.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Creates the Vault runtime (state container + lifecycle)
    provideVault({
      logLevel: 'off',
      devMode: true
    }),

    // Define a FeatureCell (state + behaviors + controllers)
    provideFeatureCell(
      // Service class that owns the FeatureCell instance
      ExampleService,

      // FeatureCell descriptor (identity + initial state)
      {
        // Unique state key used by the Vault
        key: 'example-feature-cell-key',

        // Fallback Initial value for the state
        initialState: [],

        // Insights enable the debugger to capture runtime telemetry for this
        // FeatureCell. Each flag controls what data the debugger records:
        //
        //   wantsErrors     — Capture error signals emitted during pipeline execution.
        //   wantsPayload    — Capture operation payloads for each pipeline event.
        //   wantsState      — Capture full state snapshots (can produce large exports).
        //   wantsCandidates — Capture pipeline candidate snapshots for state diff analysis.
        //
        // At minimum, enable wantsErrors and wantsPayload for useful debug sessions.
        insights: {
          wantsErrors: true,
          wantsPayload: true,
          wantsState: false,
          wantsCandidates: true
        } as InsightConfig
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
    'src/app/example.component.html': `<div class="example-container">
  <div class="header">
    <div class="title">SDuX Vault Debugger Example</div>
    <div class="subtitle">
      This example demonstrates the SDuX Vault built-in debugger — a floating
      panel that captures pipeline execution traces. Record a session, trigger
      state changes, then export logs or generate an AI diagnostic report.
    </div>
  </div>

  <div class="section">
    <div class="label">Debugger Flow</div>
    <div class="flow-hint">Record → FeatureCell Activity → Stop → Download</div>
  </div>

  <div class="section column">
    <div class="state-container">
      <div class="label">1. Enable Dev Mode in Vault Definition</div>
      <div class="hint">
        The debugger is enabled via
        <span class="emphasis">devMode: true</span> in the Vault configuration.
        This example already has it enabled.
      </div>
      <div class="hint file">
        <span class="emphasis">File:</span> app/app.config.ts
      </div>
      <textarea class="textarea" readonly>
provideVault({
  devMode: true,
  logLevel: 'off'
})
      </textarea>
    </div>

    <div class="state-container">
      <div class="label">2. Add insights to the FeatureCell Definition</div>
      <div class="hint">
        <span class="emphasis">Insights</span> provide additional context for
        the debugger to capture during pipeline execution. This example already
        has insights enabled.
      </div>
      <div class="hint file">
        <span class="emphasis">File:</span> app/app.config.ts
      </div>
      <textarea class="textarea" readonly>
 provideFeatureCell(
  ExampleService,
  {
    key: 'example-feature-cell-key',
    initialState: [],
    insights: {
      wantsErrors: true,
      wantsPayload: true,
      wantsState: false
    } as InsightConfig
  }
)
      </textarea>
    </div>
  </div>

  <div class="section column">
    <div class="state-container">
      <div class="label">3. Record a Session</div>
      <div class="hint">
        To record a FeatureCell session, click the "Record" button, then trigger
        state changes by clicking "Load Sample State" in the UI. The debugger
        captures each pipeline event, including filter and reducer executions,
        state emissions, and any errors.
      </div>
      <div class="hint">
        After finishing all state changes, click "Stop" to end the recording
        session. You can then download the captured logs as a JSON file for
        analysis or use the AI Assist feature to generate an automated
        diagnostic report.
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Control</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Record / Stop</td>
            <td>Start or end a recording session</td>
          </tr>
          <tr>
            <td>Event Count</td>
            <td>Total captured pipeline events</td>
          </tr>
          <tr>
            <td>Error Count</td>
            <td>Captured error signals</td>
          </tr>
          <tr>
            <td>Clear</td>
            <td>Reset the current session</td>
          </tr>
          <tr>
            <td>Download Logs</td>
            <td>Export the debug dump (JSON)</td>
          </tr>
          <tr>
            <td>AI Assist</td>
            <td>Generate an AI diagnostic report</td>
          </tr>
          <tr>
            <td>Create Issue</td>
            <td>Generate a structured issue report</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="section">
    <div class="hint">
      <strong>Note:</strong> This example uses a filter (removes "Han") and a
      reducer (marks Jedi). See
      <span class="emphasis">app/example.service.ts</span> for the pipeline
      configuration.
    </div>
  </div>

  <div class="section column">
    <div class="state-container">
      <div class="label">Input State</div>
      <div class="hint">
        Raw data before processing — click "Load Sample State" to trigger
        pipeline activity
      </div>
      <div class="hint file">
        <span class="emphasis">File:</span> app/example.component.ts
      </div>
      <textarea class="data-textarea">{{ sample | json }}</textarea>
    </div>

    <div class="state-container data-row">
      <div class="label">FeatureCell State</div>
      <div class="hint">
        Final state after filters and reducers run — the debugger captures each
        pipeline stage
      </div>
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
      <button type="button" class="sdux-button primary" (click)="loadSample()">
        Load Sample State
      </button>

      <div class="secondary-actions">
        <button type="button" class="sdux-button" (click)="resetState()">
          Reset State
        </button>
        <button type="button" class="sdux-button" (click)="toggleLoading()">
          Loading ({{ state.isLoading() }})
        </button>
        <button type="button" class="sdux-button" (click)="toggleError()">
          Error ({{ hasError() }})
        </button>
      </div>
    </div>
  </div>

  <div class="section learn-more">
    <div class="label">Learn More</div>
    <div class="learn-more-links">
      <a
        href="https://www.sdux-vault.com/docs/dev-tools/built-in-debugger"
        target="_blank"
        rel="noopener noreferrer"
        >Debugger</a
      >
      <span class="separator">·</span>
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
\$data-row-height: 430px;
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
        height: \$data-row-height;
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

      .data-table {
        width: 100%;
        border-collapse: collapse;
        font-size: \$text-area-font-size;
        font-family: monospace;
        background: #fafafa;
        border: \$border;
        border-radius: 6px;

        th,
        td {
          padding: 0.4rem 0.75rem;
          text-align: left;
          border-bottom: \$border;
        }

        th {
          font-weight: 600;
          color: #555;
        }

        td {
          color: #222;
        }

        tr:last-child td {
          border-bottom: none;
        }
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
import { ExampleService } from './example.service';

/**
 * UI component responsible for rendering the example FeatureCell state.
 *
 * This component consumes the Vault-backed state exposed by ExampleService
 * and reacts to its value, loading, and error signals.
 *
 * The component does not manage state directly — it delegates all state
 * updates and lifecycle orchestration to the FeatureCell service.
 */
@Component({
  selector: 'example-view',
  standalone: true,
  imports: [CommonModule],
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
   * - isLoading()
   * - error()
   * - hasValue()
   *
   * The template binds directly to these signals for rendering.
   */
  state = this.#exampleService.state;

  /**
   * Sample dataset used to demonstrate state replacement.
   */
  sample = [
    { id: 11, name: 'Luke', lastName: 'Skywalker' },
    { id: 38, name: 'Leia', lastName: 'Organa' },
    { id: 9, name: 'Han', lastName: 'Solo' }
  ];

  /** Hint text describing the current active state. */
  readonly activeStateHint = signal('Initial value is [] (empty array)');

  /** Whether to display the active state hint. */
  readonly displayActiveStateHint = signal(true);

  /** Whether the loading toggle is active. */
  readonly isLoading = signal(false);

  /** Whether the error state is currently set. */
  readonly hasError = computed<boolean>(() => this.state.error() !== null);

  /**
   * Delegate a full state replacement to the FeatureCell service.
   *
   * The component does NOT mutate state directly.
   * Instead, it forwards the intent to the service,
   * which owns the Vault and pipeline configuration.
   *
   * Architectural Flow:
   * Button Click
   *   → Component method
   *   → Service method
   *   → Vault update
   *   → Pipeline execution
   *   → Reactive UI refresh
   */
  loadSample(): void {
    this.displayActiveStateHint.set(false);
    this.activeStateHint.set(
      'State updated with sample data after filters and reducers run.'
    );
    this.#exampleService.replace(this.sample);
  }

  /**
   * Resets the FeatureCell state to its initial value.
   */
  resetState(): void {
    this.#exampleService.reset();
  }

  /**
   * Toggles the loading flag and updates the service state.
   */
  toggleLoading(): void {
    this.isLoading.update((loading) => !loading);
    this.#exampleService.toggleLoading(this.isLoading());
  }

  /**
   * Toggles the error state between an Error instance and null.
   */
  toggleError(): void {
    const error = this.hasError() ? null : new Error('Example error message');
    this.#exampleService.toggleError(error);
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

  /** Whether the character is a Jedi, set by the jediReducer. */
  jedi?: boolean;

  /** Whether the character is a Senator, set by the jediReducer. */
  senator?: boolean;
  // TODO - add more fields to demonstrate filter/reducer behavior
}

/**
 * FeatureCell service for the 'example-feature-cell-key' state.
 *
 * This service owns the Vault-backed state and applies
 * runtime pipeline behaviors configured via the Vault fluent API.
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
   * Reducer that marks Jedi and Senator roles on matching entries.
   *
   * @param examples - Current array of Example records.
   * @returns The mutated array with role flags applied.
   */
  readonly #jediReducer = (examples: Example[]) => {
    return examples.filter((example: Example) => {
      if (example.id === 11) {
        example.jedi = true;
      }

      example.senator = example.id === 38;

      return example;
    });
  };

  /**
   * Configures the Vault runtime pipeline with filters, reducers,
   * and finalizes the FeatureCell initialization.
   */
  constructor() {
    // Runtime pipeline configuration
    this.#vault
      // Filters may block or allow updates to continue through the pipeline
      .filters([
        (examples: Example[]) =>
          examples.filter((example) => example.name !== 'Han')
      ])
      // Reducers transform the working state
      .reducers([this.#jediReducer])
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

  /**
   * Toggles the loading flag on the current state.
   *
   * @param loading - Whether the state should indicate a loading status.
   */
  toggleLoading(loading: boolean): void {
    this.#vault.replaceState({
      loading,
      value: this.state.value()
    });
  }

  /**
   * Toggles the error state on the current FeatureCell.
   *
   * @param error - The error to set, or null to clear.
   */
  toggleError(error: Error | null): void {
    this.#vault.replaceState({
      error: error,
      value: this.state.value()
    });
  }
}
`,
    'src/index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>SDuX Angular Example</title>
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
