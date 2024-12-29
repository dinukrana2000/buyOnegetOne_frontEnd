import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { OrderServiceService } from '../../services/order-service/order-service.service';
import { Order } from '../../models/order';
import { OrderRequest } from '../../models/orderReq';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {

  orderForm: FormGroup;
  apiMessage: string = '';

  constructor(private fb: FormBuilder, private orderService: OrderServiceService,private toastr: ToastrService) {
    this.orderForm = this.fb.group({
      orderLineItemsDtoList: this.fb.array([this.createOrderItem()]),
    });
  }

  get orderLineItems() {
    return this.orderForm.get('orderLineItemsDtoList') as FormArray;
  }

  createOrderItem(): FormGroup {
    return this.fb.group({
      skuCode: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
  }

  addOrderItem() {
    this.orderLineItems.push(this.createOrderItem());
  }

  removeOrderItem(index: number) {
    this.orderLineItems.removeAt(index);
  }

  
  clearForm() {
    this.orderForm.reset();
    this.apiMessage = ''; 
    this.orderForm.setControl(
      'orderLineItemsDtoList',
      this.fb.array([this.createOrderItem()])
    );
  }
  
  

  submitOrder() {
    if (this.orderForm.valid) {
      const orderRequest = new OrderRequest(
        this.orderForm.value.orderLineItemsDtoList.map((item: any) => {
          return new Order(item.id, item.skuCode, item.price, item.quantity);
        })
      );
  
      this.orderService.placeOrder(orderRequest).subscribe(
        (response: any) => {
          console.log('API Response:', response); // Log for debugging
          this.toastr.success(response?.message || 'Order placed successfully!', 'Success');
          this.clearForm(); // Clear the form after successful submission
        },
        (error) => {
          console.error('API Error:', error); // Log for debugging
           // Show error message using Toastr
           this.toastr.error(
            error?.error.error || 'An error occurred while placing the order.',
            'Error'
          );
        }
      );
    }
  }
  
  
  
}
