import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  BehaviorTypes,
  VaultRegistrationEntityShape
} from '@sdux-vault/shared';
import { VaultRegistrationSerializedShape } from '../../shapes/vault-registration-serialized.shape';
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistryDetailComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistryDetailComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('cell', mockCell);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('behaviors', () => {
    it('should return all behaviors from cell', () => {
      expect(component.behaviors().length).toBe(14);
    });

    it('should return empty array when cell has no behaviors', () => {
      fixture.componentRef.setInput('cell', {
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
      fixture.componentRef.setInput('cell', {
        ...mockCell,
        controllers: undefined as any
      });
      expect(component.controllers()).toEqual([]);
    });
  });

  describe('coreControllers', () => {
    it('should filter core controllers by name', () => {
      const cores = component.coreControllers();
      expect(cores.length).toBe(3);
      expect(cores.map((c) => c.key)).toEqual([
        'SDUX::Controller::Core::CoreAbstain',
        'SDUX::Controller::Core::CoreLicense',
        'SDUX::Controller::Core::CoreError'
      ]);
    });
  });

  describe('nonCoreControllers', () => {
    it('should filter out core controllers', () => {
      const nonCore = component.nonCoreControllers();
      expect(nonCore.length).toBe(2);
      expect(nonCore.map((c) => c.key)).toEqual([
        'SDUX::Controller::Addons::Queue',
        'SDUX::Controller::Addons::Throttle'
      ]);
    });
  });

  describe('cellKey', () => {
    it('should return the cell key', () => {
      expect(component.cellKey()).toBe('test-cell');
    });

    it('should return empty string when key is undefined', () => {
      fixture.componentRef.setInput('cell', {
        ...mockCell,
        key: undefined as any
      });
      expect(component.cellKey()).toBe('');
    });
  });

  describe('vaultKeyName', () => {
    it('should extract the Name segment from a valid key', () => {
      expect(component.vaultKeyName('SDUX::Behavior::Core::Value')).toBe(
        'Value'
      );
    });

    it('should return full key when format is unexpected', () => {
      expect(component.vaultKeyName('invalid-key')).toBe('invalid-key');
    });

    it('should handle keys with fewer segments', () => {
      expect(component.vaultKeyName('SDUX::Behavior::Core')).toBe(
        'SDUX::Behavior::Core'
      );
    });
  });

  describe('vaultKeyDomain', () => {
    it('should extract the Domain segment from a valid key', () => {
      expect(component.vaultKeyDomain('SDUX::Behavior::Core::Value')).toBe(
        'Core'
      );
    });

    it('should return empty string for unexpected format', () => {
      expect(component.vaultKeyDomain('invalid')).toBe('');
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

  describe('behavior type computed signals', () => {
    it('should filter resolve behaviors', () => {
      expect(component.resolveBehaviors().length).toBe(2);
    });

    it('should filter fromObservable behaviors', () => {
      expect(component.fromObservableBehaviors().length).toBe(1);
    });

    it('should filter fromPromise behaviors', () => {
      expect(component.fromPromiseBehaviors().length).toBe(1);
    });

    it('should filter fromStream behaviors', () => {
      expect(component.fromStreamBehaviors().length).toBe(1);
    });

    it('should filter merge behaviors', () => {
      expect(component.mergeBehaviors().length).toBe(1);
    });

    it('should filter stepwiseResolve behaviors', () => {
      expect(component.stepwiseResolveBehaviors().length).toBe(1);
    });

    it('should filter stepwiseFilter behaviors', () => {
      expect(component.stepwiseFilterBehaviors().length).toBe(1);
    });

    it('should filter stepwiseReducer behaviors', () => {
      expect(component.stepwiseReducerBehaviors().length).toBe(1);
    });

    it('should filter encrypt behaviors', () => {
      expect(component.encryptBehaviors().length).toBe(1);
    });

    it('should filter persist behaviors', () => {
      expect(component.persistBehaviors().length).toBe(1);
    });

    it('should filter coreState behaviors', () => {
      expect(component.coreStateBehaviors().length).toBe(1);
    });

    it('should filter errorTransform behaviors', () => {
      expect(component.errorTransformBehaviors().length).toBe(1);
    });

    it('should filter extension behaviors', () => {
      expect(component.extensionBehaviors().length).toBe(1);
    });

    it('should return empty arrays when no behaviors match', () => {
      fixture.componentRef.setInput('cell', { ...mockCell, behaviors: [] });
      expect(component.resolveBehaviors()).toEqual([]);
      expect(component.fromObservableBehaviors()).toEqual([]);
      expect(component.mergeBehaviors()).toEqual([]);
      expect(component.encryptBehaviors()).toEqual([]);
      expect(component.extensionBehaviors()).toEqual([]);
    });
  });

  describe('preResolveStages', () => {
    it('should return interceptor count from fluentApis', () => {
      expect(component.preResolveStages()).toEqual([
        { label: 'Interceptors', count: 3 }
      ]);
    });

    it('should default to 0 when fluentApis is null', () => {
      fixture.componentRef.setInput('cell', { ...mockCell, fluentApis: null });
      expect(component.preResolveStages()).toEqual([
        { label: 'Interceptors', count: 0 }
      ]);
    });
  });

  describe('postResolveStages', () => {
    it('should return emitState and error callback counts', () => {
      expect(component.postResolveStages()).toEqual([
        { label: 'Emit State', count: 1 },
        { label: 'Error Callbacks', count: 0 }
      ]);
    });

    it('should default to 0 when fluentApis is null', () => {
      fixture.componentRef.setInput('cell', { ...mockCell, fluentApis: null });
      expect(component.postResolveStages()).toEqual([
        { label: 'Emit State', count: 0 },
        { label: 'Error Callbacks', count: 0 }
      ]);
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
      fixture.componentRef.setInput('cell', { ...mockCell, behaviors: [] });
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
      fixture.componentRef.setInput('cell', { ...mockCell, controllers: [] });
      expect(component.sortedControllers()).toEqual([]);
    });
  });
});
