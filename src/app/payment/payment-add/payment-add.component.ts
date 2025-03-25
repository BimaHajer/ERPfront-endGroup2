import { Component } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { Alert } from '../../shared/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment-add',
  templateUrl: './payment-add.component.html',
  styleUrl: './payment-add.component.css'
})
export class PaymentAddComponent {
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  success: boolean = false;
  alert: Alert = new Alert()
  paymentForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private PaymentService: PaymentService,
  ) {
  this.paymentForm = this.formBuilder.group(
    {
      modePayment: [, [Validators.required]],
      description: [],
      active: [true],
    }
  );
}
    
close() {
  this.success = false;
}
    
    
submitAction(top: HTMLElement) {
  if (this.paymentForm.valid) {
    this.validateBtnState = ClrLoadingState.LOADING;
    
    this.PaymentService.addPayment(this.paymentForm.value).subscribe(
      (data) => {
        this.validateBtnState = ClrLoadingState.SUCCESS;
        this.paymentForm.reset({ active: true });
        this.alert = { success: true, msgSuccess: "L'ajout de mode paiement " + data.id + " a été effectué avec succès! ", echec: false, open: true };
      },
      (err) => {
        console.error('Erreur lors de l\'ajout de mode paiement :', err);

        if (/mode paiement existe déjà/.test(err.error.message)) {
          this.alert = { success: false, msgEchec: err.error.message, echec: true, open: true }
        } else {
          this.alert = { success: false, msgEchec: "L'ajout de mode paiement a été échoué ..", echec: true, open: true }
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
