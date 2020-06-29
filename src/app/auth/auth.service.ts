import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment'
import { JwtHelperService } from "@auth0/angular-jwt";
import 'rxjs/add/operator/catch';
import { map } from 'rxjs-compat/operator/map';



export interface BlacklistData {
  id: string;
  emailid: string;
  membershipid: string;
  phonenumber: string;   
}

@Injectable()


export class AuthService {  
constructor(private router: Router,private http: HttpClient) {

}

public isAuthenticated(): boolean 
{
  const helper = new JwtHelperService();
  let dataCenter = this.getUserData();
  if(dataCenter !== undefined && dataCenter !== null && dataCenter.username)
  {
        return true;
  } else {
    return false;
  }
}


  public getUserData()
  {
    let dataCore:any = [];
    dataCore = JSON.parse(localStorage.getItem("metaLog")) || '';
    if(dataCore) {
      return dataCore;
    }
    return null;
    
  }


  public login(loginDetails)
  {
    const apiUrl = environment.JSON_PATH;
    return new Promise((resolve, reject) => {
      this.http.get<any>(apiUrl)
      .subscribe(result => {
        let res = result.find(x => x.username === loginDetails.username);
        if(res != undefined)
        {
          if(res.password == loginDetails.password) { resolve(res)} else { resolve(2)}
        } else {resolve(0)}
      }),error =>{
        reject(0)
      };
  });
  }



  public isAdmin(): boolean { 
      let dataCenter = this.getUserData();
      if(dataCenter !== null && dataCenter.role.toLowerCase() == 'admin')
      {
        return true;
      }
      return false;
  }

  public logout()
  {
    localStorage.clear();
    this.router.navigate(['/login']);

  }
}