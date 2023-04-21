import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
/**
 * Service to manage the notifications.
 *
 * @class NotificationService
 */
export class NotificationService {

  private _$notification = new BehaviorSubject<{ title: string, content: string } | undefined>(undefined);

  constructor() { }

  get $notification(): BehaviorSubject<{ title: string, content: string } | undefined> {
    return this._$notification;
  }

  showNotification(title: string, message: string) {
    this._$notification.next({title, content: message});
  }

  hideNotification() {
    this._$notification.next(undefined);
  }
}
