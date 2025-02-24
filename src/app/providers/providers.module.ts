import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { ProviderAddComponent } from './provider-add/provider-add.component';
import { ProviderDeleteComponent } from './provider-delete/provider-delete.component';
import { ProviderDetailComponent } from './provider-detail/provider-detail.component';
import { ProviderEditComponent } from './provider-edit/provider-edit.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';


@NgModule({
  declarations: [
    ProviderAddComponent,
    ProviderDeleteComponent,
    ProviderDetailComponent,
    ProviderEditComponent,
    ProviderListComponent
  ],
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    FormsModule,
    ClarityModule,
    ReactiveFormsModule
  ]
})
export class ProvidersModule { }

