import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ModelsComponent } from './model/model.component';
import { ModelsAddComponent } from './models-add/models-add.component';
import { ModelsEditComponent } from './models-edit/models-edit.component';
import { ModelsDetailComponent } from './models-detail/models-detail.component';
import { ModelsDeleteComponent } from './models-delete/models-delete.component';

const routes: Routes = [
  { path: '', component: ModelsComponent, canActivate: [AuthGuard] },
  { path: 'add', component: ModelsAddComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: ModelsEditComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: ModelsDetailComponent, canActivate: [AuthGuard] },
  { path: 'delete/:id', component: ModelsDeleteComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelsRoutingModule { }
