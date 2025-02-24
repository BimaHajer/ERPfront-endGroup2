import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { provider } from './providers';
import { FilterDto } from '../filter.dto';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  constructor(private http: HttpClient) { }

    getProviders(filter: FilterDto<provider>): Observable<[provider[], number]> {
      return this.http.get(environment.api + '/providers?filter=' + JSON.stringify(filter)) as Observable<[provider[], number]>;
    }
  
    addProviders(provider: provider): Observable<provider> {
      return this.http.post<provider>(environment.api + '/providers', provider);
    }
  
    editProvider(ID: number, providerObject: provider): Observable<provider> {
      return this.http.patch<provider>(environment.api + '/providers/' + JSON.stringify(ID), providerObject);
    }
  
    getProvider(ID: number): Observable<provider> {
      return this.http.get(environment.api + '/providers/' + JSON.stringify(ID)) as Observable<provider>;
    }
  
    deleteProviders(ID: number): Observable<provider> {
      return this.http.delete(environment.api + '/providers/' + JSON.stringify(ID));
    }
  
    deleteMultiple(toDelete: number[], toDisable: number[]): Observable<any> {
      return this.http.post<provider>(environment.api + '/providers/deleteMultipleProvider', [toDelete, toDisable]);
    }
  
}

