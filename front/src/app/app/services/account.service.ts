import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {map, Observable, tap} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: "root",
})
export class AccountService {

    constructor(private apiService: ApiService, private authService: AuthService) {
    }

    /**
     * Change the username of the current user
     * @param username The new username
     * @returns {Observable<{ success: boolean, error?: string }>} The result of the request
     */
    setUsername(username: string): Observable<{ success: boolean, error?: string }> {

        return this.apiService.doRequest<{ error?: string }>("POST", "/account/username", {username: username}).pipe(
            map((response: HttpResponse<{ error?: string }>) => {
                return {success: response.status === 200, error: response.body?.error || undefined};
            }),
            tap(() => {
                this.authService.refreshUser();
            }),
        );
    }

    /**
     * Change the email of the current user
     * @param email The new email
     * @returns {Observable<{ success: boolean, error?: string }>} The result of the request
     */
    setEmail(email: string): Observable<{ success: boolean, error?: string }> {

        return this.apiService.doRequest<{ error?: string }>("POST", "/account/email", {email: email}).pipe(
            map((response: HttpResponse<{ error?: string }>) => {
                return {success: response.status === 200, error: response.body?.error || undefined};
            }),
            tap(() => {
                this.authService.refreshUser();
            }),
        );
    }

    /**
     * Delete the account of the current user.
     *
     * WARNING: This will delete the account and all the data associated with it.
     * @returns {Observable<boolean>} The result of the request
     */
    deleteAccount(): Observable<boolean> {

        return this.apiService.doRequest("DELETE", "/account").pipe(
            map((response: HttpResponse<any>) => {
                return response.status === 200;
            })
        );
    }

    /**
     * Add a discord account to the current user
     * @param code The code returned by the discord oauth2
     */
    addDiscordAccount(code: string): Observable<{ succeed: boolean, username?: string, error?: string }> {
        return this.apiService.doRequest<{ username?: string, error?: string }>("POST", "/account/discord", {code: code}).pipe(
            map((response) => {
                return {succeed: response.status === 200 && !!response.body?.username, username: response.body?.username, error: response.body?.error};
            }),
            tap(() => {
                this.authService.refreshUser();
            })
        );
    }

    /**
     * Remove the discord account of the current user
     */
    removeDiscordAccount(): Observable<{ succeed: boolean, error?: string }> {
        return this.apiService.doRequest<{ error?: string }>("DELETE", "/account/discord").pipe(
            map((response) => {
                return {succeed: response.status === 200, error: response.body?.error};
            }),
            tap(() => {
                this.authService.refreshUser();
            })
        );
    }
}
