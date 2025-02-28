import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TvaEditComponent } from './tva-edit/tva-edit.component';
import { TvaListComponent } from './tva-list/tva-list.component';
import { TvaAddComponent } from './tva-add/tva-add.component';
import { TvaDeleteComponent } from './tva-delete/tva-delete.component';
import { TvaDetailComponent } from './tva-detail/tva-detail.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: TvaListComponent,canActivate: [AuthGuard]},
  { path: 'edit/:id', component: TvaEditComponent,canActivate: [AuthGuard]},
  { path: 'add', component: TvaAddComponent,canActivate: [AuthGuard]},
  { path: 'delete', component: TvaDeleteComponent,canActivate: [AuthGuard]},
  { path: 'detail/:id', component: TvaDetailComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TvaRoutingModule { }
