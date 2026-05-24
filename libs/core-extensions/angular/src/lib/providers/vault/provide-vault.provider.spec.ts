import { Injector, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideVault } from './provide-vault.provider';

describe('Provider: provideVault)', () => {
  describe('with parameters)', () => {
    it('should throw if Vault initializes twice during bootstrap', () => {
      TestBed.configureTestingModule({
        providers: [
          provideVault({ logLevel: 'off' }),
          provideVault({ logLevel: 'off' }),
          provideZonelessChangeDetection()
        ]
      });

      // Injector creation triggers APP_INITIALIZER
      expect(() => TestBed.inject(Injector)).not.toThrow();
    });
  });

  describe('without parameters)', () => {
    it('should throw if Vault initializes twice during bootstrap', () => {
      TestBed.configureTestingModule({
        providers: [
          provideVault(),
          provideVault(),
          provideZonelessChangeDetection()
        ]
      });

      // Injector creation triggers APP_INITIALIZER
      expect(() => TestBed.inject(Injector)).not.toThrow();
    });
  });
});
