import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { Http, Headers, Request, RequestOptions, RequestMethod, Response, URLSearchParams } from '@angular/http';
=======
import { Headers, Request, RequestOptions, RequestMethod, Response, Http } from '@angular/http';
import { URLSearchParams, RequestOptionsArgs } from '@angular/http';
>>>>>>> master
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { HttpParams, HttpClient, HttpClientModule, HttpRequest } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private auth: AuthService) { }

<<<<<<< HEAD
  getFiltered(url: string, model: string) {
    return this.request(url, RequestMethod.Get, null, model);
=======
  getReview(url: string, param: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${this.auth.getToken()}`);
    let myParams = new HttpParams();
    myParams.set('model', param);
    let uri = `${this.baseUrl}/${url}`;

    return this.http.get(uri, { headers: headers, params: myParams })
      .map((res: Response) => res.json())
      .catch((res: Response) => this.onRequestError(res));
  }

   getFiltered(url: string, param: string) {
    return this.request(url, RequestMethod.Get, param);
>>>>>>> master
  }

  get(url: string) {
    return this.request(url, 'GET');
  }

  post(url: string, body: Object) {
    return this.request(url, 'POST', body);
  }

  put(url: string, body: Object) {
    return this.request(url, 'PUT', body);
  }

  delete(url: string) {
    return this.request(url, 'DELETE');
  }

<<<<<<< HEAD
  request(url: string, method: RequestMethod, body?: Object, param?: string) {
=======
  request(url: string, method, body?: Object, param?: string) {
>>>>>>> master
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${this.auth.getToken()}`);

    const requestOptions = new RequestOptions({
      url: `${this.baseUrl}/${url}`,
      method: method,
      headers: headers,
      params: param ? {'model' : param} : {}
    });

<<<<<<< HEAD
    
    /* if (param) {
      let params: URLSearchParams = new URLSearchParams();
      params.set('model', param);
      requestOptions.params = params;
    } */
=======
    if (param) {
      let myParams = new HttpParams();
      myParams.set('model', param);
      //requestOptions.params = myParams;
    }
>>>>>>> master

    if (body) {
      requestOptions.body = body;
    }

    const request = new HttpRequest(method, requestOptions.url, {Headers: headers, body: body ? body : null, params: param ? param : null});

    return this.http.request(request)
      //.map((res: Response) => res.json())
      .catch((res: Response) => this.onRequestError(res));
  }
  
  onRequestError(res: Response) {
    const statusCode = res.status;
    const body = res.json();

    const error = {
      statusCode: statusCode,
      error: body.error
    };

    console.log(error);

    return Observable.throw(error);
  } 
 
}
