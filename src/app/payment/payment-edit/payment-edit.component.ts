import { Component } from '@angular/core';
import { Payment } from '../payment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { Alert } from '../../shared/shared.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment-edit',
  templateUrl: './payment-edit.component.html',
  styleUrl: './payment-edit.component.css'
})
export class PaymentEditComponent {
    paymentId!: number
    payment: Payment = new Payment()
    success: boolean = false
    paymentForm: FormGroup
    validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT
    alert: Alert = new Alert()
  
    constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private PaymentService: PaymentService) {
      this.paymentForm = this.formBuilder.group({
        modePayment: [, [Validators.required]],
        description: [],
        active: [],
        });
  
    }
  
    ngOnInit() {
      this.activatedRoute.paramMap.subscribe((params:ParamMap )=> {
        this.paymentId = Number(params.get('id'));
        this.getPayment()
      });
    }
  
    getPayment() {
      this.PaymentService.getPayment(this.paymentId).subscribe(
        (data:any) => {
          this.payment = data
          this.paymentForm.patchValue(this.payment)
        },
        err => { console.error('Observer got an error: ' + err) },
      )
    }
  
    actionClose() {
      this.success = false
    }
  
    submitAction(top: HTMLElement) {
      if (!this.paymentForm.valid) {
        return;
      }
    
      this.validateBtnState = ClrLoadingState.LOADING;
      
      if (this.paymentId) {
        this.PaymentService.editPayment(this.paymentId, this.paymentForm.value).subscribe(
          (data) => {
            this.payment = data;
            this.success = true;
            this.validateBtnState = ClrLoadingState.SUCCESS;
            this.alert = { success: true, msgSuccess: "La modification de mode paiement " + this.payment.id + " a été effectuée avec succès !", echec: false, open: true }
          },
          (err) => {
            console.error("Observer got an error: " + err);
            this.alert = { success: false, msgEchec: "La modification de mode paiement a été échouée ..", echec: true, open: true }
            this.success = false;
            this.validateBtnState = ClrLoadingState.ERROR;
          }
        );
      }
    
      this.scroll(top);
    }
  
  scroll(el: HTMLElement) {
    el.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
  
  redirectTo() {
    window.history.back()
  }
}
