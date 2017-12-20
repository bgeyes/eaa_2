import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';
import { Headers, Request, RequestOptions, RequestMethod, Response, Http } from '@angular/http';
import { URLSearchParams, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';


@Injectable()
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor(private http: Http, private auth: AuthService) { }

  getFiltered(url: string, model: string) {
    return this.request(url, RequestMethod.Get, null, model);
  }

  get(url: string) {
     return this.request(url, RequestMethod.Get);
  }

  post(url: string, body: Object) {
      return this.request(url, RequestMethod.Post, body);
  }

  delete(url: string) {
      return this.request(url, RequestMethod.Delete);
}

  put(url: string, body: Object) {
    return this.request(url, RequestMethod.Put, body);
  }

  request(url: string, method: RequestMethod, body?: Object, param?: string) {
         const headers = new Headers();
         headers.append('Content-Type', 'application/json');
         headers.append('Authorization', `Bearer ${this.auth.getToken()}`);

           
  
    const requestOptions = new RequestOptions({
      url: `${this.baseUrl}/${url}`,
      method: method,
      headers: headers,
      params: param ? {'model' : param} : {}
   });
  
   
     
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
