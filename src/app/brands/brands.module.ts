import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing.module';
import { BrandAddComponent } from './brands-add/brands-add.component';
import { BrandDeleteComponent } from './brands-delete/brands-delete.component';
import { BrandsDetailComponent } from './brands-detail/brands-detail.component';
import { BrandEditComponent } from './brands-edit/brands-edit.component';
import { BrandsComponent } from './brand/brand.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    BrandAddComponent,
    BrandDeleteComponent,
    BrandsDetailComponent,
    BrandEditComponent,
    BrandsComponent,
  ],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    ClarityModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
]
})
export class BrandsModule { }
