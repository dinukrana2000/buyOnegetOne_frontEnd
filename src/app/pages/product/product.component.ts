import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductServiceService } from 'src/app/services/product-service/product-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  productForm: FormGroup;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private productService: ProductServiceService,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (response: any) => {
        this.products = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load products.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.productService.createProduct(this.productForm.value).subscribe({
        next: (response) => {
          this.products.push(response);
          this.productForm.reset();
        },
        error: () => {
          this.errorMessage = 'Failed to create product.';
        }
      });
    }
  }

}
