import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilterDto } from '../filter.dto';
import { Payment } from './payment';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }
  getPayments(filter: FilterDto<Payment>): Observable<[Payment[], number]> {
    return this.http.get(environment.api + '/payments?filter=' + JSON.stringify(filter)) as Observable<[Payment[], number]>;
  }
    
  addPayment(Payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(environment.api + '/payments', Payment);
  }
    
  editPayment(ID: number, paymentObject: Payment): Observable<Payment> {
    return this.http.patch<Payment>(environment.api + '/payments/' + JSON.stringify(ID), paymentObject);
  }
    
  getPayment(ID: number): Observable<Payment> {
    return this.http.get(environment.api + '/payments/' + JSON.stringify(ID)) as Observable<Payment>;
  }
    
  deletePayment(ID: number): Observable<Payment> {
    return this.http.delete(environment.api + '/payments/' + JSON.stringify(ID));
  }
    
  deleteMultiple(toDelete: number[], toDisable: number[]): Observable<any> {
    return this.http.post<Payment>(environment.api + '/payments/deleteMultiplepayments', [toDelete, toDisable]);
  }
}
