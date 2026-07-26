import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MobileLayoutService } from '@sdux-vault/ui/web-components';
import { Subject } from 'rxjs';
import { NavigationService } from '../service/navigation.service';
import { NavigationDirective } from './navigation.directive';

// --- Mock BreakpointObserver ---
class MockBreakpointObserver {
  private subject = new Subject<BreakpointState>();

  observe() {
    return this.subject.asObservable();
  }

  emit(state: BreakpointState) {
    this.subject.next(state);
  }
}

// --- Begin Tests ---
fdescribe('Directive: Navigation', () => {
  let component: NavigationDirective;
  let breakpoint: MockBreakpointObserver;

  beforeEach(async () => {
    // mock localStorage
    spyOn(localStorage, 'getItem').and.callFake(() => null);
    spyOn(localStorage, 'setItem').and.callFake(() => {});

    await TestBed.configureTestingModule({
      imports: [],
      providers: [
        NavigationDirective,
        provideZonelessChangeDetection(),
        { provide: BreakpointObserver, useClass: MockBreakpointObserver },
        provideRouter([])
      ]
    }).compileComponents();

    component = TestBed.inject(NavigationDirective);
    breakpoint = TestBed.inject(BreakpointObserver) as any;
  });

  it('should start with mode="side" and isMobile=false (default breakpoint)', () => {
    expect(component.mode()).toBe('side');
  });

  it('should update mode and isMobile when breakpoints emit true', async () => {
    const layoutService = TestBed.inject(MobileLayoutService);
    expect(component.mode()).toBe('side');

    // Emit breakpoint event
    layoutService.isMobile.set(true);

    // Force async subscription to run in a new tick

    expect(component.mode()).toBe('over');

    // Emit breakpoint event
    layoutService.isMobile.set(false);
    expect(component.mode()).toBe('side');
  });

  it('should update mode and isMobile when breakpoints emit false', () => {
    breakpoint.emit({ matches: false } as BreakpointState);
    TestBed.tick();

    expect(component.mode()).toBe('side');
  });

  // ---------------------------------------------------------
  // isExpanded (Signal) Tests
  // ---------------------------------------------------------
  it('should toggle isExpanded and persist to localStorage', async () => {
    const navigationService = TestBed.inject(NavigationService);
    spyOn(navigationService, 'updateExpanded');

    component.toggleSidenav();

    expect(navigationService.updateExpanded).toHaveBeenCalledOnceWith();
  });

  it('should close sidenav only when mobile', () => {
    const layoutService = TestBed.inject(MobileLayoutService);
    layoutService.isMobile.set(true);

    component.isExpanded.set(true);

    component.closeSidenav();
    TestBed.tick();
    expect(component.isExpanded()).toBeFalse();

    component.closeSidenav();
    TestBed.tick();
    expect(component.isExpanded()).toBeTrue();

    layoutService.isMobile.set(false);
    component.closeSidenav();
    TestBed.tick();
    expect(component.isExpanded()).toBeTrue();

    component.closeSidenav(true);
    TestBed.tick();
    expect(component.isExpanded()).toBeFalse();

    component.closeSidenav(true);
    TestBed.tick();
    expect(component.isExpanded()).toBeTrue();
  });

  // ---------------------------------------------------------
  // restoreSidenavState()
  // ---------------------------------------------------------
  it('should restore sidenav state from localStorage when present', () => {
    (localStorage.getItem as jasmine.Spy).and.returnValue('true');
    expect(component['restoreSidenavState']()).toBeTrue();
  });

  // ---------------------------------------------------------
  // Resize Behavior
  // ---------------------------------------------------------
  it('should update isExpanded on resize only if no saved state', () => {
    // Simulate no saved sidenav config
    (localStorage.getItem as jasmine.Spy).and.returnValue(null);

    spyOn(component.isExpanded, 'set');

    // Call resize handler manually
    component.onResize();

    expect(component.isExpanded.set).toHaveBeenCalled();
  });

  it('should NOT update isExpanded on resize if localStorage setting exists', () => {
    (localStorage.getItem as jasmine.Spy).and.returnValue('true');

    spyOn(component.isExpanded, 'set');
    component.onResize();

    expect(component.isExpanded.set).not.toHaveBeenCalled();
  });

  it('should handle a closing event', async () => {
    const navigationService = TestBed.inject(NavigationService);
    spyOn(navigationService, 'updateExpanded');

    component.closing();

    expect(navigationService.updateExpanded).toHaveBeenCalledOnceWith(false);
  });
});
