import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    data: { breadcrumb: { displayLabel: 'Login' } },
    loadChildren: () => import('./features/login').then(m => m.LoginModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
