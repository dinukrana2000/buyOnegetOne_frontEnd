export class Product {
  id: string;
  name: string;
  price: string;
  description: string;


    constructor(id: string, name: string, price:string , description: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
    
    }
}