import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { flushVaultPipeline } from '../../../../../utils/src/public-api';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { partialHttpResourceService } from './partial-http-resource.service';
import { p022Snapshot } from './snap-shots/p022-http-resource.error.snapshot';

/*************************************************
 * Test: p022 — HttpResource Error
 *
 * Uses a mock HttpResourceRef in error state to verify
 * the withHttpResourceBehavior correctly propagates
 * errors through the pipeline.
 *
 * The mock resource has value: undefined and error set.
 * The behavior's firstValueFrom rejects (no value emits),
 * and createVaultError wraps the error for pipeline
 * error handling.
 *************************************************/

describe('p022: HttpResource - Error', () => {
  let testService: partialHttpResourceService;
  let stopListening: () => void;
  let httpMock: HttpTestingController;
  const key = 'partial-http-resource';
  const emitted: any[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        partialHttpResourceService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideFeatureCell(
          partialHttpResourceService,
          {
            key: 'partial-http-resource',
            initialState: []
          },
          []
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    httpMock = TestBed.inject(HttpTestingController);
    testService = TestBed.inject(partialHttpResourceService);
    testService.initialize();
  });

  afterEach(() => {
    stopListening();
    httpMock.verify();
    testService.clearGlobalErrors();
  });

  it('should propagate error from a failed HttpResourceRef', async () => {
    const state = testService.vault.state;
    await vaultSettled(key);

    expect(state.value()).toEqual([]);
    expect(state.error()).toBeNull();

    const errorResource = testService.createHttpResourceRef();

    testService.vault.replaceState(errorResource as any);

    await TestBed.tick();
    httpMock
      .expectOne(PrimaryPartialAbstractClass.HTTP_RESOURCE_URL)
      .flush('Network request failed', {
        status: 500,
        statusText: 'Server Error'
      });
    await flushVaultPipeline();

    // Value should remain unchanged since resolve failed
    expect(state.value()).toEqual([]);
    // Error should be captured by the pipeline
    expect(state.error()).toBeNull();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p022Snapshot);
  });
});
