import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MobileLayoutService,
  sduxTestingModule
} from '@sdux-vault/ui/web-components';
import { AuthenticationService } from 'apps/docs-app/app/dashboard/service/authentication.service';
import { NavigationService } from '../navigation/service/navigation.service';
import { ThemeService } from '../theme/theme.service';
import { ToolbarComponent } from './toolbar.component';

describe('Component: Toolbar', () => {
  let fixture: ComponentFixture<ToolbarComponent>;
  let component: ToolbarComponent;
  let themeService: jasmine.SpyObj<ThemeService>;
  let authenticationService: jasmine.SpyObj<AuthenticationService>;
  let isAuthSpy: ReturnType<typeof signal<boolean>>;

  beforeEach(async () => {
    const themeSpy = jasmine.createSpyObj<ThemeService>(
      'ThemeService',
      ['toggleTheme', 'toggleDirection'],
      {
        theme: signal<'light' | 'dark'>('light'),
        direction: signal<'ltr' | 'rtl'>('ltr')
      }
    );

    isAuthSpy = signal<boolean>(false);

    const authSpy = jasmine.createSpyObj<AuthenticationService>(
      'AuthenticationService',
      ['logout']
    );
    Object.defineProperty(authSpy, 'isAuthenticated', {
      value: isAuthSpy
    });

    await TestBed.configureTestingModule({
      imports: [ToolbarComponent, sduxTestingModule],
      providers: [
        { provide: ThemeService, useValue: themeSpy },
        { provide: AuthenticationService, useValue: authSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService) as jasmine.SpyObj<ThemeService>;
    authenticationService = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;
    fixture.detectChanges();
  });

  it('should expose default computed values for light/LTR state', () => {
    expect(component.theme()).toBe('light');
    expect(component.direction()).toBe('ltr');
    expect(component.themeIcon()).toBe('dark_mode');
    expect(component.themeLabel()).toBe('Dark Mode');
    expect(component.dirIcon()).toBe('format_textdirection_r_to_l');
    expect(component.dirLabel()).toBe('Switch to RTL');
  });

  it('should update computed signals when theme changes to dark', () => {
    themeService.theme.set('dark');
    fixture.detectChanges();

    expect(component.theme()).toBe('dark');
    expect(component.themeIcon()).toBe('light_mode');
    expect(component.themeLabel()).toBe('Light Mode');
  });

  it('should update computed signals when direction changes to rtl', () => {
    themeService.direction.set('rtl');
    fixture.detectChanges();

    expect(component.direction()).toBe('rtl');
    expect(component.dirIcon()).toBe('format_textdirection_l_to_r');
    expect(component.dirLabel()).toBe('Switch to LTR');
  });

  it('should call ThemeService.toggleTheme() when toggleTheme() is invoked', () => {
    component.toggleTheme();
    expect(themeService.toggleTheme).toHaveBeenCalled();
  });

  it('should call ThemeService.toggleDirection() when toggleDirection() is invoked', () => {
    component.toggleDirection();
    expect(themeService.toggleDirection).toHaveBeenCalled();
  });

  it('should call navigationService.show() when openDocumentation() is invoked', () => {
    const navigationService = TestBed.inject(NavigationService);
    spyOn(navigationService, 'show');
    component.openDocumentation();
    expect(navigationService.show).toHaveBeenCalled();
  });

  it('should handle a computed isMobile event', () => {
    const mobileService = TestBed.inject(MobileLayoutService);
    const fakeSignal = signal<boolean>(false);
    spyOn(mobileService, 'isMobile').and.callFake(fakeSignal);

    expect(component.isMobile()).toBeFalse();
    fakeSignal.set(true);

    expect(component.isMobile()).toBeTrue();
  });

  it('should handle a computed image event', () => {
    const mobileService = TestBed.inject(MobileLayoutService);
    const fakeSignal = signal<boolean>(false);
    spyOn(mobileService, 'isMobile').and.callFake(fakeSignal);

    expect(component.image()).toBe('brand/sdux/brand-landscape-dark.svg');
    fakeSignal.set(true);

    expect(component.image()).toBe('brand/sdux/brand.svg');
  });

  describe('Authentication integration', () => {
    it('should handle computed isAuthenticated state', () => {
      expect(component.isAuthenticated()).toBeFalse();

      isAuthSpy.set(true);
      fixture.detectChanges();

      expect(component.isAuthenticated()).toBeTrue();
    });

    it('should call AuthenticationService.logout() when logout() is invoked', () => {
      component.logout();

      expect(authenticationService.logout).toHaveBeenCalled();
    });
  });
});
