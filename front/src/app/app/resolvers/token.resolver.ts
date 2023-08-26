import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import Auth from "../models/auth.model";
import {inject} from "@angular/core";

export const TokenResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot, auth: Auth = inject(Auth)) => auth.tokenObservableOnceLoaded();