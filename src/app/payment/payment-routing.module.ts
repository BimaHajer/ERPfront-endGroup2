import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentEditComponent } from './payment-edit/payment-edit.component';
import { PaymentAddComponent } from './payment-add/payment-add.component';
import { PaymentDeleteComponent } from './payment-delete/payment-delete.component';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';

const routes: Routes = [
  { path: '', component: PaymentListComponent,canActivate: [AuthGuard]},
  { path: 'edit/:id', component: PaymentEditComponent,canActivate: [AuthGuard]},
  { path: 'add', component: PaymentAddComponent,canActivate: [AuthGuard]},
  { path: 'delete', component: PaymentDeleteComponent,canActivate: [AuthGuard]},
  { path: 'detail/:id', component: PaymentDetailComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
