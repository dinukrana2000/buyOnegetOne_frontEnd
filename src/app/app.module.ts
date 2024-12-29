import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthModule } from 'angular-auth-oidc-client'; 
import { HttpClientModule } from '@angular/common/http';
import { authConfig } from './config/auth.config';
import { ProductComponent } from './pages/product/product.component';
import { HeaderComponent } from './shared/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for Toastr
import { ToastrModule } from 'ngx-toastr';
import { OrderComponent } from './pages/order/order.component'; // Toastr Module
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { OidcSecurityService } from "angular-auth-oidc-client";
import { authInterceptor } from './interceptor/auth.interceptor'; 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    HeaderComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    AuthModule.forRoot(authConfig), 
    BrowserAnimationsModule, // Required for Toastr
    ToastrModule.forRoot({ // ToastrModule added
      timeOut: 3000, // 3 seconds
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    OidcSecurityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
