import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './clients'; 
import { environment } from '../../environments/environment';
import { FilterDto } from '../filter.dto';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  constructor(private http: HttpClient) { }

  getClients(filter: FilterDto<Client>): Observable<[Client[], number]> {
    const filterString = JSON.stringify(filter);
    return this.http.get<[Client[], number]>(`${environment.api}/clients?filter=${encodeURIComponent(filterString)}`);
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${environment.api}/clients`, client);
  }

  editClient(ID: number, clientObject: Client): Observable<Client> {
    return this.http.patch<Client>(`${environment.api}/clients/${ID}`, clientObject);
  }

  getClient(ID: number): Observable<Client> {
    return this.http.get<Client>(`${environment.api}/clients/${ID}`);
  }

  deleteClient(ID: number): Observable<void> {
    return this.http.delete<void>(`${environment.api}/clients/${ID}`);
  }

  deleteMultipleClients(toDelete: number[], toDisable: number[]): Observable<any> {
    return this.http.post<Client>(`${environment.api}/clients/deleteMultipleClients`, [ toDelete, toDisable ]);
}
}
