import {effect, Injectable, signal} from "@angular/core";
import {NotificationService} from "../../app/services/notification.service";
import {ApiService} from "../../app/services/api.service";
import User from "../../app/models/user.model";
import {map, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export default class AdminService {
    readonlyMode = signal(!localStorage.getItem('editMode') || localStorage.getItem('editMode') === 'true');
    constructor(private notificationService: NotificationService, private apiService: ApiService) {
        effect(() => {
            localStorage.setItem('editMode', String(this.readonlyMode()));
            this.notificationService.showNotification("Mode lecture seule" + (this.readonlyMode() ? " activé" : " désactivé"), "Le mode lecture seule a été " + (this.readonlyMode() ? "activé" : "désactivé") + ".");
        }, {allowSignalWrites: true});
    }

    getAllUsers(): Observable<User[]> {
        return this.apiService.doRequest<{users: User[]}>('GET', '/admin/users').pipe(
            map(response => response.body?.users || [])
        );
    }
}