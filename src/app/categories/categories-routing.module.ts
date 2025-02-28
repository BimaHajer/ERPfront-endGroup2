import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { AuthGuard } from '../auth/auth.guard';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryDeleteComponent } from './category-delete/category-delete.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

const routes: Routes = [
  { path: '', component: CategoryListComponent,canActivate: [AuthGuard]},
  { path: 'edit/:id', component: CategoryEditComponent,canActivate: [AuthGuard]},
  { path: 'add', component: CategoryAddComponent,canActivate: [AuthGuard]},
  { path: 'delete', component: CategoryDeleteComponent,canActivate: [AuthGuard]},
  { path: 'detail/:id', component: CategoryDetailComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
