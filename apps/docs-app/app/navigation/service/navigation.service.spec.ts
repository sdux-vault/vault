import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavigationService } from './navigation.service';

describe('Service: Navigation', () => {
  let service: NavigationService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = new NavigationService();
  });

  it('should have initial state as true', () => {
    expect(service.isOpen()).toBeTrue();
  });

  it('should set loading to true when show() is called', () => {
    expect(service.isOpen()).toBeTrue();
    service.show();
    TestBed.tick();
    expect(service.isOpen()).toBeTrue();
  });

  describe('updateExpanded', () => {
    it('should handle an updateExpanded call - undefined', () => {
      expect(service.isOpen()).toBeTrue();

      service.updateExpanded();
      TestBed.tick();
      expect(service.isOpen()).toBeFalse();

      service.updateExpanded();
      TestBed.tick();
      expect(service.isOpen()).toBeTrue();
    });

    it('should handle an updateExpanded call - defined', () => {
      expect(service.isOpen()).toBeTrue();

      service.updateExpanded(false);
      TestBed.tick();
      expect(service.isOpen()).toBeFalse();

      service.updateExpanded();
      TestBed.tick();
      expect(service.isOpen()).toBeTrue();

      service.updateExpanded(false);
      TestBed.tick();
      expect(service.isOpen()).toBeFalse();
    });
  });
});
