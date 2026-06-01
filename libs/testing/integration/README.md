# SDuX Vault Integration Testing

## **Integration Tests: The Contract That Must Never Break**

SDuX Vault integration tests validate the **entire pipeline contract** for FeatureCells, ensuring that state transitions remain **deterministic**, **isolated**, and **behavior-correct** across every release.

Developers and teams around the world depend on SDuX Vault to behave flawlessly.  
These integration tests exist to hold us to the level of reliability **expected by real engineers building real systems**.

It’s called **karma**. If a release of ngSDuX broke your production system because we skipped a proper integration test, you’d be furious — and rightfully so.

We can either be the engineers who cause those problems, or the ones who prevent them. Only one of those paths is worthy of SDuX Vault.

And remember:
**“Obi-Wan, you’re my only hope.”**
— every PM, everywhere, when the pipeline breaks

Is this too much?  
**Good — it should be.**

### \*_The Goal_

1. If a butterfly flaps its wings and breaks the pipeline, our tests should catch it before your PM storms over to your desk.
2. If the butterfly breaks the pipeline _without_ a failing test, the problem isn’t the butterfly — it’s our tests.

### **Key Points**

1. Integration tests expose reality — not theory.
2. QA cannot catch pipeline defects.
3. Integration tests protect the ngSDuX architecture.
4. Integration tests reveal unintended coupling.
5. Integration tests are the foundation of true engineering velocity.

### **Discussion Topic**

> If an engineer can’t verify that their own code works,  
> are they really an engineer?

---

## TL;DR — Integration Tests

- SDuX Vault provides two levels of integration testing:

### Full Tests (Pipeline-Wide)

Validate a single resolve type across:

- operators
- filters
- reducers
- encryption
- persistence
- tap behaviors

Runs through _the entire pipeline_.

### Partial Tests (Behavior-Specific)

Validate one behavior:

- reducer
- operator
- filter
- encrypt
- persist

### Integration Test Requirements

1. Full
   - A replaceState and mergeState happy path

2. Partial
   - A replaceState and mergeState happy path test
   - A single error test

### Patterns

    - Use the abstract fixture service for shared reducers
    - Group events in `emitted` to ensure deterministic ordering
    - Use flushMicrotasksZoneless for pipeline sequencing
    - Use mock storage to simulate persist/merge

### Common Mistakes

    - ❌ Do NOT test DI wiring
    - ❌ Do NOT test Angular rendering
    - ❌ Do NOT test helpers
    - ❌ Do NOT test state shape validations

---

## Next Steps

Do you need to test the entire pipeline? → Full Test  
Do you need to test only one behavior stage? → Partial Test  
Does your behavior involve multiple cross-behavior dependencies? → Full Test  
Is the behavior isolated and self-contained? → Unit Test

---

{{--BOILERPLATE:installation--}}

---

## Test Harness Overview

The goal is to test _cross-behavior correctness_, not infrastructure.

The integration harness provides:

- deterministic FeatureCell creation
- stable async sequencing (tick-safe)
- mock storage drivers (local/session/memory)
- mock encryption providers
- a unified context builder
- a simulated DevTools subscriber
- snapshot helpers

Example helper signatures:

### Accessing Data

`getBankEmployeeData` is used to power the tests and to verify the pipeline is working. The function can return either all the employees (`BankEmployeeModel[]`) (used for testing), a single employee (`BankEmployeeModel`) or a a single employee as an array (`[BankEmployeeModel]`).
The final 3 employees: Nina, Oscar and Priya make it through the filters to be reduced and in the final state

```ts
export function getBankEmployeeData(index?: number, asArray = false): any {
  if (index !== undefined && index >= 0 && index < Data.length) {
    const item = structuredClone(Data[index]);
    return asArray ? [item] : item;
  }

  return structuredClone(Data);
}
```

`getAdditionalBankEmployeeData` is used to power the tests and to verify the pipeline is working. The function can returns either one additional employee (`BankEmployeeModel[]`) (used for testing), a single employee (`BankEmployeeModel`).
This employee: Victor makes it through the filters to be reduced and in the final state

```ts
export function getAdditionalBankEmployeeData(
  asArray = false
): BankEmployeeShape | BankEmployeeShape[] {
  const item = isolateValue(AdditionalOnData[0]);
  return asArray ? [item] : item;
}
```

`getFilteredBankEmployeeData` is used to verify the `beforeTap` callbacks are working. The function can return either all 3 of the filtered employees (`BankEmployeeModel[]`) (used for verification), a single employee (`BankEmployeeModel`) or a a single employee as an array (`[BankEmployeeModel]`).
The final 3 employees: Nina, Oscar and Priya make it through the filters and **_HAVE NOT_** been reduced.

```ts
export function getFilteredBankEmployeeData(
  index?: number,
  asArray = false
): anay {
  if (index !== undefined && index >= 0 && index < Data.length) {
    const item = structuredClone(Data[index]);
    return asArray ? [item] : item;
  }

  return structuredClone(Data);
}
```

`getFilteredAndReducedBankEmployeeData` is used to verify the `afterTap` callbacks are working. The function can return either all 3 of the filtered and redueced employees (`BankEmployeeModel[]`) (used for verification), a single employee (`BankEmployeeModel`) or a a single employee as an array (`[BankEmployeeModel]`).
The final 3 employees: Nina, Oscar and Priya make it through the filters and **_HAVE_** been reduced.

```ts
export function getFilteredAndReducedBankEmployeeData(
  index?: number,
  asArray = false
): any {
  if (index !== undefined && index >= 0 && index < Data.length) {
    const item = structuredClone(Data[index]);
    return asArray ? [item] : item;
  }

  return structuredClone(Data);
}
```

---

### Verifying Test Data

#### verifyAllEmployees

This is an abstracted helper to centralize the validation of all 9 employees.

The **verifyAllEmployees** is the base-line testing for the generic `PrimaryPartialAbstractClass.replaceState` or
`PrimaryPartialAbstractClass.mergeState` without any reducers or filters in the pipeline.

```ts
Other test cases
...
verifyAllEmployees(state.value());
...
Other test cases
```

---

#### verifyFullPipelineEmployees

This is an abstracted helper to centralize the validation of the 3 employees after the pipeline filters and reduces the original 9 employees.

The **verifyFullPipelineEmployees** is the base-line testing for the generic `PrimaryPartialAbstractClass.replaceState` or
`PrimaryPartialAbstractClass.mergeState` with the standard reducers or filters in the pipeline.

```ts
Other test cases
...
verifyFullPipelineEmployees(state.value());
...
Other test cases
```

---

#### verifyFullPipelineAfterTaps

This is an abstracted helper to centralize the validation of the 3 employees after the pipeline reduces the original 9 employees.

