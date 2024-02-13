import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DaysService } from '../shared/days.service';
import { ExpenseItemComponent } from './expense-item/expense-item.component';
import { ExpenseFormComponent } from './expense-item/expense-form/expense-form.component';
import { ExpensesSummaryComponent } from '../expenses-summary/expenses-summary.component';
import { NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WeekdaysComponent } from './weekdays/weekdays.component';

@Component({
  standalone: true,
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
  imports: [
    NgIf,
    WeekdaysComponent,
    ExpenseItemComponent,
    ExpenseFormComponent,
    ExpensesSummaryComponent,
    RouterOutlet,
  ],
})
export class ExpensesComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  selectedDayIndex!: number;

  constructor(private daysService: DaysService) {}

  ngOnInit() {
    this.subscription = this.daysService.dayChanged.subscribe(
      (index: number) => {
        this.selectedDayIndex = index;
      }
    );

    this.selectedDayIndex = this.daysService.getSelectedDayIndex();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
