import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MainContentComponent} from './components/main-content/main-content.component';
import {AllProductsComponent} from './components/all-products/all-products.component';
import {AllUsersComponent} from './components/all-users/all-users.component';
import {AllOrdersComponent} from './components/all-orders/all-orders.component';
import {OrderAnalyticsComponent} from './components/order-analytics/order-analytics.component';

const routes: Routes = [
  {
    path: '',
    component: MainContentComponent
  },
  {
    path: 'products/all-products',
    component: AllProductsComponent
  },
  {
    path: 'products/all-users',
    component: AllUsersComponent,
  },
  { path: 'products/orders', component: AllOrdersComponent },
  { path: 'products/order-analytics', component: OrderAnalyticsComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
