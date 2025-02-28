import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { TvaService } from '../tva.service';

@Component({
  selector: 'app-tva-add',
  templateUrl: './tva-add.component.html',
  styleUrl: './tva-add.component.css'
})
export class TvaAddComponent {
    validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
    success: boolean = false;
    erreurMsg: string = '';
    msgAlert: string = '';
    registerForm: FormGroup;
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
  
          this.msgAlert =
            "L'ajout de Tva " + data.value + " a été effectué avec succès! ";
        },
        (err) => {
          console.error('Erreur lors de l\'ajout de Tva:', err);
  
          if (/Tva existe déjà/.test(err.error.message)) {
            this.erreurMsg = err.error.message;
          } else {
            this.erreurMsg = "L'ajout de Tva a échoué.";
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
