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

import { createVaultErrorComponent } from './create-vault-error.component';
import { defineBehaviorKeyComponent } from './define-behavior-key.component';
import { defineControllerKeyComponent } from './define-controller-key.component';
import { defineVaultKeyComponent } from './define-vault-key.component';
import { EventBusComponent } from './event-bus.component';
import { FeatureCellComponent } from './feature-cell.component';
import { getVaultLogLevelComponent } from './get-vault-log-level.component';
import { isDeferredFactoryComponent } from './is-deferred-factory.component';
import { isDefinedComponent } from './is-defined.component';
import { isFunctionComponent } from './is-function.component';
import { isHttpResourceRefComponent } from './is-http-resource-ref.component';
import { isNullComponent } from './is-null.component';
import { isNullishComponent } from './is-nullish.component';
import { isObjectComponent } from './is-object.component';
import { isolateValueComponent } from './isolate-value.component';
import { isPromiseComponent } from './is-promise.component';
import { isStateInputShapeComponent } from './is-state-input-shape.component';
import { isUndefinedComponent } from './is-undefined.component';
import { isVaultClearStateComponent } from './is-vault-clear-state.component';
import { isVaultContinueComponent } from './is-vault-continue.component';
import { isVaultNoopComponent } from './is-vault-noop.component';
import { registerVersionComponent } from './register-version.component';
import { safeStringifyComponent } from './safe-stringify.component';
import { setVaultLogLevelComponent } from './set-vault-log-level.component';
import { validateBehaviorKeyComponent } from './validate-behavior-key.component';
import { validateControllerKeyComponent } from './validate-controller-key.component';
import { VaultComponent } from './vault.component';
import { vaultDebugComponent } from './vault-debug.component';
import { vaultErrorComponent } from './vault-error.component';
import { VaultErrorServiceComponent } from './vault-error-service.component';
import { vaultLogComponent } from './vault-log.component';
import { vaultWarnComponent } from './vault-warn.component';

@Component({
  selector: 'sdux-references-functions-splashpage',
  standalone: true,
  imports: [
    NotFoundComponent,
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    createVaultErrorComponent,
    defineBehaviorKeyComponent,
    defineControllerKeyComponent,
    defineVaultKeyComponent,
    EventBusComponent,
    FeatureCellComponent,
    getVaultLogLevelComponent,
    isDeferredFactoryComponent,
    isDefinedComponent,
    isFunctionComponent,
    isHttpResourceRefComponent,
    isNullComponent,
    isNullishComponent,
    isObjectComponent,
    isolateValueComponent,
    isPromiseComponent,
    isStateInputShapeComponent,
    isUndefinedComponent,
    isVaultClearStateComponent,
    isVaultContinueComponent,
    isVaultNoopComponent,
    registerVersionComponent,
    safeStringifyComponent,
    setVaultLogLevelComponent,
    validateBehaviorKeyComponent,
    validateControllerKeyComponent,
    VaultComponent,
    vaultDebugComponent,
    vaultErrorComponent,
    VaultErrorServiceComponent,
    vaultLogComponent,
    vaultWarnComponent
  ],
  templateUrl: './references-functions.component.html',
  styleUrls: ['../../scss/example.scss']
})
export class ReferencesFunctionsLandingPageComponent {
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
