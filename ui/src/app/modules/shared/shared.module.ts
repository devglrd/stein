import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SERVICES} from './services';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {COMPONENTS} from './components';
import {RouterModule} from '@angular/router';
import {AuthInterceptor} from './services/auth/auth.interceptor';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [
    ...SERVICES,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  declarations: [...COMPONENTS, LoaderComponent],
  exports: [...COMPONENTS],
})
export class SharedModule {
}
