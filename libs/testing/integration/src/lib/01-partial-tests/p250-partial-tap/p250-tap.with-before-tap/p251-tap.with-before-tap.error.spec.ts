import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../../structure/data/bank-employee.data';
import { BankEmployeeShape } from '../../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../../structure/utils/expect-monitor-snapshot.util';
import { PartialWithBeforeTapService } from './partial-tap.with-before-tap.service';
import { p251Snapshot } from './snap-shots/p251-tap.with-before-tap.error.snapshot';

/*************************************************
 * Initial value is getBankEmployees()
 *
 * filters and reducers comes out to be
 *
 * state.value().length = 3
 * beforeTabs.length = 5
 *
 *
 * replace is getBankEmployees(1, true)
 *
 * filters and reducers comes out to be
 *
 * state.value() = undefined
 * beforeTaps = []
 *
 *
 *************************************************/

describe('p251: Tap - Before Tap - Error', () => {
  const key = 'partial-with-before-tap';
  let testService: PartialWithBeforeTapService;
  let stopListening: () => void;

  const emitted: any[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        PartialWithBeforeTapService,
        provideZonelessChangeDetection(),
        provideFeatureCell(PartialWithBeforeTapService, {
          key,
          initialState: getBankEmployeeData(0, true),
          insights: { wantsErrors: true, wantsPayload: true } as any
        })
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialWithBeforeTapService);
    testService.initializeError();
  });

  afterEach(() => {
    stopListening();
    testService.clearGlobalErrors();
  });

  it('should handle errors from beforeTaps during the pipeline', async () => {
    const state = testService.getState();
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    expect(state.value()).toEqual([
      Object({
        id: 'be-001',
        firstName: 'Alice',
        lastName: 'Wells',
        role: 'Teller',
        status: 'Active',
        salary: 48000,
        hireDate: '2018-03-12',
        birthDate: '1992-07-22',
        phoneNumber: '555-201-8899',
        address: Object({
          street: '101 Maple St',
          city: 'Springfield',
          state: 'IL',
          zip: '62704'
        })
      })
    ]);

    expect(testService.getTaps()).toEqual([
      Object({
        value: [
          Object({
            id: 'be-001',
            firstName: 'Alice',
            lastName: 'Wells',
            role: 'Teller',
            status: 'Active',
            salary: 48000,
            hireDate: '2018-03-12',
            birthDate: '1992-07-22',
            phoneNumber: '555-201-8899',
            address: Object({
              street: '101 Maple St',
              city: 'Springfield',
              state: 'IL',
              zip: '62704'
            })
          })
        ],
        source: 'partialArrowBeforeTapFunction'
      }),
      Object({
        value: [
          Object({
            id: 'be-001',
            firstName: 'Alice',
            lastName: 'Wells',
            role: 'Teller',
            status: 'Active',
            salary: 48000,
            hireDate: '2018-03-12',
            birthDate: '1992-07-22',
            phoneNumber: '555-201-8899',
            address: Object({
              street: '101 Maple St',
              city: 'Springfield',
              state: 'IL',
              zip: '62704'
            })
          })
        ],
        source: 'partialAnonymousErrorBeforeTapFunction'
      }),
      Object({
        value: [
          Object({
            id: 'be-001',
            firstName: 'Alice',
            lastName: 'Wells',
            role: 'Teller',
            status: 'Active',
            salary: 48000,
            hireDate: '2018-03-12',
            birthDate: '1992-07-22',
            phoneNumber: '555-201-8899',
            address: Object({
              street: '101 Maple St',
              city: 'Springfield',
              state: 'IL',
              zip: '62704'
            })
          })
        ],
        source: 'partialPureFunctionBeforeTap'
      })
    ]);

    testService.isError = true;
    testService.clearTaps();

    testService.vault.replaceState(
      getBankEmployeeData(1, true) as BankEmployeeShape[]
    );
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toEqual(
      Object({
        message: 'this is the before tap error message',
        featureCellKey: 'partial-with-before-tap',
        details: jasmine.any(String),
        raw: jasmine.any(Error),
        timestamp: jasmine.any(Number)
      })
    );

    expect(state.value()).toEqual([
      Object({
        id: 'be-001',
        firstName: 'Alice',
        lastName: 'Wells',
        role: 'Teller',
        status: 'Active',
        salary: 48000,
        hireDate: '2018-03-12',
        birthDate: '1992-07-22',
        phoneNumber: '555-201-8899',
        address: Object({
          street: '101 Maple St',
          city: 'Springfield',
          state: 'IL',
          zip: '62704'
        })
      })
    ]);

    expect(testService.getTaps()).toEqual([
      Object({
        value: [
          Object({
            id: 'be-002',
            firstName: 'Brian',
            lastName: 'Stone',
            role: 'Manager',
            status: 'Vacation',
            salary: 90000,
            hireDate: '2012-09-05',
            birthDate: '1981-04-17',
            phoneNumber: '555-490-3322',
            address: Object({
              street: '54 Ridgeview Ave',
              city: 'Springfield',
              state: 'IL',
              zip: '62711'
            })
          })
        ],
        source: 'partialArrowBeforeTapFunction'
      }),
      Object({ source: 'partialAnonymousErrorBeforeTapFunction' })
    ]);
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p251Snapshot);
  });
});
