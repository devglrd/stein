import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent, COMPONENTS} from './components';
import {environment} from '../environments/environment';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRouting} from './routing/app.routing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './modules/shared/shared.module';
import {REDUCERS} from './store/reducers';
import {EFFECTS} from './store/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {AuthInterceptor} from './modules/shared/services/auth/auth.interceptor';
import {ToastrModule} from 'ngx-toastr';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouting,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule,
    StoreModule.forRoot(REDUCERS),
    EffectsModule.forRoot([...EFFECTS]),
    !environment.production ? StoreDevtoolsModule.instrument({name: 'stein', maxAge: 15}) : [],
    BrowserModule.withServerTransition({
      appId: 'stein'
    }),
  ],
  declarations: [...COMPONENTS],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
