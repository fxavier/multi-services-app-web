import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'categorias',
    loadComponent: () => import('./features/categories/categories.component').then(m => m.CategoriesComponent)
  },
  {
    path: 'categoria/:slug',
    loadComponent: () => import('./features/category-detail/category-detail.component').then(m => m.CategoryDetailComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];