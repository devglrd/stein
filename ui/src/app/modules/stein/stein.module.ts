import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SteinRouting} from './routing/stein.routing';
import {COMPONENTS} from './components';
import {SERVICES} from './services';
import {SharedModule} from '../index';

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    SteinRouting,
    SharedModule,
    CommonModule
  ],
  providers: [
    ...SERVICES
  ]
})
export class SteinModule {
}
