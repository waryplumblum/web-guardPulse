import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadComponent: () => import('./pages/home/home.component'),
      pathMatch: 'full',
    },
    {
      path: 'results',
      loadComponent: () => import('./pages/results/results.component'),
    },
    {
      path: 'history',
      loadComponent: () => import('./pages/history/history.component'),
    },
    {
      path: 'login',
      loadComponent: () => import('./pages/login/login.component'),
    },
    {
      path: 'register',
      loadComponent: () => import('./pages/register/register.component'),
    },
    {
      path: 'admin',
      loadComponent: () => import('./pages/admin/admin.component'),
      children: [
        {
          path: 'dashboard',
          loadComponent: () => import('./pages/admin/dashboard/dashboard.component'),
        },
        {
          path: 'users',
          loadComponent: () => import('./pages/admin/users/users.component'),
        },
        {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full',
        },
      ],
    },
    {
      path: '**',
      redirectTo: '', // Redirige cualquier ruta no encontrada al Home
    },
];
