import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { tokenGetter } from '../shared/shared.service';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${tokenGetter()}`,
        },
      });

    return next.handle(req).pipe(
      catchError((err: any, caught: Observable<any>) => {
        if (err.status === 401) {
          this.router.navigate(['/account/login'])
        }
        return throwError(err)
      }
      ));
  }
}
