import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FrameworkPreferenceService } from './framework-preference.service';

describe('FrameworkPreferenceService', () => {
  let service: FrameworkPreferenceService;

  beforeEach(() => {
    localStorage.removeItem(FrameworkPreferenceService.STORAGE_KEY);

    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });

    service = TestBed.inject(FrameworkPreferenceService);
  });

  afterEach(() => {
    localStorage.removeItem(FrameworkPreferenceService.STORAGE_KEY);
  });

  it('should start with null when no localStorage value exists', () => {
    expect(service.preferred()).toBeNull();
  });

  it('should set the preferred framework', () => {
    service.set('React');
    expect(service.preferred()).toBe('React');
  });

  it('should persist to localStorage on set', () => {
    service.set('Vue');
    expect(localStorage.getItem(FrameworkPreferenceService.STORAGE_KEY)).toBe(
      'Vue'
    );
  });

  it('should reset the preference to null', () => {
    service.set('Angular');
    service.reset();
    expect(service.preferred()).toBeNull();
  });

  it('should remove localStorage on reset', () => {
    service.set('Svelte');
    service.reset();
    expect(
      localStorage.getItem(FrameworkPreferenceService.STORAGE_KEY)
    ).toBeNull();
  });

  it('should load existing preference from localStorage', () => {
    localStorage.setItem(FrameworkPreferenceService.STORAGE_KEY, 'Deno');

    expect(localStorage.getItem(FrameworkPreferenceService.STORAGE_KEY)).toBe(
      'Deno'
    );
  });

  it('should allow overwriting the preference', () => {
    service.set('Angular');
    service.set('Bun');
    expect(service.preferred()).toBe('Bun');
    expect(localStorage.getItem(FrameworkPreferenceService.STORAGE_KEY)).toBe(
      'Bun'
    );
  });

  it('should handle localStorage.setItem throwing without error', () => {
    spyOn(localStorage, 'setItem').and.throwError('QuotaExceededError');
    expect(() => service.set('React')).not.toThrow();
    expect(service.preferred()).toBe('React');
  });
});

describe('FrameworkPreferenceService with localStorage.getItem error', () => {
  it('should default to null when localStorage.getItem throws', () => {
    spyOn(localStorage, 'getItem').and.throwError('SecurityError');

    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });

    const errorService = TestBed.inject(FrameworkPreferenceService);
    expect(errorService.preferred()).toBeNull();
  });
});