The **verifyFullPipelineAfterTaps ** is the base-line testing for the generic `PrimaryPartialAbstractClass.replaceState` or
`PrimaryPartialAbstractClass.mergeState` with the standard reducers or filters in the pipeline.

```ts
Other test cases
...
verifyFullPipelineAfterTaps(state.value());
...
Other test cases
```

---

#### verifyFullPipelineBeforeTaps

This is an abstracted helper to centralize the validation of the 3 employees before the pipeline reduces the original 9 employees.

The **verifyFullPipelineBeforeTaps ** is the base-line testing for the generic `PrimaryPartialAbstractClass.replaceState` or
`PrimaryPartialAbstractClass.mergeState` with the standard reducers or filters in the pipeline.

```ts
Other test cases
...
verifyFullPipelineBeforeTaps(state.value());
...
Other test cases
```

---

### Verifying Monitor Data

The monitor data is what powers the DevTools. There is **_a lot_** of events that happen for each state change. It's important to verify the events are correct and in sequential order. This also takes an incredible amount of time while testing. Fortunately, now that the api contract has stabilized, the failures to the monitor events has lessened. There are some helpful utilities.

1. exportMonitorSnapshot

   Each spec file has a `./snapshot/<specfile>.snapshot.ts` file that contains all the monitor events.

   ```ts
   export function expectMonitorSnapshot(actual: any[], expected: any[]);
   ```

   ```ts
   import { f21Snapshot } from './snap-shots/f21-value.merge.snapshot';

   it('should have the correct insight events', async () => {
     jasmine.clock().tick(1000); // if Needed by the test
     await flushVaultPipline();
     expectMonitorSnapshot(emitted, f21Snapshot);
   });
   ```

2. $ npm run snapshots

   Creates an output file

3. $ npm run snapshots:fix
   Uses the output file to update all the snapshots

   **_This should only be used if you knowinlgy alter the monitor events and all the integration tests fail._**
   If you didn't alter the monitor events and you have snapshot failures then **_DO NOT_** use this feature, you have a real bug.

---

### Working with full pipeline state flushes with a state change

```ts
await vaultSettled('feature-cell-key');
```

---

### Working with local storage

```ts
export const clearLocalStorage = (key: string): void => {
  ...
};

export const getLocalStorage = (key: string): object => {
  ...
};

export const setLocalStorage = (key: string, rawData: any): void => {
  ...
};
```

---

### Working with session storage

```ts
export const clearSessionStorage = (key: string): void => {
  ...
};

export const getSessionStorage = (key: string): object => {
  ...
};

export const setSessionStorage = (key: string, rawData: any): void => {
  ...
};
```

---

### Working with cookie storage

```ts
export const clearCookieStorage = (key: string): void => {
  ...
};

export const getCookieStorage = (key: string): object | null => {
  ...
};

export const setCookieStorage = (key: string, rawData: any): void => {
  ...
};
```

---

### Working with the dev-tools message pipeline

```ts
export const createTestInsightListener = (
  insightService: InsightService,
  emitted: any[]
) => {
  emitted.length = 0;
  return insightService.listenPipeline((event: any) => {
    // Normalize / sanitize fields
    event.id = 'id-removed';
    event.timestamp = 'ts-removed';

    emitted.push(event);
  });
};
```

Then in the tests

```ts
 beforeEach(() => {
    ...

    insightsService = TestBed.inject(InsightService);
    stopListening = createTestInsightListener(insightsService, emitted);
  });

  afterEach(() => {
    ...

    stopListening();
  });
```

### In case of emergencies, you can use the testDownloadArtifact to get a disk copy of any output

This works for both integration and unit tests.

Note: Jasmine/Karma will only allow for 1 download per test run. So you need to stop and start the test runs
in between downloads. If anyone can fix this -- create a PR.

```ts
export function testArtifactDownloader(
  filename: string,
  fileExtension: string,
  data: unknown
): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json'
  });

  const url = URL.createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.href = url;

  anchor.download = `${filename}-${Date.now()}.${fileExtension}`;

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(url);
}
```

---

### Primary full Abstract

This is a global service abstract that handles the most repetitive methods for the full tests

integration > src > lib > structure > service > primary-full.abstract.ts

```ts
import { FeatureCellModel, VaultSignalRef } from '@sdux/shared';
import { getBankEmployeeData } from '../data/bank-employee.data';

export abstract class PrimaryPartialAbstractClass<T> {
  constructor(protected readonly vault: FeatureCellModel<T>) {}

  bankEmployees(): VaultSignalRef<T> {
    return this.vault.state;
  }

  /**
   * An abstracted method to replace the current state
   * @param value If no value is supplied it is getBankEmployeeData
   */
  replaceState(value?: T): void {
    value = value ?? (getBankEmployeeData() as T);
    this.vault.replaceState({ loading: false, value, error: null });
  }
  /**
   * an abstracted method to merge the current state with the next state
   *
   * @param next if no value is supplied it is getBankEmployeeData
   * @param previous if no value is supplied it is this.value.state.value()
   */

  mergeState(next?: T, previous?: T): void {
    previous = previous ?? this.vault.state.value();
    next = next ?? (getBankEmployeeData() as T);
    this.vault.mergeState({
      loading: false,
      // eslint-disable-next-line
      value: [
        ...(previous as T extends any[] ? T : never),
        ...(next as T extends any[] ? T : never)
      ] as T,
      error: null
    });
  }
}
```

### Primary Partial Abstract

This is a global service abstract that handles the most repetitive methods for the partial tests

integration > src > lib > structure > service > primary-partial.abstract.ts

```ts
import { FeatureCellModel, VaultSignalRef } from '@sdux/shared';
import { getBankEmployeeData } from '../data/bank-employee.data';

export abstract class PrimaryPartialAbstractClass<T> {
  constructor(protected readonly vault: FeatureCellModel<T>) {}

  bankEmployees(): VaultSignalRef<T> {
    return this.vault.state;
  }

  /**
   * An abstracted method to replace the current state
   * @param value If no value is supplied it is getBankEmployeeData
   */
  replaceState(value?: T): void {
    value = value ?? (getBankEmployeeData() as T);
    this.vault.replaceState({ loading: false, value, error: null });
  }
  /**
   * an abstracted method to merge the current state with the next state
   *
   * @param next if no value is supplied it is getBankEmployeeData
   * @param previous if no value is supplied it is this.value.state.value()
   */

  mergeState(next?: T, previous?: T): void {
    previous = previous ?? this.vault.state.value();
    next = next ?? (getBankEmployeeData() as T);
    this.vault.mergeState({
      loading: false,
      // eslint-disable-next-line
      value: [
        ...(previous as T extends any[] ? T : never),
        ...(next as T extends any[] ? T : never)
      ] as T,
      error: null
    });
  }
}
```

