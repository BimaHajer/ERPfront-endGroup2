import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryDeleteComponent } from './category-delete/category-delete.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    CategoryAddComponent,
    CategoryDeleteComponent,
    CategoryDetailComponent,
    CategoryEditComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    ClarityModule,
    ReactiveFormsModule,
    SharedModule
]
})
export class CategoriesModule { }
