import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./budget/budget.component').then((mod) => mod.BudgetComponent),
  },
  {
    path: 'expenses',
    loadComponent: () =>
      import('./expenses/expenses.component').then(
        (mod) => mod.ExpensesComponent
      ),
  },
  {
    path: 'summary',
    loadComponent: () =>
      import('./expenses-summary/expenses-summary.component').then(
        (mod) => mod.ExpensesSummaryComponent
      ),
  },
  {
    path: 'history',
    loadComponent: () =>
      import('./history/history.component').then((mod) => mod.HistoryComponent),
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/auth.component').then((mod) => mod.AuthComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
