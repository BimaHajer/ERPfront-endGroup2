import { Component } from '@angular/core';
import { ClrDatagridSortOrder, ClrDatagridStateInterface } from '@clr/angular';
import { provider } from '../providers';
import { FilterDto } from '../../filter.dto';
import { handleStateFilter, pageSize, pageSizeOptions, SharedService } from '../../shared/shared.service';
import { ProvidersService } from '../providers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrl: './provider-list.component.css'
})
export class ProviderListComponent {
    providers: any[] = []
    showAlert: boolean = false;
    count: number = 0;
    loading: boolean = true
    state: ClrDatagridStateInterface = {}

    allSelected: provider[] = [];
    descSort: ClrDatagridSortOrder = ClrDatagridSortOrder.DESC
    idsSelected: any = [];
    filter: FilterDto = new FilterDto()

    pageSize = pageSize
    pageSizeOptions = pageSizeOptions
    currentProvider: number = -1;
    constructor(private providerService: ProvidersService, private router: Router, private sharedService:SharedService) {}

    ngOnInit() {
      this.currentProvider = +this.sharedService.getCookie('idProvider')
    }

    refresh(state: ClrDatagridStateInterface) {
        this.loading = true
        this.state = state
        this.filter = Object.assign(this.filter,handleStateFilter(this.state))
        this.getProviders()
    }

    getProviders() {
      this.providerService.getProviders(this.filter).subscribe(
        data => {
          this.providers = data[0]
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

    existInSelected(item: provider) {
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
      this.router.navigate(['/providers/edit/', this.allSelected[0].id]);
    }

}
