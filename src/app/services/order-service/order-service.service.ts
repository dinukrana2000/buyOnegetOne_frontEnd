import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environments.development';
import { OrderRequest } from 'src/app/models/orderReq';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  placeOrder(orderRequest: OrderRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/order/addOrder`, orderRequest);
  }
}
