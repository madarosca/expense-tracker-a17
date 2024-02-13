import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BudgetService } from './budget.service';
import { CustomCurrencyPipe } from '../shared/custom-currency.pipe';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
  imports: [NgIf, NgFor, FormsModule, DatePipe, CustomCurrencyPipe],
})
export class BudgetComponent implements OnInit {
  weeklyBudget!: number;
  editBudget: boolean = false;

  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {
    this.weeklyBudget = this.budgetService.getWeeklyBudget();
  }

  onEdit() {
    this.editBudget = true;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const newBudget = form.value.weeklyBudget;
      this.weeklyBudget = newBudget;
      this.budgetService.setWeeklyBudget(newBudget);
    }

    this.editBudget = false;
    form.reset();
  }
}
