import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from './brands';
import { environment } from '../../environments/environment';
import { FilterDto } from '../filter.dto';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private http: HttpClient) { }

  getBrands(filter: FilterDto<Brand>): Observable<[Brand[], number]> {
    const filterString = JSON.stringify(filter);
    return this.http.get<[Brand[], number]>(`${environment.api}/brands?filter=${encodeURIComponent(filterString)}`);
  }

  addBrand(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(`${environment.api}/brands`, brand);
  }

  editBrand(ID: number, brandObject: Brand): Observable<Brand> {
    return this.http.patch<Brand>(`${environment.api}/brands/${ID}`, brandObject);
  }

  getBrand(ID: number): Observable<Brand> {
    return this.http.get<Brand>(`${environment.api}/brands/${ID}`);
  }

  deleteBrand(ID: number): Observable<void> {
    return this.http.delete<void>(`${environment.api}/brands/${ID}`);
  }

  deleteMultipleBrands(toDelete: number[], toDisable: number[]): Observable<any> {
    return this.http.post<any>(`${environment.api}/brands/deleteMultipleBrands`, [toDelete, toDisable]);
  }
}
