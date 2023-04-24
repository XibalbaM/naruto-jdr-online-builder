import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {map, Observable, tap} from "rxjs";
import Auth from "../models/auth.model";
import {HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AccountService {

  constructor(private apiService: ApiService, private auth: Auth) {
  }

  setUsername(username: string): Observable<{ success: boolean, error?: string }> {

    return this.apiService.doRequest<{ error?: string }>("POST", "/account/username", {username: username}).pipe(
      map((response: HttpResponse<{ error?: string }>) => {
        return {success: response.status === 200, error: response.body?.error || undefined};
      }),
      tap(() => {
        this.auth.refreshUser();
      }),
    );
  }

  setEmail(email: string): Observable<{ success: boolean, error?: string }> {

    return this.apiService.doRequest<{ error?: string }>("POST", "/account/email", {email: email}).pipe(
      map((response: HttpResponse<{ error?: string }>) => {
        return {success: response.status === 200, error: response.body?.error || undefined};
      }),
      tap(() => {
        this.auth.refreshUser();
      }),
    );
  }

  setProfilePicture(profilePicture: string): Observable<{ success: boolean, error?: string }> {

    return this.apiService.doRequest<{ error?: string }>("POST", "/account/picture", {link: profilePicture}).pipe(
      map((response: HttpResponse<{ error?: string }>) => {
        return {success: response.status === 200, error: response.body?.error || undefined};
      }),
      tap(() => {
        this.auth.refreshUser();
      })
    );
  }

  deleteProfilePicture(): Observable<{ success: boolean }> {

    return this.apiService.doRequest("DELETE", "/account/picture").pipe(
      map((response: HttpResponse<any>) => {
        return {success: response.status === 200};
      }),
      tap(() => {
        this.auth.refreshUser();
      })
    );
  }

  deleteAccount(): Observable<boolean> {

    return this.apiService.doRequest("DELETE", "/account").pipe(
      map((response: HttpResponse<any>) => {
        return response.status === 200;
      }),
      tap((success: boolean) => {
        if (success) {
          this.auth.token = undefined;
        }
      }),
    );
  }
}
