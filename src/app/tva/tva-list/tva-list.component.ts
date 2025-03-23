import { Component } from '@angular/core';
import { ClrDatagridSortOrder, ClrDatagridStateInterface } from '@clr/angular';
import { Tva } from '../tva';
import { FilterDto } from '../../filter.dto';
import { handleStateFilter, pageSize, pageSizeOptions, SharedService } from '../../shared/shared.service';
import { TvaService } from '../tva.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tva-list',
  templateUrl: './tva-list.component.html',
  styleUrl: './tva-list.component.css'
})
export class TvaListComponent {
  tvas: any[] = []
  showAlert: boolean = false;
  count: number = 0;
  loading: boolean = true
  state: ClrDatagridStateInterface = {}

  allSelected: Tva[] = [];
  descSort: ClrDatagridSortOrder = ClrDatagridSortOrder.DESC
  idsSelected: any = [];
  filter: FilterDto = new FilterDto()

  pageSize = pageSize
  pageSizeOptions = pageSizeOptions
  currentTva: number = -1;
  constructor(private TvaService: TvaService, private router: Router, private sharedService:SharedService) {}

  ngOnInit() {
    this.currentTva = +this.sharedService.getCookie('idTva')
  }

  refresh(state: ClrDatagridStateInterface) {
        this.loading = true
        this.state = state
        this.filter = Object.assign(this.filter,handleStateFilter(this.state))
        this.getTva()
  }

  getTva() {
    this.TvaService.getTvas(this.filter).subscribe(
      data => {
        this.tvas = data[0]
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

  existInSelected(item: Tva) {
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
    this.router.navigate(['/tva/edit/', this.allSelected[0].id]);
  }
}
