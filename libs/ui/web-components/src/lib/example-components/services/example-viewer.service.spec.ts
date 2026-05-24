import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ExampleViewerService } from './example-viewer.service';

describe('ExampleViewerService', () => {
  let service: ExampleViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExampleViewerService, provideZonelessChangeDetection()]
    });
    service = TestBed.inject(ExampleViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should lazily create a visibility signal defaulting to false', () => {
    const sig = service.getVisibilitySignal('example-1');
    expect(sig()).toBeFalse();
  });

  it('should return the same signal instance for the same exampleId', () => {
    const sig1 = service.getVisibilitySignal('same-example');
    const sig2 = service.getVisibilitySignal('same-example');
    expect(sig1).toBe(sig2);
  });

  it('should create separate signals for different exampleIds', () => {
    const a = service.getVisibilitySignal('a');
    const b = service.getVisibilitySignal('b');

    expect(a).not.toBe(b);
    expect(a()).toBeFalse();
    expect(b()).toBeFalse();
  });

  it('toggle() should invert the visibility state', () => {
    const sig = service.getVisibilitySignal('toggle-test');
    expect(sig()).toBeFalse();

    service.toggle('toggle-test');
    expect(sig()).toBeTrue();

    service.toggle('toggle-test');
    expect(sig()).toBeFalse();
  });

  it('show() should set visibility to true', () => {
    const sig = service.getVisibilitySignal('show-test');
    expect(sig()).toBeFalse();

    service.show('show-test');
    expect(sig()).toBeTrue();
  });

  it('hide() should set visibility to false', () => {
    const sig = service.getVisibilitySignal('hide-test');
    sig.set(true); // pre-populate

    service.hide('hide-test');
    expect(sig()).toBeFalse();
  });

  it('setDefaultVisibility() should set initial visibility value', () => {
    const sig = service.getVisibilitySignal('default-test');
    expect(sig()).toBeFalse();

    service.setDefaultVisibility('default-test', true);
    expect(sig()).toBeTrue();

    service.setDefaultVisibility('default-test', false);
    expect(sig()).toBeFalse();
  });

  it('setDefaultVisibility() should not create a new signal instance', () => {
    const sig1 = service.getVisibilitySignal('instance-test');
    service.setDefaultVisibility('instance-test', true);
    const sig2 = service.getVisibilitySignal('instance-test');

    expect(sig1).toBe(sig2);
    expect(sig2()).toBeTrue();
  });

  it('map should grow only when requesting new exampleIds', () => {
    // @ts-expect-error – accessing private for test purposes
    const map = service._visibilityMap as Map<string, unknown>;

    expect(map.size).toBe(0);

    service.getVisibilitySignal('one');
    expect(map.size).toBe(1);

    service.getVisibilitySignal('one'); // same ID, no growth
    expect(map.size).toBe(1);

    service.getVisibilitySignal('two');
    expect(map.size).toBe(2);
  });
});
