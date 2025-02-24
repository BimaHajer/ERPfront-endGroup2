import { Alert, SharedService } from './../../shared/shared.service';
import { Component, ViewChild } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch, UserService } from '../user.service';
import { UploadImageComponent } from '../../shared/upload-image/upload-image.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  @ViewChild(UploadImageComponent) uploadImageComponent!: UploadImageComponent;
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  registerForm: FormGroup;
  loading: boolean = true
  loadingImg: boolean = false
  alert: Alert = new Alert()

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private sharedService: SharedService
  ) {
    this.registerForm = this.formBuilder.group(
      {
        email: ['',[ Validators.required, Validators.email]],
        phone: ['',[Validators.required]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        repassword: ['', [Validators.required, Validators.minLength(4)]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        picture: [, [Validators.required]],
        address: [],
        zipCode: [, Validators.maxLength(5)],
        active: [true],
      },
      { validator: MustMatch('password', 'repassword') }
    );
  }

  ngOnInit() {}


  submitAction(top: HTMLElement) {
    if (this.registerForm.valid) {
      this.validateBtnState = ClrLoadingState.LOADING;
      this.userService.addUser(this.registerForm.value).subscribe(
        (data) => {
          this.validateBtnState = ClrLoadingState.SUCCESS;
          this.registerForm.reset({ active: true });
          this.alert = { success: true, msgSuccess: "L'ajout d'utilisateur " + data.id + " a été effectué avec succès! ", echec: false, open: true }
        },
        (err) => {
          console.error('Observer got an error: ' + err);
          if (/e-mail existe déjà/.test(err.error.message)) {
            this.alert = { success: false, msgEchec: err.error.message, echec: true, open: true }
          } else {
            this.alert = { success: false, msgEchec: "L'ajout d'un utilisateur a été échoué ..", echec: true, open: true }
          }
          this.validateBtnState = ClrLoadingState.ERROR;
        }
      );
    }
    this.scroll(top);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  redirectTo() {
    window.history.back();
  }


  closeImg(){
    this.registerForm.patchValue({ picture: null })
    this.loadingImg = false
    this.alert.open = false
  }

  uploadImg(pathUrl: any) {
    this.loadingImg = true
    this.alert.open = false
    let imageData = {
      path: pathUrl,
      folder: 'user'
    }

    this.sharedService.uploadImgCloudinary(imageData).subscribe(
      (data: any) => {
        this.registerForm.patchValue({ picture: data.path })
        this.alert = { success: true, msgSuccess: "Le téléchargement de l'image a été effectué avec succès ..", echec: false, open: true }
        this.loadingImg = false
      },
      (err:any) => {
        console.error('Observer got an error: ' + err)
        this.registerForm.patchValue({ picture: null })
        this.uploadImageComponent.srcUrl = ''
        this.alert = { success: false, msgEchec: "Le téléchargement de l'image a été échoué ..", echec: true, open: true }
        this.loadingImg = false
      },
      () => this.loadingImg = false
    )
  }
}
