import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {
  private url = environment.baseApi;
  private noAuth = {headers: new HttpHeaders({'No-Auth': 'True'})};
  constructor(private http: HttpClient) {
  }

  public hello() {
    return this.http.get(this.url, this.noAuth);
  }
}
