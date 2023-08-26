import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
/**
 * Guard to check if the user is authenticated
 *
 * If not, redirect to the login page
 */
export class AuthenticatedGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigateByUrl('/connexion');
      return false;
    }
  }
}
