import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'buyOnegetOne_frontEnd';

  isHomePage = false;

  constructor(private router: Router,
    private oidcSecurityService: OidcSecurityService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = event.url === '/'; 
      }
    });
  }

  ngOnInit() {
    // You can use this method to check auth status on app load
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated }) => {
      console.log('App Initialization - Is Authenticated:', isAuthenticated);
      
    });
  }
  
}
