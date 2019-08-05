import {Injectable} from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {ILoginCredentials} from '../../../website/components/login/login.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static tokenString = 'stein-token';
  private static userString = 'stein-user';
  static redirectUrl: string;
  static fragmentKeyLoginModal = 'login';
  private url = environment.baseApi + '/auth/login';
  private noAuth = {headers: new HttpHeaders({'No-Auth': 'True'})};
  private user: any;
  private roles: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  static getToken() {
    return localStorage.getItem(AuthService.tokenString);
  }

  static getUser() {
    return JSON.parse(atob(localStorage.getItem(AuthService.userString)));
  }

  static isTokenExpired(token: string) {
    if (!token) {
      token = AuthService.getToken();
    }

    if (!token) {
      return true;
    }

    const date = AuthService.getTokenExpirationDate(token);
    if (date == null) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  public static getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);
    if (decoded.exp == null) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  static removeToken() {
    localStorage.removeItem(AuthService.tokenString);
  }

  public static setToken(token) {
    localStorage.setItem(AuthService.tokenString, token);
  }

  public static setUser(user) {
    localStorage.setItem(AuthService.userString, btoa(JSON.stringify(user)));
  }

  static logout() {
    AuthService.removeAllToken();
  }

  private static removeAllToken() {
    localStorage.removeItem(AuthService.tokenString);
    localStorage.removeItem(AuthService.userString);

  }

  public login(credentials: ILoginCredentials) {
    return this.http.post(this.url, credentials, this.noAuth).pipe(map(res => res['data']), tap(({user, token}) => {
      this.roles = user.role;
      AuthService.setToken(token);
      AuthService.setUser(user);
      this.redirectAfterLogin();
    }));
  }


  private redirectAfterLogin() {
    return AuthService.redirectUrl ? this.router.navigateByUrl(AuthService.redirectUrl) : this.router.navigateByUrl('/app');
  }

}
