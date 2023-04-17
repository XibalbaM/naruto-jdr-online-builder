import User from "./user.model";
import {BehaviorSubject} from "rxjs";

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

  get token(): string | undefined {
    return this._token.getValue();
  }

  set token(token: string | undefined) {
    this._token.next(token);
  }

  tokenObservable(): BehaviorSubject<string | undefined> {
    return this._token;
  }
}
