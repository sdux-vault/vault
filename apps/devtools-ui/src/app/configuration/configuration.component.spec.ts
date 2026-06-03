import {
  provideZonelessChangeDetection,
  signal,
  WritableSignal
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsightService } from '../services/insight/insight.service';
import { VaultConfigMessageShape } from '../shapes/vault-config-message.shape';
import { VaultRegistrationSerializedShape } from '../shapes/vault-registration-serialized.shape';
import { ConfigurationComponent } from './configuration.component';

const mockCell: VaultRegistrationSerializedShape = {
  key: 'alpha',
  behaviorsRegistered: true,
  controllersRegistered: true,
  fluentApis: null,
  behaviors: [
    { key: 'SDUX::Behavior::Core::Value', type: 'resolve' },
    {
      key: 'SDUX::Behavior::Addons::Encrypt',
      type: 'encrypt',
      needsLicense: true,
      licenseId: 'LIC-001'
    }
  ],
  controllers: [
    { key: 'SDUX::Controller::Core::CoreAbstain', type: 'controller' },
    {
      key: 'SDUX::Controller::Addons::Queue',
      type: 'controller',
      needsLicense: true,
      licenseId: 'LIC-002'
    }
  ]
};

const mockCell2: VaultRegistrationSerializedShape = {
  key: 'beta',
  behaviorsRegistered: true,
  controllersRegistered: true,
  fluentApis: null,
  behaviors: [{ key: 'SDUX::Behavior::Core::Filter', type: 'filter' }],
  controllers: []
};

class MockInsightService {
  readonly vaultConfig: WritableSignal<VaultConfigMessageShape | null> =
    signal(null);

  refreshLocalConfig = jasmine.createSpy('refreshLocalConfig');
}

describe('Component: Configuration', () => {
  let fixture: ComponentFixture<ConfigurationComponent>;
  let component: ConfigurationComponent;
  let mockService: MockInsightService;

  beforeEach(async () => {
    mockService = new MockInsightService();

    await TestBed.configureTestingModule({
      imports: [ConfigurationComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: InsightService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call refreshLocalConfig on construction', () => {
    expect(mockService.refreshLocalConfig).toHaveBeenCalled();
  });

  describe('versions', () => {
    it('should return empty array when vaultConfig is null', () => {
      expect(component.versions()).toEqual([]);
    });

    it('should return empty array when versions is undefined', () => {
      mockService.vaultConfig.set({
        versions: undefined as any,
        registry: null
      });
      expect(component.versions()).toEqual([]);
    });

    it('should return sorted version entries', () => {
      mockService.vaultConfig.set({
        versions: {
          '@sdux-vault/engine': '2.0.0',
          '@sdux-vault/addons': '1.5.0',
          '@sdux-vault/shared': '1.0.0'
        },
        registry: null
      });
      expect(component.versions()).toEqual([
        ['@sdux-vault/addons', '1.5.0'],
        ['@sdux-vault/engine', '2.0.0'],
        ['@sdux-vault/shared', '1.0.0']
      ]);
    });
  });

  describe('registry', () => {
    it('should return empty array when vaultConfig is null', () => {
      expect(component.registry()).toEqual([]);
    });

    it('should return empty array when registry is null', () => {
      mockService.vaultConfig.set({ versions: {}, registry: null });
      expect(component.registry()).toEqual([]);
    });

    it('should return registry entries from config', () => {
      mockService.vaultConfig.set({
        versions: {},
        registry: [mockCell, mockCell2]
      });
      expect(component.registry().length).toBe(2);
      expect(component.registry()[0].key).toBe('alpha');
    });
  });

  describe('selectedCell', () => {
    it('should default to null', () => {
      expect(component.selectedCell()).toBeNull();
    });

    it('should set selected cell via selectCell', () => {
      component.selectCell(mockCell);
      expect(component.selectedCell()).toBe(mockCell);
    });

    it('should clear selection via closeDetail', () => {
      component.selectCell(mockCell);
      component.closeDetail();
      expect(component.selectedCell()).toBeNull();
    });
  });

  describe('behaviorLicenseCount', () => {
    it('should return count of behaviors requiring a license', () => {
      expect(component.behaviorLicenseCount(mockCell)).toBe(1);
    });

    it('should return 0 when no behaviors need a license', () => {
      expect(component.behaviorLicenseCount(mockCell2)).toBe(0);
    });
  });

  describe('controllerLicenseCount', () => {
    it('should return count of controllers requiring a license', () => {
      expect(component.controllerLicenseCount(mockCell)).toBe(1);
    });

    it('should return 0 when no controllers need a license', () => {
      expect(component.controllerLicenseCount(mockCell2)).toBe(0);
    });
  });

  describe('license', () => {
    it('should return null when vaultConfig is null', () => {
      expect(component.license()).toBeNull();
    });

    it('should return null when license is undefined', () => {
      mockService.vaultConfig.set({ versions: {}, registry: null });
      expect(component.license()).toBeNull();
    });

    it('should return the license payload from config', () => {
      const mockLicense = {
        organization: 'Acme Corp',
        domain: 'acme.com',
        licenseType: 'enterprise' as const,
        issuedAt: 1700000000000,
        expires: 1800000000000,
        verified: true
      };
      mockService.vaultConfig.set({
        versions: {},
        registry: null,
        license: mockLicense
      });
      expect(component.license()).toEqual(mockLicense);
    });
  });

  describe('formatLicenseDate', () => {
    it('should return "Never" for forever', () => {
      expect(component.formatLicenseDate('forever')).toBe('Never');
    });

    it('should format a numeric timestamp as MM/DD/YYYY', () => {
      const result = component.formatLicenseDate(1700000000000);
      expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
    });
  });
});
