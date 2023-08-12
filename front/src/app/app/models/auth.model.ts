import User from "./user.model";
import {BehaviorSubject, filter, Observable} from "rxjs";

/**
 * Class that contains the authentication data.
 * @class Auth
 */
export default class Auth {
    /**
     * The token of the user, as a JWT, if the user is connected.
     *
     * Takes the form of a BehaviorSubject to be able to be observed.
     * @private
     */
    private _token = new BehaviorSubject<string | undefined>(undefined);
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

    refreshUser() {
        this.tokenObservable().next(this.token);
    }

    get token(): string | undefined {
        return this._token.getValue();
    }

    set token(token: string | undefined) {
        this._token.next(token);
    }

    tokenObservable(): BehaviorSubject<string | undefined> {
        return this._token;
    }

    /**
     * Same as {@link userObservableOnceLoaded}, but for the token
     */
    tokenObservableOnceLoaded(): Observable<string> {
        return this._token.pipe(
            filter((token): token is string => token !== undefined)
        );
    }
}