### Integration Data

The data set is of bank employees

integration > src > lib > structure > data > bank-employee.data.ts

---

## Test Set-up Example

### Success Service

```ts
@FeatureCell<BankEmployeeModel[]>('p170-reducers')
@Injectable({
  providedIn: 'root'
})
export class partialReducerService extends ReducerFixtureService {
  constructor() {
    super(injectVault<UserModel[]>(partialReducerService));

    const reducers: ReducerFunction<BankEmployeeModel[]>[] = [
      (employees) => this.p170AddSeniorReducer(employees),
      this.p170AddFullNameReducer,
      this.p170AddTypeBooleanReducer.bind(this)
    ];

    this.vault.reducers(reducers).initialize();
  }
}
```

### Error Service

```ts
@FeatureCell<BankEmployeeModel[]>('p170-reducers-error')
@Injectable({
  providedIn: 'root'
})
export class p170ReducerErrorService extends p170ReducerAbstractClass<
  BankEmployeeModel[]
> {
  constructor() {
    super(injectVault<BankEmployeeModel[]>(p170ReducerErrorService));

    let reducers: ReducerFunction<BankEmployeeModel[]>[];

    reducers = [
      (users) => this.addSeniorp170Reducer(users),
      () => {
        throw new Error('this is a reducer error');
      },
      this.addTypeBooleanp170Reducer.bind(this)
    ];

    this.vault.reducers(reducers).initialize();
  }
}
```

### Abstract Service

```ts
export class p170ReducerAbstractClass<T> extends MainIntegrationAbstractClass<T> {
  constructor(vault: FeatureCellModel<T>) {
    super(vault);
  }

  p170AddFullNameReducer: ReducerFunction<BankEmployeeModel[]> = (users: BankEmployeeModel[]): BankEmployeeModel[] => {
    ...
  };

  public p170AddSeniorReducer(users: BankEmployeeModel[]): BankEmployeeModel[] {
    ...
  }

  public p170AddTypeBooleanReducer(users: BankEmployeeModel[]): BankEmployeeModel[] {
    ...
  }

  public p170ReplaceEmployeesReducers(): void {
    ...
  }

  public p170MergeEmployeesReducers(): void {
    ...
  }
}
```

### Pure Functions

```ts
import { BankEmployeeModel } from '../../structure/models/bank-employee.model';

export const p170AddDerivedFlagsFunction = (employees: BankEmployeeModel[]) => {
  return employees.map((u) => ({
    ...u,
    isLoanOfficer: u.role === 'LoanOfficer',
    isSecurity: u.role === 'Security',
    isActive: u.status === 'Active'
  }));
};
```

### Success Integration Test

```ts
describe('p170: Reducer Test', () => {
  let testService: partialReducerService;
  let stopListening: any;
  let insightsService: any;
  const emitted: any[] = [];

  beforeEach(() => {
    emitted.length = 0;
    TestBed.configureTestingModule({
      providers: [
        provideVault({
          devMode: true
        }),
        partialReducerService,,
        provideZonelessChangeDetection(),
        provideFeatureCell(partialReducerService,, { key: 'partial-reducers', initial: [], insights: {} as any })
      ]
    });

    insightsService = TestBed.inject(NgVaultInsightService);
    stopListening = insightsService.listenPipeline((event: any) => emitted.push(event));
    testService = TestBed.inject(partialReducerService,);
  });

  afterEach(() => {
    setGetOrCreateFeatureCellTokenDevMode();
    stopListening();
  });

  describe('value resolve', () => {
    it('should replace the bankEmployees with reducers', async () => {
      testService.replaceEmployeesReducers();

      await flushMicrotasksZoneless();

      const state = testService.bankEmployees();

      await flushMicrotasksZoneless();

      expect(state.isLoading()).toBeFalse();
      expect(state.error()).toBeNull();

      // Assert — both reducers applied in order
      expect(state.value()).toEqual([
        ...
      ]);

      expect(emitted).toEqual([
        ...
      ]);
    });

    it('should merge the criminals and bankers with reducers', async () => {
      ...
    });
  });
});
```

### Error Integration Test

```ts
describe('pXX: Reducer Error Tests', () => {
  let testService: partialReducerErrorService;
  let stopListening: any;
  let insightsService: any;
  const emitted: any[] = [];

  beforeEach(() => {
    emitted.length = 0;
    TestBed.configureTestingModule({
      providers: [
        provideVault({
          devMode: true
        }),
        testService,
        partialReducerErrorService,
        provideZonelessChangeDetection(),
        provideFeatureCell(partialReducerErrorService, {
          key: 'partial-reducers-error',
          initial: [],
          insights: { wantsErrors: true, wantsPayload: true, wantsState: false } as any
        })
      ]
    });

    insightsService = TestBed.inject(NgVaultInsightService);
    stopListening = insightsService.listenPipeline((event: any) => emitted.push(event));
    testService= TestBed.inject(partialReducerErrorService);
  });

  afterEach(() => {
    setGetOrCreateFeatureCellTokenDevMode();
    stopListening();
  });

  it('should not replace the bank employees with reducers', async () => {
    testService.replaceEmployeesReducers();

    await flushMicrotasksZoneless();

    const state = testService.bankEmployees();

    await flushMicrotasksZoneless();

    expect(state.value()).toEqual([]);
    expect(state.hasValue()).toBeTrue();
    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toEqual(
      Object({
        message: 'this is a reducer error',
        details: jasmine.any(String)
      })
    );

    expect(emitted).toEqual([
      ...
    ]);
  });
});
```

---

## DeepDive

## Project Overview

This project contains the **full integration test suite for SDuX Vault**.  
Its purpose is to verify that all behaviors, pipeline stages, and state transitions work correctly **when combined together**, rather than in isolation.

Unlike unit tests in individual packages, this project:

- Runs behaviors through the **entire SDuX Vault pipeline**
- Validates **cross-behavior compatibility**
- Ensures **backwards-compatible state transitions**
- Confirms that FeatureCells behave consistently across **replace**, **merge**, **streaming**, and **resource-based** inputs
- Provides a **single source of truth** for regression detection

The integration-tests project defines the “contract surface” for how SDuX Vault is expected to behave across versions and acts as the foundation for release confidence and long-term ecosystem stability.

---

## Test Philosophy & Guarantees

Integration tests in SDuX Vault validate **cross-behavior correctness**, not individual units.  
A behavior may be correct in isolation but incorrect when combined with:

- multiple pipeline stages
- multi-source input (Value / HttpResource / Observable / Stream)
- overlapping operators & filters
- FeatureCell lifecycle constraints
- storage or encryption layers
- devtools instrumentation

This suite guarantees these invariants:

