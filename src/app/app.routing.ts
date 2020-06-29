import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth/auth-guard.service'

const routes: Routes =[
  {
    path: 'dashboard',
    component: HomeComponent,
    pathMatch: 'full',
  }, 
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  }, 
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
