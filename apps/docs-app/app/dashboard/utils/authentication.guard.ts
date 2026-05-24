import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from 'apps/docs-app/app/dashboard/service/authentication.service';

export const dashboardAuthenticationGuard: CanActivateFn = () => {
  const auth = inject(AuthenticationService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/signup']);
};
