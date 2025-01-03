import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('./features/users/users.component')
      .then(m => m.UsersComponent)
  },
  // {
  //   path: 'products',
  //   loadComponent: () => import('./features/products/products.component')
  //     .then(m => m.ProductsComponent)
  // },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
