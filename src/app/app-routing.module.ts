import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './Structure/login/login.component';
import {FrontPageComponent} from './Structure/front-page/front-page.component';


const routes: Routes = [
  { path: 'front-page', component: FrontPageComponent},
  { path: '',   redirectTo: 'front-page', pathMatch: 'full' },
  { path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
