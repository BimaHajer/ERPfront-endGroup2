import { Component } from '@angular/core';
import { ClrDatagridSortOrder, ClrDatagridStateInterface } from '@clr/angular';
import { Product } from '../products';
import { FilterDto } from '../../filter.dto';
import {
  handleStateFilter,
  pageSize,
  pageSizeOptions,
  SharedService,
} from '../../shared/shared.service';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { Brand } from '../../brands/brands';
import { Category } from '../../categories/category';
import { Modele } from '../../models/models';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  products: any[] = [];
  showAlert: boolean = false;
  count: number = 0;
  loading: boolean = true;
  brands: Brand[] = [];
    categories: Category[] = [];
    models: Modele[] = [];
  state: ClrDatagridStateInterface = {};

  allSelected: Product[] = [];
  descSort: ClrDatagridSortOrder = ClrDatagridSortOrder.DESC;
  idsSelected: any = [];
  filter: FilterDto = new FilterDto();

  pageSize = pageSize;
  pageSizeOptions = pageSizeOptions;
  currentProduct: number = -1;
  openModalMultipleImage: boolean = false
  folder: string = ''
  productId:any;
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private sharedService: SharedService,
  ) {}
  ngOnInit() {
    this.currentProduct = +this.sharedService.getCookie('idProduct')
  }

  refresh(state: ClrDatagridStateInterface) {
    this.loading = true;
    this.state = state;
    this.filter = Object.assign(this.filter, handleStateFilter(this.state));
    this.filter.relations = ['categoryId', 'modelId', 'modelId.brandId'];

    this.getProducts();
  }



  getProducts() {
    this.filter.relations = ['categoryId', 'modelId', 'modelId.brandId'];
    this.productsService.getProducts(this.filter).subscribe(
      (data) => {
        this.products = data[0];
        this.count = data[1];
      },
      (err) => console.error('Observer got an error: ' + err),
      () => {
        this.loading = false;
      }
    );
  }
  close() {
    this.showAlert = false;
    this.allSelected = [];
  }

  save() {
    this.showAlert = false;
    this.allSelected = [];
    this.refresh(this.state);
  }

  existInSelected(item: Product) {
    return this.allSelected.findIndex((elem) => elem.id == item.id) >= 0;
  }

  selectionChanged() {
    this.allSelected = this.allSelected
      .reverse()
      .filter(
        (item, index, self) =>
          index === self.findIndex((tab) => tab.id === item.id)
      );
    this.idsSelected = this.allSelected.map((elem) => elem.id);
  }

  deleteMultipleAction() {
    this.idsSelected = this.allSelected.map((elem) => elem.id);
    this.showAlert = true;
  }

  editAction() {
    this.router.navigate(['/products/edit/', this.allSelected[0].id]);
  }

  showImagesProduct(){
    this.openModalMultipleImage = true
    this.folder = `products/product${this.allSelected[0].id}`
    this.productId = this.allSelected[0].id
   }
}
