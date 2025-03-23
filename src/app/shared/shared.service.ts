import { Injectable } from '@angular/core';
import { FilterDto } from '../filter.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http:HttpClient) { }

  getCookie(cname: string) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  uploadImgCloudinary(imageData: any) {
    return this.http.post(environment.api + '/uploadImgCloudinary/' ,imageData);
  }
  uploadMultipleImage(data: any) {
    return this.http.post(environment.api + '/images/imageMultiple/add/upload/' , data);
  }

  removeImage(data: any): any{
    return this.http.post(environment.api + '/images/remove/' , data);

  }
}
export function tokenGetter() {
  var name = "token=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
export const pageSize = 10

export const pageSizeOptions = [5, pageSize, 15, 20,30,40,50]

export function handleStateFilter(state:any){
  let filter: any = {}
  const page = state.page?.current || 1
  filter.take = state.page?.size || pageSize
  filter.skip =  (page - 1) * (filter.take)
  // order
  if (state.sort != null) {
    let orderType: any;
    if (state.sort.reverse == false) {
      orderType = 'ASC';
    } else {
      orderType = 'DESC';
    }
    let key: any = state.sort.by
    filter.order = { [key]: orderType }
    return filter
  }
}

export class Alert {
  constructor(
    public success?: boolean,
    public echec?: boolean,
    public msgSuccess?: string,
    public msgEchec?: string,
    public open?: boolean
  ) { }
}
