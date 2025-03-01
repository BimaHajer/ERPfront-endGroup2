import { Component } from '@angular/core';
import { provider } from '../providers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProvidersService } from '../providers.service';
import { Alert } from '../../shared/shared.service';

@Component({
  selector: 'app-provider-edit',
  templateUrl: './provider-edit.component.html',
  styleUrl: './provider-edit.component.css'
})
export class ProviderEditComponent {
    providerId!: number
    provider: provider = new provider()
    success: boolean = false
    registerForm: FormGroup
    validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT
    alert: Alert = new Alert()
  
    constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private providerService: ProvidersService) {
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
        this.providerId = Number(params.get('id'));
        this.getProvider()
      });
    }
  
    getProvider() {
      this.providerService.getProvider(this.providerId).subscribe(
        (data:any) => {
          this.provider = data
          this.registerForm.patchValue(this.provider)
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
      if (this.providerId) {
          this.providerService.editProvider(this.providerId, this.registerForm.value).subscribe(
            data => {
              this.provider = data
              this.success = true
              this.validateBtnState = ClrLoadingState.SUCCESS
              this.alert = { success: true, msgSuccess: "La modification de fournisseur " + this.provider.id + " a été effectuée avec succès !", echec: false, open: true }
            },
            err => {
              console.error('Observer got an error: ' + err)
              if (/e-mail existe déjà/.test(err.error.message)) {
                this.alert = { success: false, msgEchec: err.error.message, echec: true, open: true }
              } else {
                this.alert = { success: false, msgEchec: "La modification de fournisseur a été échouée ..", echec: true, open: true }
              }
              this.validateBtnState = ClrLoadingState.ERROR;
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
