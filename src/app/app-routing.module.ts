import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { authGuard } from './security/auth.guard';
import { OrderComponent } from './pages/order/order.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', 
    component: ProductComponent,
    canActivate: [authGuard]},
  { path: 'order', 
    component: OrderComponent,
    canActivate: [authGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
