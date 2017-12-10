import { Injectable } from '@angular/core';
import { Headers, Request, RequestOptions, RequestMethod, Response } from '@angular/http';
import { URLSearchParams, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { HttpParams, HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private auth: AuthService) { }

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
  }

  get(url: string) {
    return this.request(url, RequestMethod.Get);
  }

  post(url: string, body: Object) {
    return this.request(url, RequestMethod.Post, body);
  }

  put(url: string, body: Object) {
    return this.request(url, RequestMethod.Put, body);
  }

  delete(url: string) {
    return this.request(url, RequestMethod.Delete);
  }

  request(url: string, method: RequestMethod, body?: Object, param?: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${this.auth.getToken()}`);

    const requestOptions = new RequestOptions({
      url: `${this.baseUrl}/${url}`,
      method: method,
      headers: headers
    });

    if (param) {
      let myParams = new HttpParams();
      myParams.set('model', param);
      //requestOptions.params = myParams;
    }

    if (body) {
      requestOptions.body = body;
    }

    const request = new Request(requestOptions);

    return this.http.request(request)
      .map((res: Response) => res.json())
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
