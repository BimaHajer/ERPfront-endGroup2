import { Component, ViewChild } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandsService } from '../brands.service';
import { Alert, SharedService } from '../../shared/shared.service';
import { UploadImageComponent } from '../../shared/upload-image/upload-image.component';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brands-add.component.html',
  styleUrls: ['./brands-add.component.css']
})
export class BrandAddComponent {
  @ViewChild(UploadImageComponent) uploadImageComponent!: UploadImageComponent;
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  registerForm: FormGroup;
  loadingImg: boolean = false;
  loading: boolean = false;
  alert: Alert = new Alert();
  brands: any[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandsService,
    private sharedService: SharedService
  ) {
    this.registerForm = this.formBuilder.group({
      name: [, [Validators.required]],
      picture: [, [Validators.required]],
      description: [],
      active: [true, [Validators.required]],
      brandId: []
    });
  }

  ngOnInit() {
    this.registerForm.statusChanges.subscribe();
    this.getBrands({ take: 15, where: { active: true } });
  }

  redirectTo() {
    window.history.back();
  }

  getBrands(filter: any) {
    filter.select = ['id', 'name'];
    this.brandService.getBrands(filter).subscribe(
      data => {
        this.brands = data[0];
      },
      () => this.loading = false
    );
  }

  submitAction(top: HTMLElement) {
    if (this.registerForm.invalid) {
      return;
    }

    const formData = { ...this.registerForm.value };
    delete formData.brandId;

    this.validateBtnState = ClrLoadingState.LOADING;
    this.brandService.addBrand(formData).subscribe(
      (data) => {
        this.validateBtnState = ClrLoadingState.SUCCESS;
        this.registerForm.reset({ active: true });
        this.alert = { success: true, msgSuccess: "L'ajout de marque " + data.id + " a été effectué avec succès! ", echec: false, open: true };
      },
      () => {
        this.alert = { success: false, msgEchec: "L'ajout a échoué.", echec: true, open: true };
        this.validateBtnState = ClrLoadingState.ERROR;
      }
    );
    this.scroll(top);
  }

  scroll(top: HTMLElement) {
    top.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  closeImg() {
    this.registerForm.patchValue({ picture: null });
    this.loadingImg = false;
    this.alert.open = false;
  }

  uploadImg(pathUrl: any) {
    this.loadingImg = true;
    this.alert.open = false;
    let imageData = {
      path: pathUrl,
      folder: 'brand'
    };

    this.sharedService.uploadImgCloudinary(imageData).subscribe(
      (data: any) => {
        this.registerForm.patchValue({ picture: data.path });
        this.alert = { success: true, msgSuccess: "Image téléchargée avec succès.", echec: false, open: true };
        this.loadingImg = false;
      },
      () => {
        this.registerForm.patchValue({ picture: null });
        this.uploadImageComponent.srcUrl = '';
        this.alert = { success: false, msgEchec: "Échec du téléchargement de l'image.", echec: true, open: true };
        this.loadingImg = false;
      },
      () => {
        this.loadingImg = false;
      }
    );
  }
}
