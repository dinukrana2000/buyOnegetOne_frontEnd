import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const oidcSecurityService = inject(OidcSecurityService);
  const router = inject(Router);

  return oidcSecurityService.isAuthenticated$.pipe(
    map(({ isAuthenticated }) => {
      console.log('Auth Guard - Is Authenticated:', isAuthenticated);

      if (isAuthenticated) {
        return true; // Allow navigation
      } else {
        router.navigate(['/'], { replaceUrl: true });
        return false; // Block navigation
      }
    })
  );
};