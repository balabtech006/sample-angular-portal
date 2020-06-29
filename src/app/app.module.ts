import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { DataTablesModule } from 'angular-datatables';
import { LoginComponent } from './login/login.component';
import { HomeComponent} from './home/home.component'
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NotifierModule } from "angular-notifier";
import { NgHttpLoaderModule } from 'ng-http-loader';
export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    DataTablesModule,
    NgxMaskModule.forRoot(),
    NgHttpLoaderModule.forRoot(),
    NotifierModule.withConfig({
      position: {
      horizontal: {
        position: 'right',
      },vertical: {
        position: 'top',
      }
      },
      behaviour : {
        autoHide: 3000,
      },
      theme: "material"
    })
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuardService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
