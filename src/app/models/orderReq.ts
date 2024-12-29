import { Order } from "./order";

export class OrderRequest {
    orderLineItemsDtoList: Order[];
  
    constructor(orderLineItemsDtoList: Order[]) {
      this.orderLineItemsDtoList = orderLineItemsDtoList;
    }
  }