- State updates remain **deterministic** regardless of behavior ordering
- Pipeline execution remains **serial, isolated, and transactional**
- No behavior can “poison” another behavior’s stage
- Errors never leak unhandled to consumers
- DevTools receive accurate snapshots for every tested case
- All data flows (replace, merge, streaming, HTTP, observable) remain stable

Integration tests are the contract for SDuX Vault’s ecosystem.

---

## Scope of Integration Tests

### Full Test Philosophy and Score

Full tests validate a single **resolve** method through all the stages of the pipeline.

These tests focus on success and error paths. These test the **resolve** method as a **black boxes**. All internal testing is conducted in the unit tests.

1. Spec file
   - fx1-<subject-under-test>.replace.spec.ts
   - fx2-<subject-under-test>.merge.spec.ts
   - fx3-<subject-under-test>.replace.error.spec.ts
   - fx4-<subject-under-test>.merge.error.spec.ts

1. A service that powers the spec file
   I.e. full-<subject-under-test>.service.ts

**_note_** The service should use all the abstract class and pure functions from the partial tests.

### Partial Test Philosophy and Score

Partial tests validate a single **feature** (like reducers) through only the **value resolve stage**.

These tests focus on success and error paths. These test the features as a **black boxes**. All internal testing is conducted in the unit tests.

**_note_** Based on blackbox testing some partial tests will not have any error tests.

1. Spec file
   - px1-<subject-under-test>.replace.spec.ts
   - px2-<subject-under-test>.merge.spec.ts
   - px3-<subject-under-test>.replace.error.spec.ts
   - px4-<subject-under-test>.merge.error.spec.ts
1. Success service file
   I.e. partial-<subject-under-test>.ts
1. Error service file
   I.e. partial-<subject-under-test>.error.service.ts
1. An abstracted class that the success and error service derive.
   I.e. partial-<subject-under-test>.abstract.ts
   **_note_** This file should be coded in a way that it can be included into the full path tests to prevent reproducing code.
1. A pure functions file
   I.e. partial-<subject-under-test>.pure-functions.ts
   **_note_** This file should be coded in a way that it can be included into the full path tests to prevent reproducing code.

### These tests focus on:

- **Behavior interoperability** (reduce + encrypt + persist + filters + operators)
- **Pipeline contract correctness**
- **State transition safety**
- **Error boundaries**
- **DevTools emission contracts**
- **Storage + encryption interactions**
- **Streaming and async resolution**
- **Cross-behavior ordering guarantees**

### They do **not** focus on:

- Angular template rendering
- DI / provider wiring
- Unit tests for internal helper functions
- Third-party storage driver correctness

**Those belong to unit or component tests, not integration-level tests.**

---

## Directory Structure and Naming Conventions

Recommended structure under your integration test project:

```
projects/integration/
  src/
    01-partials-tests/
      pxx-<subject-under-test> I.e. reducers
        px1-<subject-under-test>.replace.spec.ts
        px2-<subject-under-test>.merge.spec.ts
        px3-<subject-under-test>.replace.error.spec.ts
        px4-<subject-under-test>.merge.error.spec.ts
        partial-<subject-under-test>.abstract.ts
        partial-<subject-under-test>.error.service.ts
        partial-<subject-under-test>.pure-functions.ts
        partial-<subject-under-test>.service.ts
    02-full-tests/
      fxx-<subject-under-test> I.e. value
        fx1-<subject-under-test>.replace.spec.ts
        fx2-<subject-under-test>.merge.spec.ts
        fx3-<subject-under-test>.replace.error.spec.ts
        fx4-<subject-under-test>.merge.error.spec.ts
        full-<subject-under-test>.eror.service.ts
          powers the tests as a functioning feature cell
        full-<subject-under-test>.service.ts
          powers the tests as a functioning feature cell
    structure
      data/
        - test data
      models/
        - models for the test data
      types/
        - types for the test
      utils/
        - utils that replace monotonous set-ups for the test
```

All test names should match the Integration Matrix IDs.

Examples:

- `f01-value.replace.spec.ts`
- `f02-value.merge.spec.ts`
- `f03-value.replace.error.spec.ts`
- `f04-value.merge.error.spec.ts`
- `p170-encrypt.replace.spec.ts`
- `partial-encrypt.error.service.ts`
- `partial-encrypt.abstract.ts`
- `partial-encrypt.pure-functions.ts`
- `partial-encrypt.service.ts`

---

### Method and function naming pattern:

All methods and function names should have the test prefix to allow for explicit usage.

```ts
  partialReducerArrowMethod: ReducerFunction<BankEmployeeModel[]> = (users: BankEmployeeModel[]): BankEmployeeModel[] => {
    ...
  };

  public partialReducerBoundMethod(users: BankEmployeeModel[]): BankEmployeeModel[] {
    ...
  }
```

```ts
export const partialReducerPureFunction= (employees: BankEmployeeModel[]) => {
  ...
};
```

Inside the test:

```ts
describe('[pxx]: <subject-under-test> - <Replace|Merge> <- Error> Test', () => { … });
```

This ensures perfect traceability across:

- Matrix documentation
- Codebase
- CI logs
- PR reviews

---

## CI Requirements

The integration suite runs in CI as a required status check.

Requirements:

1. All `[fxx]` full-pipeline tests must pass
2. All `[pxx]` partial behavior tests must pass
3. No unused behaviors in the matrix
4. No missing test keys
5. No unrecognized placeholders
6. No unmocked external storage access
7. No flakey tests (dedicated timeout rules)

---

## Extending the Matrix

When adding a new subject-under-test:

1. Add a new row to either the full or partial matrix
2. Add a new test with matching key
3. Add coverage across relevant columns
4. If the subject-under-tests adds new pipeline stages, add new columns
5. Update contributing guide

The matrix is a contract.  
Any change requires documentation + tests.

---

## Known Limitations

- Storage drivers are mocked and do not simulate browser quirks
- DevTools event ordering is consistant because a `test queue` is used.
- fromStream tests simulate multiple producers synchronously
- HttpResource tests do not hit real HTTP layers but use TestBed.inject(HttpTestingController);
- Encryption behaviors use mock cryptography unless otherwise specified

None of these affect correctness guarantees but are worth noting.

---

## Behavior Integration Coverage Matrix

This table defines which behavior categories must be validated in each test scenario.

### Naming conventions

- Full tests have a `fxx-` prefix.
- Partial tests have a `pxx-` prefix.

**_note_**

Test features are incremented by 10 in order to have plenty of space to add tests

### Legend

| Icon    | Definition                           |
| ------- | ------------------------------------ |
| ✅      | Testing is finished                  |
| ⚠️      | Tests are required and not yet added |
| ❌      | Not to be tested                     |
| [blank) | Not applicable                       |

