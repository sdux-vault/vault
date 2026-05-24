import { CommonModule } from '@angular/common';
import {
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NgModule, provideZonelessChangeDetection } from '@angular/core';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { SDUX_BRAND_NAME } from '../tokens/brand-name.token';
import { SDUX_CATCH_PHRASE } from '../tokens/catch-phrase.token';
import { SDUX_VAULT_BRAND_NAME } from '../tokens/vault-brand-name.token';

import { provideVaultTesting } from '@sdux-vault/angular';
import { PipelineProvideFeatureCell } from 'apps/docs-app/app/cells/feature-cells';
import { SDUX_FEATURE_CELL_BRAND_NAME } from '../tokens/feature-cell-brand-name.token';
import { SDUX_PACKAGE_NAME } from '../tokens/package-name.token';
import { WINDOW } from '../tokens/window.token';

@NgModule({
  imports: [MatIconTestingModule, BrowserModule, CommonModule],
  providers: [
    provideVaultTesting({
      devMode: true,
      logLevel: 'off'
    }),
    PipelineProvideFeatureCell,
    provideRouter([]),
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClientTesting(),
    provideZonelessChangeDetection(),
    {
      provide: SDUX_VAULT_BRAND_NAME,
      useValue: 'Mock VBN'
    },
    {
      provide: SDUX_BRAND_NAME,
      useValue: 'Mock BN'
    },
    {
      provide: SDUX_PACKAGE_NAME,
      useValue: 'Mock PN'
    },
    {
      provide: WINDOW,
      useValue: {
        location: {
          href: ''
        }
      }
    },
    {
      provide: SDUX_CATCH_PHRASE,
      useValue: 'Mock CP'
    },
    { provide: SDUX_FEATURE_CELL_BRAND_NAME, useValue: 'Mock FC' }
  ]
})
export class sduxTestingModule {}
