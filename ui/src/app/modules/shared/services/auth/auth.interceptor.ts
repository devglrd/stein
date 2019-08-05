import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private taostr: ToastrService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req);
    }
    const token = AuthService.getToken();

    if (!!token) {
      if (!AuthService.isTokenExpired(token)) {
        const clonedReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});
        return next.handle(clonedReq).pipe(catchError(this.handleError.bind(this)));
      } else {
        AuthService.redirectUrl = window.location.pathname;
        this.router.navigate(['/'], {fragment: AuthService.fragmentKeyLoginModal})
          .then(() => this.taostr.error('Vous devez être connecté pour effectuer cette action !'));
      }
    } else {
      AuthService.redirectUrl = window.location.pathname;
      this.router.navigate(['/'], {fragment: AuthService.fragmentKeyLoginModal});
    }

  }

  private handleError(err: HttpErrorResponse) {
    if (err.status === 401) {
      AuthService.logout();
      AuthService.redirectUrl = window.location.pathname;
      this.taostr.error('Déconnexion ..');
      this.router.navigate(['/']);
    }
  }

}
