import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  BehaviorTypes,
  VaultRegistrationEntityShape
} from '@sdux-vault/shared';
import { DevtoolsRegistryService } from '../../../services/registry/devtools-registry.service';
import { VaultRegistrationSerializedShape } from '../../../shared/shapes/vault-registration-serialized.shape';
import { RegistryDetailComponent } from './registry-detail.component';

function entity(
  key: string,
  type: string,
  opts?: Partial<VaultRegistrationEntityShape>
): VaultRegistrationEntityShape {
  return { key, type, ...opts };
}

const mockCell: VaultRegistrationSerializedShape = {
  key: 'test-cell',
  behaviorsRegistered: true,
  controllersRegistered: true,
  fluentApis: {
    filters: 2,
    reducers: 1,
    beforeTaps: 0,
    afterTaps: 1,
    interceptors: 3,
    operators: 0,
    emitStateCallbacks: 1,
    errorCallbacks: 0
  },
  behaviors: [
    entity('SDUX::Behavior::Core::Value', BehaviorTypes.Resolve),
    entity('SDUX::Behavior::Core::Filter', BehaviorTypes.Resolve),
    entity('SDUX::Behavior::Http::Fetch', BehaviorTypes.FromObservable),
    entity('SDUX::Behavior::Http::FetchPromise', BehaviorTypes.FromPromise),
    entity('SDUX::Behavior::Ws::Stream', BehaviorTypes.FromStream),
    entity('SDUX::Behavior::Data::Combine', BehaviorTypes.Merge),
    entity('SDUX::Behavior::Data::StepResolve', BehaviorTypes.StepwiseResolve),
    entity('SDUX::Behavior::Data::StepFilter', BehaviorTypes.StepwiseFilter),
    entity('SDUX::Behavior::Data::StepReduce', BehaviorTypes.StepwiseReducer),
    entity('SDUX::Behavior::Security::Aes', BehaviorTypes.Encrypt, {
      needsLicense: true,
      licenseId: 'LIC-ENC'
    }),
    entity('SDUX::Behavior::Storage::IndexedDb', BehaviorTypes.Persist),
    entity('SDUX::Behavior::Core::State', BehaviorTypes.CoreState),
    entity('SDUX::Behavior::Core::ErrTransform', BehaviorTypes.ErrorTransform),
    entity('SDUX::Behavior::Plugin::Analytics', BehaviorTypes.Extension)
  ],
  controllers: [
    entity('SDUX::Controller::Core::CoreAbstain', 'controller'),
    entity('SDUX::Controller::Core::CoreLicense', 'controller'),
    entity('SDUX::Controller::Core::CoreError', 'controller'),
    entity('SDUX::Controller::Addons::Queue', 'controller', {
      needsLicense: true,
      licenseId: 'LIC-QUEUE'
    }),
    entity('SDUX::Controller::Addons::Throttle', 'controller')
  ]
};

describe('Component: RegistryDetail', () => {
  let fixture: ComponentFixture<RegistryDetailComponent>;
  let component: RegistryDetailComponent;
  let mockCellSignal: ReturnType<
    typeof signal<VaultRegistrationSerializedShape | null>
  >;

  beforeEach(async () => {
    mockCellSignal = signal<VaultRegistrationSerializedShape | null>(mockCell);

    const mockRegistryService = {
      getCell: () => mockCellSignal()
    };

    await TestBed.configureTestingModule({
      imports: [RegistryDetailComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: DevtoolsRegistryService, useValue: mockRegistryService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistryDetailComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('cellKey', 'test-cell');
    fixture.detectChanges();
  });

  describe('behaviors', () => {
    it('should return all behaviors from cell', () => {
      expect(component.behaviors().length).toBe(14);
    });

    it('should return empty array when cell has no behaviors', () => {
      mockCellSignal.set({
        ...mockCell,
        behaviors: undefined as any
      });
      expect(component.behaviors()).toEqual([]);
    });
  });

  describe('controllers', () => {
    it('should return all controllers from cell', () => {
      expect(component.controllers().length).toBe(5);
    });

    it('should return empty array when cell has no controllers', () => {
      mockCellSignal.set({
        ...mockCell,
        controllers: undefined as any
      });
      expect(component.controllers()).toEqual([]);
    });
  });

  describe('cellKey', () => {
    it('should return the cell key input value', () => {
      expect(component.cellKey()).toBe('test-cell');
    });

    it('should update when input changes', () => {
      fixture.componentRef.setInput('cellKey', 'other-cell');
      expect(component.cellKey()).toBe('other-cell');
    });
  });

  describe('vaultKeyDomainName', () => {
    it('should return Domain Name from a valid key', () => {
      expect(component.vaultKeyDomainName('SDUX::Behavior::Core::Value')).toBe(
        'Core Value'
      );
    });

    it('should return full key for unexpected format', () => {
      expect(component.vaultKeyDomainName('no-separators')).toBe(
        'no-separators'
      );
    });
  });

  describe('closeDetail output', () => {
    it('should emit closeDetail', () => {
      const spy = jasmine.createSpy('closeDetail');
      component.closeDetail.subscribe(spy);
      component.closeDetail.emit();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('sortedBehaviors', () => {
    it('should return behaviors sorted alphabetically by key', () => {
      const keys = component.sortedBehaviors().map((b) => b.key);
      const sorted = [...keys].sort((a, b) => a.localeCompare(b));
      expect(keys).toEqual(sorted);
    });

    it('should return empty array when no behaviors exist', () => {
      mockCellSignal.set({ ...mockCell, behaviors: [] });
      expect(component.sortedBehaviors()).toEqual([]);
    });
  });

  describe('sortedControllers', () => {
    it('should return controllers sorted alphabetically by key', () => {
      const keys = component.sortedControllers().map((c) => c.key);
      const sorted = [...keys].sort((a, b) => a.localeCompare(b));
      expect(keys).toEqual(sorted);
    });

    it('should return empty array when no controllers exist', () => {
      mockCellSignal.set({ ...mockCell, controllers: [] });
      expect(component.sortedControllers()).toEqual([]);
    });
  });
});
