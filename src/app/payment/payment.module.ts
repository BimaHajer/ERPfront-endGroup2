import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentAddComponent } from './payment-add/payment-add.component';
import { PaymentDeleteComponent } from './payment-delete/payment-delete.component';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';
import { PaymentEditComponent } from './payment-edit/payment-edit.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PaymentAddComponent,
    PaymentDeleteComponent,
    PaymentDetailComponent,
    PaymentEditComponent,
    PaymentListComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    FormsModule,
    ClarityModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PaymentModule { }
