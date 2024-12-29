export class Order {
    id: number;
    skuCode: string;
    price: number;
    quantity: number;
  
  
      constructor(id: number, skuCode: string, price:number , quantity: number) {
          this.id = id;
          this.skuCode = skuCode;
          this.price = price;
          this.quantity = quantity;
      
      }
  }