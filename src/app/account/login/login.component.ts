import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClrLoadingState } from '@clr/angular';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  registerForm: FormGroup;
  submitted = false;
  erreurMsg: string = ''
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  loginAction() {
    if (this.registerForm.valid) {

      this.accountService.login(this.registerForm.value).subscribe({
        next: (data: any) => {
          document.cookie = `idUser=${data.idUser}; Max-Age=${data.expiresIn}; path=/`;
          document.cookie = `token=${data.access_token}; Max-Age=${data.expiresIn}; path=/`;
          document.cookie = `firstName=${data.firstName}; Max-Age=${data.expiresIn}; path=/`;
          document.cookie = `lastName=${data.lastName}; Max-Age=${data.expiresIn}; path=/`;

          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => {
          if (/Email et\/ou mot de passe sont incorrects/.test(err.error.message)) {
            this.erreurMsg = err.error.message;
          } else {
            this.erreurMsg = "Échec de la connexion ..";
          }
          console.error(err);
          this.submitted = true;
        },
      });

    }
  }
}
