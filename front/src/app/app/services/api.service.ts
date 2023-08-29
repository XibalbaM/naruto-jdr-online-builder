import {Injectable} from "@angular/core";
import Environment from "src/environments/environment.interface";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import Auth from "../models/auth.model";
import {Router} from "@angular/router";
import {NotificationService} from "./notification.service";

@Injectable({
    providedIn: "root",
})
/**
 * The API service is used to call the API. It automatically resolves the API URL from the environment and the token from the auth.service.
 *
 * It also handles errors and redirects to the login page if the user is not authenticated.
 * @see Auth
 * @see Environment
 *
 * @class ApiService
 */
export class ApiService {

    constructor(private environment: Environment, private httpClient: HttpClient, private router: Router,
                private notificationService: NotificationService) {
    }

    /**
     * Do http call with the given parameters.
     * @param method The HTTP method to use.
     * @param path The path to call. If it starts with a slash, it will be appended to the API URL.
     * @param body The body of the request, if any.
     * @param authenticated If the request should be authenticated. If true, the token will be added to the request.
     * @param headers The headers to add to the request.
     * @param params The parameters to add to the request.
     * @return An observable of the response.
     */
    doRequest<T>(method: string, path: string, body?: any, authenticated: boolean = true, headers: HttpHeaders = new HttpHeaders(),
                 params?: Map<string, string>): Observable<HttpResponse<T>> {

        const url = path.startsWith("/") ? this.environment.api_url + path : path;

        if (authenticated && !Auth.checkTokenCookie()) {
            this.router.navigate(["/connexion"]);
            this.notificationService.showNotification("Impossible d'accéder à cette page", "Vous devez être connecté pour accéder à cette page.");
            throw new Error("Not authenticated");
        }

        // @ts-ignore
        return this.httpClient.request<T>(method, url, {headers: headers, body: body, responseType: "json", observe: "response", params: params})
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 0) {
                        return of(new HttpResponse({}));
                    } else {
                        return of(new HttpResponse({
                            body: error.error,
                            headers: error.headers,
                            status: error.status,
                            statusText: error.statusText,
                            url: error.url ? error.url : undefined,
                        }));
                    }
                }),
            );
    }
}
