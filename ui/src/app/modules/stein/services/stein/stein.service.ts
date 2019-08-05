import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SteinService {
  private url = environment.baseApi + '/auth/user';

  constructor(private http: HttpClient) {
  }

  public getUser() {
    return this.http.get(this.url).pipe(map(res => res['data']));
  }
}
