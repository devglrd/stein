import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {path: 'app', loadChildren: '../modules/stein/stein.module#SteinModule'},
  {path: '', loadChildren: '../modules/website/website.module#WebsiteModule'},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [],
  exports: [RouterModule],
})
export class AppRouting {
}
