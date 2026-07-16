import { GeneratedFileInputShape } from '../../shapes/file-builder/generated-file-input.shape';
import { GeneratedFileShape } from '../../shapes/file-builder/generated-file.shape';
import { FileTypes } from '../../types/file-builder/file.type';
import { StackblitzFileTypes } from '../../types/file-builder/stackblitz-file.type';

export class PipelineFileBuilderAngularService {
  #id = 0;
  getBuildId(): string {
    return `${Date.now()}-${this.#id++}`;
  }

  generatedAngularFiles(input: GeneratedFileInputShape): GeneratedFileShape[] {
    const {
      serviceVaultName,
      serviceName,
      instantiatedServiceName,
      featureCellImports,
      npm,
      initialValueDisplay,
      featureCellBehaviorArray,
      featureCellControllerArray,
      vaultImports,
      type,
      vaultChain,
      featureCellKey,
      coreBehaviorNotes,
      serviceExamples,
      componentExamples,
      interfaceDefinition
    } = input;

    const componentName = 'ExampleComponent';
    return [
      {
        id: this.getBuildId(),
        name: 'installation',
        type: FileTypes.All,
        contents: `${npm}`
      },
      {
        id: this.getBuildId(),
        name: 'app.config.ts',
        type: FileTypes.All,
        stackBlitzFileType: StackblitzFileTypes.AngularAppConfig,
        contents: `${featureCellImports}
import { ApplicationConfig } from '@angular/core';
import { provideVault, provideFeatureCell } from '@sdux-vault/angular';
import { ${serviceName} } from './example.service';
            
export const appConfig: ApplicationConfig = {
  providers: [

    // Creates the Vault runtime (state container + lifecycle)
    provideVault({ logLevel: 'off' }),
${coreBehaviorNotes}
    // Define a FeatureCell (state + behaviors + controllers)
    provideFeatureCell(

      // Service class that owns the FeatureCell instance
      ${serviceName},

      // FeatureCell descriptor (identity + initial state)
      {

        // Unique state key used by the Vault
        key: '${featureCellKey}',

        // Fallback Initial value for the state
        initialState: ${initialValueDisplay}
      },

      // Optional definition-time extensions
      ${featureCellBehaviorArray},
      ${featureCellControllerArray}
    )
  ]
};`
      },
      {
        id: this.getBuildId(),
        name: 'example.service.ts',
        type: FileTypes.Simple,
        stackBlitzFileType: StackblitzFileTypes.AngularService,
        contents: `${vaultImports}
import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
${interfaceDefinition}

/**
 * FeatureCell service for the '${featureCellKey}' state.
 *
 * This service owns the Vault-backed state and applies
 * runtime pipeline behaviors configured via the Vault fluent API.
 */
@FeatureCell<${type}>('${featureCellKey}')
@Injectable({ providedIn: 'root' })
export class ${serviceName} {

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
  readonly ${serviceVaultName} = injectVault<${type}>(${serviceName});

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

  constructor() {

    // Runtime pipeline configuration
    ${vaultChain}
  }

${serviceExamples}
}`
      },
      {
        id: this.getBuildId(),
        name: `example.component.ts`,
        type: FileTypes.Simple,
        stackBlitzFileType: StackblitzFileTypes.AngularComponent,
        contents: `import { ${serviceName} } from './example.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
        
 /**
 * UI component responsible for rendering the example FeatureCell state.
 *
 * This component consumes the Vault-backed state exposed by ${serviceName}
 * and reacts to its value, loading, and error signals.
 *
 * The component does not manage state directly — it delegates all state
 * updates and lifecycle orchestration to the FeatureCell service.
 */
@Component({
  selector: 'example-view',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: \`
    <div style="margin-bottom: 1rem;">
      <button (click)="loadSample()">
        Click me to add data
      </button>
    </div>

    <!-- Render state value when available -->
    @if (state.hasValue()) {
      <div>
        <p>${type}: {{ state.value() | json }}</p>
      </div>
    }

    <!-- Render loading state -->
    @if (state.isLoading()) {
      <div>
        Loading...
      </div>
    }

    <!-- Render error state -->
    @if (state.error()) {
      <div>
        Error: {{ state.error()?.message }}
      </div>
    }
  \`
})
export class ${componentName}{
  /**
   * Injected FeatureCell service.
   *
   * This provides access to the Vault instance and all
   * runtime pipeline behavior configured in the service.
  */
  ${instantiatedServiceName} = inject(${serviceName});

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
  state = this.${instantiatedServiceName}.state;

${componentExamples}
}`
      },

      {
        id: this.getBuildId(),
        name: 'example.service.ts',
        type: FileTypes.FromStream,
        contents: `${vaultImports}
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';

/**
 * FeatureCell service for the '${featureCellKey}' state.
 *
 * This service owns the Vault-backed state and integrates
 * external observable streams via fromStream().
 */
@FeatureCell<${type}>('${featureCellKey}')
@Injectable({ providedIn: 'root' })
export class ${serviceName} {

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
   * All stream connections must go through this service.
   */
  readonly ${serviceVaultName} = injectVault<${type}>(${serviceName});

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
   * Components may READ from state,
   * but must call service methods to MODIFY state.
   */
  readonly state = this.${serviceVaultName}.state;

  constructor() {

    // Runtime pipeline configuration
    ${vaultChain}
  }

  /**
   * Connect an external observable stream to this FeatureCell.
   *
   * Each emitted value becomes a standard state update
   * and flows through the normal Vault pipeline.
   *
   * The subscription lifecycle is automatically managed
   * by the FeatureCell and is cleaned up on reset/destroy.
   *
   * This method demonstrates proper stream delegation:
   *
   * Component → Service → Vault → Pipeline
   */
  connectStream(source$: Observable<${type}>): void {
    this.${serviceVaultName}.fromStream(source$);
  }
}`
      },

      {
        id: this.getBuildId(),
        name: `example.component.ts`,
        type: FileTypes.FromStream,
        contents: `import { ${serviceName} } from './example.service';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { Subject, takeUntil } from 'rxjs';

/**
 * Advanced example component demonstrating:
 *
 * - Reactive Angular form input
 * - Debounced valueChanges stream
 * - Delegation to FeatureCell via fromStream()
 *
 * Architectural Flow:
 *
 * UI Input → RxJS Stream → Service → Vault → Pipeline
 *
 * The component never touches the Vault directly.
 */
@Component({
  selector: 'example-view',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: \`
    <div>
      <label>Search</label>
      <input type="text" [formControl]="searchControl" />
    </div>

    <hr />

    <!-- Render state value when available -->
    @if (state.hasValue()) {
      <div>
        <p>Entities: {{ state.value() | json }}</p>
      </div>
    }

    <!-- Render loading state -->
    @if (state.isLoading()) {
      <div>
        Loading...
      </div>
    }

    <!-- Render error state -->
    @if (state.error()) {
      <div>
        Error: {{ state.error()?.message }}
      </div>
    }
  \`
})
export class ${componentName} implements OnInit, OnDestroy {

  /**
   * Injected FeatureCell service.
   *
   * The component NEVER accesses the Vault directly.
   */
  readonly ${instantiatedServiceName} = inject(${serviceName});

  /**
   * Public reactive state snapshot.
   */
  readonly state = this.${instantiatedServiceName}.state;

  /**
   * Reactive input control.
   */
  readonly searchControl = new FormControl('');

  /**
   * Internal destroy notifier for stream cleanup.
   */
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {

    /**
     * Convert input valueChanges into a debounced stream
     * and delegate it to the FeatureCell.
     */
    const stream$ = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      takeUntil(this.destroy$)
    );

    this.${instantiatedServiceName}.mergeStream(stream$);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}`
      },
      {
        id: this.getBuildId(),
        name: `ai-assist.md`,
        type: FileTypes.AiAssist,
        contents: input.aiAssist
      }
    ];
  }
}
