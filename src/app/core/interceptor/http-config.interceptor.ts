import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor() {}

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let tokenizedReq = req.clone({
            // Set headers for request. eg: token.
            setHeaders: {
                app_name: 'Reservation App'
            }
        })
        return next.handle(tokenizedReq).pipe(
            catchError((err) => {
                return next.handle(req);
            })
        );
    }
}
