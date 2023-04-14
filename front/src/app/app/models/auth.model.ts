import User from "./user.model";
import {BehaviorSubject, Observable} from "rxjs";

export default class Auth {
  private _token = new BehaviorSubject<string | undefined>(undefined);
  private _user = new BehaviorSubject<User | undefined>(undefined);

  get user(): User | undefined {
    return this._user.getValue();
  }

  userObservable(): BehaviorSubject<User | undefined> {
    return this._user;
  }

  tokenObservable(): BehaviorSubject<string | undefined> {
    return this._token;
  }

  get token(): string | undefined {
    return this._token.getValue();
  }

  set token(token: string | undefined) {
    this._token.next(token);
    if (!token) localStorage.removeItem('token');
    else localStorage.setItem('token', token);
    if (token) {
      //this._user.next(new User());
      //TODO get user data
    }
  }
}
