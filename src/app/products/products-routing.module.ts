import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: ProductListComponent,canActivate: [AuthGuard]},
  { path: 'edit/:id', component: ProductEditComponent,canActivate: [AuthGuard]},
  { path: 'add', component: ProductAddComponent,canActivate: [AuthGuard]},
  { path: 'delete', component: ProductDeleteComponent,canActivate: [AuthGuard]},
  { path: 'detail/:id', component: ProductDetailComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
