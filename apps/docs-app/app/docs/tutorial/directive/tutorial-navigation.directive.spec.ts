import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { TutorialNavigationDirective } from './tutorial-navigation.directive';

@Component({
  selector: 'sdux-tutorial-navigation-test',
  standalone: true,
  template: `
    <nav>
      <a
        [class.tutorial-step-active]="isActiveStep(1)"
        [attr.aria-current]="isAriaStep(1)"
        >Step One</a
      >
      <a
        [class.tutorial-step-active]="isActiveStep(2)"
        [attr.aria-current]="isAriaStep(2)"
        >Step Two</a
      >
    </nav>
    <main class="tutorial-content">
      <section class="section" id="step-1"></section>
      <section class="section" id="step-2"></section>
      <section class="section" id="step-3"></section>
    </main>
  `
})
class TutorialNavigationTestComponent extends TutorialNavigationDirective {}

class IntersectionObserverMock {
  static instances: IntersectionObserverMock[] = [];

  readonly disconnect = jasmine.createSpy('disconnect');
  readonly observe = jasmine.createSpy('observe');

  constructor(
    readonly callback: IntersectionObserverCallback,
    readonly options?: IntersectionObserverInit
  ) {
    IntersectionObserverMock.instances.push(this);
  }

  emit(entries: Partial<IntersectionObserverEntry>[]): void {
    this.callback(
      entries as IntersectionObserverEntry[],
      this as unknown as IntersectionObserver
    );
  }
}

describe('Directive: TutorialNavigation', () => {
  let fixture: ComponentFixture<TutorialNavigationTestComponent>;
  let component: TutorialNavigationTestComponent;
  let fragment$: Subject<string | null>;
  let originalIntersectionObserver: typeof IntersectionObserver;

  const installIntersectionObserver = (
    observer: typeof IntersectionObserver | undefined
  ): void => {
    Object.defineProperty(globalThis, 'IntersectionObserver', {
      configurable: true,
      writable: true,
      value: observer
    });
  };

  const createComponent = async (): Promise<void> => {
    fixture = TestBed.createComponent(TutorialNavigationTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  };

  const createEntry = (
    target: Element,
    isIntersecting: boolean,
    top: number
  ): Partial<IntersectionObserverEntry> => ({
    target,
    isIntersecting,
    boundingClientRect: { top } as DOMRectReadOnly
  });

  beforeAll(() => {
    originalIntersectionObserver = globalThis.IntersectionObserver;
  });

  beforeEach(async () => {
    IntersectionObserverMock.instances = [];
    fragment$ = new Subject<string | null>();
    installIntersectionObserver(
      IntersectionObserverMock as unknown as typeof IntersectionObserver
    );

    await TestBed.configureTestingModule({
      imports: [TutorialNavigationTestComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: ActivatedRoute,
          useValue: { fragment: fragment$ }
        }
      ]
    }).compileComponents();
  });

  afterEach(() => {
    installIntersectionObserver(originalIntersectionObserver);
  });

  it('should observe every tutorial section and default to step one', async () => {
    await createComponent();

    const observer = IntersectionObserverMock.instances[0];
    const sections = Array.from(
      fixture.nativeElement.querySelectorAll('.tutorial-content > .section[id]')
    );
    const currentLink = fixture.nativeElement.querySelector(
      '[aria-current="step"]'
    ) as HTMLAnchorElement;

    expect(component.activeStep()).toBe('step-1');
    expect(IntersectionObserverMock.instances.length).toBe(1);
    expect(observer.options).toEqual({
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    });
    expect(observer.observe.calls.allArgs()).toEqual(
      sections.map((section) => [section])
    );
    expect(currentLink.textContent?.trim()).toBe('Step One');
    expect(currentLink.classList).toContain('tutorial-step-active');
  });

  it('should select the intersecting section nearest the top', async () => {
    await createComponent();

    const observer = IntersectionObserverMock.instances[0];
    const stepOne = fixture.nativeElement.querySelector('#step-1');
    const stepTwo = fixture.nativeElement.querySelector('#step-2');
    const stepThree = fixture.nativeElement.querySelector('#step-3');

    observer.emit([
      createEntry(stepThree, true, 300),
      createEntry(stepOne, false, -100),
      createEntry(stepTwo, true, 200)
    ]);
    await fixture.whenStable();
    fixture.detectChanges();

    const currentLink = fixture.nativeElement.querySelector(
      '[aria-current="step"]'
    ) as HTMLAnchorElement;

    expect(component.activeStep()).toBe('step-2');
    expect(currentLink.textContent?.trim()).toBe('Step Two');
    expect(
      fixture.nativeElement.querySelectorAll('.tutorial-step-active').length
    ).toBe(1);
  });

  it('should retain the current step when no section is intersecting', async () => {
    await createComponent();

    const observer = IntersectionObserverMock.instances[0];
    const stepOne = fixture.nativeElement.querySelector('#step-1');

    observer.emit([createEntry(stepOne, false, -100)]);

    expect(component.activeStep()).toBe('step-1');
  });

  it('should report the active and aria state for a step', async () => {
    await createComponent();

    component.activeStep.set('step-3');

    expect(component.isActiveStep(3)).toBeTrue();
    expect(component.isActiveStep(2)).toBeFalse();
    expect(component.isAriaStep(3)).toBe('step');
    expect(component.isAriaStep(2)).toBeNull();
  });

  it('should scroll the fragment target into view', async () => {
    await createComponent();

    const stepTwo = fixture.nativeElement.querySelector(
      '#step-2'
    ) as HTMLElement;
    const scrollIntoView = jasmine.createSpy('scrollIntoView');

    Object.defineProperty(stepTwo, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoView
    });

    fragment$.next('step-2');
    await new Promise((resolve) => setTimeout(resolve));

    expect(scrollIntoView).toHaveBeenCalledOnceWith({
      behavior: 'smooth',
      block: 'start'
    });
  });

  it('should ignore a fragment without a matching target', async () => {
    await createComponent();

    const stepOne = fixture.nativeElement.querySelector(
      '#step-1'
    ) as HTMLElement;
    const scrollIntoView = jasmine.createSpy('scrollIntoView');

    Object.defineProperty(stepOne, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoView
    });

    fragment$.next('missing-step');
    await new Promise((resolve) => setTimeout(resolve));

    expect(scrollIntoView).not.toHaveBeenCalled();
  });

  it('should ignore an empty fragment', async () => {
    await createComponent();

    const getElementById = spyOn(document, 'getElementById').and.callThrough();

    fragment$.next(null);

    expect(getElementById).not.toHaveBeenCalled();
  });

  it('should disconnect the observer when its host is destroyed', async () => {
    await createComponent();

    const observer = IntersectionObserverMock.instances[0];

    fixture.destroy();

    expect(observer.disconnect).toHaveBeenCalledTimes(1);
  });

  it('should support rendering when IntersectionObserver is unavailable', async () => {
    installIntersectionObserver(undefined);

    await createComponent();

    expect(component.activeStep()).toBe('step-1');
    expect(IntersectionObserverMock.instances).toEqual([]);
  });
});
