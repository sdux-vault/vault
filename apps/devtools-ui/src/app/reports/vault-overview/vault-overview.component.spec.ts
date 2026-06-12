import {
  provideZonelessChangeDetection,
  signal,
  WritableSignal
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import { DevtoolsAggregateService } from '../../services/devtools-aggregate.service';
import { InsightService } from '../../services/insight/insight.service';
import { DevtoolsRegistryService } from '../../services/registry/devtools-registry.service';
import { TraceExecutionShape } from '../../shared/shapes/trace/trace-execution.shape';
import { VaultConfigMessageShape } from '../../shared/shapes/vault-config-message.shape';
import { VaultRegistrationSerializedShape } from '../../shared/shapes/vault-registration-serialized.shape';
import { VaultOverviewComponent } from './vault-overview.component';

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

describe('Component: VaultOverview', () => {
  let fixture: ComponentFixture<VaultOverviewComponent>;
  let component: VaultOverviewComponent;
  let mockService: MockInsightService;
  let scheduler: TestScheduler;

  beforeEach(async () => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    mockService = new MockInsightService();

    await TestBed.configureTestingModule({
      imports: [VaultOverviewComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: InsightService, useValue: mockService },
        {
          provide: DevtoolsAggregateService,
          useValue: {
            tracesByCellKey: signal(new Map<string, TraceExecutionShape[]>())
          }
        },
        DevtoolsRegistryService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VaultOverviewComponent);
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

    it('should filter out the devtools logging cell', () => {
      const devtoolsCell: VaultRegistrationSerializedShape = {
        ...mockCell,
        key: 'vault::devtools::logging::feature::cell'
      };
      mockService.vaultConfig.set({
        versions: {},
        registry: [mockCell, devtoolsCell, mockCell2]
      });
      expect(component.registry().length).toBe(2);
      expect(
        component
          .registry()
          .some((c) => c.key === 'vault::devtools::logging::feature::cell')
      ).toBeFalse();
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

  describe('fluentApisCount', () => {
    it('should return 0 when fluentApis is null', () => {
      expect(component.fluentApisCount(mockCell)).toBe(0);
    });

    it('should sum all fluent API callback counts', () => {
      const cellWithApis: VaultRegistrationSerializedShape = {
        ...mockCell,
        fluentApis: {
          filters: 2,
          reducers: 1,
          beforeTaps: 3,
          afterTaps: 1,
          interceptors: 0,
          operators: 1,
          emitStateCallbacks: 2,
          errorCallbacks: 1
        }
      };
      expect(component.fluentApisCount(cellWithApis)).toBe(11);
    });

    it('should return 0 when all fluent API counts are zero', () => {
      const cellWithZeros: VaultRegistrationSerializedShape = {
        ...mockCell,
        fluentApis: {
          filters: 0,
          reducers: 0,
          beforeTaps: 0,
          afterTaps: 0,
          interceptors: 0,
          operators: 0,
          emitStateCallbacks: 0,
          errorCallbacks: 0
        }
      };
      expect(component.fluentApisCount(cellWithZeros)).toBe(0);
    });
  });

  describe('fluentApisTooltip', () => {
    it('should return fallback message when fluentApis is null', () => {
      expect(component.fluentApisTooltip(mockCell)).toBe(
        'No fluent API callbacks registered'
      );
    });

    it('should list only non-zero counts', () => {
      const cell: VaultRegistrationSerializedShape = {
        ...mockCell,
        fluentApis: {
          filters: 2,
          reducers: 0,
          beforeTaps: 1,
          afterTaps: 0,
          interceptors: 0,
          operators: 0,
          emitStateCallbacks: 0,
          errorCallbacks: 1
        }
      };
      const result = component.fluentApisTooltip(cell);
      expect(result).toContain('Filters: 2');
      expect(result).toContain('Before Taps: 1');
      expect(result).toContain('Error Handlers: 1');
      expect(result).not.toContain('Reducers');
    });

    it('should return fallback when all counts are zero', () => {
      const cell: VaultRegistrationSerializedShape = {
        ...mockCell,
        fluentApis: {
          filters: 0,
          reducers: 0,
          beforeTaps: 0,
          afterTaps: 0,
          interceptors: 0,
          operators: 0,
          emitStateCallbacks: 0,
          errorCallbacks: 0
        }
      };
      expect(component.fluentApisTooltip(cell)).toBe(
        'No fluent API callbacks registered'
      );
    });

    it('should include Reducers line when reducers is non-zero', () => {
      const cell: VaultRegistrationSerializedShape = {
        ...mockCell,
        fluentApis: {
          filters: 0,
          reducers: 3,
          beforeTaps: 0,
          afterTaps: 0,
          interceptors: 0,
          operators: 0,
          emitStateCallbacks: 0,
          errorCallbacks: 0
        }
      };
      expect(component.fluentApisTooltip(cell)).toBe('Reducers: 3');
    });

    it('should include Interceptors line when interceptors is non-zero', () => {
      const cell: VaultRegistrationSerializedShape = {
        ...mockCell,
        fluentApis: {
          filters: 0,
          reducers: 0,
          beforeTaps: 0,
          afterTaps: 0,
          interceptors: 5,
          operators: 0,
          emitStateCallbacks: 0,
          errorCallbacks: 0
        }
      };
      expect(component.fluentApisTooltip(cell)).toBe('Interceptors: 5');
    });

    it('should include Operators line when operators is non-zero', () => {
      const cell: VaultRegistrationSerializedShape = {
        ...mockCell,
        fluentApis: {
          filters: 0,
          reducers: 0,
          beforeTaps: 0,
          afterTaps: 0,
          interceptors: 0,
          operators: 4,
          emitStateCallbacks: 0,
          errorCallbacks: 0
        }
      };
      expect(component.fluentApisTooltip(cell)).toBe('Operators: 4');
    });

    it('should include After Taps line when afterTaps is non-zero', () => {
      const cell: VaultRegistrationSerializedShape = {
        ...mockCell,
        fluentApis: {
          filters: 0,
          reducers: 0,
          beforeTaps: 0,
          afterTaps: 2,
          interceptors: 0,
          operators: 0,
          emitStateCallbacks: 0,
          errorCallbacks: 0
        }
      };
      expect(component.fluentApisTooltip(cell)).toBe('After Taps: 2');
    });

    it('should include Emit States line when emitStateCallbacks is non-zero', () => {
      const cell: VaultRegistrationSerializedShape = {
        ...mockCell,
        fluentApis: {
          filters: 0,
          reducers: 0,
          beforeTaps: 0,
          afterTaps: 0,
          interceptors: 0,
          operators: 0,
          emitStateCallbacks: 7,
          errorCallbacks: 0
        }
      };
      expect(component.fluentApisTooltip(cell)).toBe('Emit States: 7');
    });

    it('should include all lines when all counts are non-zero', () => {
      const cell: VaultRegistrationSerializedShape = {
        ...mockCell,
        fluentApis: {
          filters: 1,
          reducers: 2,
          beforeTaps: 3,
          afterTaps: 4,
          interceptors: 5,
          operators: 6,
          emitStateCallbacks: 7,
          errorCallbacks: 8
        }
      };
      const result = component.fluentApisTooltip(cell);
      const lines = result.split('\n');
      expect(lines.length).toBe(8);
      expect(lines[0]).toBe('Filters: 1');
      expect(lines[1]).toBe('Reducers: 2');
      expect(lines[2]).toBe('Interceptors: 5');
      expect(lines[3]).toBe('Operators: 6');
      expect(lines[4]).toBe('Before Taps: 3');
      expect(lines[5]).toBe('After Taps: 4');
      expect(lines[6]).toBe('Emit States: 7');
      expect(lines[7]).toBe('Error Handlers: 8');
    });
  });

  describe('toggleCellCollapsed', () => {
    it('should add a key to collapsed set', () => {
      component.toggleCellCollapsed('alpha');
      expect(component.collapsedCells().has('alpha')).toBeTrue();
    });

    it('should remove a key that is already collapsed', () => {
      component.toggleCellCollapsed('alpha');
      component.toggleCellCollapsed('alpha');
      expect(component.collapsedCells().has('alpha')).toBeFalse();
    });
  });

  describe('template rendering', () => {
    it('should show free license message when no license is present', () => {
      mockService.vaultConfig.set({ versions: {}, registry: null });
      component.licenseExpanded.set(true);
      fixture.detectChanges();
      const el = fixture.nativeElement as HTMLElement;
      expect(el.querySelector('.free-license')?.textContent).toContain(
        'Free license'
      );
    });

    it('should not show free license message when license is present', () => {
      mockService.vaultConfig.set({
        versions: {},
        registry: null,
        license: {
          organization: 'Acme',
          domain: 'acme.com',
          licenseType: 'enterprise' as const,
          issuedAt: 1700000000000,
          expires: 1800000000000,
          verified: true
        }
      });
      fixture.detectChanges();
      const el = fixture.nativeElement as HTMLElement;
      expect(el.querySelector('.free-license')).toBeNull();
    });
  });

  describe('filteredRegistry', () => {
    beforeEach(() => {
      mockService.vaultConfig.set({
        versions: {},
        registry: [mockCell, mockCell2]
      });
      fixture.detectChanges();
    });

    it('should return all cells when search term is empty', () => {
      expect(component.filteredRegistry().length).toBe(2);
    });

    it('should filter cells by key when search term is applied', () => {
      scheduler.run(({ flush }) => {
        component.registrySearchTerm$.next('alpha');
        flush();
        fixture.detectChanges();

        expect(component.filteredRegistry().length).toBe(1);
        expect(component.filteredRegistry()[0].key).toBe('alpha');
      });
    });
  });

  describe('clearRegistrySearch', () => {
    it('should clear search term', () => {
      component.registrySearchTerm.set('test');
      component.clearRegistrySearch();
      expect(component.registrySearchTerm()).toBe('');
    });
  });

  describe('cellStats', () => {
    it('should return empty map when no traces exist', () => {
      expect(component.cellStats().size).toBe(0);
    });

    it('should compute stats from traces', () => {
      const mockTraces = new Map<string, TraceExecutionShape[]>();
      mockTraces.set('alpha', [
        {
          traceId: 'trace-1',
          cellKey: 'alpha',
          events: [],
          metrics: {
            duration: 100,
            eventCount: 5,
            status: 'success',
            slowestStage: { name: 'stage1', duration: 50 },
            fastestStage: { name: 'stage1', duration: 50 },
            stages: [],
            hadRevote: false,
            controllerVoteCount: 1,
            usedLicensedFeatures: false
          }
        } as any,
        {
          traceId: 'trace-2',
          cellKey: 'alpha',
          events: [],
          metrics: {
            duration: 200,
            eventCount: 3,
            status: 'failed',
            slowestStage: { name: 'stage1', duration: 100 },
            fastestStage: { name: 'stage1', duration: 100 },
            stages: [],
            hadRevote: false,
            controllerVoteCount: 0,
            usedLicensedFeatures: false
          }
        } as any
      ]);

      const aggregate = TestBed.inject(DevtoolsAggregateService) as unknown as {
        tracesByCellKey: WritableSignal<Map<string, TraceExecutionShape[]>>;
      };
      aggregate.tracesByCellKey.set(mockTraces);
      fixture.detectChanges();

      const stats = component.cellStats();
      expect(stats.size).toBe(1);
      const alphaStats = stats.get('alpha')!;
      expect(alphaStats.traceCount).toBe(2);
      expect(alphaStats.avgDuration).toBe(150);
      expect(alphaStats.errorCount).toBe(1);
    });

    it('should return zero avgDuration for empty traces array', () => {
      const mockTraces = new Map<string, TraceExecutionShape[]>();
      mockTraces.set('alpha', []);

      const aggregate = TestBed.inject(DevtoolsAggregateService) as unknown as {
        tracesByCellKey: WritableSignal<Map<string, TraceExecutionShape[]>>;
      };
      aggregate.tracesByCellKey.set(mockTraces);
      fixture.detectChanges();

      const stats = component.cellStats();
      expect(stats.size).toBe(1);
      const alphaStats = stats.get('alpha')!;
      expect(alphaStats.traceCount).toBe(0);
      expect(alphaStats.avgDuration).toBe(0);
      expect(alphaStats.errorCount).toBe(0);
    });
  });

  describe('ngOnInit debounce', () => {
    it('should set up the search term subscription', () => {
      expect(component.registrySearchTerm$).toBeTruthy();
    });
  });
});

describe('Component: VaultOverview (mobile)', () => {
  let fixture: ComponentFixture<VaultOverviewComponent>;
  let component: VaultOverviewComponent;
  let mockService: MockInsightService;
  let originalMatchMedia: typeof window.matchMedia;

  beforeEach(async () => {
    originalMatchMedia = window.matchMedia;
    window.matchMedia = jasmine.createSpy('matchMedia').and.returnValue({
      matches: true,
      media: '(max-width: 768px)',
      onchange: null,
      addListener: jasmine.createSpy('addListener'),
      removeListener: jasmine.createSpy('removeListener'),
      addEventListener: jasmine.createSpy('addEventListener'),
      removeEventListener: jasmine.createSpy('removeEventListener'),
      dispatchEvent: jasmine.createSpy('dispatchEvent')
    } as unknown as MediaQueryList);

    mockService = new MockInsightService();

    await TestBed.configureTestingModule({
      imports: [VaultOverviewComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: InsightService, useValue: mockService },
        {
          provide: DevtoolsAggregateService,
          useValue: {
            tracesByCellKey: signal(new Map<string, TraceExecutionShape[]>())
          }
        },
        DevtoolsRegistryService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VaultOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('should start with versionsExpanded false on mobile', () => {
    expect(component.versionsExpanded()).toBeFalse();
  });

  it('should start with licenseExpanded false on mobile', () => {
    expect(component.licenseExpanded()).toBeFalse();
  });

  it('should collapse all cells when registry loads on mobile', () => {
    mockService.vaultConfig.set({
      versions: {},
      registry: [mockCell, mockCell2]
    });
    fixture.detectChanges();
    expect(component.collapsedCells().has('alpha')).toBeTrue();
    expect(component.collapsedCells().has('beta')).toBeTrue();
  });
});
