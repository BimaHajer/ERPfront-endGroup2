import { Component, OnInit } from '@angular/core';
import { Modele } from '../models';
import { ModelsService } from '../models.service';
import { Router } from '@angular/router';
import { ClrDatagridSortOrder, ClrDatagridStateInterface } from '@clr/angular';
import { FilterDto } from '../../filter.dto';
import { handleStateFilter, pageSize, pageSizeOptions, SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-models',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelsComponent implements OnInit {
  models: Modele[] = [];
  showAlert: boolean = false;
  count: number = 0;
  loading: boolean = true;
  state: ClrDatagridStateInterface = {};
  allSelected: Modele[] = [];
  descSort: ClrDatagridSortOrder = ClrDatagridSortOrder.DESC;
  idsSelected: any = [];
  filter: FilterDto<Modele> = new FilterDto<Modele>();

  pageSize = pageSize;
  pageSizeOptions = pageSizeOptions;
  currentUser: number = -1;

  constructor(private modelService: ModelsService, private router: Router, private sharedService: SharedService) {}
  ngOnInit(): void {
    this.currentUser = +this.sharedService.getCookie('idUser');
    this.refresh(this.state);
  }

  refresh(state: ClrDatagridStateInterface): void {
    this.loading = true;
    this.state = state;
    this.filter = Object.assign(this.filter, handleStateFilter(this.state));
    this.filter.relations = ['brandId'];
    this.getModels();
  }

  getModels() {
    this.filter.relations = ['brandId'];
    this.modelService.getModels(this.filter).subscribe(
      data => {
        this.models = data[0];
        this.count = data[1];
      },
      err => console.error('Error fetching models:', err),
      () => {
        this.loading = false;
      }
    );
  }

  close() {
    this.showAlert = false;
  }

  save() {
    this.showAlert = false;
    this.allSelected = []
    this.refresh(this.state)
  }



  existInSelected(item: Modele) {
    return this.allSelected.findIndex(elem => elem.id == item.id) >= 0;
  }

  selectionChanged() {
    this.allSelected = this.allSelected.reverse()
      .filter((item, index, self) => index === self.findIndex((tab) => (tab.id === item.id)));
    this.idsSelected = this.allSelected.map(elem => elem.id);
  }

  deleteMultipleAction() {
    this.idsSelected = this.allSelected.map(elem => elem.id);
    this.showAlert = true;
  }

  editAction() {
    this.router.navigate(['/models/edit/', this.allSelected[0].id]);
  }
}
