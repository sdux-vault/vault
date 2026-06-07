import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  BehaviorTypes,
  VaultRegistrationEntityShape
} from '@sdux-vault/shared';
import { DevtoolsRegistryService } from '../../services/registry/devtools-registry.service';
import type { TraceExecutionShape } from '../../shapes/trace';
import { TraceExecutionStatuses } from '../../shapes/trace';
import { VaultRegistrationSerializedShape } from '../../shapes/vault-registration-serialized.shape';
import { PipelineFlowComponent } from './pipeline-flow.component';

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

const mockTrace: TraceExecutionShape = {
  traceId: 'trace-1',
  cellKey: 'test-cell',
  startedAt: 1000,
  finishedAt: 1100,
  events: [],
  metrics: {
    duration: 100,
    eventCount: 6,
    status: TraceExecutionStatuses.Success,
    slowestStage: { name: 'resolve', duration: 40 },
    fastestStage: { name: 'filter', duration: 5 },
    stages: [
      {
        name: 'resolve',
        behaviorKey: 'SDUX::Behavior::Core::Value',
        startedAt: 1010,
        finishedAt: 1050,
        duration: 40,
        type: 'stage'
      },
      {
        name: 'resolve',
        behaviorKey: 'SDUX::Behavior::Core::Value',
        startedAt: 1050,
        finishedAt: 1060,
        duration: 10,
        type: 'stage'
      },
      {
        name: 'controller',
        behaviorKey: 'SDUX::Controller::Core::CoreAbstain',
        startedAt: 1000,
        finishedAt: 1005,
        duration: 5,
        type: 'controller'
      },
      {
        name: 'core-state',
        behaviorKey: 'vault-orchestrator',
        startedAt: 1060,
        finishedAt: 1062,
        duration: 2,
        type: 'stage'
      }
    ],
    hadRevote: false,
    controllerVoteCount: 3,
    usedLicensedFeatures: false
  }
};

