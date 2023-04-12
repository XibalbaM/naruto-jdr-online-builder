import { Injectable } from '@angular/core';
import Auth from "../models/auth.model";
import {ApiService} from "./api.service";
import {BehaviorSubject, catchError, map, Observable, of, Subject} from "rxjs";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService, private $auth: BehaviorSubject<Auth | undefined>) {}

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
}
