import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private oidcSecurityService: OidcSecurityService, 
    private router: Router,
  private toaster:ToastrService) {}

  ngOnInit(): void {
  
  }

  login() {
    // Start the authorization flow
    this.oidcSecurityService.authorize();
    
    // Wait for checkAuth to confirm authentication after the redirect
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated }) => {
      console.log('Post Login - Is Authenticated:', isAuthenticated);
      
      if (isAuthenticated) {
        // If the user is authenticated, navigate to products page
        this.toaster.success('Logged in successfully');
        this.router.navigate(['/products']);
      } else {
        // If authentication failed, show an error
        this.toaster.error('Authentication failed or not yet completed.');
        console.error('Authentication failed or not yet completed.');
      }
    });
  }


}
