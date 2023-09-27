import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenJWTInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string = 'yasel';
    if (token) {//puedo recoger datos del local storage
      const cloned = request.clone({ //clonar la peticione incrustar los datos
        setHeaders: {
          Authorization: `My Token ${token}`,
        }
      });

      return next.handle(cloned);
    } else {
      return next.handle(request);
    }




    //return next.handle(request);
  }
}
