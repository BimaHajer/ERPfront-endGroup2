import { Component, OnInit } from '@angular/core';
import { Brand } from '../brands';
import { BrandsService } from '../brands.service';
import { Router } from '@angular/router';
import { ClrDatagridStateInterface, ClrDatagridSortOrder } from '@clr/angular';
import { handleStateFilter, pageSize, pageSizeOptions, SharedService } from '../../shared/shared.service';
import { FilterDto } from '../../filter.dto';

@Component({
  selector: 'app-brands',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandsComponent implements OnInit {
  brands: Brand[] = [];
  showAlert: boolean = false;
  count: number = 0;
  loading: boolean = true;
  state: ClrDatagridStateInterface = {};

  allSelected: Brand[] = [];
  descSort: ClrDatagridSortOrder = ClrDatagridSortOrder.DESC;
  idsSelected: any = [];
  filter: FilterDto<Brand> = new FilterDto<Brand>();

  pageSize = pageSize;
  pageSizeOptions = pageSizeOptions;
  currentUser: number = -1;

  constructor(
    private brandService: BrandsService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.currentUser = +this.sharedService.getCookie('idUser');
    this.refresh(this.state);
  }

  refresh(state: ClrDatagridStateInterface): void {
    this.loading = true;
    this.state = state;
    this.filter = Object.assign(this.filter, handleStateFilter(this.state));
    this.getBrands();
  }

  getBrands(): void {
    this.brandService.getBrands(this.filter).subscribe(
      (data) => {
        this.brands = data[0];
        this.count = data[1];
      },
      (err) => console.error('Error fetching brands: ', err),
      () => {
        this.loading = false;
      }
    );
  }

  close(): void {
    this.showAlert = false;
    this.allSelected = [];
  }

  save(): void {
    this.showAlert = false;
    this.allSelected = [];
    this.refresh(this.state);
  }

  existInSelected(item: Brand): boolean {
    return this.allSelected.findIndex((elem) => elem.id === item.id) >= 0;
  }

  selectionChanged(): void {
    this.allSelected = this.allSelected
      .reverse()
      .filter(
        (item, index, self) =>
          index === self.findIndex((tab) => tab.id === item.id)
      );
    this.idsSelected = this.allSelected.map((elem) => elem.id);
  }

  deleteMultipleAction(): void {
    this.idsSelected = this.allSelected.map((elem) => elem.id);
    this.showAlert = true;
  }

  editAction(): void {
    this.router.navigate(['/brands/edit/', this.allSelected[0].id]);
  }
}
