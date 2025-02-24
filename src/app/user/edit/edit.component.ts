import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { User } from '../user';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  userId!: number
  user: User = new User()
  success: boolean = false
  erreurMsg: string = ''
  registerForm: FormGroup
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT
  msgAlert: string = ''

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private userService: UserService) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      picture: [],
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

  actionClose() {
    this.success = false
  }

 submitAction(top: HTMLElement) {
  if (this.registerForm.valid) {
    this.validateBtnState = ClrLoadingState.LOADING
    if (this.userId) {
        this.userService.editUser(this.userId, this.registerForm.value).subscribe(
          data => {
            this.user = data
            this.success = true
            this.validateBtnState = ClrLoadingState.SUCCESS
            this.msgAlert = "La modification d'utilisateur " + this.user.id + " a été effectuée avec succès !"
          },
          err => {
            console.error('Observer got an error: ' + err)
            if (/e-mail existe déjà/.test(err.error.message)) {
              this.erreurMsg = err.error.message
            } else {
              this.erreurMsg = " La modification de l'utilisateur a été échouée .. "
            }
            this.success = false
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
