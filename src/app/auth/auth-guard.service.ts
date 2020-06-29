import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {  
constructor(public auth: AuthService, public router: Router) {}  
canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(this.auth.isAuthenticated()){
      return true;
    }
    else{
      this.router.navigate(['/login'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }

}
}