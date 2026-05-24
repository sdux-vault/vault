import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { getBankEmployeeData } from '../../../structure/data/bank-employee.data';
import { BankEmployeeShape } from '../../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../../structure/utils/expect-monitor-snapshot.util';
import { PartialWithAfterTapService } from './partial-tap.with-after-tap.service';
import { p260Snapshot } from './snap-shots/p260-tap.with-after-tap.success.snapshot';

describe('p260: Tap - After Tap', () => {
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
          key: 'partial-with-after-tap',
          initialState: getBankEmployeeData(0, true),
          insights: {} as any
        })
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialWithAfterTapService);
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
        source: 'partialInlineAfterTapFunction'
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
        source: 'partialPrivateAfterTapFunction'
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
        source: 'partialAnonymousAfterTapFunction'
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
        source: 'partialArrowAfterTapFunction'
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
        source: 'partialInlineAfterTapFunction'
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
        source: 'partialPrivateAfterTapFunction'
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
        source: 'partialAnonymousAfterTapFunction'
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
        source: 'partialPureFunctionAfterTap'
      })
    ]);
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p260Snapshot);
  });
});
