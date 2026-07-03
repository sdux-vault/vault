import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { partialHttpResourceService } from './partial-http-resource.service';
import { p020Snapshot } from './snap-shots/p020-http-resource.replace.snapshot';

/*************************************************
 * Test: p020 — HttpResource Resolve via replaceState
 *
 * Uses a mock HttpResourceRef to verify the
 * withHttpResourceBehavior resolves an HttpResourceRef
 * input through the pipeline.
 *************************************************/

describe('p020: HttpResource - Replace', () => {
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
            key,
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
  });

  it('should resolve an HttpResourceRef and commit state via replaceState', async () => {
    const state = testService.vault.state;
    await vaultSettled(key);

    expect(state.value()).toEqual([]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    const mockResource = testService.createHttpResourceRef();

    testService.vault.replaceState(mockResource as any);

    await TestBed.tick();
    httpMock
      .expectOne(PrimaryPartialAbstractClass.HTTP_RESOURCE_URL)
      .flush(getBankEmployeeData(0, true));
    await vaultSettled(key);

    expect(state.value()).toEqual([
      jasmine.objectContaining({
        id: 'be-001',
        firstName: 'Alice',
        lastName: 'Wells'
      })
    ]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();

    const resource2 = testService.createHttpResourceRef();
    testService.vault.replaceState(resource2 as any);
    await TestBed.tick();
    httpMock
      .expectOne(PrimaryPartialAbstractClass.HTTP_RESOURCE_URL)
      .flush(getBankEmployeeData(1, true));
    await vaultSettled(key);

    expect(state.value()).toEqual([jasmine.objectContaining({ id: 'be-002' })]);
    expect(state.hasValue()).toBeTrue();
    expect(state.error()).toBeNull();
    expect(state.isLoading()).toBeFalse();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p020Snapshot);
  });
});
