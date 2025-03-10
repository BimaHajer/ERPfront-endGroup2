import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './products';
import { FilterDto } from '../filter.dto';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${environment.api}/products/${id}`, product);
  }

  constructor(private http: HttpClient) { }

  getProducts(filter: FilterDto<Product>): Observable<[Product[], number]> {
    return this.http.get(environment.api + '/products?filter=' + JSON.stringify(filter)) as Observable<[Product[], number]>;
  }

  addProduct(Product: Product): Observable<Product> {
    return this.http.post<Product>(environment.api + '/products', Product);
  }

  editProduct(ID: number, ProductObject: Product): Observable<Product> {
    return this.http.patch<Product>(environment.api + '/products/' + JSON.stringify(ID), ProductObject);
  }

  getProduct(ID: number): Observable<Product> {
    return this.http.get(environment.api + '/products/' + JSON.stringify(ID)) as Observable<Product>;
  }

  deleteProducts(ID: number): Observable<Product> {
    return this.http.delete<Product>(`${environment.api}/products/${ID}`);
  }

  deleteMultiple(toDelete: number[], toDisable: number[]): Observable<any> {
    return this.http.post<Product>(environment.api + '/products/deleteMultipleProducts', [toDelete, toDisable]);
  }
}
