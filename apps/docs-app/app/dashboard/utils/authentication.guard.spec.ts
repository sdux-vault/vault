import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { AuthenticationService } from 'apps/docs-app/app/dashboard/service/authentication.service';
import { dashboardAuthenticationGuard } from './authentication.guard';

describe('Guard: DashboardAuthentication', () => {
  let authService: jasmine.SpyObj<AuthenticationService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthenticationService', [
      'isAuthenticated'
    ]);
    router = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [
        { provide: AuthenticationService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    });
  });

  it('should allow navigation when user is authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);

    const result = TestBed.runInInjectionContext(() =>
      dashboardAuthenticationGuard({} as any, {} as any)
    );

    expect(result).toBeTrue();
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(router.createUrlTree).not.toHaveBeenCalled();
  });

  it('should redirect to /signup when user is not authenticated', () => {
    const mockTree = {} as UrlTree;

    authService.isAuthenticated.and.returnValue(false);
    router.createUrlTree.and.returnValue(mockTree);

    const result = TestBed.runInInjectionContext(() =>
      dashboardAuthenticationGuard({} as any, {} as any)
    );

    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(router.createUrlTree).toHaveBeenCalledWith(['/signup']);
    expect(result).toBe(mockTree);
  });
});
