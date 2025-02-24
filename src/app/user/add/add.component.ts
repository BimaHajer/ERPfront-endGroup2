import { Component } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch, UserService } from '../user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  success: boolean = false;
  erreurMsg: string = '';
  msgAlert: string = '';
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
    this.registerForm = this.formBuilder.group(
      {
        email: ['',[ Validators.required, Validators.email]],
        phone: ['',[Validators.required]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        repassword: ['', [Validators.required, Validators.minLength(4)]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        picture: [],
        address: [],
        zipCode: [, Validators.maxLength(5)],
        active: [true],
      },
      { validator: MustMatch('password', 'repassword') }
    );
  }

  ngOnInit() {}


  close() {
    this.success = false;
  }


  submitAction(top: HTMLElement) {
    if (this.registerForm.valid) {
      this.validateBtnState = ClrLoadingState.LOADING;
      this.userService.addUser(this.registerForm.value).subscribe(
        (data) => {
          this.validateBtnState = ClrLoadingState.SUCCESS;
          this.registerForm.reset({ active: true });
          this.msgAlert =
            "L'ajout d'utilisateur " + data.id +' a été effectué avec succès! ';
        },
        (err) => {
          console.error('Observer got an error: ' + err);
          if (/e-mail existe déjà/.test(err.error.message)) {
            this.erreurMsg = err.error.message;
          } else {
            this.erreurMsg = "L'ajout d'un utilisateur a été échoué ..";
          }
          this.validateBtnState = ClrLoadingState.ERROR;
          this.success = false;
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
}
