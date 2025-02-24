import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
   LoginComponent
],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
