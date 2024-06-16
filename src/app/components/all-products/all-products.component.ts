import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  subs: Subscription[] = [];
  errorMessage: string;
  successMessage: string;
  hasError = false;
  success = false;
  currentProduct: any = {};
  isEditMode = false;

  // Переменные для фильтрации
  searchId: string = '';
  searchCategory: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  loadProducts(): void {
    this.subs.push(this.productService.getAllProducts().subscribe((prods: any) => {
      this.products = prods.products;
    }));
  }

  editProduct(product: any): void {
    this.currentProduct = { ...product };
    this.isEditMode = true;
  }

  updateProduct(productForm: NgForm): void {
    if (!productForm.valid) {
      return;
    }

    const updatedProduct = { ...productForm.value, id: this.currentProduct.id };

    this.productService.updateProduct(updatedProduct).subscribe(
      (updatedProducts: any[]) => {
        this.products = updatedProducts;
        this.resetForm(productForm);
        this.showSuccessMessage('Product updated successfully!');
        setTimeout(() => {
          location.reload(); // Перезагрузка страницы
        }, 2000);
      },
      error => this.showErrorMessage('Failed to update product.')
    );
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.currentProduct = {};
  }

  filteredProducts(): any[] {
    return this.products.filter(product => {
      const matchesId = product.id.toString().includes(this.searchId);
      const matchesCategory = product.category.toLowerCase().includes(this.searchCategory.toLowerCase());
      return matchesId && matchesCategory;
    });
  }


  addProduct(productForm: NgForm): void {
    if (!productForm.valid) {
      return;
    }

    const newProduct = productForm.value;
    this.productService.addProduct(newProduct).subscribe(
      (response: any) => {
        this.products = response.products; // Обновление списка продуктов
        this.resetForm(productForm);
        this.showSuccessMessage('Product added successfully!');
        setTimeout(() => {
          location.reload(); // Перезагрузка страницы
        }, 2000); // Задержка перед перезагрузкой страницы
      },
      error => this.showErrorMessage('Failed to add product.')
    );
  }


  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      res => {
        if (res.status === 'failure') {
          this.showErrorMessage(res.message);
        } else if (res.status === 'success') {
          this.products = res.products;
          this.showSuccessMessage(res.message);
          location.reload();
        }
      },
      error => this.showErrorMessage('Failed to delete product.')
    );
  }

  private resetForm(form: NgForm): void {
    form.reset();
    this.isEditMode = false;
    this.currentProduct = {};
  }

  private showSuccessMessage(message: string): void {
    this.successMessage = message;
    this.success = true;
    setTimeout(() => this.success = false, 3000);
  }

  private showErrorMessage(message: string): void {
    this.errorMessage = message;
    this.hasError = true;
    setTimeout(() => this.hasError = false, 3000);
  }
}
