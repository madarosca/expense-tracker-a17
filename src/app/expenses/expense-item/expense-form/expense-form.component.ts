import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ExpensesService } from '../../expenses.service';
import { Expense } from '../../expense.model';
import { categories } from '../../../shared/constants';
import { FormsModule, NgForm } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css'],
  imports: [NgFor, NgIf, NgClass, FormsModule],
})
export class ExpenseFormComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  categories: string[] = categories;
  totalExpenses: number = 0;
  newExpenses: Expense[] = [];
  addedCount: number = 0;
  selectedExpense!: Expense;
  @Input() expenseIsEditing: string;
  @Output() edit = new EventEmitter<void>();

  constructor(private expensesService: ExpensesService) {}

  ngOnInit() {
    this.subscription = this.expensesService.expensesChanged.subscribe(() => {
      this.totalExpenses = this.expensesService.getTotalExpenses();
    });
    this.totalExpenses = this.expensesService.getTotalExpenses();
    this.selectedExpense = this.expensesService.getExpense();
    this.selectedExpense && this.newExpenses.push(this.selectedExpense);
  }

  onAddExpense() {
    this.addedCount++;
    this.newExpenses.push({
      id: this.addedCount.toString(),
      category: '',
      amount: 0,
    });
  }

  onCancelExpense(index: number) {
    if (this.expenseIsEditing) {
      this.edit.emit();
      this.expenseIsEditing = null;
    }

    this.newExpenses.splice(index, 1);
    this.addedCount--;
  }

  onSubmit(form: NgForm, index: number) {
    if (form.valid) {
      const category = form.value.category;
      const amount = form.value.amount;

      if (this.expenseIsEditing) {
        const id = this.selectedExpense.id;

        this.expensesService.editExpense({
          id,
          category,
          amount,
        });
      } else {
        this.expensesService.addExpense({ category, amount });
      }

      this.onCancelExpense(index);
      form.reset();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
