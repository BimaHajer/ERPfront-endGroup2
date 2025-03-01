import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { TvaService } from '../tva.service';
import { Alert } from '../../shared/shared.service';

@Component({
  selector: 'app-tva-add',
  templateUrl: './tva-add.component.html',
  styleUrl: './tva-add.component.css'
})
export class TvaAddComponent {
    validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
    success: boolean = false;
    registerForm: FormGroup;
    alert: Alert = new Alert()
    constructor(
      private formBuilder: FormBuilder,
      private TvaService: TvaService,
    ) {
    this.registerForm = this.formBuilder.group(
      {
        value: ['', [Validators.required]],
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
      
      this.TvaService.addTva(this.registerForm.value).subscribe(
        (data) => {
          this.validateBtnState = ClrLoadingState.SUCCESS;
          this.registerForm.reset({ active: true });
          this.alert = { success: true, msgSuccess: "L'ajout de Tva " + data.id + " a été effectué avec succès! ", echec: false, open: true };
        },
        (err) => {
          console.error('Erreur lors de l\'ajout de Tva:', err);
  
          if (/Tva existe déjà/.test(err.error.message)) {
            this.alert = { success: false, msgEchec: err.error.message, echec: true, open: true }
          } else {
            this.alert = { success: false, msgEchec: "L'ajout de Tva a été échoué ..", echec: true, open: true }
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
