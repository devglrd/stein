import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {
  AccountComponent,
  SteinComponent,
} from '../components';

const routes: Routes = [
  {
    path: '',
    component: SteinComponent,
    children: [
      {path: 'account', component: AccountComponent},
    ],
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class SteinRouting {
}