### Full Integration Test Coverage Matrix

#### Utilities

| Faature            | Test Key                          | Resolve Type   | Incremental Replace | Incremental Merge | Reset | Reset$ | Destroy | Destroyed$ | State | Errors |
| ------------------ | --------------------------------- | -------------- | ------------------- | ----------------- | ----- | ------ | ------- | ---------- | ----- | ------ |
| Initial            |
|                    | f10 – Init Utility Test           | InitialState   | ✅                  | ✅                | ✅    | ✅     | ✅️      | ✅         | ✅    | ✅     |
|                    | f11 – Init Utility Test           | InitialState   | ✅                  | ✅                | ✅    | ✅     | ✅️      | ✅         | ✅    | ✅     |
|                    | f12 – Init Utility Test           | InitialState   | ✅                  | ✅                | ✅    | ✅     | ✅️      | ✅         | ✅    | ✅     |
|                    | f13 – Init Utility Test           | InitialState   | ✅                  | ✅                | ✅    | ✅     | ✅️      | ✅         | ✅    | ✅     |
| State Side-effects |
|                    | f20 – Value Side-effect Test      | Value          | ✅                  | ✅                | ✅    | ✅     | ✅️      | ✅         | ✅    | ✅     |
|                    | f21 – Value Side-effect Test      | Observable     | ✅                  | ✅                | ✅    | ✅     | ✅️      | ✅         | ✅    | ✅     |
|                    | f22 – Value Side-effect Test      | Stream         | ✅                  | ✅                | ✅    | ✅     | ✅️      | ✅         | ✅    | ✅     |
|                    | f23 – Value Side-effect Test      | Promise        | ✅                  | ✅                | ✅    | ✅     | ✅️      | ✅         | ✅    | ✅     |
| fromStream         |
|                    | f30 – fromStream Utility Test     | fromStream     | ⚠️                  | ⚠️                | ⚠️    | ⚠️     | ⚠️️      | ⚠️         | ⚠️    | ⚠️     |
| fromObservable     |
|                    | f40 – fromObservable Utility Test | fromObservable | ⚠️                  | ⚠️                | ⚠️    | ⚠️     | ⚠️️      | ⚠️         | ⚠️    | ⚠️     |
| Observable         |
|                    | f50 – Observable Utility Test     | fromObservable | ⚠️                  | ⚠️                | ⚠️    | ⚠️     | ⚠️️      | ⚠️         | ⚠️    | ⚠️     |
| fromPromise        |
|                    | f60 – fromPromise Utility Test    | fromStream     | ⚠️                  | ⚠️                | ⚠️    | ⚠️     | ⚠️️      | ⚠️         | ⚠️    | ⚠️     |
| Promise            |
|                    | f70 – PromiseUtility Test         | fromStream     | ⚠️                  | ⚠️                | ⚠️    | ⚠️     | ⚠️️      | ⚠️         | ⚠️    | ⚠️     |
| HttpResource       |
|                    | f80 – HttpResource Utility Test   | HttpResource   | ⚠️                  | ⚠️                | ⚠️    | ⚠️     | ⚠️️      | ⚠️         | ⚠️    | ⚠️     |

---

#### Resolve by Value

