import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Modele } from './models';  
import { environment } from '../../environments/environment';
import { FilterDto } from '../filter.dto';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  constructor(private http: HttpClient) { }

  // Fetching all models with optional filtering
  getModels(filter: FilterDto<Modele>): Observable<[Modele[], number]> {
    const filterString = JSON.stringify(filter);
    return this.http.get<[Modele[], number]>(`${environment.api}/models?filter=${encodeURIComponent(filterString)}`);
  }

  // Adding a new model
  addModel(model: any): Observable<Modele> {
    return this.http.post<Modele>(`${environment.api}/models`, model);
  }

  // Editing an existing model
  editModel(ID: number, modelObject: Modele): Observable<Modele> {
    return this.http.patch<Modele>(`${environment.api}/models/${ID}`, modelObject);
  }

  // Fetching a specific model by ID
  getModel(ID: number): Observable<Modele> {
    return this.http.get<Modele>(`${environment.api}/models/${ID}`);
  }

  // Deleting a model by ID
  deleteModel(ID: number): Observable<void> {
    return this.http.delete<void>(`${environment.api}/models/${ID}`);
  }

  // Deleting multiple models (optional)
  deleteMultipleModels(toDelete: number[], toDisable: number[]): Observable<any> {
    return this.http.post<any>(`${environment.api}/models/deleteMultipleModels`, [ toDelete, toDisable ]);
  }
}
