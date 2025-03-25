import { Component } from '@angular/core';
import { ClrDatagridSortOrder, ClrDatagridStateInterface } from '@clr/angular';
import { FilterDto } from '../../filter.dto';
import { handleStateFilter, pageSize, pageSizeOptions, SharedService } from '../../shared/shared.service';
import { Payment } from '../payment';
import { PaymentService } from '../payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.css'
})
export class PaymentListComponent {
  payments: any[] = []
  showAlert: boolean = false;
  count: number = 0;
  loading: boolean = true
  state: ClrDatagridStateInterface = {}

  allSelected: Payment[] = [];
  descSort: ClrDatagridSortOrder = ClrDatagridSortOrder.DESC
  idsSelected: any = [];
  filter: FilterDto = new FilterDto()

  pageSize = pageSize
  pageSizeOptions = pageSizeOptions
  currentPayment: number = -1;
  constructor(private PaymentService: PaymentService, private router: Router, private sharedService:SharedService) {}

  refresh(state: ClrDatagridStateInterface) {
        this.loading = true
        this.state = state
        this.filter = Object.assign(this.filter,handleStateFilter(this.state))
        this.getPayment()
  }

  getPayment() {
    this.PaymentService.getPayments(this.filter).subscribe(
      data => {
        this.payments = data[0]
        this.count = data[1]
      },
      err => console.error('Observer got an error: ' + err),
      () => {
        this.loading = false
        }
    )
  }

  close() {
    this.showAlert = false;
    this.allSelected = [];
  }

  save() {
    this.showAlert = false;
    this.allSelected = []
    this.refresh(this.state)
  }

  existInSelected(item: Payment) {
    return this.allSelected.findIndex(elem => elem.id == item.id) >= 0
  }

  selectionChanged() {
    this.allSelected = this.allSelected.reverse()
    .filter((item, index, self) => index === self.findIndex((tab) => (tab.id === item.id)))
    this.idsSelected = this.allSelected.map(elem => elem.id)
  }

  deleteMultipleAction() {
    this.idsSelected = this.allSelected.map(elem => elem.id)
    this.showAlert = true
  }

  editAction() {
    this.router.navigate(['/payments/edit/', this.allSelected[0].id]);
  }
}
