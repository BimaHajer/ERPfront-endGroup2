import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvaRoutingModule } from './tva-routing.module';
import { TvaAddComponent } from './tva-add/tva-add.component';
import { TvaDeleteComponent } from './tva-delete/tva-delete.component';
import { TvaDetailComponent } from './tva-detail/tva-detail.component';
import { TvaEditComponent } from './tva-edit/tva-edit.component';
import { TvaListComponent } from './tva-list/tva-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    TvaAddComponent,
    TvaDeleteComponent,
    TvaDetailComponent,
    TvaEditComponent,
    TvaListComponent
  ],
  imports: [
    CommonModule,
    TvaRoutingModule,
    FormsModule,
    ClarityModule,
    ReactiveFormsModule,
    SharedModule
]
})
export class TvaModule { }
