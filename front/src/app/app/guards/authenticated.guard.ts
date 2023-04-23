import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import Auth from "../models/auth.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.user) {
      return true;
    } else {
      this.router.navigateByUrl('/connexion');
      return false;
    }
  }
}
