import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdsModule } from '@cds/angular';
import { AlertComponent } from './alert/alert.component';
import { UploadMultipleImageComponent } from './upload-multiple-image/upload-multiple-image.component';



@NgModule({
  declarations: [
    UploadImageComponent,
    AlertComponent,
    UploadMultipleImageComponent
  ],
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    CdsModule
  ],
  exports: [
    AlertComponent,
    UploadImageComponent,
    UploadMultipleImageComponent
  ]
})
export class SharedModule { }
