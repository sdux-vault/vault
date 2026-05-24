import { DOCUMENT } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('Service: Theme', () => {
  let service: ThemeService;
  let mockDocument: Document;

  beforeEach(() => {
    // Create a mock document with a real <html> element for attribute testing
    const html = document.implementation.createHTMLDocument('test');
    mockDocument = html;

    // Clear localStorage between tests
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        { provide: DOCUMENT, useValue: mockDocument },
        provideZonelessChangeDetection()
      ]
    });

    service = TestBed.inject(ThemeService);
  });

  it('should create service and set default theme and direction', () => {
    expect(service).toBeTruthy();
    expect(service.theme()).toBe('light');
    expect(service.direction()).toBe('ltr');
    const html = mockDocument.documentElement;
    expect(html.getAttribute('data-theme')).toBeNull();
    expect(html.getAttribute('dir')).toBeNull();
  });

  it('should toggle theme from light → dark → light', () => {
    const html = mockDocument.documentElement;

    // First toggle (light → dark)
    service.toggleTheme();
    expect(service.theme()).toBe('dark');
    expect(html.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('vault-theme')).toBe('dark');

    // Second toggle (dark → light)
    service.toggleTheme();
    expect(service.theme()).toBe('light');
    expect(html.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('vault-theme')).toBe('light');
  });

  it('should toggle direction from ltr → rtl → ltr', () => {
    const html = mockDocument.documentElement;

    // First toggle (ltr → rtl)
    service.toggleDirection();
    expect(service.direction()).toBe('rtl');
    expect(html.getAttribute('dir')).toBe('rtl');
    expect(localStorage.getItem('vault-dir')).toBe('rtl');

    // Second toggle (rtl → ltr)
    service.toggleDirection();
    expect(service.direction()).toBe('ltr');
    expect(html.getAttribute('dir')).toBe('ltr');
    expect(localStorage.getItem('vault-dir')).toBe('ltr');
  });

  it('should restore saved preferences from localStorage', () => {
    const html = mockDocument.documentElement;
    localStorage.setItem('vault-theme', 'dark');
    localStorage.setItem('vault-dir', 'rtl');

    service.restorePreferences();

    expect(service.theme()).toBe('dark');
    expect(service.direction()).toBe('rtl');
    expect(html.getAttribute('data-theme')).toBe('dark');
    expect(html.getAttribute('dir')).toBe('rtl');
  });

  it('should fallback to defaults if localStorage is empty', () => {
    localStorage.removeItem('vault-theme');
    localStorage.removeItem('vault-dir');

    service.restorePreferences();

    expect(service.theme()).toBe('light');
    expect(service.direction()).toBe('ltr');
  });
});
