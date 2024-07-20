import {Injectable} from "@angular/core";
import Auth from "../models/auth.model";
import {ApiService} from "./api.service";
import {combineLatest, map, Observable, tap} from "rxjs";
import User from "../models/user.interface";
import Character from "../models/character.interface";

@Injectable({
    providedIn: 'root'
})
/**
 * Service to manage the authentication.
 *
 * This service is used to manage the authentication of the user.
 * @see Auth
 * @see ApiService
 * @class AuthService
 */
export class AuthService {

    constructor(private apiService: ApiService, private auth: Auth) {
    }

    refreshUser() {
        if (Auth.checkTokenCookie()) {
            this.apiService.doRequest<{ user?: User, error?: string }>("GET", "/account").subscribe((response) => {
                if (response.body && !response.body.error && response.body.user) {
                    combineLatest([
                        this.apiService.doRequest<{ characters?: [Character], error?: string }>("GET", "/characters")
                    ]).subscribe(([characterResponse]) => {
                        const user = response.body?.user! as User;
                        user.createdAt = new Date(Date.parse(user.createdAt as unknown as string));
                        user.lastActivity = new Date(Date.parse(user.lastActivity as unknown as string));
                        if (characterResponse.body && !characterResponse.body.error && characterResponse.body.characters)
                            user.characters = characterResponse.body.characters;
                        user.characters.forEach((character) => {
                            character.createdAt = new Date(Date.parse(character.createdAt as unknown as string));
                            character.updatedAt = new Date(Date.parse(character.updatedAt as unknown as string));
                        });
                        this.auth.user = user;
                    });
                } else this.auth.user = undefined;
            });
        } else {
            this.auth.user = undefined;
        }
    }

    /**
     * Call the API to email the user connect or create an account.
     * @param email The email of the user.
     * @param captcha The captcha token.
     */
    sendEmailRequest(email: string, captcha: string): Observable<{ isRegistration: boolean, error?: string }> {

        return this.apiService.doRequest<{ message?: string, error?: string, isRegistration?: boolean }>('POST', '/auth', {
            email: email,
            captcha: captcha
        }, false).pipe(
            map((response) => {
                if (response.body) return response.body;
                else return {error: "No data received"};
            }),
            map((response) => {
                return {isRegistration: !!response.isRegistration, error: response.error};
            })
        );
    }

    /**
     * Call the API to log in the user with the connection token received by email.
     * @param token The token received by email.
     * @returns An observable with the result of the login.
     */
    login(token: string): Observable<{ succeed: boolean, isRegistration: boolean, discordUsername?: string, error?: string }> {

        return this.apiService.doRequest<{ discordUsername?: string, error?: string }>("GET", `/auth/${token}`, undefined, false).pipe(
            tap(() => {
                this.refreshUser();
            }),
            map((response) => {
                if (response.body) {
                    return {
                        succeed: !response.body.error,
                        isRegistration: response.status === 201,
                        discordUsername: response.body.discordUsername,
                        error: response.body.error
                    };
                } else {
                    return {succeed: false, isRegistration: false, error: "No data received"};
                }
            })
        );
    }

    logout() {
        this.auth.user = undefined;
        return this.apiService.doRequest('GET', '/auth/logout');
    }
}
