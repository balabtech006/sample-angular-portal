import { Component, OnInit, NgModule } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { Router } from '@angular/router';
import { NotifierService } from "angular-notifier";
import * as Chartist from 'chartist';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';
import * as userData from "../../assets/userDB.json";
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
@NgModule({
  imports: [CommonModule,BrowserModule],
})
export class HomeComponent implements OnInit {
    userData:any;
    getAllUser:any;
  constructor(private router: Router, private auth: AuthService, private notifiy : NotifierService) { }

  ngOnInit() {  
      this.userData = this.auth.getUserData();
      this.getAllUser = userData
      if(!this.auth.isAuthenticated()){
        this.notifiy.notify("error",environment.sessionErpired);
          this.auth.logout();
      }
    }

    btnNavigation(url){
      this.router.navigate([url]);
    }

    logout(){
      this.auth.logout();
    }

}
