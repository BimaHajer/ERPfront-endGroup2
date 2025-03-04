import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { BrandsDetailComponent } from './brands-detail/brands-detail.component';
import { BrandsComponent } from './brand/brand.component';
import { BrandEditComponent } from './brands-edit/brands-edit.component';
import { BrandAddComponent } from './brands-add/brands-add.component';
import { BrandDeleteComponent } from './brands-delete/brands-delete.component';

const routes: Routes = [
  { path: '', component: BrandsComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: BrandEditComponent, canActivate: [AuthGuard] },
  { path: 'add', component: BrandAddComponent, canActivate: [AuthGuard] },
  { path: 'delete', component: BrandDeleteComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: BrandsDetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }
