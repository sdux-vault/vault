import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { AuthenticationService } from './authentication.service';

describe('Service: Authentication', () => {
  let service: AuthenticationService;

  const TOKEN_KEY = 'token';

  const configureTestingModule = (): void => {
    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [provideZonelessChangeDetection()]
    });

    service = TestBed.inject(AuthenticationService);
  };

  beforeEach(() => {
    TestBed.resetTestingModule();
    localStorage.removeItem(TOKEN_KEY);
  });

  afterEach(() => {
    localStorage.removeItem(TOKEN_KEY);
  });

  function createMockJwt(payload: object): string {
    const base64 = btoa(JSON.stringify(payload));
    return `header.${base64}.signature`;
  }

  it('should initialize as unauthenticated when no token exists in localStorage', () => {
    configureTestingModule();

    expect(service.getToken()).toBeNull();
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should initialize as authenticated when a token already exists in localStorage', () => {
    localStorage.setItem(TOKEN_KEY, 'existing-token');

    configureTestingModule();

    expect(service.getToken()).toBe('existing-token');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should store the token and authenticate on login', () => {
    configureTestingModule();

    service.login('jwt-token');

    expect(localStorage.getItem(TOKEN_KEY)).toBe('jwt-token');
    expect(service.getToken()).toBe('jwt-token');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should clear the token and unauthenticate on logout', () => {
    configureTestingModule();
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    service.login('jwt-token');

    service.logout();

    expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
    expect(service.getToken()).toBeNull();
    expect(service.isAuthenticated()).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should overwrite an existing token on login', () => {
    localStorage.setItem(TOKEN_KEY, 'old-token');
    configureTestingModule();

    service.login('new-token');

    expect(localStorage.getItem(TOKEN_KEY)).toBe('new-token');
    expect(service.getToken()).toBe('new-token');
    expect(service.isAuthenticated()).toBeTrue();
  });

  describe('fullName', () => {
    it('should extract fullName from token', () => {
      const token = createMockJwt({
        contactUuid: 'contact-1',
        fullName: 'contact-1',
        organizationUuid: 'org-123',
        organizationName: 'org',
        role: 'admin'
      });

      localStorage.setItem(TOKEN_KEY, token);

      configureTestingModule();

      expect(service.fullName()).toBe('contact-1');
    });

    it('should return null if token missing when getting fullName', () => {
      configureTestingModule();

      expect(service.fullName()).toBeNull();
    });

    it('should return null if token malformed', () => {
      localStorage.setItem(TOKEN_KEY, 'bad.token.structure');

      configureTestingModule();

      expect(service.fullName()).toBeNull();
    });
  });

  describe('organizationName', () => {
    it('should extract organizationName from token', () => {
      const token = createMockJwt({
        contactUuid: 'contact-1',
        fullName: 'contact-1',
        organizationUuid: 'org-123',
        organizationName: 'org',
        role: 'admin'
      });

      localStorage.setItem(TOKEN_KEY, token);

      configureTestingModule();

      expect(service.organizationName()).toBe('org');
      expect(service.organizationName()).toBe('org');
    });

    it('should return null if token missing when getting organizationName', () => {
      configureTestingModule();

      expect(service.organizationName()).toBeNull();
    });

    it('should return null if token malformed', () => {
      localStorage.setItem(TOKEN_KEY, 'bad.token.structure');

      configureTestingModule();

      expect(service.organizationName()).toBeNull();
    });
  });
});
