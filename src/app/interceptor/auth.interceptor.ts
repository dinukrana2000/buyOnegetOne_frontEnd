import {HttpInterceptorFn} from "@angular/common/http";
import {inject} from "@angular/core";
import {OidcSecurityService} from "angular-auth-oidc-client";
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(OidcSecurityService);

   // Use `from` to handle `Observable` in `switchMap`
   return from(authService.getAccessToken()).pipe(
    switchMap((token) => {
      if (token) {
        const header = `Bearer ${token}`;
        const headers = req.headers.set('Authorization', header);
        req = req.clone({ headers });
      }
      return next(req); // Pass the request to the next handler
    })
  );

}
