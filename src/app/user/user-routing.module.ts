import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { UsersComponent } from './users/users.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: '', component: UsersComponent,canActivate: [AuthGuard]},
  { path: 'edit/:id', component: EditComponent,canActivate: [AuthGuard]},
  { path: 'add', component: AddComponent,canActivate: [AuthGuard]},
  { path: 'delete', component: DeleteComponent,canActivate: [AuthGuard]},
  { path: 'detail/:id', component: DetailComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
