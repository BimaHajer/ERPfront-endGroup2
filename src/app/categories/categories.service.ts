import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from './category';
import { FilterDto } from '../filter.dto';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }
  
  getCategories(filter: FilterDto<Category>): Observable<[Category[], number]> {
    return this.http.get(environment.api + '/categories?filter=' + JSON.stringify(filter)) as Observable<[Category[], number]>;
  }
    
  addCategory(Category: Category): Observable<Category> {
    return this.http.post<Category>(environment.api + '/categories', Category);
  }
    
  editCategory(ID: number, CategoryObject: Category): Observable<Category> {
    return this.http.patch<Category>(environment.api + '/categories/' + JSON.stringify(ID), CategoryObject);
  }
    
  getCategory(ID: number): Observable<Category> {
    return this.http.get(environment.api + '/categories/' + JSON.stringify(ID)) as Observable<Category>;
  }
    
  deleteCategory(ID: number): Observable<Category> {
    return this.http.delete(environment.api + '/categories/' + JSON.stringify(ID));
  }
    
  deleteMultiple(toDelete: number[], toDisable: number[]): Observable<any> {
    return this.http.post<Category>(environment.api + '/categories/deleteMultiplecategories', [toDelete, toDisable]);
  }
}
