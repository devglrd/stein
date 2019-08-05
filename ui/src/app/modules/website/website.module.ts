import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {COMPONENTS} from './components';
import {SERVICES} from './services';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {WebsiteRouting} from './routing/website.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    WebsiteRouting
  ],
  providers: [
    ...SERVICES
  ]
})
export class WebsiteModule {
}
