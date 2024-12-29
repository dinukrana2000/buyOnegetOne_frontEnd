import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environments.development';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private apiUrl = environment.apiUrl;


  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<HttpEvent<any>> {
    return this.httpClient.get<any>(`${this.apiUrl}/product/getAllProducts`);
  }
 

  createProduct(product: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/product/addProduct`, product);
  }

}
