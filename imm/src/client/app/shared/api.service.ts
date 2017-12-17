import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class ApiService {

  private baseUrl = environment.apiUrl;

  getFiltered(url: string, model: string) {
    return this.request(url, RequestMethod.Get, null, model);
  }

  get(url: string) {
  constructor(private http: Http, private auth: AuthService) { }
  }
  post(url: string, body: Object) {
    return this.request(url, RequestMethod.Post, body);
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${this.auth.getToken()}`);
      params: param ? {'model' : param} : {}
    return this.request(url, RequestMethod.Get);

    
    if (body) {
    return this.request(url, RequestMethod.Post, body);
    }

    const request = new Request(requestOptions);
    return this.request(url, RequestMethod.Put, body);
    return this.http.request(request)
      //.map((res: Response) => res.json())
      .catch((res: Response) => this.onRequestError(res));
    return this.request(url, RequestMethod.Delete);
  
  onRequestError(res: Response) {
    const body = res.json();
      error: body.error
    };

    console.log(error);

    return Observable.throw(error);
  } 
 
}
    const request = new Request(requestOptions);
