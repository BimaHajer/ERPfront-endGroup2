import { SharedService } from './../../shared/shared.service';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { Brand } from '../brands';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BrandsService } from '../brands.service';
import { Alert } from '../../shared/shared.service';
import { UploadImageComponent } from '../../shared/upload-image/upload-image.component';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brands-edit.component.html',
  styleUrls: ['./brands-edit.component.css']
})
export class BrandEditComponent {
  @ViewChild(UploadImageComponent) uploadImageComponent!: UploadImageComponent;
  brandId!: number;
  brand: Brand = new Brand();
  registerForm: FormGroup;
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  loading: boolean = false;
  loadingImg: boolean = false;
  alert: Alert = new Alert();

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private brandService: BrandsService,
    private sharedService: SharedService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      picture: [, [Validators.required]],
      active: [false]
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.brandId = Number(params.get('id'));
      this.getBrand();
    });
  }

  getBrand() {
    this.brandService.getBrand(this.brandId).subscribe(
      (data) => {
        this.brand = data;
        this.registerForm.patchValue({
          name: data.name,
          description: data.description,
          picture: data.picture,
          active: data.active
        });
      },
      (err) => {
        console.error('Erreur:', err);
      }
    );
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
      folder: 'brand',
      customName: this.brand.name ? this.brand.name + '-' + this.brand.id : 'brand-' + this.brand.id
    };

    this.sharedService.uploadImgCloudinary(imageData).subscribe(
      (data: any) => {
        this.brand.picture = data.path;
        this.registerForm.patchValue({ picture: data.path });
        this.registerForm.get('picture')?.markAsTouched();
        this.alert = { success: true, msgSuccess: "Le téléchargement du logo a été effectué avec succès.", echec: false, open: true };
        this.loadingImg = false;
      },
      (err: any) => {
        console.error('Observer got an error: ' + err);
        this.registerForm.patchValue({ picture: null });
        this.uploadImageComponent.srcUrl = '';
        this.alert = { success: false, msgEchec: "Le téléchargement du logo a échoué.", echec: true, open: true };
        this.loadingImg = false;
      },
      () => (this.loadingImg = false)
    );
  }

  submitAction(top: HTMLElement) {
    if (this.registerForm.valid) {
      this.validateBtnState = ClrLoadingState.LOADING;
      if (this.brandId) {
        this.brandService.editBrand(this.brandId, this.registerForm.value).subscribe(
          (data) => {
            this.brand = data;
            this.validateBtnState = ClrLoadingState.SUCCESS;
            this.alert = { success: true, msgSuccess: "La modification de la marque " + this.brand.id + " a été effectuée avec succès.", echec: false, open: true };
          },
          (err) => {
            console.error('Observer got an error: ' + err);
            this.alert = { success: false, msgEchec: "La modification de la marque a échoué.", echec: true, open: true };
            this.validateBtnState = ClrLoadingState.ERROR;
          }
        );
      }
    }
    this.scroll(top);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  redirectTo() {
    window.history.back();
  }
}