| Feature           | Test Key | State             | Interceptors | Pre-Caching | Operators | Filters | Before Tap | Reduce | After Tap | Post-Caching | Encrypt | Persist | Licensing | DevTools | ErrorCallbacks | Errors |
| ----------------- | -------- | ----------------- | ------------ | ----------- | --------- | ------- | ---------- | ------ | --------- | ------------ | ------- | ------- | --------- | -------- | -------------- | ------ |
| Inital Value      |
|                   | f100     | Initial           | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ✅           | ❌      | ✅      | ⚠️        | ✅       |                | ❌     |
|                   | f101     | Initial           | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ❌           | ✅      | ✅      | ⚠️        | ✅       |                | ❌     |
|                   | f102     | Initial           | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ❌           | ❌      | ✅      | ⚠️        | ✅       |                | ❌     |
|                   | f103     | Initial           | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ❌           | ❌      | ✅      | ⚠️        | ✅       |                | ❌     |
|                   | f104     | Initial           | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ❌           | ❌      | ✅      | ⚠️        | ✅       | ✅             | ✅     |
|                   | f105     | Hydrate           | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ❌           | ❌      | ✅      | ⚠️        | ✅       | ✅             | ✅     |
|                   | f106     | Hydrate           | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ❌           | ❌      | ✅      | ⚠️        | ✅       | ✅             | ✅     |
|                   | f107     | Hydrate           | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ❌           | ❌      | ✅      | ⚠️        | ✅       | ✅             | ❌     |
| By Value          |
|                   | f200     | Replace           | ✅ Debounce  | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ❌           | ❌      | ✅      | ⚠️        | ✅       |                | ❌     |
|                   | f201     | Merge             | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ✅           | ✅      | ✅      | ⚠️        | ✅       |                | ❌     |
|                   | f202     | Replace           | ✅ Delay     | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ❌           | ❌      | ✅      | ⚠️        | ✅       |                | ❌     |
|                   | f203     | Merge             | ✅ Throttle  | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ✅           | ❌      | ✅      | ⚠️        | ✅       |                | ❌     |
|                   | f250     | Replace           | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ❌           | ✅      | ✅      | ⚠️        | ✅       | ✅             | ✅     |
|                   | f251     | Merge             | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ❌           | ❌      | ✅      | ⚠️        | ✅       | ✅             | ✅     |
| By FromStream     |
|                   | f300     | Merge/[]          | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ✅           | ❌      | ✅      | ⚠️        | ✅       |                | ❌     |
|                   | f301     | Merge/Undefined   | ✅           | ⚠️          | ✅        | ❌      | ✅         | ❌     | ✅        | ❌           | ❌      | ✅      | ⚠️        | ✅       |                | ❌     |
|                   | f302     | Merge             | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ❌           | ❌      | ✅      | ⚠️        | ✅       |                | ✅     |
|                   | f303     | Merge/AutoReset   | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ❌           | ❌      | ✅      | ⚠️        | ✅       |                | ✅     |
|                   | f304     | Merge/NoAutoReset | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ❌           | ❌      | ✅      | ⚠️        | ✅       |                | ✅     |
| By FromObservable |
|                   | f400     | Replace           | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ❌           | ❌      | ✅      | ⚠️        | ✅       |                | ❌     |
|                   | f401     | Merge             | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ❌           | ✅      | ✅      | ⚠️        | ✅       |                | ❌     |
| By Observable     |
|                   | f500     | Replace           | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ⚠️           | ❌      | ✅      | ⚠️        | ✅       |                | ❌     |
|                   | f501     | Merge             | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ⚠️           | ✅      | ✅      | ⚠️        | ✅       |                | ❌     |
|                   | f502     | Replace           | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ⚠️           | ✅      | ✅      | ⚠️        | ✅       | ✅             | ✅     |
|                   | f503     | Merge             | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ⚠️           | ❌      | ✅      | ⚠️        | ✅       | ✅             | ✅     |
| By fromPromise    |
|                   | f600     | Replace           | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ⚠️           | ❌      | ✅      | ⚠️        | ✅       |                | ❌     |
|                   | f601     | Merge             | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ⚠️           | ✅      | ✅      | ⚠️        | ✅       |                | ❌     |
| By Promise        |
|                   | f700     | Replace           | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ⚠️           | ❌      | ✅      | ⚠️        | ✅       |                | ❌     |
|                   | f701     | Merge             | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ⚠️           | ✅      | ✅      | ⚠️        | ✅       |                | ❌     |
|                   | f702     | Replace           | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ⚠️           | ✅      | ✅      | ⚠️        | ✅       | ✅             | ✅     |
|                   | f703     | Merge             | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ⚠️           | ❌      | ✅      | ⚠️        | ✅       | ✅             | ✅     |
|                   | f704     | Replace           | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ⚠️           | ❌      | ✅      | ⚠️        | ✅       |                | ✅     |
| Cache             |
|                   | f800     | Merge             | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ✅           | ❌      | ✅      | ⚠️        | ✅       |                | ❌     |
| Stepwise          |
|                   | f900     | Replace           |              | ⚠️          | ⚠️        | ✅      | ⚠️         | ✅     |           | ⚠️           | ❌      | ⚠️      | ⚠️        | ✅       |                | ❌     |
| By fromDeferred   |
|                   | f1000    | Replace           | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ⚠️           | ❌      | ✅      | ⚠️        | ✅       |                | ❌     |
|                   | f1001    | Merge             | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ⚠️           | ✅      | ✅      | ⚠️        | ✅       |                | ❌     |
| Max Failures      |
|                   | f1100    | Replace           | ✅           | ⚠️          | ✅        | ✅      | ✅         | ✅     | ✅        | ⚠️           | ❌      | ✅      | ⚠️        | ✅       |                | ❌     |
| Licensing         |
|                   | f1200    | Replace           | ✅           | ⚠️          | ❌        | ❌      | ❌         | ❌     | ❌        | ❌           | ✅      | ✅      | ✅        | ✅       |                | ❌     |
|                   | f1201    | Replace           | ✅           | ⚠️          | ❌        | ❌      | ❌         | ❌     | ❌        | ❌           | ✅      | ✅      | ✅        | ✅       |                | ❌     |
|                   | f1202    | Replace           | ✅           | ⚠️          | ❌        | ❌      | ❌         | ❌     | ❌        | ❌           | ✅      | ✅      | ✅        | ✅       |                | ✅     |
| By HttpResource   |
|                   | fx00     | Replace           | ⚠️           | ⚠️          | ⚠️        | ⚠️      | ⚠️         | ⚠️     | ⚠️        | ⚠️           | ⚠️      | ⚠️      | ⚠️        | ⚠️       |                | ❌     |
|                   | fx01     | Merge             | ⚠️           | ⚠️          | ⚠️        | ⚠️      | ⚠️         | ⚠️     | ⚠️        | ⚠️           | ⚠️      | ⚠️      | ⚠️        | ⚠️       |                | ❌     |
|                   | fx02     | Replace           | ⚠️           | ⚠️          | ⚠️        | ⚠️      | ⚠️         | ⚠️     | ⚠️        | ⚠️           | ⚠️      | ⚠️      | ⚠️        | ⚠️       |                | ⚠️     |
|                   | fx03     | Merge             | ⚠️           | ⚠️          | ⚠️        | ⚠️      | ⚠️         | ⚠️     | ⚠️        | ⚠️           | ⚠️      | ⚠️      | ⚠️        | ⚠️       |                | ⚠️     |

---

### General Errors

| Test Key                        | Duplicate Cell Create | Duplicate Cell Get |
| ------------------------------- | --------------------- | ------------------ |
| **f1000 – Duplicate Cell Test** | ✅                    | ✅                 |

---

### Partial Behavior Integration Test Coverage Matrix

