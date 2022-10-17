import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Users } from '../entity/user';
import { LoginService } from './login.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  user:Users;
  constructor(public loginService: LoginService, public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.loginService.isLoggedIn()){
        return true;
      }
      
      this.router.navigate(['home']);


      return false;
  }
  
}
