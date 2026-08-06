import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  BrandNameComponent,
  sduxTestingModule
} from '@sdux-vault/ui/web-components';
import { DocsTopTierRoadmapComponent } from './roadmap.component';

describe('Component: RoadMap', () => {
  let fixture: ComponentFixture<DocsTopTierRoadmapComponent>;
  let component: DocsTopTierRoadmapComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DocsTopTierRoadmapComponent,
        BrandNameComponent,
        sduxTestingModule,
        FormsModule
      ],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocsTopTierRoadmapComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('coreRoadMap', () => {
    it('should have sort options', () => {
      expect(component.coreSortOptions).toEqual([
        Object({ key: 'behavior', value: 'Behavior' }),
        Object({ key: 'isExtendable', value: 'Extendable' }),
        Object({ key: 'feature', value: 'Feature' }),
        Object({ key: 'package', value: 'Package' })
      ]);
    });

    it('should default ASC sort', () => {
      expect(component.sortedCoreRoadMap.slice(0, 5)).toEqual([
        Object({
          feature:
            '<a href="/docs/references/functions/feature-cell">FeatureCell</a> Error Handling',
          isExtendable: false,
          package: '@sdux-vault/core',
          behavior: 'N/A'
        }),
        Object({
          feature:
            '<a href="/docs/references/functions/feature-cell">FeatureCell</a> Error Normalization',
          isExtendable: false,
          package: '@sdux-vault/core',
          behavior: 'N/A'
        }),
        Object({
          feature: 'After Tap',
          isExtendable: false,
          package: '@sdux-vault/core',
          behavior:
            '<a href="/docs/pipeline/behaviors/taps/with-core-after-tap-behavior">withCoreAfterTapBehavior</a>'
        }),
        Object({
          feature: 'Array Merge',
          isExtendable: false,
          package: '@sdux-vault/core',
          behavior:
            '<a href="/docs/pipeline/behaviors/merge/with-array-merge-behavior">withArrayMergeBehavior</a>'
        }),
        Object({
          feature: 'Before Tap',
          isExtendable: false,
          package: '@sdux-vault/core',
          behavior:
            '<a href="/docs/pipeline/behaviors/taps/with-core-before-tap-behavior">withCoreBeforeTapBehavior</a>'
        })
      ]);
    });

    it('should DESC sort', () => {
      component.coreSortAsc = false;
      expect(component.sortedCoreRoadMap.slice(0, 5)).toEqual([
        Object({
          feature: 'Value Resolution',
          isExtendable: false,
          package: '@sdux-vault/core',
          behavior:
            '<a href="/docs/pipeline/behaviors/resolve/with-core-value-behavior">withCoreValueBehavior</a>'
        }),
        Object({
          feature: 'State Emission Observable',
          isExtendable: false,
          package: '@sdux-vault/core',
          behavior: 'N/A'
        }),
        Object({
          feature: 'State Emission Callback',
          isExtendable: false,
          package: '@sdux-vault/core',
          behavior:
            '<a href="/docs/pipeline/behaviors/state/with-core-emit-state-behavior">withCoreEmitStateBehavior</a>'
        }),
        Object({
          feature: 'State',
          isExtendable: false,
          package: '@sdux-vault/core',
          behavior:
            '<a href="/docs/pipeline/behaviors/state/with-core-state-behavior">withCoreStateBehavior</a>'
        }),
        Object({
          feature: 'Reducer',
          isExtendable: false,
          package: '@sdux-vault/core',
          behavior:
            '<a href="/docs/pipeline/behaviors/reducer/with-core-reducer-behavior">withCoreReducerBehavior</a>'
        })
      ]);
    });

    it('should sort by package', () => {
      component.selectedCoreSort = 'package';
      expect(component.sortedCoreRoadMap.slice(0, 5)).toEqual([
        Object({
          feature:
            '<a href="/docs/references/functions/feature-cell">FeatureCell</a> Error Handling',
          isExtendable: false,
          package: '@sdux-vault/core',
          behavior: 'N/A'
        }),
        Object({
          feature:
            '<a href="/docs/references/functions/feature-cell">FeatureCell</a> Error Normalization',
          isExtendable: false,
          package: '@sdux-vault/core',
          behavior: 'N/A'
        }),
        Object({
          feature: 'After Tap',
          isExtendable: false,
          package: '@sdux-vault/core',
          behavior:
            '<a href="/docs/pipeline/behaviors/taps/with-core-after-tap-behavior">withCoreAfterTapBehavior</a>'
        }),
        Object({
          feature: 'Array Merge',
          isExtendable: false,
          package: '@sdux-vault/core',
          behavior:
            '<a href="/docs/pipeline/behaviors/merge/with-array-merge-behavior">withArrayMergeBehavior</a>'
        }),
        Object({
          feature: 'Before Tap',
          isExtendable: false,
          package: '@sdux-vault/core',
          behavior:
            '<a href="/docs/pipeline/behaviors/taps/with-core-before-tap-behavior">withCoreBeforeTapBehavior</a>'
        })
      ]);
    });
  });

  describe('ProLicenseRoadMap', () => {
    it('should have sort options', () => {
      expect(component.proLicenseSortOptions).toEqual([
        Object({ key: 'behavior', value: 'Behavior' }),
        Object({ key: 'isExtendable', value: 'Extendable' }),
        Object({ key: 'feature', value: 'Feature' }),
        Object({ key: 'package', value: 'Package' })
      ]);
    });

    it('should default ASC sort', () => {
      expect(component.sortedProLicenseRoadMap.slice(0, 5)).toEqual([
        Object({
          feature: 'Aes256 Encryption',
          type: 'Behavior',
          isExtendable: true,
          package: '@sdux-vault/addons',
          behavior: 'withAes256EncryptionBehavior'
        }),
        Object({
          feature: 'Cookie Storage',
          type: 'Behavior',
          isExtendable: true,
          package: '@sdux-vault/persist',
          behavior:
            '<a href="/docs/pipeline/addons/persist/with-cookie-storage-persist-behavior">withCookieStoragePersistBehavior</a>'
        }),
        Object({
          feature: 'Cross Tab Sync Behavior',
          type: 'Behavior',
          isExtendable: false,
          behavior: 'withCrossTabSyncBehavior',
          explanation:
            'Synchronizes <a href="/docs/references/functions/feature-cell">FeatureCell</a> state across multiple browser tabs using shared storage or messaging channels.'
        }),
        Object({
          feature: 'Cross Tab Sync Controller',
          type: 'Controller',
          isExtendable: false,
          behavior: 'withCrossTabSyncController',
          explanation:
            'Synchronizes <a href="/docs/references/functions/feature-cell">FeatureCell</a> state across multiple browser tabs using shared storage or messaging channels.'
        }),
        Object({
          feature: 'Local Storage',
          type: 'Behavior',
          isExtendable: true,
          package: '@sdux-vault/persist',
          behavior:
            '<a href="/docs/pipeline/addons/persist/with-local-storage-persist-behavior">withLocalStoragePersistBehavior</a>'
        })
      ]);
    });

    it('should DESC sort', () => {
      component.proLicenseSortAsc = false;
      expect(component.sortedProLicenseRoadMap.slice(0, 5)).toEqual([
        Object({
          feature: 'Session Storage',
          type: 'Behavior',
          isExtendable: true,
          package: '@sdux-vault/persist',
          behavior:
            '<a href="/docs/pipeline/addons/persist/with-session-storage-persist-behavior">withSessionStoragePersistBehavior</a>'
        }),
        Object({
          feature: 'Local Storage',
          type: 'Behavior',
          isExtendable: true,
          package: '@sdux-vault/persist',
          behavior:
            '<a href="/docs/pipeline/addons/persist/with-local-storage-persist-behavior">withLocalStoragePersistBehavior</a>'
        }),
        Object({
          feature: 'Cross Tab Sync Controller',
          type: 'Controller',
          isExtendable: false,
          behavior: 'withCrossTabSyncController',
          explanation:
            'Synchronizes <a href="/docs/references/functions/feature-cell">FeatureCell</a> state across multiple browser tabs using shared storage or messaging channels.'
        }),
        Object({
          feature: 'Cross Tab Sync Behavior',
          type: 'Behavior',
          isExtendable: false,
          behavior: 'withCrossTabSyncBehavior',
          explanation:
            'Synchronizes <a href="/docs/references/functions/feature-cell">FeatureCell</a> state across multiple browser tabs using shared storage or messaging channels.'
        }),
        Object({
          feature: 'Cookie Storage',
          type: 'Behavior',
          isExtendable: true,
          package: '@sdux-vault/persist',
          behavior:
            '<a href="/docs/pipeline/addons/persist/with-cookie-storage-persist-behavior">withCookieStoragePersistBehavior</a>'
        })
      ]);
    });

    it('should sort by package', () => {
      component.selectedProLicenseSort = 'package';
      expect(component.sortedProLicenseRoadMap.slice(0, 5)).toEqual([
        Object({
          feature: 'Aes256 Encryption',
          type: 'Behavior',
          isExtendable: true,
          package: '@sdux-vault/addons',
          behavior: 'withAes256EncryptionBehavior'
        }),
        Object({
          feature: 'Local Storage',
          type: 'Behavior',
          isExtendable: true,
          package: '@sdux-vault/persist',
          behavior:
            '<a href="/docs/pipeline/addons/persist/with-local-storage-persist-behavior">withLocalStoragePersistBehavior</a>'
        }),
        Object({
          feature: 'Session Storage',
          type: 'Behavior',
          isExtendable: true,
          package: '@sdux-vault/persist',
          behavior:
            '<a href="/docs/pipeline/addons/persist/with-session-storage-persist-behavior">withSessionStoragePersistBehavior</a>'
        }),
        Object({
          feature: 'Cookie Storage',
          type: 'Behavior',
          isExtendable: true,
          package: '@sdux-vault/persist',
          behavior:
            '<a href="/docs/pipeline/addons/persist/with-cookie-storage-persist-behavior">withCookieStoragePersistBehavior</a>'
        }),
        Object({
          feature: 'Cross Tab Sync Behavior',
          type: 'Behavior',
          isExtendable: false,
          behavior: 'withCrossTabSyncBehavior',
          explanation:
            'Synchronizes <a href="/docs/references/functions/feature-cell">FeatureCell</a> state across multiple browser tabs using shared storage or messaging channels.'
        })
      ]);
    });

    it('should sort by package', () => {
      component.selectedProLicenseSort = 'package';
      expect(component.sortedProLicenseRoadMap.slice(0, 5)).toEqual([
        Object({
          feature: 'Aes256 Encryption',
          type: 'Behavior',
          isExtendable: true,
          package: '@sdux-vault/addons',
          behavior: 'withAes256EncryptionBehavior'
        }),
        Object({
          feature: 'Local Storage',
          type: 'Behavior',
          isExtendable: true,
          package: '@sdux-vault/persist',
          behavior:
            '<a href="/docs/pipeline/addons/persist/with-local-storage-persist-behavior">withLocalStoragePersistBehavior</a>'
        }),
        Object({
          feature: 'Session Storage',
          type: 'Behavior',
          isExtendable: true,
          package: '@sdux-vault/persist',
          behavior:
            '<a href="/docs/pipeline/addons/persist/with-session-storage-persist-behavior">withSessionStoragePersistBehavior</a>'
        }),
        Object({
          feature: 'Cookie Storage',
          type: 'Behavior',
          isExtendable: true,
          package: '@sdux-vault/persist',
          behavior:
            '<a href="/docs/pipeline/addons/persist/with-cookie-storage-persist-behavior">withCookieStoragePersistBehavior</a>'
        }),
        Object({
          feature: 'Cross Tab Sync Behavior',
          type: 'Behavior',
          isExtendable: false,
          behavior: 'withCrossTabSyncBehavior',
          explanation:
            'Synchronizes <a href="/docs/references/functions/feature-cell">FeatureCell</a> state across multiple browser tabs using shared storage or messaging channels.'
        })
      ]);
    });
  });

  describe('addRoadMap', () => {
    it('should have sort options', () => {
      expect(component.addonSortOptions).toEqual([
        Object({ key: 'behavior', value: 'Behavior' }),
        Object({ key: 'isExtendable', value: 'Extendable' }),
        Object({ key: 'feature', value: 'Feature' }),
        Object({ key: 'package', value: 'Package' })
      ]);
    });

    it('should default ASC sort', () => {
      expect(component.sortedAddonRoadMap.slice(0, 5)).toEqual([
        Object({
          feature: 'Array Apped Merge',
          isExtendable: true,
          package: '@sdux-vault/addons',
          behavior:
            '<a href="/docs/pipeline/addons/merge/with-array-append-merge-behavior">withArrayAppendMergeBehavior</a>'
        }),
        Object({
          feature: 'Array Push Merge',
          isExtendable: true,
          package: '@sdux-vault/addons',
          behavior:
            '<a href="/docs/pipeline/addons/merge/with-array-push-merge-behavior">withArrayPushMergeBehavior</a>'
        }),
        Object({
          feature: 'Delay Interceptor Controller',
          isExtendable: true,
          package: '@sdux-vault/addons',
          behavior:
            '<a href="/docs/pipeline/controllers/with-delay-controller">withDelayController</a>'
        }),
        Object({
          feature: 'Distinct Until Changed Operator',
          isExtendable: true,
          package: '@sdux-vault/addons',
          behavior: 'withDistinctUntilChangedBehavior'
        }),
        Object({
          feature: 'Error',
          isExtendable: true,
          package: '@sdux-vault/addons',
          behavior: 'N/A'
        })
      ]);
    });

    it('should DESC sort', () => {
      component.addonSortAsc = false;
      expect(component.sortedAddonRoadMap.slice(0, 5)).toEqual([
        Object({
          feature: 'Throttle Interceptor Controller',
          isExtendable: true,
          package: '@sdux-vault/addons',
          behavior:
            '<a href="/docs/pipeline/controllers/with-throttle-controller">withThrottleController</a>'
        }),
        Object({
          feature: 'Stepwise Resolve',
          isExtendable: true,
          package: '@sdux-vault/addons',
          behavior:
            '<a href="/docs/pipeline/addons/stepwise/with-stepwise-resolve-behavior">withStepwiseResolveBehavior</a>'
        }),
        Object({
          feature: 'Stepwise Reducer',
          isExtendable: true,
          package: '@sdux-vault/addons',
          behavior:
            '<a href="/docs/pipeline/addons/stepwise/with-stepwise-reducer-behavior">withStepwiseReducerBehavior</a>'
        }),
        Object({
          feature: 'Stepwise Filter',
          isExtendable: true,
          package: '@sdux-vault/addons',
          behavior:
            '<a href="/docs/pipeline/addons/stepwise/with-stepwise-filter-behavior">withStepwiseFilterBehavior</a>'
        }),
        Object({
          feature: 'Stepwise',
          isExtendable: true,
          package: '@sdux-vault/addons',
          behavior:
            '<a href="/docs/pipeline/controllers/with-stepwise-controller">withStepwiseController</a>'
        })
      ]);
    });

    it('should sort by package', () => {
      component.selectedAddonSort = 'package';
      expect(component.sortedAddonRoadMap.slice(0, 5)).toEqual([
        Object({
          feature: 'Error',
          isExtendable: true,
          package: '@sdux-vault/addons',
          behavior: 'N/A'
        }),
        Object({
          feature: 'Array Apped Merge',
          isExtendable: true,
          package: '@sdux-vault/addons',
          behavior:
            '<a href="/docs/pipeline/addons/merge/with-array-append-merge-behavior">withArrayAppendMergeBehavior</a>'
        }),
        Object({
          feature: 'Array Push Merge',
          isExtendable: true,
          package: '@sdux-vault/addons',
          behavior:
            '<a href="/docs/pipeline/addons/merge/with-array-push-merge-behavior">withArrayPushMergeBehavior</a>'
        }),
        Object({
          feature: 'Stepwise',
          isExtendable: true,
          package: '@sdux-vault/addons',
          behavior:
            '<a href="/docs/pipeline/controllers/with-stepwise-controller">withStepwiseController</a>'
        }),
        Object({
          feature: 'Stepwise Filter',
          isExtendable: true,
          package: '@sdux-vault/addons',
          behavior:
            '<a href="/docs/pipeline/addons/stepwise/with-stepwise-filter-behavior">withStepwiseFilterBehavior</a>'
        })
      ]);
    });
  });

  describe('futureRoadMap', () => {
    it('should have sort options', () => {
      expect(component.futureSortOptions).toEqual([
        Object({ key: 'explanation', value: 'Explanation' }),
        Object({ key: 'isExtendable', value: 'Extendable' }),
        Object({ key: 'feature', value: 'Feature' }),
        Object({ key: 'type', value: 'Type' })
      ]);
    });

    it('should default ASC sort', () => {
      expect(component.sortedFutureRoadMap.slice(0, 5)).toEqual([
        Object({
          feature: 'Argon2 Password Encryption',
          type: 'Encrypt',
          isExtendable: false,
          explanation:
            'Provides modern, memory-hard password-based encryption using Argon2 for maximum security.'
        }),
        Object({
          feature: 'Behavior Scheduling',
          type: 'Controller',
          isExtendable: true,
          explanation:
            'Introduces advanced pipeline scheduling features such as priority ordering, parallel execution, conditional activation, and dependency graphs.'
        }),
        Object({
          feature: 'connectForm',
          type: 'Resolve',
          isExtendable: true,
          explanation:
            'Synchronizes form value changes directly into <a href="/docs/references/functions/feature-cell">FeatureCell</a> state, enabling declarative form-driven updates.'
        }),
        Object({
          feature: 'Diff/Patch Merge',
          type: 'Merge',
          isExtendable: true,
          explanation:
            'Applies structural diffs or patches to existing state instead of full object replacement.'
        }),
        Object({
          feature: 'Entity CRUD Helpers',
          type: 'Resolve',
          isExtendable: true,
          explanation:
            'Provides standardized add, remove, and update helpers for managing collections of entities.'
        })
      ]);
    });

    it('should DESC sort', () => {
      component.futureSortAsc = false;
      expect(component.sortedFutureRoadMap.slice(0, 5)).toEqual([
        Object({
          feature: 'withWindowing',
          type: 'Interceptor',
          isExtendable: true,
          explanation:
            'Groups multiple state updates into a single pipeline execution window, producing a single consolidated Snapshot.'
        }),
        Object({
          feature: 'withUndoRedo',
          type: 'Controller',
          isExtendable: true,
          explanation:
            'Tracks state history and exposes undo/redo commands for reversible state transitions.'
        }),
        Object({
          feature: 'withTimeout',
          type: 'Controller',
          isExtendable: true,
          explanation:
            'Fails state updates that exceed a specified execution time limit.'
        }),
        Object({
          feature: 'withSuspend',
          type: 'Controller',
          isExtendable: true,
          explanation:
            'Suspends pipeline execution until a condition or external signal resolves.'
        }),
        Object({
          feature: 'withStateChecksum',
          type: 'Option',
          isExtendable: true,
          explanation:
            'Skips emissions when computed checksums indicate no meaningful state change.'
        })
      ]);
    });

    it('should sort by package', () => {
      component.selectedFutureSort = 'package';
      expect(component.sortedFutureRoadMap.slice(0, 5)).toEqual([
        Object({
          feature: 'IndexedDB Persist',
          type: 'Persist',
          isExtendable: true,
          explanation:
            'Adds a persistence behavior that stores <a href="/docs/references/functions/feature-cell">FeatureCell</a> state in IndexedDB, enabling durable, large-scale client-side storage with support for structured data and asynchronous access.'
        }),
        Object({
          feature: 'Retry Local Cell Failures',
          type: 'Controller',
          isExtendable: true,
          explanation:
            'Introduces a retry behavior that automatically replays failed state resolutions for a <a href="/docs/references/functions/feature-cell">FeatureCell</a> a configurable number of times, with optional backoff strategies.'
        }),
        Object({
          feature: 'withRateLimit',
          type: 'Interceptor',
          isExtendable: true,
          explanation:
            'Limits the maximum number of state updates allowed within a defined time window, preventing excessive writes and protecting downstream consumers.'
        }),
        Object({
          feature: 'withDebounceSync',
          type: 'Interceptor',
          isExtendable: true,
          explanation:
            'Provides a frame-synchronous debounce interceptor that batches rapid updates within the same execution frame without introducing asynchronous delays.'
        }),
        Object({
          feature: 'withAudit',
          isExtendable: true,
          type: 'Option',
          explanation:
            'Buffers state updates and emits only the final value at the end of a configured time window, reducing noisy intermediate emissions.'
        })
      ]);
    });
  });
});
