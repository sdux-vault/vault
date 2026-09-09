import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SourceOverflowDirective } from './source-overflow.directive';

@Component({
  standalone: true,
  imports: [SourceOverflowDirective],
  template: `
    <pre
      sduxSourceOverflow
      [sduxSourceOverflowMaxHeight]="maxHeight"
      (sduxSourceOverflowChange)="
        overflow = $event; overflowChangeCount = overflowChangeCount + 1
      ">
      source
    </pre>
  `
})
class SourceOverflowHostComponent {
  maxHeight = 640;
  overflow: boolean | null = null;
  overflowChangeCount = 0;
}

function mockScrollHeight(element: HTMLElement, scrollHeight: number): void {
  Object.defineProperty(element, 'scrollHeight', {
    configurable: true,
    get: () => scrollHeight
  });
}

class IntersectionObserverStub {
  static instance: IntersectionObserverStub;
  readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    IntersectionObserverStub.instance = this;
  }

  observe(): void {}
  disconnect(): void {}

  trigger(isIntersecting: boolean): void {
    this.callback(
      [
        {
          isIntersecting,
          intersectionRatio: isIntersecting ? 1 : 0
        } as IntersectionObserverEntry
      ],
      this as unknown as IntersectionObserver
    );
  }
}

describe('Directive: SourceOverflowDirective', () => {
  let fixture: ComponentFixture<SourceOverflowHostComponent>;
  let originalIntersectionObserver: typeof IntersectionObserver;

  beforeEach(async () => {
    originalIntersectionObserver = window.IntersectionObserver;
    window.IntersectionObserver =
      IntersectionObserverStub as unknown as typeof IntersectionObserver;

    await TestBed.configureTestingModule({
      imports: [SourceOverflowHostComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(SourceOverflowHostComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    window.IntersectionObserver = originalIntersectionObserver;
  });

  it('emits true when the source pane exceeds the configured height', (done) => {
    const pane = fixture.nativeElement.querySelector('pre') as HTMLElement;
    mockScrollHeight(pane, 800);
    IntersectionObserverStub.instance.trigger(true);

    requestAnimationFrame(() => {
      expect(fixture.componentInstance.overflow).toBeTrue();
      done();
    });
  });

  it('emits false when the source pane does not overflow', (done) => {
    const pane = fixture.nativeElement.querySelector('pre') as HTMLElement;
    mockScrollHeight(pane, 400);
    IntersectionObserverStub.instance.trigger(true);

    requestAnimationFrame(() => {
      expect(fixture.componentInstance.overflow).toBeFalse();
      done();
    });
  });

  it('measures only once', (done) => {
    const pane = fixture.nativeElement.querySelector('pre') as HTMLElement;
    mockScrollHeight(pane, 800);
    IntersectionObserverStub.instance.trigger(true);
    IntersectionObserverStub.instance.trigger(true);

    requestAnimationFrame(() => {
      expect(fixture.componentInstance.overflowChangeCount).toBe(1);

      requestAnimationFrame(() => {
        expect(fixture.componentInstance.overflowChangeCount).toBe(1);
        done();
      });
    });
  });

  it('waits to measure until the pane becomes visible', (done) => {
    const pane = fixture.nativeElement.querySelector('pre') as HTMLElement;
    mockScrollHeight(pane, 800);

    IntersectionObserverStub.instance.trigger(false);

    requestAnimationFrame(() => {
      expect(fixture.componentInstance.overflow).toBeNull();

      IntersectionObserverStub.instance.trigger(true);

      requestAnimationFrame(() => {
        expect(fixture.componentInstance.overflow).toBeTrue();
        done();
      });
    });
  });
});
