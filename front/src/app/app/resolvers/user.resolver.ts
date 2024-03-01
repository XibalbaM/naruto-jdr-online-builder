import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import User from "../models/user.model";
import Auth from "../models/auth.model";
import {inject, Injector} from "@angular/core";

export const UserResolver: ResolveFn<User> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot, auth: Auth = inject(Auth), injector: Injector = inject(Injector)) =>
        auth.userObservableOnceLoaded(injector);