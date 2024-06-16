import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit, OnDestroy {
  orders: any[] = [];
  subs: Subscription[] = [];
  errorMessage: string;
  successMessage: string;
  hasError = false;
  success = false;
  isEditMode = false;
  isAddMode = false;
  currentOrder: any = { userId: null, products: [{ id: null, quantity: null }] };
  searchOrderId: string = '';
  searchUser: string = '';
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
  filteredOrders(): any[] {
    return this.orders.filter(order => {
      const matchesOrderId = order.id.toString().includes(this.searchOrderId);
      const matchesUser = order.username.toLowerCase().includes(this.searchUser.toLowerCase());
      return matchesOrderId && matchesUser;
    });
  }

  loadOrders(): void {
    this.subs.push(this.orderService.getAllOrders().subscribe((orders: any) => {
      this.orders = orders;
    }, error => {
      this.errorMessage = 'Failed to load orders';
      this.hasError = true;
      setTimeout(() => this.hasError = false, 3000);
    }));
  }

  editOrder(order: any): void {
    this.isEditMode = true;
    this.isAddMode = false;
    this.currentOrder = { ...order, products: order.products.map(p => ({ id: p.id, quantity: p.quantity })) };
  }

  addOrderMode(): void {
    this.isEditMode = false;
    this.isAddMode = true;
    this.currentOrder = { userId: null, products: [{ id: null, quantity: null }] };
  }

  cancelEditOrAdd(): void {
    this.isEditMode = false;
    this.isAddMode = false;
    this.currentOrder = { userId: null, products: [{ id: null, quantity: null }] };
  }

  addProduct(): void {
    this.currentOrder.products.push({ id: null, quantity: null });
  }

  removeProduct(index: number): void {
    this.currentOrder.products.splice(index, 1);
  }

  updateOrder(): void {
    this.subs.push(this.orderService.updateOrder(this.currentOrder.id, this.currentOrder).subscribe(response => {
      this.successMessage = response.message;
      this.success = true;
      this.loadOrders();
      this.cancelEditOrAdd();
      setTimeout(() => this.success = false, 3000);
    }, error => {
      this.errorMessage = 'Failed to update order';
      this.hasError = true;
      setTimeout(() => this.hasError = false, 3000);
    }));
  }

  deleteOrder(id: number): void {
    this.subs.push(this.orderService.deleteOrder(id).subscribe(response => {
      this.successMessage = response.message;
      this.success = true;
      this.loadOrders();
      setTimeout(() => this.success = false, 3000);
    }, error => {
      this.errorMessage = 'Failed to delete order';
      this.hasError = true;
      setTimeout(() => this.hasError = false, 3000);
    }));
  }

  addOrder(): void {
    this.subs.push(this.orderService.addOrder(this.currentOrder).subscribe(response => {
      this.successMessage = response.message;
      this.success = true;
      this.loadOrders();
      this.cancelEditOrAdd();
      setTimeout(() => this.success = false, 3000);
    }, error => {
      this.errorMessage = 'Failed to add order';
      this.hasError = true;
      setTimeout(() => this.hasError = false, 3000);
    }));
  }
}
