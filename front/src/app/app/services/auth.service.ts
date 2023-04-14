import {Injectable, OnInit} from "@angular/core";
import Auth from "../models/auth.model";
import {ApiService} from "./api.service";
import { map, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService, private auth: Auth) {}

  /**
   * Initialize the service.
   * Get the token from the local storage.
   */
  init(): void {
    try {

      this.auth.token = localStorage.getItem('token') || undefined;

      if (!this.auth.token || JSON.parse(atob(this.auth.token.split('.')[1]))['exp'] < Date.now() / 1000) {
        this.auth.token = undefined;
      } else {
        this.apiService.doRequest<{token?: string, error?: string}>('POST', '/auth/refresh', undefined).subscribe((response) => {
          if (response.body && !response.body.error && response.body.token) this.auth.token = response.body.token;
          else this.auth.token = undefined;
        });
      }
    } catch (e) {
      this.auth.token = undefined;
    }
  }

  /**
   * Call the API to email the user connect or create account.
   * @param email
   */
  sendEmailRequest(email: string): Observable<{isRegistration: boolean, error?: string}> {

    return this.apiService.doRequest<{message?: string, error?: string, isRegistration?: boolean}>('POST', '/auth', {email: email}, false).pipe(
      map((response) => {
        if (response.body) return response.body;
        else return {error: "No data received"};
      }),
      map((response) => {
        return {isRegistration: !!response.isRegistration, error: response.error};
      })
    );
  }

  login(token: string): Observable<{ succeed: boolean, isRegistration: boolean, error?: string }> {

    return this.apiService.doRequest<{token?: string, error?: string}>("GET", `/auth/${token}`, undefined, false).pipe(
      tap((response) => {
        if (response.body && !response.body.error && response.body.token) {
          this.auth.token = response.body.token;
        }
      }),
      map((response) => {
        if (response.body) {
          return {succeed: !!response.body.token, isRegistration: response.status === 201, error: response.body.error};
        } else {
          return {succeed: false, isRegistration: false, error: "No data received"};
        }
      })
    );
  }
}
