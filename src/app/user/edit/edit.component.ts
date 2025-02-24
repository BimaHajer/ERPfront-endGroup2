import { SharedService } from './../../shared/shared.service';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { User } from '../user';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../user.service';
import { Alert } from '../../shared/shared.service';
import { UploadImageComponent } from '../../shared/upload-image/upload-image.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  @ViewChild(UploadImageComponent) uploadImageComponent!: UploadImageComponent;
  userId!: number
  user: User = new User()
  registerForm: FormGroup
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT
  loading: boolean = false
  loadingImg: boolean = false
  alert: Alert = new Alert()

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private userService: UserService, private sharedService:SharedService) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      picture: [, [Validators.required]],
      address: [],
      zipCode: [, Validators.maxLength(5)],
      active: [],
      });

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params:ParamMap )=> {
      this.userId = Number(params.get('id'));
      this.getUser()
    });
  }

  getUser() {
    this.userService.getUser(this.userId).subscribe(
      (data:any) => {
        this.user = data
        this.registerForm.patchValue(this.user)
      },
      err => { console.error('Observer got an error: ' + err) },
    )
  }

  closeImg() {
    this.registerForm.patchValue({ picture: null })
    this.loadingImg = false
    this.alert.open = false
  }

  uploadImg(pathUrl: any) {
    this.loadingImg = true
    this.alert.open = false
    let imageData = {
      path: pathUrl,
      folder: 'user',
      customName: this.user.firstName ? this.user.firstName + '-' + this.user.id : 'user-' + this.user.id
    }

    this.sharedService.uploadImgCloudinary(imageData).subscribe(
      (data: any) => {
        this.user.picture = data.path
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

 submitAction(top: HTMLElement) {
  if (this.registerForm.valid) {
    this.validateBtnState = ClrLoadingState.LOADING
    if (this.userId) {
        this.userService.editUser(this.userId, this.registerForm.value).subscribe(
          data => {
            this.user = data
            this.validateBtnState = ClrLoadingState.SUCCESS
            this.alert = { success: true, msgSuccess: "La modification d'utilisateur " + this.user.id + " a été effectuée avec succès !", echec: false, open: true }
          },
          err => {
            console.error('Observer got an error: ' + err)
            if (/e-mail existe déjà/.test(err.error.message)) {
              this.alert = { success: false, msgEchec: err.error.message, echec: true, open: true }
            } else {
              this.alert = { success: false, msgEchec: "La modification de l'utilisateur a été échouée ..", echec: true, open: true }
            }
            this.validateBtnState = ClrLoadingState.ERROR
          },
        )
    }
  }
  this.scroll(top)
}

scroll(el: HTMLElement) {
  el.scrollIntoView({ block: 'start', behavior: 'smooth' });
}

redirectTo() {
  window.history.back()
}
}
