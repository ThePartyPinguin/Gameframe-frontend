import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthHeaderResponseInterceptor implements HttpInterceptor {

  constructor() { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {

          if(event.headers.has(environment.user_token_header)){
            let token = event.headers.get('x-user-token')

            window.localStorage.setItem(environment.user_token, token)

          }
        }
        return event;
      })
    );


  }
}
