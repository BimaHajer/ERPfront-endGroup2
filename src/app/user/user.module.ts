import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdsModule } from '@cds/angular';
import { ClarityModule } from '@clr/angular';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';
import { UsersComponent } from './users/users.component';
import { DeleteComponent } from './delete/delete.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    DetailComponent,
    UsersComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ClarityModule,
    CdsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UserModule { }
