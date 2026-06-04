import { provideZonelessChangeDetection, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { VaultLicensePayloadShape } from '@sdux-vault/shared';
import { VaultConfigMessageShape } from '../../shapes/vault-config-message.shape';
import { InsightService } from '../insight/insight.service';
import { DevtoolsRegistryService } from './devtools-registry.service';

describe('DevtoolsRegistryService', () => {
  let service: DevtoolsRegistryService;
  const mockVaultConfig = signal<VaultConfigMessageShape | null>(null);
  const mockInsight = {
    vaultConfig: mockVaultConfig,
    refreshLocalConfig: jasmine.createSpy('refreshLocalConfig')
  };

  beforeEach(() => {
    mockInsight.refreshLocalConfig.calls.reset();
    mockVaultConfig.set(null);

    TestBed.configureTestingModule({
      providers: [
        DevtoolsRegistryService,
        { provide: InsightService, useValue: mockInsight },
        provideZonelessChangeDetection()
      ]
    });
    service = TestBed.inject(DevtoolsRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call refreshLocalConfig on construction', () => {
    expect(mockInsight.refreshLocalConfig).toHaveBeenCalled();
  });

  describe('registry', () => {
    it('should return empty array when no config', () => {
      expect(service.registry()).toEqual([]);
    });

    it('should return registry entries excluding devtools cell', () => {
      mockVaultConfig.set({
        versions: {},
        license: null,
        registry: [
          {
            key: 'app::cell',
            behaviorsRegistered: true,
            controllersRegistered: true,
            fluentApis: null,
            behaviors: [],
            controllers: []
          },
          {
            key: 'vault::devtools::logging::feature::cell',
            behaviorsRegistered: true,
            controllersRegistered: true,
            fluentApis: null,
            behaviors: [],
            controllers: []
          }
        ]
      });
      expect(service.registry().length).toBe(1);
      expect(service.registry()[0].key).toBe('app::cell');
    });
  });

  describe('versions', () => {
    it('should return empty array when no config', () => {
      expect(service.versions()).toEqual([]);
    });

    it('should return sorted version entries', () => {
      mockVaultConfig.set({
        versions: {
          '@sdux-vault/core': '1.0.0',
          '@sdux-vault/angular': '2.0.0'
        },
        license: null,
        registry: null
      });
      const versions = service.versions();
      expect(versions[0][0]).toBe('@sdux-vault/angular');
      expect(versions[1][0]).toBe('@sdux-vault/core');
    });
  });

  describe('license', () => {
    it('should return null when no config', () => {
      expect(service.license()).toBeNull();
    });

    it('should return license when present', () => {
      const mockLicense: VaultLicensePayloadShape = {
        organization: 'Test',
        domain: 'test.com',
        licenseType: 'enterprise',
        issuedAt: 1000,
        expires: 2000 as number | 'forever',
        verified: true
      };
      mockVaultConfig.set({
        versions: {},
        license: mockLicense,
        registry: null
      });
      expect(service.license()).toEqual(mockLicense);
    });
  });

  describe('getCell', () => {
    it('should return null when cell not found', () => {
      expect(service.getCell('nonexistent')).toBeNull();
    });

    it('should return matching cell by key', () => {
      const cell = {
        key: 'app::cell',
        behaviorsRegistered: true,
        controllersRegistered: true,
        fluentApis: null,
        behaviors: [],
        controllers: []
      };
      mockVaultConfig.set({
        versions: {},
        license: null,
        registry: [cell]
      });
      expect(service.getCell('app::cell')).toEqual(cell);
    });
  });
});
