import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from './user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FilterDto } from '../filter.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  getUsers(filter: FilterDto<User>): Observable<[User[], number]> {
    return this.http.get(environment.api + '/users?filter=' + JSON.stringify(filter)) as Observable<[User[], number]>;
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(environment.api + '/users', user);
  }

  editUser(ID: number, userObject: User): Observable<User> {
    return this.http.patch<User>(environment.api + '/users/' + JSON.stringify(ID), userObject);
  }

  getUser(ID: number): Observable<User> {
    return this.http.get(environment.api + '/users/' + JSON.stringify(ID)) as Observable<User>;
  }

  deleteUser(ID: number): Observable<User> {
    return this.http.delete(environment.api + '/users/' + JSON.stringify(ID));
  }

  deleteMultiple(toDelete: number[], toDisable: number[]): Observable<any> {
    return this.http.post<User>(environment.api + '/users/deleteMultipleUser', [toDelete, toDisable]);
  }

}
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl:any = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
