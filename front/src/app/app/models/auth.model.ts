import User from "./user.interface";
import {filter, Observable} from "rxjs";
import {Injector, Signal, signal} from "@angular/core";
import {toObservable} from "@angular/core/rxjs-interop";

/**
 * Class that contains the authentication data.
 * @class Auth
 */
export default class Auth {
    /**
     * The user data, if the user is connected.
     *
     * Takes the form of a Signal to be able to be observed.
     * @see User
     * @private
     */
    private _user = signal<User | undefined>(undefined);

    get user(): User | undefined {
        return this._user();
    }

    set user(user: User | undefined) {
        this._user.set(user);
    }

    static checkTokenCookie(): boolean {
        return document.cookie.includes('isLogged=true');
    }

    userSignal(): Signal<User | undefined> {
        return this._user;
    }

    /**
     * Returns an observable that will emit the user data only if it exists.
     * Should be used in authenticated routes to wait for the service to load
     * before leaving the page.
     *
     * Example: NgOnInit needs the list of characters, but the service is not loaded yet.
     * So, we use this function to wait for the service to load
     */
    userObservableOnceLoaded(injector: Injector): Observable<User> {
        return toObservable(this._user, {injector}).pipe(
            filter((user): user is User => user !== undefined)
        );
    }
}