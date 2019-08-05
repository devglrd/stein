import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component, HostListener, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {EMPTY} from 'rxjs';

import {AuthService} from '../../../shared/services';

export interface ILoginCredentials {
  login: string;
  password: string;
}

@Component({
  selector: 'app-website-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginErrorMessage: string;
  public loginForm: FormGroup;
  public loading = false;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) {
  }

  public ngOnInit() {

    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  public onSubmit() {
    this.loading = true;
    const data = {
      ...this.loginForm.value
    };
    console.log(data);
    this.authService.login(data).subscribe((res: any) => {
        this.loading = false;
        console.log(res);
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        AuthService.removeToken();
        return EMPTY;
      });
  }

  @HostListener('keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.router.navigate([], {preserveFragment: false});
    event.stopPropagation();
  }

}
