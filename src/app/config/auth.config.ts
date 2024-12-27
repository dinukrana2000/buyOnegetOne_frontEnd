import { PassedInitialConfig } from 'angular-auth-oidc-client';
import { environment } from '../environments/environments.development';

const domain= environment.redirectUrl;

export const authConfig: PassedInitialConfig = {
  config: {
    authority: 'http://localhost:8080/realms/spring-microservices-security-realm',
    redirectUrl: `${domain}/products`,
    postLogoutRedirectUri:`${domain}`,
    clientId: 'angular-client',
    scope: 'openid profile offline_access',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
    renewTimeBeforeTokenExpiresInSeconds: 30,
  }
}
