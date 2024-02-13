import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthLayoutComponent } from './layout/auth-layout.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './layout/home/home.component';
import { BudgetComponent } from './budget/budget.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpensesSummaryComponent } from './expenses-summary/expenses-summary.component';
import { HistoryComponent } from './history/history.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: BudgetComponent,
      },
      {
        path: 'expenses',
        component: ExpensesComponent,
      },
      {
        path: 'summary',
        component: ExpensesSummaryComponent,
      },
      {
        path: 'history',
        component: HistoryComponent,
      },
    ],
  },
  // {
  //   path: 'home',
  //   canActivate: [AuthGuard],
  //   loadComponent: () =>
  //     import('./budget/budget.component').then((mod) => mod.BudgetComponent),
  // },
  // {
  //   path: 'expenses',
  //   canActivate: [AuthGuard],
  //   loadComponent: () =>
  //     import('./expenses/expenses.component').then(
  //       (mod) => mod.ExpensesComponent
  //     ),
  // },
  // {
  //   path: 'summary',
  //   canActivate: [AuthGuard],
  //   loadComponent: () =>
  //     import('./expenses-summary/expenses-summary.component').then(
  //       (mod) => mod.ExpensesSummaryComponent
  //     ),
  // },
  // {
  //   path: 'history',
  //   canActivate: [AuthGuard],
  //   loadComponent: () =>
  //     import('./history/history.component').then((mod) => mod.HistoryComponent),
  // },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'auth',
        component: AuthComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '' },
];
