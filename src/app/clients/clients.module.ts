import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { CdsModule } from '@cds/angular';
import { ClientsAddComponent } from './clients-add/clients-add.component';
import { ClientsEditComponent } from './clients-edit/clients-edit.component';
import { ClientsDetailComponent } from './clients-detail/clients-detail.component';
import { ClientsComponent } from './client/client.component'; 
import { ClientsDeleteComponent } from './clients-delete/clients-delete.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ClientsAddComponent, // Declare all components
    ClientsEditComponent,
    ClientsDetailComponent,
    ClientsComponent,
    ClientsDeleteComponent,
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    FormsModule,
    ClarityModule,
    CdsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ClientsModule { }
