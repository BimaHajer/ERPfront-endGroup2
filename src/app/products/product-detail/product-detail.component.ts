import { ProductsService } from './../products.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Product } from './../products';
import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { FilterDto } from '../../filter.dto';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  Product = new Product();
  filter: FilterDto = new FilterDto();

  showAlert: boolean = false;
  productId: number = -1;
  currentProduct: number = -1;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ProductsService: ProductsService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.currentProduct = +this.sharedService.getCookie('idProduct');

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.productId = Number(params.get('id'));
      this.getProduct();
    });
  }

  getProduct() {
    this.ProductsService.getProduct(this.productId).subscribe(
      (data: any) => {
        this.Product = data;
      },
      (err) =>
        console.error('Erreur lors de la récupération du produit : ' + err)
    );
  }

  deleteAction() {
    this.showAlert = true;
  }

  close() {
    this.showAlert = false;
  }

  save() {
    this.router.navigate(['../../products']);
    this.showAlert = false;
  }

  redirectTo() {
    window.history.back();
  }

  deleteImage(image:any){
    let folder = `products/product${this.Product.id}`
    let data = {
     imageId: image.id,
     publicId: `${image.path.substring(image.path.indexOf(folder)).split('.')[0]}`,
    }
    this.sharedService.removeImage(data).subscribe(
        (data:any) => {
          this.getProduct()
        },
        (err:any) => {
          console.error('Observer got an error: ' + err)
        }
      );

  }
}
