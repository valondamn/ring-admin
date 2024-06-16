import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MainContentComponent} from './components/main-content/main-content.component';
import {AllProductsComponent} from './components/all-products/all-products.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { OrderAnalyticsComponent } from './components/order-analytics/order-analytics.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MainContentComponent,
    AllProductsComponent,
    AllUsersComponent,
    AllOrdersComponent,
    OrderAnalyticsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
