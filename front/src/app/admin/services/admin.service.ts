import {effect, Injectable, signal} from "@angular/core";
import {NotificationService} from "../../app/services/notification.service";

@Injectable({
    providedIn: 'root'
})
export default class AdminService {
    readonlyMode = signal(!localStorage.getItem('editMode') || localStorage.getItem('editMode') === 'true');
    constructor(private notificationService: NotificationService) {
        effect(() => {
            localStorage.setItem('editMode', String(this.readonlyMode()));
            this.notificationService.showNotification("Mode lecture seule" + (this.readonlyMode() ? " activé" : " désactivé"), "Le mode lecture seule a été " + (this.readonlyMode() ? "activé" : "désactivé") + ".");
        }, {allowSignalWrites: true});
    }
}