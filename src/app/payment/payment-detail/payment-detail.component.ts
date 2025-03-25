import { Component } from '@angular/core';
import { Payment } from '../payment';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PaymentService } from '../payment.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrl: './payment-detail.component.css'
})
export class PaymentDetailComponent {
    payment = new Payment

    showAlert: boolean = false;
    paymentId: number = -1;
    currentPayment: number = -1
    constructor(private activatedRoute: ActivatedRoute, private router: Router, private PaymentService: PaymentService, private sharedService: SharedService) { }

    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
        this.paymentId = Number(params.get('id'))
        this.getPayment()

      })
    }

    getPayment() {
      this.PaymentService.getPayment(this.paymentId ).subscribe(
        (data:any) => {
          this.payment = data
        },
        err => { console.error('Observer got an error: ' + err) },
      )
    }

    deleteAction() {
      this.showAlert = true;
    }

    close() {
      this.showAlert = false;
    }

    save() {
      this.router.navigate(['../../payments']);
      this.showAlert = false;
    }

    redirectTo() {
     window.history.back();
    }
}
