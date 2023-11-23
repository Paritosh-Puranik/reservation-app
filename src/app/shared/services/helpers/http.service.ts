import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '@core/index';
import { StatusCode } from '@shared/index';
import { catchError, map, Observable, retry, skip, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    public statusCode = new Subject<boolean>();

    constructor(
        private readonly http: HttpClient,
    ) { }

    post(url: string, body: any, options?: any): Observable<any>{
        const request = this.makeRequest('post', url, body, options);
        return this.sendRequest(request);
    }
    
    put(url: string, body: any): Observable<any> {
        const request = this.makeRequest('put', url, body);
        return this.sendRequest(request);
    }

    get(url: string, params?: any): Observable<any> {
        let request = this.makeRequest('get', url);
        if (params) {
            let query;
            if (params instanceof HttpParams) {
                query = params;
            } else {
                query = new HttpParams({ fromObject: { ...params } });
            }
            request = this.makeRequest('get', url, null, { params: query });
        }
        return this.sendRequest(request);
    }

    delete(url: string, options: any, hasBody?: boolean): Observable<any>  {
        let request = this.makeRequest('delete', url);
        if (options) {
            let query;
            if (options instanceof HttpParams) {
                query = options;
            } else {
                query = new HttpParams({ fromObject: { ...options } });
            }
            request = hasBody ? request.clone({body: options}) : this.makeRequest('delete', url, null, { params: query });
            
        }
        return this.sendRequest(request);
    }

    private makeRequest(type: string, url: string, body?: any, options?: any): HttpRequest<any> {
        return new HttpRequest(type, `${environment.apiUrl}/${url}`, body, options);
    }

    private sendRequest(request: HttpRequest<any>): Observable<any> {
        return this.http.request(request).pipe(
            catchError(this.handleError.bind(this)),
            skip(1),
            map(this.handleResponse.bind(this)));

    }

    private handleError(error: HttpErrorResponse): Observable<any> {
        if (error.status === StatusCode.unauthorized){
            this.statusCode.next(false);
        }
        return throwError({
            code: error.status,
        });
    }

    private handleResponse(event: HttpEvent<any>): any {
        switch (event.type) {
            case HttpEventType.UploadProgress:
                return event;
            case HttpEventType.Response:
                return event.body;
        }
    }
}
