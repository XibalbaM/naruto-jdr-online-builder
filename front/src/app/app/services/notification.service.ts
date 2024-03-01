import {Injectable, signal, Signal} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
/**
 * Service to manage the notifications.
 *
 * @class NotificationService
 */
export class NotificationService {

    constructor() {
    }

    private _notification = signal<{ title: string, content: string } | undefined>(undefined);

    get notification(): Signal<{ title: string, content: string } | undefined> {
        return this._notification;
    }

    showNotification(title: string, message: string) {
        this._notification.set({title, content: message});
    }

    hideNotification() {
        this._notification.set(undefined);
    }
}
