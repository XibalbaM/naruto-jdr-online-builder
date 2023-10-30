import User from "./user.model";
import {BehaviorSubject, filter, Observable} from "rxjs";

/**
 * Class that contains the authentication data.
 * @class Auth
 */
export default class Auth {
    /**
     * The user data, if the user is connected.
     *
     * Takes the form of a BehaviorSubject to be able to be observed.
     * @see User
     * @private
     */
    private _user = new BehaviorSubject<User | undefined>(undefined);

    get user(): User | undefined {
        return this._user.getValue();
    }

    set user(user: User | undefined) {
        this._user.next(user);
    }

    static checkTokenCookie(): boolean {
        return document.cookie.includes('isLogged=true');
    }

    userObservable(): BehaviorSubject<User | undefined> {
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
    userObservableOnceLoaded(): Observable<User> {
        return this._user.pipe(
            filter((user): user is User => user !== undefined)
        );
    }
}