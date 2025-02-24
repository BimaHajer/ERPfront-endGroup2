import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ClarityModule } from '@clr/angular';
import { CdsModule } from '@cds/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    ClarityModule,
    CdsModule,
    RouterModule

  ],
  exports: [
    HeaderComponent,
    SideNavComponent
  ]
})
export class CoreModule { }
