import {Component, computed, Injector, OnInit, signal} from '@angular/core';
import Auth from "../../../app/models/auth.model";
import {DatePipe, NgClass, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SpacerComponent} from '../../../utils/components/spacer/spacer.component';
import {ActivatedRoute, Router} from "@angular/router";
import AdminService from "../../services/admin.service";
import User from "../../../app/models/user.interface";
import {zip} from "rxjs";
import {NotificationService} from "../../../app/services/notification.service";
import {ModalComponent} from "../../../utils/components/modal/modal.component";

@Component({
    selector: 'app-home',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    standalone: true,
    imports: [SpacerComponent, FormsModule, NgIf, DatePipe, NgClass, ModalComponent]
})
export class UserComponent implements OnInit {

    user = signal<User | undefined>(undefined);
    isActive = computed(() => {
        if (!this.user()) {
            return false;
        } else {
            return new Date(this.user()!.lastActivity).getTime() > Date.now() - 60*60*24*7*1000;
        }
    });

    deleteConfirmation = "";

    constructor(private auth: Auth, private injector: Injector, private router: Router, private activatedRoute: ActivatedRoute,
                protected adminService: AdminService, protected notificationService: NotificationService) {
    }

    ngOnInit() {
        zip(this.auth.userObservableOnceLoaded(this.injector), this.adminService.getUser(this.activatedRoute.snapshot.paramMap.get("id")!))
            .subscribe(([user, gotUser]) => {
            if (user.isAdmin && gotUser) {
                this.user.set(gotUser);
            } else {
                this.router.navigate(['/']);
            }
        });
    }

    sendMail() {
        this.adminService.sendEmail(this.user()!._id).subscribe(success => {
            if (success)
                this.notificationService.showNotification("Email envoyé", "Un email de connexion a été envoyé à l'utilisateur.");
            else
                this.notificationService.showNotification("Erreur", "Une erreur est survenue lors de l'envoi de l'email.");
        });
    }

    discordDisconnect() {
        if (this.adminService.readonlyMode())
            return;
        this.adminService.disconnectDiscord(this.user()!._id).subscribe(success => {
            if (success) {
                this.notificationService.showNotification("Compte déconnecté", "Le compte Discord a été déconnecté.");
                this.user.set({...this.user()!, discordId: undefined});
            } else
                this.notificationService.showNotification("Erreur", "Une erreur est survenue lors de la déconnexion du compte Discord.");
        });
    }

    export() {
        const json = JSON.stringify(this.user());
        const blob = new Blob([json], {type: 'application/json'});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = (this.user()?.username ?? this.user()?.email) + '.json';
        a.click();
    }

    processDelete() {
        if (this.adminService.readonlyMode())
            return;
        if (this.deleteConfirmation !== this.user()?.username) {
            return
        }
        this.adminService.deleteUser(this.user()!._id).subscribe(success => {
            if (success) {
                this.notificationService.showNotification("Compte supprimé", "Le compte a été supprimé.");
                this.router.navigate(['/comptes']);
            } else
                this.notificationService.showNotification("Erreur", "Une erreur est survenue lors de la suppression du compte.");
        });
    }
}