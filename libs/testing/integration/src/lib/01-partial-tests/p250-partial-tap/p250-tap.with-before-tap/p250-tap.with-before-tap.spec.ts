import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../../structure/data/bank-employee.data';
import { BankEmployeeShape } from '../../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../../structure/utils/expect-monitor-snapshot.util';
import { PartialWithBeforeTapService } from './partial-tap.with-before-tap.service';
import { p250Snapshot } from './snap-shots/p250-tap.with-before-tap.snapshot';

describe('p250: Tap - Before Tap', () => {
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
        provideFeatureCell(
          PartialWithBeforeTapService,
          {
            key: 'partial-with-before-tap',
            initialState: getBankEmployeeData(0, true),
            insights: {} as any
          },
          []
        )
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialWithBeforeTapService);
    await testService.initialize();
  });

  afterEach(() => {
    stopListening();
  });

  it('should receive beforeTaps during the pipeline', async () => {
    await flushVaultPipeline();

    const state = testService.getState();

    await flushVaultPipeline();

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
        source: 'partialInlineBeforeTapFunction'
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
        source: 'partialPrivateBeforeTapFunction'
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
        source: 'partialAnonymousBeforeTapFunction'
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

    testService.clearTaps();
    testService.vault.replaceState(
      getBankEmployeeData(1, true) as BankEmployeeShape[]
    );
    await flushVaultPipeline();

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    expect(state.value()).toEqual([
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
        source: 'partialInlineBeforeTapFunction'
      }),
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
        source: 'partialPrivateBeforeTapFunction'
      }),
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
        source: 'partialAnonymousBeforeTapFunction'
      }),
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
        source: 'partialPureFunctionBeforeTap'
      })
    ]);
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p250Snapshot);
  });
});
