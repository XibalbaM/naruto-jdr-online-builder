import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import Auth from "../models/auth.model";

@Injectable({
    providedIn: 'root'
})
/**
 * Guard to check if the user is authenticated
 *
 * If not, redirect to the login page
 */
export class AuthenticatedGuard {

    constructor(private router: Router) {
    }

    canActivate(): boolean {
        if (Auth.checkTokenCookie()) {
            return true;
        } else {
            this.router.navigateByUrl('/connexion');
            return false;
        }
    }
}
