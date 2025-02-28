import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { ProvidersService } from '../providers.service';

@Component({
  selector: 'app-provider-add',
  templateUrl: './provider-add.component.html',
  styleUrl: './provider-add.component.css'
})
export class ProviderAddComponent {
    validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
    success: boolean = false;
    erreurMsg: string = '';
    msgAlert: string = '';
    registerForm: FormGroup;
    constructor(
      private formBuilder: FormBuilder,
      private providerService: ProvidersService,
    ) {
      this.registerForm = this.formBuilder.group(
        {
          email: ['',[ Validators.required, Validators.email]],
          phone: ['',[Validators.required]],
          firstName: ['', [Validators.required]],
          lastName: ['', [Validators.required]],
          address: [],
          zipCode: [, Validators.maxLength(5)],
          active: [true],
        }
      );
    }
  
    ngOnInit() {}
  
  
    close() {
      this.success = false;
    }
  
  
    submitAction(top: HTMLElement) {
      if (this.registerForm.valid) {
        this.validateBtnState = ClrLoadingState.LOADING;
        this.providerService.addProviders(this.registerForm.value).subscribe(
          (data) => {
            this.validateBtnState = ClrLoadingState.SUCCESS;
            this.registerForm.reset({ active: true });
            this.msgAlert =
              "L'ajout de provider " + data.id +' a été effectué avec succès! ';
          },
          (err) => {
            console.error('Observer got an error: ' + err);
            if (/e-mail existe déjà/.test(err.error.message)) {
              this.erreurMsg = err.error.message;
            } else {
              this.erreurMsg = "L'ajout d'un provider a été échoué ..";
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
