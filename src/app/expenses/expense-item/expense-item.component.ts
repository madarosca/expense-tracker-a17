import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { ExpensesService } from '../expenses.service';
import { Expense } from '../expense.model';
import { ExpenseFormComponent } from './expense-form/expense-form.component';

@Component({
  standalone: true,
  selector: 'app-expense-item',
  templateUrl: './expense-item.component.html',
  styleUrls: ['./expense-item.component.css'],
  imports: [NgIf, NgFor, ExpenseFormComponent],
})
export class ExpenseItemComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  expenses: Expense[] = [];
  totalExpenses: number = 0;
  @Output() expenseIsEditing: string;

  constructor(private expensesService: ExpensesService) {}

  ngOnInit() {
    this.subscription = this.expensesService.expensesChanged.subscribe(
      (expenses: Expense[]) => {
        this.expenses = expenses;
        this.totalExpenses = this.expensesService.getTotalExpenses();
      }
    );
    this.expenses = this.expensesService.getExpensesByDay();
    this.totalExpenses = this.expensesService.getTotalExpenses();
  }

  onEditExpense(id: string) {
    this.expenseIsEditing = this.expenseIsEditing
      ? this.expenseIsEditing === id
        ? null
        : id
      : id;
    this.expensesService.setExpense(id);
  }

  onDeleteExpense(index: number) {
    this.expensesService.deleteExpense(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
