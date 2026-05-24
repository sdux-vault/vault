import {
  Injectable,
  Injector,
  provideZonelessChangeDetection,
  runInInjectionContext
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  FeatureCell,
  injectVault,
  provideFeatureCell,
  provideVault
} from '@sdux-vault/angular';
import { resetVaultForTests } from '@sdux-vault/engine';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { BankEmployeeShape } from '../structure/shapes/bank-employee.shape';

@FeatureCell<BankEmployeeShape[]>('users-f1000')
@Injectable({
  providedIn: 'root'
})
class CellOne {
  private readonly vault = injectVault<BankEmployeeShape[]>(CellOne);
}

@FeatureCell<BankEmployeeShape[]>('users-f2000')
@Injectable({
  providedIn: 'root'
})
class CellTwo {
  private readonly vault = injectVault<BankEmployeeShape[]>(CellOne);
}

describe('f1000: Duplicate Create Error test', () => {
  it('should not allow duplicate cells', async () => {
    resetVaultForTests();
    await TestBed.configureTestingModule({
      providers: [provideVault(), provideZonelessChangeDetection()]
    });

    const injector = TestBed.inject(Injector);
    runInInjectionContext(injector, async () => {
      provideFeatureCell(CellOne, {
        key: 'users',
        initialState: [],
        insights: { wantsErrors: true, wantsPayload: true } as any
      });
    });
    await flushVaultPipeline();

    await expectAsync(
      runInInjectionContext(injector, async () => {
        provideFeatureCell(CellOne, {
          key: 'users',
          initialState: [],
          insights: { wantsErrors: true, wantsPayload: true } as any
        });
      })
    ).toBeRejectedWithError(
      '[vault] Duplicate FeatureCell key detected: "users". Each FeatureCell must have a unique key. Existing token: "users"'
    );

    await flushVaultPipeline();
  });
});

describe('f1000: Duplicate Get Error test', () => {
  it('should not allow injecting CellOne vault into multiple FeatureCells', async () => {
    resetVaultForTests();
    await TestBed.configureTestingModule({
      providers: [
        provideVault(),

        provideFeatureCell(CellOne, {
          key: 'users-f1000',
          initialState: [],
          insights: {} as any
        }),

        provideFeatureCell(CellTwo, {
          key: 'users-f2000',
          initialState: [],
          insights: {} as any
        }),

        provideZonelessChangeDetection()
      ]
    });

    TestBed.inject(CellOne);

    expect(() => {
      TestBed.inject(CellTwo);
    }).toThrowError(
      '[vault] FeatureCell "users-f1000" can only be injected into a single decorated @FeatureCell service.'
    );

    await flushVaultPipeline();
  });
});
