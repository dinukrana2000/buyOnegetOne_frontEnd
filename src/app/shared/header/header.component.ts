import { Component } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private oidcSecurityService: OidcSecurityService,
     private router: Router
    ,private toastr: ToastrService
  ) {}

  logout() {
    sessionStorage.clear();
        localStorage.clear();
    this.oidcSecurityService.logoffAndRevokeTokens().subscribe({
      next: () => {
        this.toastr.success('Logged out successfully');
        this.router.navigate(['/'], { replaceUrl: true }); 
      },
      error: () => {
        this.toastr.error('Error logging out');
        console.error('Error logging out');
      },
    });
  }
  
}
