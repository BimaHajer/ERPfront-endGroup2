import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alert, SharedService } from '../shared.service';
import { ClrLoadingState } from '@clr/angular';

@Component({
  selector: 'app-upload-multiple-image',
  templateUrl: './upload-multiple-image.component.html',
  styleUrl: './upload-multiple-image.component.css'
})
export class UploadMultipleImageComponent {
  @Input() openModalMultipleImage: boolean = false
  @Input() folder : string = ''
  @Input() productId : number = 0

  @Output() closed = new EventEmitter<boolean>()
  @Output() saved = new EventEmitter<boolean>()
  alert: Alert = new Alert();
  imageForm: FormGroup;
  addNewFile: boolean = false;
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  infosImages: any[] = [{path: '', label: ''}]

  constructor(private formBuilder: FormBuilder, private sharedService: SharedService) {
    this.imageForm = this.formBuilder.group({
      images: this.formBuilder.array([null], [Validators.required]),
    });
  }

  get images(): FormArray {
    return this.imageForm.get('images') as FormArray;
  }

  picked(event: any, index?: number) {
    this.validateBtnState = ClrLoadingState.SUCCESS;
    this.addNewFile = false;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.handleInputChange(file, index);
      event.target.value = '';
    } else {
      this.alert = {
        success: false,
        msgEchec: 'Aucune image sélectionnée !',
        echec: true,
        open: true,
      };
    }
  }

  handleInputChange(file: File, index?: number) {
    const reader = new FileReader();
    const pattern = /image-*/;

    if (!file.type.match(pattern)) {
      this.alert = {
        success: true,
        msgSuccess: "Format d'image invalide !",
        echec: false,
        open: true,
      };
      return;
    }
    reader.onload = (e) => {
      this._handleReaderLoaded(e,file.name, index);
    };
    reader.readAsDataURL(file);
  }

  async _handleReaderLoaded(e: any,originalName :string, index?: any) {
    const imagePath = e.target.result;
    this.images.at(index).setValue(imagePath);
    this.infosImages[index]['path'] = imagePath;
    this.infosImages[index]['label'] = originalName;

  }

  ajoutNewFile() {
    this.addNewFile = true;
    this.infosImages.push({
      path: '',
      label: `Image ${this.images.length +1}`,
    })
    this.images.push(this.formBuilder.control(null));
  }
  async deletePicAction(index: number) {
    this.images.removeAt(index);
    this.infosImages.splice(index, 1)
  }

  submit() {
    this.validateBtnState = ClrLoadingState.LOADING;
    this.infosImages = this.infosImages.filter(item => item.path)
    let data = {
      infosImages: this.infosImages,
      folder: this.folder,
      productId: this.productId
    };
    this.sharedService.uploadMultipleImage(data).subscribe(
      (data:any) => {
        this.validateBtnState = ClrLoadingState.SUCCESS;
        this.alert = {
          success: true,
          msgSuccess: "L'ajout des images a été effectué avec succès ..",
          echec: false,
          open: true,
        };
        this.saved.emit(true)
      },
      (err:any) => {
        console.error('Observer got an error: ' + err);
        this.validateBtnState = ClrLoadingState.DEFAULT;
        this.alert = {
          success: false,
          msgEchec: "L'ajout des images a été échoué ..",
          echec: true,
          open: true,
        };
      }
    );
  }

  close (){
    this.images.clear();
    this.openModalMultipleImage = false
    this.alert.open = false
    this.infosImages = [];
    this.closed.emit(true)
  }
  isButtonDisabled() {
    return this.images.controls?.every(control => {
      const path = control.value
      return (path?.trim() == '' || !path )
    });
  }
}