| Test | Feature                 | Test Key                   | Resolve State         | Replace | Merge | Ctrl | Intc | Caching | Ops | Filters | Reduce | Encrypt | Persist | Tap | State | DevTools | Errors |
| ---- | ----------------------- | -------------------------- | --------------------- | ------- | ----- | ---- | ---- | ------- | --- | ------- | ------ | ------- | ------- | --- | ----- | -------- | ------ |
| ✅   | Value                   |
|      |                         | p10                        | Value/No InitialState | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p12                        | Value/No InitialState |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p13                        | Value/No InitialState |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p14 - Error                | Value/InitialState    |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
|      |                         | p15 - Error                | Value/InitialState    | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
|      |                         | p16                        | Value/InitialState    | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
| ⚠️   | HttpResource            |
|      |                         | p20 – Resolve              | HttpResource          | ⚠️      | ⚠️    |      |      |         |     |         |        |         |         |     |       | ⚠️       | ❌     |
| ✅   | Observable              |
|      |                         | p30                        | Observable            | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p31                        | Observable            |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p32 – Reset                | Observable            | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p33 – Reset                | Observable            |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p34 - error                | Observable            | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
| ✅   | FromObservable          |
|      |                         | p40                        | Value/Initial State   | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p41                        | Value/Initial State   |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p42                        | Reset                 | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
| ✅   | FromStream              |
|      |                         | p50 – Push Merge           | fromStream/Initial    |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p51 – Merge                | fromStream/Initial    |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p52 – Push Merge           | fromStream/No Initial |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p53 – Error                | fromStream            |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
|      |                         | p54 – AutoReset Error      | fromStream            |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
|      |                         | p55 – No AutoReset Error   | fromStream            |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
|      | Auto-vault Get          |
|      |                         | p60 – Get                  | autoVaultGet          | ⚠️      | ⚠️    |      |      |         |     |         |        |         |         |     |       | ⚠️       | ❌     |
|      | Auto-vault Get List     |
|      |                         | p60 – Get                  | autoVaultGetList      | ⚠️      | ⚠️    |      |      |         |     |         |        |         |         |     |       | ⚠️       | ❌     |
|      | Auto-vault Post         |
|      |                         | p80 – Post                 | autoVaultPost         | ⚠️      | ⚠️    |      |      |         |     |         |        |         |         |     |       | ⚠️       | ❌     |
|      | Auto-vault Patch        |
|      |                         | p90 – Patch                | autoVaultPatch        | ⚠️      | ⚠️    |      |      |         |     |         |        |         |         |     |       | ⚠️       | ❌     |
|      | Auto-vault Put          |
|      |                         | p100 – Put                 | autoVaultPut          | ⚠️      | ⚠️    |      |      |         |     |         |        |         |         |     |       | ⚠️       | ❌     |
|      | Auto-vault Delete       |
|      |                         | p110 – Delete              | autoVaultDelete       | ⚠️      | ⚠️    |      |      |         |     |         |        |         |         |     |       | ⚠️       | ❌     |
| ✅   | withArrayAppendMerge    |
|      |                         | p130                       | Value/No InitialState | -       | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p131                       | Value/No InitialState | -       | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p132                       | Value/InitialState    | -       | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p133                       | Value/Mixed Values    | -       | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
| ✅   | withObjectShallowMerge  |
|      |                         | p140                       | Value/No InitialState | -       | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p141                       | Value/No InitialState | -       | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p142                       | Value/InitialState    | -       | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
| ✅   | withObjectDeepMerge     |
|      |                         | p150                       | Value/No InitialState | -       | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p151                       | Value/No InitialState | -       | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p152                       | Value/InitialState    | -       | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
| ✅   | withDebounce            |
|      |                         | p160                       | Value                 | ✅      |       |      | ✅   |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p161                       | Value                 |         | ✅    |      | ✅   |         |     |         |        |         |         |     |       | ✅       | ❌     |
| ✅   | withDelay               |
|      |                         | p170                       | Value                 | ✅      |       |      | ✅   |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p171                       | Value                 |         | ✅    |      | ✅   |         |     |         |        |         |         |     |       | ✅       | ❌     |
| ✅   | withDistinctUntilChange |
|      |                         | p180                       | Value                 | ✅      |       |      |      |         | ✅  |         |        |         |         |     |       | ✅       |        |
|      |                         | p181                       | Value                 |         | ✅    |      |      |         | ✅  |         |        |         |         |     |       | ✅       |        |
|      |                         | p182                       | Value                 | ✅      | ✅    |      |      |         | ✅  |         |        |         |         |     |       | ✅       |        |
|      |                         | p183                       | Value                 | ✅      |       |      |      |         | ✅  |         |        |         |         |     |       | ✅       | ✅     |
|      |                         | p184                       | Value                 |         | ✅    |      |      |         | ✅  |         |        |         |         |     |       | ✅       | ✅     |
| ✅   | Filters                 |
|      |                         | p190                       | Value                 | ✅      |       |      |      |         |     | ✅      |        |         |         |     |       | ✅       |        |
|      |                         | p191                       | Value                 |         | ✅    |      |      |         |     | ✅      |        |         |         |     |       | ✅       |        |
|      |                         | p192                       | Value                 | ✅      |       |      |      |         |     | ✅      |        |         |         |     |       | ✅       | ✅     |
|      |                         | p193                       | Value                 |         | ✅    |      |      |         |     | ✅      |        |         |         |     |       | ✅       | ✅     |
| ✅   | Reducers                |
|      |                         | p200                       | Value                 | ✅      |       |      |      |         |     |         | ✅     |         |         |     |       | ✅       |        |
|      |                         | p201                       | Value                 |         | ✅    |      |      |         |     |         | ✅     |         |         |     |       | ✅       |        |
|      |                         | p202                       | Value                 | ✅      |       |      |      |         |     |         | ✅     |         |         |     |       | ✅       | ✅     |
|      |                         | p203                       | Value                 |         | ✅    |      |      |         |     |         | ✅     |         |         |     |       | ✅       | ✅     |
| ✅   | Replay Global Error     |
|      |                         | p210                       | Value                 | ✅      |       | ✅   |      |         |     |         |        |         |         |     |       |          | ✅     |
|      |                         | p211                       | Value                 |         | ✅    | ✅   |      |         |     |         |        |         |         |     |       |          | ✅     |
| ✅   | Local Storage           |
|      |                         | p220                       | Value                 | ✅      |       |      |      |         |     |         |        |         | ✅      |     |       | ✅       |        |
|      |                         | p221 - load                | Value                 | ✅      |       |      |      |         |     |         |        |         | ✅      |     |       | ✅       |        |
|      |                         | p222 - reset               | Value                 | ✅      |       |      |      |         |     |         |        |         | ✅      |     |       | ✅       |        |
|      |                         | p223 - destroy             | Value                 | ✅      |       |      |      |         |     |         |        |         | ✅      |     |       | ✅       |        |
|      |                         | p224 - missing license     | Error                 | ✅      |       |      |      |         |     |         |        |         | ✅      |     |       | ✅       | ✅     |
|      |                         | p224 - invalid license     | Error                 | ✅      |       |      |      |         |     |         |        |         | ✅      |     |       | ✅       | ✅     |
| ✅   | Session Storage         |
|      |                         | p230                       | Value                 | ✅      |       |      |      |         |     |         |        |         | ✅      |     |       | ✅       |        |
|      |                         | p231 - load                | Value                 | ✅      |       |      |      |         |     |         |        |         | ✅      |     |       | ✅       |        |
|      |                         | p232 - reset               | Value                 | ✅      |       |      |      |         |     |         |        |         | ✅      |     |       | ✅       |        |
|      |                         | p233 - destroy             | Value                 | ✅      |       |      |      |         |     |         |        |         | ✅      |     |       | ✅       |        |
|      |                         | p234 - missing license     | Error                 | ✅      |       |      |      |         |     |         |        |         | ✅      |     |       | ✅       | ✅     |
|      |                         | p234 - invalid license     | Error                 | ✅      |       |      |      |         |     |         |        |         | ✅      |     |       | ✅       | ✅     |
| ✅   | Cookie Storage          |
|      |                         | p240                       | Value                 | ✅      |       |      |      |         |     |         |        |         | ✅      |     |       | ✅       |        |
|      |                         | p241 - Load                | Value                 | ✅      |       |      |      |         |     |         |        |         | ✅      |     |       | ✅       |        |
|      |                         | p242 - Reset               | Value                 | ✅      |       |      |      |         |     |         |        |         | ✅      |     |       | ✅       |        |
|      |                         | p243 - Destroy             | Value                 | ✅      |       |      |      |         |     |         |        |         | ✅      |     |       | ✅       |        |
|      |                         | p244                       | Error                 | ✅      |       |      |      |         |     |         |        |         | ✅      |     |       | ✅       | ✅     |
|      |                         | p245 - missing license     | Error                 | ✅      |       |      |      |         |     |         |        |         | ✅      |     |       | ✅       | ✅     |
|      |                         | p245 - invalid license     | Error                 | ✅      |       |      |      |         |     |         |        |         | ✅      |     |       | ✅       | ✅     |
| ✅   | BeforeTap               |
|      |                         | p250                       | Value                 | ✅      |       |      |      |         |     |         |        |         |         | ✅  |       | ✅       |        |
|      |                         | p251                       | Value                 |         | ✅    |      |      |         |     |         |        |         |         | ✅  |       | ✅       | ✅     |
| ✅   | AfterTap                |
|      |                         | p260                       | Value                 | ✅      |       |      |      |         |     |         |        |         |         | ✅  |       | ✅       |        |
|      |                         | p261                       | Value                 |         | ✅    |      |      |         |     |         |        |         |         | ✅  |       | ✅       | ✅     |
|      | Cache                   |
|      |                         | p270                       | Value                 |         | ✅    |      |      | ✅      |     |         |        |         |         |     |       | ✅       | ✅     |
|      |                         | p271                       | Promise               |         | ✅    |      |      | ✅      |     |         |        |         |         |     |       | ✅       | ✅     |
|      |                         | p272                       | Observable            |         | ✅    |      |      | ✅      |     |         |        |         |         |     |       | ✅       | ✅     |
|      |                         | p273                       | Promise               |         | ✅    |      |      | ✅      |     |         |        |         |         |     |       | ✅       | ✅     |
|      |                         | p274                       | Long Running Value    |         | ✅    |      |      | ✅      |     |         |        |         |         |     |       | ✅       | ✅     |
|      |                         | p275                       | Promise               |         | ✅    |      |      | ✅      |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p276                       | Observable            |         | ✅    |      |      | ✅      |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p277                       | Value                 |         | ✅    |      |      | ✅      |     |         |        |         |         |     |       | ✅       | ❌     |
| ✅   | Error Callbacks         |
|      |                         | p280 - Error               | Value                 | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
|      |                         | p281 - Error               | Value                 |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
|      |                         | p282 - Error               | Value                 | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
|      |                         | p283 - Error               | Value                 |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
| ✅   | withGlobalErrorPause    |
|      |                         | p290                       | Value                 | ✅      | ✅    |      | ✅   |         |     |         |        |         |         |     |       | ✅       | ✅     |
| ✅   | Aes256 Encryption       |
|      |                         | p300 - Initial State       | Value                 | ✅      | ✅    |      |      |         |     |         |        | ✅      |         |     |       | ✅       |        |
|      |                         | p301 - Non-standard        | Value                 | ✅      | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       |        |
|      |                         | p302 - Error               | Value                 | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
|      |                         | p303 = Malformed Error     | Value                 | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
|      |                         | p304 - missing license     | Error                 | ✅      |       |      |      |         |     |         |        |         | ✅      |     |       | ✅       | ✅     |
|      |                         | p305 - invalid license     | Error                 | ✅      |       |      |      |         |     |         |        |         | ✅      |     |       | ✅       | ✅     |
| ✅   | Emit State Callback     |
|      |                         | p310                       | Value                 | ✅      |       |      |      |         |     |         |        |         |         |     | ✅    | ✅       |        |
|      |                         | p311                       | Value                 | ✅      | ✅    |      |      |         |     |         |        |         |         |     | ✅    | ✅       |        |
|      |                         | p312                       | Value                 | ✅      |       |      |      |         |     |         |        |         |         |     | ✅    | ✅       |        |
| ✅   | withArrayPushMerge      |
|      |                         | p320 - No Initial State    | Value                 |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
| ✅   | Promise                 |
|      |                         | p330                       | Promise               | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p331                       | Promise               |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p332 Reset                 | Promise               | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p333 Reset                 | Promise               |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p334                       | Promise               | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
| ✅   | FromPromise             |
|      |                         | p340 - Initial State       | Value                 | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p341 - Initial State       | Value                 |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p342                       | Reset                 | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p343 - Error               | Error                 | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
| ✅   | Lookup                  |
|      |                         | p350                       | Value                 |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p351                       | Promise               |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p352                       | Observable            |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p353                       | With Initial State    |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p354                       | Promise/Error         |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
|      |                         | p355                       | Observable/Error      |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
|      |                         | p356                       | Error                 |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
| ✅   | Licensing               |
|      |                         | p360 – behavior            | Value                 | ✅      |       | ✅   |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p361 – invalid license     | Value                 | ✅      |       | ✅   |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
|      |                         | p362 – no license          | Value                 | ✅      |       | ✅   |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p362 – multiple cells      | Value                 | ✅      |       | ✅   |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p365 – controller          | Value                 | ✅      |       | ✅   |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p366 – invalid license     | Value                 | ✅      |       | ✅   |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
|      |                         | p367 – no license          | Value                 | ✅      |       | ✅   |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p368 – multiple cells      | Value                 | ✅      |       | ✅   |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p369 – timeout             | Value                 | ✅      |       | ✅   |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
| ✅   | withStepwiseResolve     |
|      |                         | p370                       | Value/Continue        | ✅      |       | ✅   |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p371                       | Value/Abort           |         | ✅    | ✅   |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p372                       | Value/Block           | ✅      |       | ✅   |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p373                       | Value/Continue        | ✅      |       | ✅   |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p374                       | Value/Continue        | ✅      |       | ✅   |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
| ✅   | withStepwiseFilter      |
|      |                         | p380                       | Value/Continue        | ✅      |       | ✅   |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p381                       | Value/Abort           |         | ✅    | ✅   |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p382                       | Value/Block           | ✅      |       | ✅   |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p383                       | Value/Continue        | ✅      |       | ✅   |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p384                       | Value/Continue        | ✅      |       | ✅   |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
| ✅   | withStepwiseReducer     |
|      |                         | p390                       | Value/Continue        | ✅      |       | ✅   |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p391                       | Value/Abort           |         | ✅    | ✅   |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p392                       | Value/Block           | ✅      |       | ✅   |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p393                       | Value/Continue        | ✅      |       | ✅   |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p394                       | Value/Continue        | ✅      |       | ✅   |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
| ✅   | FromDeferred            |
|      |                         | p400                       | Value/Initial State   | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p401                       | Value/Initial State   |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p402                       | Reset                 | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p403                       | Value/Error           | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
| ✅   | Query                   |
|      |                         | p410                       | Value                 | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p411                       | Value                 |         | ✅    |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
| ✅   | Behavior Licensing      |
|      |                         | p420 – Licensing           | Value                 | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p421 – Extension           | Value                 | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p422 – Multiple Extensions | Value                 | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p423 – Bypass Licensing    | Value                 | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p424 – Bypass no license   | Value                 | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ❌     |
|      |                         | p425 – No Behavior         | Value/Error           | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
|      |                         | p426 – No Controller       | Value/Error           | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
|      |                         | p427 – Multiple            | Value/Error           | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
|      |                         | p429 – Extension           | Value/Error           | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ✅     |
|      |                         | p429 – Missing License     | Value/Error           | ✅      |       |      |      |         |     |         |        |         |         |     |       | ✅       | ✅     |

---
