import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelsRoutingModule } from './models-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { CdsModule } from '@cds/angular';
import { ModelsAddComponent } from './models-add/models-add.component';
import { ModelsEditComponent } from './models-edit/models-edit.component';
import { ModelsDetailComponent } from './models-detail/models-detail.component';
import { ModelsComponent } from './model/model.component';
import { ModelsDeleteComponent } from './models-delete/models-delete.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ModelsAddComponent,
    ModelsEditComponent,
    ModelsDetailComponent,
    ModelsComponent,
    ModelsDeleteComponent,
  ],
  imports: [
    CommonModule,
    ModelsRoutingModule,
    FormsModule,
    ClarityModule,
    CdsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ModelsModule { }
