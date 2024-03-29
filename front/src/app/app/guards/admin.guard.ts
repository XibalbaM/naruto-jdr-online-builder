import {Injectable, Injector} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {map, Observable, take, tap} from "rxjs";
import Auth from "../models/auth.model";

@Injectable({
    providedIn: 'root'
})
/**
 * Guard to check if the user is admin
 *
 * If not, redirect to the home page
 */
export class AdminGuard {

    constructor(private router: Router, private auth: Auth, private injector: Injector) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.auth.userObservableOnceLoaded(this.injector).pipe(
            take(1),
            map(user => {
                return user.isAdmin;
            }),
            tap(isAdmin => {
                if (!isAdmin) {
                    this.router.navigateByUrl('/');
                }
            })
        );
    }
}
