import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { ProviderAddComponent } from './provider-add/provider-add.component';
import { ProviderEditComponent } from './provider-edit/provider-edit.component';
import { ProviderDeleteComponent } from './provider-delete/provider-delete.component';
import { ProviderDetailComponent } from './provider-detail/provider-detail.component';

const routes: Routes = [
  { path: '', component: ProviderListComponent,canActivate: [AuthGuard]},
  { path: 'edit/:id', component: ProviderEditComponent,canActivate: [AuthGuard]},
  { path: 'add', component: ProviderAddComponent,canActivate: [AuthGuard]},
  { path: 'delete', component: ProviderDeleteComponent,canActivate: [AuthGuard]},
  { path: 'detail/:id', component: ProviderDetailComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvidersRoutingModule { }
