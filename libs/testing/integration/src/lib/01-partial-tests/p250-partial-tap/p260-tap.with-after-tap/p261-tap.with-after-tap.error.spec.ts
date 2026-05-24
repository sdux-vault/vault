import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../../structure/data/bank-employee.data';
import { BankEmployeeShape } from '../../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../../structure/utils/expect-monitor-snapshot.util';
import { PartialWithAfterTapService } from './partial-tap.with-after-tap.service';
import { p261Snapshot } from './snap-shots/p261-tap.with-after-tap.error.snapshot';

/*************************************************
 * Initial value is getBankEmployees()
 *
 * filters and reducers comes out to be
 *
 * state.value().length = 3
 * afterTabs.length = 5
 *
 *
 * replace is getBankEmployees(1, true)
 *
 * filters and reducers comes out to be
 *
 * state.value() = undefined
 * afterTaps = []
 *
 *
 *************************************************/

describe('p261: Tap - after Tap - Error', () => {
  const key = 'partial-with-after-tap';
  let testService: PartialWithAfterTapService;
  let stopListening: () => void;

  const emitted: any[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true
        }),
        PartialWithAfterTapService,
        provideZonelessChangeDetection(),
        provideFeatureCell(PartialWithAfterTapService, {
          key,
          initialState: getBankEmployeeData(0, true),
          insights: { wantsErrors: true, wantsPayload: true } as any
        })
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialWithAfterTapService);
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
        source: 'partialArrowAfterTapFunction'
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
        source: 'partialAnonymousErrorAfterTapFunction'
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
        source: 'partialPureFunctionAfterTap'
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
        message: 'this is the after tap error message',
        featureCellKey: 'partial-with-after-tap',
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
        source: 'partialArrowAfterTapFunction'
      }),
      Object({ source: 'partialAnonymousErrorAfterTapFunction' })
    ]);
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p261Snapshot);
  });
});
