import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'users',canActivate: [AuthGuard],
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'clients', canActivate: [AuthGuard],
    loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)
  },
  {
    path: 'providers',
    canActivate: [AuthGuard],
    loadChildren: () => import('./providers/providers.module').then(m => m.ProvidersModule)
  },
  {
    path: 'categories',canActivate: [AuthGuard],
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
  },
  {
    path: 'tva',canActivate: [AuthGuard],
    loadChildren: () => import('./tva/tva.module').then(m => m.TvaModule)
  },
  {
    path: 'brands', canActivate: [AuthGuard],
    loadChildren: () => import('./brands/brands.module').then(m => m.BrandsModule)
  },
  {
    path: 'models', canActivate: [AuthGuard],
    loadChildren: () => import('./models/models.module').then(m => m.ModelsModule)
  },
  {
    path: 'products', canActivate: [AuthGuard],
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


