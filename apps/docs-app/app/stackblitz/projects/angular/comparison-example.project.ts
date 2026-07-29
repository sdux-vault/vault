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
    'src/app.config.ts': `import { ApplicationConfig } from '@angular/core';
import { provideFeatureCell, provideVault } from '@sdux-vault/angular';
import { EmployeeCell } from './employee.service';

/**
 * Registers the Vault runtime and the employees FeatureCell for the standalone
 * Angular application. The descriptor supplies the state key and its initial
 * empty-array value before the component starts interacting with the cell.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideVault({ logLevel: 'off' }),
    provideFeatureCell(EmployeeCell, {
      key: 'employees',
      initialState: []
    })
  ]
};
`,
    'src/employee.model.ts': `/**
 * Describes the employee records used as the FeatureCell's array state. The
 * filter and reducer pipeline use the identifier and name to process records.
 */
export interface Employee {
  /** Identifies the employee and determines whether the filter keeps it. */
  id: number;

  /** Supplies the employee name used by the sorting reducer. */
  name: string;
}
`,
    'src/employee.service.ts': `import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { Employee } from './employee.model';

/**
 * Owns the employees FeatureCell and exposes its reactive state to the
 * component. The configured pipeline filters out even identifiers, sorts the
 * remaining records by name, and then publishes the processed array.
 *
 * ⚠️ Architectural Boundary:
 * The Vault handle remains private to this service. Components request state
 * changes through these methods so pipeline processing stays centralized.
 */
@FeatureCell<Employee[]>('employees')
@Injectable({ providedIn: 'root' })
export class EmployeeCell {
  /** Private Vault handle used to configure and update the FeatureCell. */
  readonly #vault = injectVault<Employee[]>(EmployeeCell);

  /** Reactive snapshot exposing the current value, loading, and error state. */
  readonly state = this.#vault.state;

  /** Configures the filter and reducer stages before activating the cell. */
  constructor() {
    this.#vault
      .filters([
        (examples: Employee[]) =>
          examples.filter((example) => example.id % 2 !== 0)
      ])
      .reducers([
        (examples: Employee[]) => {
          examples.sort((left, right) => left.name.localeCompare(right.name));
          return examples;
        }
      ])
      .initialize();
  }

  /**
   * Replaces the current employees and sends the input through the pipeline.
   *
   * @param employees - Records to filter, sort, and publish as state.
   * @returns Nothing; the resulting state is exposed through the reactive snapshot.
   */
  replace(employees: Employee[]): void {
    this.#vault.replaceState({
      loading: false,
      value: employees,
      error: null
    });
  }

  /**
   * Starts an asynchronous employee-state update from the example API.
   *
   * @returns Nothing; the Vault snapshot reports loading, success, or error state.
   */
  replaceAsync(): void {
    this.#vault.replaceState({
      value: () =>
        fetch('https://jsonplaceholder.typicode.com/users').then((response) =>
          response.json()
        )
    });
  }

  /**
   * Restores the FeatureCell's configured initial state.
   *
   * @returns Nothing; consumers observe the reset through the reactive snapshot.
   */
  reset(): void {
    this.#vault.reset();
  }
}
`,
    'src/example.component.html': `<div class="example-container">
  A few changes to this Angular example from the original comparison example:
  <ol>
    <li>CSS styling</li>
    <li>
      Async fetch changed to "https://jsonplaceholder.typicode.com/users". Note:
      The live API causes a flash in the UI when the "Load Async State" button
      is clicked because there is a "Loading..." message displayed while the
      data is resolving. The API is too responsive to allow for reading the
      message.
    </li>
  </ol>
  <div>
    @if (state.isLoading()) {
      <div>Loading...</div>
    } @else if (state.error()) {
      <div>{{ state.error() }}</div>
    } @else {
      <textarea class="textarea" readonly>{{ state.value() | json }}</textarea>
    }
  </div>

  <div class="actions">
    <button type="button" class="sdux-button" (click)="loadSample()">
      Load Sample State
    </button>

    <button type="button" class="sdux-button" (click)="loadSampleAsync()">
      Load Async State
    </button>

    <button type="button" class="sdux-button" (click)="resetState()">
      Reset State
    </button>
  </div>
</div>
`,
    'src/example.component.scss': `\$gap: 0.75rem;
\$padding: 1rem;
\$text-area-height: 175px;
\$border: 1px solid rgba(0, 0, 0, 0.08);
\$button-height: 40px;
\$button-color: #ffffff;
\$button-background: #1976d2;
\$button-border: #004ba0;
\$button-radius: 0.3125rem;
\$button-font-size: 0.875rem;
\$button-spacing: 0.25rem;
\$button-font-weight: 600;

.example-container {
  display: flex;
  flex-direction: column;
  gap: \$gap;
  padding: \$padding;
  width: 800px;

  .textarea {
    width: 100%;
    box-sizing: border-box;
    height: \$text-area-height;
    padding: 0.5rem;
    border: \$border;
    border-radius: 6px;
    font-family: monospace;
    font-size: 0.8rem;
    background: #fafafa;
    color: #222;
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
  }
}

.sdux-button {
  height: \$button-height;
  color: \$button-color;
  background-color: \$button-background;
  border: 1px solid \$button-border;
  border-radius: \$button-radius;
  font-size: \$button-font-size;
  padding: 0.5rem;
  gap: \$button-spacing;
  font-weight: \$button-font-weight;
  min-width: 125px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:focus {
    outline: none;
  }
}
`,
    'src/example.component.ts': `import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EmployeeCell } from './employee.service';

/**
 * Renders the employees state and delegates user actions to EmployeeCell.
 * The template reads the cell's reactive snapshot to display loading, errors,
 * and the filtered and sorted employee value.
 */
@Component({
  selector: 'example-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {
  /** Injected service that owns the employees FeatureCell and its pipeline. */
  #employeeCell = inject(EmployeeCell);

  /** Reactive state snapshot consumed by the Angular template. */
  readonly state = this.#employeeCell.state;

  /** Sample records used to demonstrate synchronous pipeline processing. */
  readonly sample = [
    { id: 11, name: 'Luke' },
    { id: 38, name: 'Leia' },
    { id: 9, name: 'Han' }
  ];

  /**
   * Sends the sample records to the FeatureCell for filtering and sorting.
   *
   * @returns Nothing; the template refreshes from the updated reactive state.
   */
  loadSample(): void {
    this.#employeeCell.replace(this.sample);
  }

  /**
   * Requests asynchronous state loading from the FeatureCell service.
   *
   * @returns Nothing; loading and settlement are reflected by the state snapshot.
   */
  loadSampleAsync(): void {
    this.#employeeCell.replaceAsync();
  }

  /**
   * Restores the FeatureCell's empty initial state.
   *
   * @returns Nothing; the template observes the reset reactively.
   */
  resetState(): void {
    this.#employeeCell.reset();
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
    'src/main.ts': `import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { ExampleComponent } from './example.component';

bootstrapApplication(ExampleComponent, appConfig).catch((error: unknown) => {
  console.error(error);
});
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