describe('Component: PipelineFlow', () => {
  let fixture: ComponentFixture<PipelineFlowComponent>;
  let component: PipelineFlowComponent;
  let mockCellSignal: ReturnType<
    typeof signal<VaultRegistrationSerializedShape | null>
  >;

  beforeEach(async () => {
    mockCellSignal = signal<VaultRegistrationSerializedShape | null>(mockCell);

    const mockRegistryService = {
      getCell: () => mockCellSignal()
    };

    await TestBed.configureTestingModule({
      imports: [PipelineFlowComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: DevtoolsRegistryService, useValue: mockRegistryService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PipelineFlowComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('cellKey', 'test-cell');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('isExpanded', () => {
    it('should be false when no trace is provided', () => {
      expect(component.isExpanded()).toBe(false);
    });

    it('should be true when a trace is provided', () => {
      fixture.componentRef.setInput('trace', mockTrace);
      fixture.detectChanges();
      expect(component.isExpanded()).toBe(true);
    });
  });

  describe('cell', () => {
    it('should return the resolved cell from the registry service', () => {
      expect(component.cell()).toEqual(mockCell);
    });

    it('should return null when the cell is not found', () => {
      mockCellSignal.set(null);
      expect(component.cell()).toBeNull();
    });
  });

  describe('behaviors', () => {
    it('should return all behaviors from cell', () => {
      expect(component.behaviors().length).toBe(14);
    });

    it('should return empty array when cell is null', () => {
      mockCellSignal.set(null);
      expect(component.behaviors()).toEqual([]);
    });
  });

  describe('controllers', () => {
    it('should return all controllers from cell', () => {
      expect(component.controllers().length).toBe(5);
    });

    it('should return empty array when cell is null', () => {
      mockCellSignal.set(null);
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

  describe('behavior type computed signals', () => {
    it('should filter resolve behaviors', () => {
      expect(component.resolveBehaviors().length).toBe(2);
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
      mockCellSignal.set({ ...mockCell, behaviors: [] });
      expect(component.resolveBehaviors()).toEqual([]);
      expect(component.mergeBehaviors()).toEqual([]);
      expect(component.encryptBehaviors()).toEqual([]);
      expect(component.extensionBehaviors()).toEqual([]);
    });
  });

  describe('preResolveStages', () => {
    it('should return interceptor count from fluentApis', () => {
      expect(component.preResolveStages()).toEqual([
        { label: 'Interceptors', stageName: 'interceptor', count: 3 }
      ]);
    });

    it('should default to 0 when fluentApis is null', () => {
      mockCellSignal.set({ ...mockCell, fluentApis: null });
      expect(component.preResolveStages()).toEqual([
        { label: 'Interceptors', stageName: 'interceptor', count: 0 }
      ]);
    });
  });

  describe('postResolveStages', () => {
    it('should return emitState and error callback counts', () => {
      expect(component.postResolveStages()).toEqual([
        { label: 'Emit State', stageName: 'core-emit-state', count: 1 },
        { label: 'Error Callbacks', stageName: 'core-callback-error', count: 0 }
      ]);
    });

    it('should default to 0 when fluentApis is null', () => {
      mockCellSignal.set({ ...mockCell, fluentApis: null });
      expect(component.postResolveStages()).toEqual([
        { label: 'Emit State', stageName: 'core-emit-state', count: 0 },
        { label: 'Error Callbacks', stageName: 'core-callback-error', count: 0 }
      ]);
    });
  });

  describe('entityDetail', () => {
    it('should return domain when no trace is provided', () => {
      expect(component.entityDetail('SDUX::Behavior::Core::Value')).toBe(
        'Core'
      );
    });

    it('should return domain for unexpected key format when no trace', () => {
      expect(component.entityDetail('invalid')).toBe('');
    });

    describe('with trace', () => {
      beforeEach(() => {
        fixture.componentRef.setInput('trace', mockTrace);
        fixture.detectChanges();
      });

      it('should return formatted duration for a key with stages', () => {
        expect(component.entityDetail('SDUX::Behavior::Core::Value')).toBe(
          '~50.0 ms'
        );
      });

      it('should sum durations across multiple stages for the same key', () => {
        expect(component.entityDetail('SDUX::Behavior::Core::Value')).toBe(
          '~50.0 ms'
        );
      });

      it('should return duration for a controller key', () => {
        expect(
          component.entityDetail('SDUX::Controller::Core::CoreAbstain')
        ).toBe('~5.0 ms');
      });

      it('should return dash for a key not present in trace stages', () => {
        expect(component.entityDetail('SDUX::Behavior::Http::Fetch')).toBe('—');
      });
    });
  });

  describe('stageDetail', () => {
    it('should return empty string when no trace is provided', () => {
      expect(component.stageDetail('resolve')).toBe('');
    });

    describe('with trace', () => {
      beforeEach(() => {
        fixture.componentRef.setInput('trace', mockTrace);
        fixture.detectChanges();
      });

      it('should return formatted duration for a stage name', () => {
        expect(component.stageDetail('resolve')).toBe('~50.0 ms');
      });

      it('should return duration for controller stage name', () => {
        expect(component.stageDetail('controller')).toBe('~5.0 ms');
      });

      it('should return dash for a stage name not present in trace', () => {
        expect(component.stageDetail('interceptor')).toBe('—');
      });
    });
  });

  describe('orchestratorDetail', () => {
    it('should return empty string when no trace is provided', () => {
      expect(component.orchestratorDetail()).toBe('');
    });

    it('should return summed duration when a trace is provided', () => {
      fixture.componentRef.setInput('trace', mockTrace);
      fixture.detectChanges();
      expect(component.orchestratorDetail()).toBe('~52.0 ms');
    });
  });

  describe('conductorDetail', () => {
    it('should return empty string when no trace is provided', () => {
      expect(component.conductorDetail()).toBe('');
    });

    it('should return summed controller-type stage durations', () => {
      fixture.componentRef.setInput('trace', mockTrace);
      fixture.detectChanges();
      expect(component.conductorDetail()).toBe('~5.0 ms');
    });

    it('should include revote delay in total', () => {
      fixture.componentRef.setInput('trace', {
        ...mockTrace,
        events: [
          { name: 'conductor:notification:deny', timestamp: 1000 } as never,
          { name: 'lifecycle:notification:revote', timestamp: 1500 } as never
        ]
      });
      fixture.detectChanges();
      expect(component.conductorDetail()).toBe('~505.0 ms');
    });
  });

  describe('controllersDetail', () => {
    it('should return empty string when no trace is provided', () => {
      expect(component.controllersDetail()).toBe('');
    });

    it('should equal conductorDetail', () => {
      fixture.componentRef.setInput('trace', mockTrace);
      fixture.detectChanges();
      expect(component.controllersDetail()).toBe(component.conductorDetail());
    });
  });

  describe('stateSnapshotDetail', () => {
    it('should return empty string when no trace is provided', () => {
      expect(component.stateSnapshotDetail()).toBe('');
    });

    it('should return conductor + orchestrator total', () => {
      fixture.componentRef.setInput('trace', mockTrace);
      fixture.detectChanges();
      expect(component.stateSnapshotDetail()).toBe('~57.0 ms');
    });

    it('should include revote delay in total', () => {
      fixture.componentRef.setInput('trace', {
        ...mockTrace,
        events: [
          { name: 'conductor:notification:deny', timestamp: 1000 } as never,
          { name: 'lifecycle:notification:revote', timestamp: 1500 } as never
        ]
      });
      fixture.detectChanges();
      expect(component.stateSnapshotDetail()).toBe('~557.0 ms');
    });
  });

  describe('coreStateDetail', () => {
    it('should return domain when no trace is provided', () => {
      expect(component.coreStateDetail('SDUX::Behavior::Core::State')).toBe(
        'Core'
      );
    });

    it('should return core-state duration when a trace is provided', () => {
      fixture.componentRef.setInput('trace', mockTrace);
      fixture.detectChanges();
      expect(component.coreStateDetail('SDUX::Behavior::Core::State')).toBe(
        '~2.0 ms'
      );
    });
  });

  describe('extensionDetail', () => {
    it('should return domain when no trace is provided', () => {
      expect(
        component.extensionDetail('SDUX::Behavior::Extension::MyExt')
      ).toBe('Extension');
    });

    it('should return N/A when a trace is provided', () => {
      fixture.componentRef.setInput('trace', mockTrace);
      fixture.detectChanges();
      expect(
        component.extensionDetail('SDUX::Behavior::Extension::MyExt')
      ).toBe('N/A');
    });
  });

  describe('hasRevoteDelay', () => {
    it('should return false when no trace is provided', () => {
      expect(component.hasRevoteDelay()).toBe(false);
    });

    it('should return false when trace has no deny events', () => {
      fixture.componentRef.setInput('trace', {
        ...mockTrace,
        events: [{ name: 'controller:start:vote', timestamp: 1000 } as never]
      });
      fixture.detectChanges();
      expect(component.hasRevoteDelay()).toBe(false);
    });

    it('should return true when trace has a deny event', () => {
      fixture.componentRef.setInput('trace', {
        ...mockTrace,
        events: [
          { name: 'conductor:notification:deny', timestamp: 1000 } as never,
          { name: 'lifecycle:notification:revote', timestamp: 1500 } as never
        ]
      });
      fixture.detectChanges();
      expect(component.hasRevoteDelay()).toBe(true);
    });
  });

  describe('revoteDelayDetail', () => {
    it('should return empty string when no trace is provided', () => {
      expect(component.revoteDelayDetail()).toBe('');
    });

    it('should return ~0.0 ms when trace has no deny/revote pairs', () => {
      fixture.componentRef.setInput('trace', {
        ...mockTrace,
        events: []
      });
      fixture.detectChanges();
      expect(component.revoteDelayDetail()).toBe('~0.0 ms');
    });

    it('should return the delay for a single deny/revote pair', () => {
      fixture.componentRef.setInput('trace', {
        ...mockTrace,
        events: [
          { name: 'conductor:notification:deny', timestamp: 1000 } as never,
          { name: 'lifecycle:notification:revote', timestamp: 1500 } as never
        ]
      });
      fixture.detectChanges();
      expect(component.revoteDelayDetail()).toBe('~500.0 ms');
    });

    it('should sum delays for multiple deny/revote pairs', () => {
      fixture.componentRef.setInput('trace', {
        ...mockTrace,
        events: [
          { name: 'conductor:notification:deny', timestamp: 1000 } as never,
          { name: 'lifecycle:notification:revote', timestamp: 1500 } as never,
          { name: 'controller:start:vote', timestamp: 1501 } as never,
          { name: 'conductor:notification:deny', timestamp: 1510 } as never,
          { name: 'lifecycle:notification:revote', timestamp: 1810 } as never
        ]
      });
      fixture.detectChanges();
      expect(component.revoteDelayDetail()).toBe('~800.0 ms');
    });
  });

  describe('mergeEntityDetail', () => {
    it('should return domain when no trace is present', () => {
      expect(component.mergeEntityDetail('SDUX::Behavior::Core::Value')).toBe(
        'Core'
      );
    });

    it('should return duration when compute-merge stage exists', () => {
      fixture.componentRef.setInput('trace', {
        ...mockTrace,
        metrics: {
          ...mockTrace.metrics,
          stages: [
            {
              name: 'compute-merge',
              behaviorKey: 'vault-orchestrator',
              startedAt: 1010,
              finishedAt: 1015,
              duration: 5,
              type: 'stage'
            }
          ]
        }
      });
      fixture.detectChanges();
      expect(component.mergeEntityDetail('SDUX::Behavior::Data::Combine')).toBe(
        '~5.0 ms'
      );
    });

    it('should return dash when trace exists but no compute-merge stage', () => {
      fixture.componentRef.setInput('trace', mockTrace);
      fixture.detectChanges();
      expect(component.mergeEntityDetail('SDUX::Behavior::Data::Combine')).toBe(
        '—'
      );
    });
  });

  describe('hasTraceDuration', () => {
    it('should return true when no trace is present', () => {
      expect(
        component.hasTraceDuration('SDUX::Behavior::Core::Value')
      ).toBeTrue();
    });

    it('should return true when behavior has a duration in trace', () => {
      fixture.componentRef.setInput('trace', mockTrace);
      fixture.detectChanges();
      expect(
        component.hasTraceDuration('SDUX::Behavior::Core::Value')
      ).toBeTrue();
    });

    it('should return false when behavior has no duration in trace', () => {
      fixture.componentRef.setInput('trace', mockTrace);
      fixture.detectChanges();
      expect(
        component.hasTraceDuration('SDUX::Behavior::Http::Fetch')
      ).toBeFalse();
    });
  });

  describe('coreControllersDetail', () => {
    it('should return empty string when no trace is present', () => {
      expect(component.coreControllersDetail()).toBe('');
    });

    it('should return summed core controller durations', () => {
      fixture.componentRef.setInput('trace', mockTrace);
      fixture.detectChanges();
      expect(component.coreControllersDetail()).toBe('~5.0 ms');
    });
  });

  describe('processingLayerDetail', () => {
    it('should return empty string when no trace is present', () => {
      expect(component.processingLayerDetail()).toBe('');
    });

    it('should return summed processing stage durations', () => {
      fixture.componentRef.setInput('trace', {
        ...mockTrace,
        metrics: {
          ...mockTrace.metrics,
          stages: [
            {
              name: 'resolve',
              behaviorKey: 'bk',
              startedAt: 1010,
              finishedAt: 1015,
              duration: 5,
              type: 'stage'
            },
            {
              name: 'filter',
              behaviorKey: 'bk',
              startedAt: 1015,
              finishedAt: 1018,
              duration: 3,
              type: 'stage'
            }
          ]
        }
      });
      fixture.detectChanges();
      expect(component.processingLayerDetail()).toBe('~8.0 ms');
    });
  });

  describe('resolveDetail', () => {
    it('should return empty string when no trace is present', () => {
      expect(component.resolveDetail()).toBe('');
    });

    it('should return resolve stage duration', () => {
      fixture.componentRef.setInput('trace', mockTrace);
      fixture.detectChanges();
      expect(component.resolveDetail()).toBe('~50.0 ms');
    });
  });

  describe('replaceMergeDetail', () => {
    it('should return empty string when no trace is present', () => {
      expect(component.replaceMergeDetail()).toBe('');
    });

    it('should return summed replace/merge durations', () => {
      fixture.componentRef.setInput('trace', {
        ...mockTrace,
        metrics: {
          ...mockTrace.metrics,
          stages: [
            {
              name: 'filter',
              behaviorKey: 'bk',
              startedAt: 1010,
              finishedAt: 1013,
              duration: 3,
              type: 'stage'
            },
            {
              name: 'reducer',
              behaviorKey: 'bk',
              startedAt: 1013,
              finishedAt: 1018,
              duration: 5,
              type: 'stage'
            }
          ]
        }
      });
      fixture.detectChanges();
      expect(component.replaceMergeDetail()).toBe('~8.0 ms');
    });
  });

  describe('outputLayerDetail', () => {
    it('should return empty string when no trace is present', () => {
      expect(component.outputLayerDetail()).toBe('');
    });

    it('should return summed output stage durations', () => {
      fixture.componentRef.setInput('trace', {
        ...mockTrace,
        metrics: {
          ...mockTrace.metrics,
          stages: [
            {
              name: 'encrypt',
              behaviorKey: 'bk',
              startedAt: 1010,
              finishedAt: 1012,
              duration: 2,
              type: 'stage'
            },
            {
              name: 'persist',
              behaviorKey: 'bk',
              startedAt: 1012,
              finishedAt: 1015,
              duration: 3,
              type: 'stage'
            }
          ]
        }
      });
      fixture.detectChanges();
      expect(component.outputLayerDetail()).toBe('~5.0 ms');
    });
  });

  describe('mergeLabel', () => {
    it('should return Replace/Merge when no trace is present', () => {
      expect(component.mergeLabel()).toBe('Replace/Merge');
    });

    it('should return Merge when trace has merge lifecycle', () => {
      fixture.componentRef.setInput('trace', {
        ...mockTrace,
        events: [{ name: 'lifecycle:start:merge', timestamp: 1010 } as never]
      });
      fixture.detectChanges();
      expect(component.mergeLabel()).toBe('Merge');
    });

    it('should return Replace when trace has no merge lifecycle', () => {
      fixture.componentRef.setInput('trace', mockTrace);
      fixture.detectChanges();
      expect(component.mergeLabel()).toBe('Replace');
    });
  });

  describe('showMergeBehaviors', () => {
    it('should return true when no trace is present', () => {
      expect(component.showMergeBehaviors()).toBeTrue();
    });

    it('should return true when trace has merge lifecycle', () => {
      fixture.componentRef.setInput('trace', {
        ...mockTrace,
        events: [{ name: 'lifecycle:start:merge', timestamp: 1010 } as never]
      });
      fixture.detectChanges();
      expect(component.showMergeBehaviors()).toBeTrue();
    });

    it('should return false when trace has no merge lifecycle', () => {
      fixture.componentRef.setInput('trace', mockTrace);
      fixture.detectChanges();
      expect(component.showMergeBehaviors()).toBeFalse();
    });
  });
});
