import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { ProvidersService } from '../providers.service';
import { Alert } from '../../shared/shared.service';

@Component({
  selector: 'app-provider-add',
  templateUrl: './provider-add.component.html',
  styleUrl: './provider-add.component.css'
})
export class ProviderAddComponent {
    validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
    success: boolean = false;
    registerForm: FormGroup;
    alert: Alert = new Alert()
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
            this.alert = { success: true, msgSuccess: "L'ajout de fournisseur " + data.id + " a été effectué avec succès! ", echec: false, open: true };
          },
          (err) => {
            console.error('Observer got an error: ' + err);
            if (/e-mail existe déjà/.test(err.error.message)) {
              this.alert = { success: false, msgEchec: err.error.message, echec: true, open: true }
            } else {
              this.alert = { success: false, msgEchec: "L'ajout d'un fournisseur a été échoué ..", echec: true, open: true }
            }
            this.validateBtnState = ClrLoadingState.ERROR
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
