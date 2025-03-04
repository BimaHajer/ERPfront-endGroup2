import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ClientsComponent } from './client/client.component';
import { ClientsAddComponent } from './clients-add/clients-add.component';
import { ClientsEditComponent } from './clients-edit/clients-edit.component';
import { ClientsDetailComponent } from './clients-detail/clients-detail.component';
import { ClientsDeleteComponent } from './clients-delete/clients-delete.component';

const routes: Routes = [
  { path: '', component: ClientsComponent, canActivate: [AuthGuard] },
  { path: 'add', component: ClientsAddComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: ClientsEditComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: ClientsDetailComponent, canActivate: [AuthGuard] },
  { path: 'delete/:id', component: ClientsDeleteComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
