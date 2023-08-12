import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import User from "../models/user.model";
import Auth from "../models/auth.model";
import {inject} from "@angular/core";

export const UserResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot, auth: Auth = inject(Auth)) => auth.tokenObservableOnceLoaded();