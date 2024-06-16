import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-order-analytics',
  templateUrl: './order-analytics.component.html',
  styleUrls: ['./order-analytics.component.css']
})
export class OrderAnalyticsComponent implements OnInit, OnDestroy {
  dailyRevenue: number = 0;
  weeklyRevenue: number = 0;
  monthlyRevenue: number = 0;
  subs: Subscription[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.calculateRevenues();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private calculateRevenues(): void {
    const today = dayjs().startOf('day');
    const startOfWeek = today.startOf('week');
    const startOfMonth = today.startOf('month');

    let dailySum = 0;
    let weeklySum = 0;
    let monthlySum = 0;

    const sub = this.orderService.getAllOrders().subscribe(orders => {
      orders.forEach(order => {
        // Добавляем один день к дате заказа
        const orderDate = dayjs(order.order_date).add(1, 'day').startOf('day');

        if (orderDate.isSame(today, 'day')) {
          dailySum += order.total_amount;
        }

        if (orderDate.isSame(startOfWeek, 'week') ) {
          weeklySum += order.total_amount;
        }

        if (orderDate.isSame(startOfMonth, 'month')) {
          monthlySum += order.total_amount;
        }
      });

      this.dailyRevenue = dailySum;
      this.weeklyRevenue = weeklySum;
      this.monthlyRevenue = monthlySum;
    });

    this.subs.push(sub);
  }
}
