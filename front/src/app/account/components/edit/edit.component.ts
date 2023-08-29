import {Component} from "@angular/core";
import Auth from "../../../app/models/auth.model";
import {AccountService} from "../../../app/services/account.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../app/services/notification.service";
import {AuthService} from "../../../app/services/auth.service";

@Component({
    selector: "app-edit",
    templateUrl: "./edit.component.html",
    styleUrls: ["./edit.component.scss"],
})
export class EditComponent {

    pp?: string;

    constructor(public auth: Auth, private accountService: AccountService, private router: Router,
                private notificationService: NotificationService, private authService: AuthService) {
    }

    changeUsername(username: string) {
        this.accountService.setUsername(username).subscribe((result) => {
            if (result.success) {
                this.notificationService.showNotification("Nom d'utilisateur modifié !", "Votre nom d'utilisateur a bien été modifié.");
            } else {
                this.notificationService.showNotification("Erreur", result.error || "Une erreur est survenue.");
            }
        });
    }

    changeEmail(email: string) {
        this.accountService.setEmail(email).subscribe((result) => {
            if (result.success) {
                this.notificationService.showNotification("Adresse email modifié !", "Votre adresse email a bien été modifié.");
            } else {
                this.notificationService.showNotification("Erreur", result.error || "Une erreur est survenue.");
            }
        });
    }

    deleteAccount() {
        this.accountService.deleteAccount().subscribe((success: boolean) => {
            if (success) {
                this.router.navigateByUrl("/");
                this.notificationService.showNotification("Compte supprimé !", "Votre compte a bien été supprimé.");
            } else {
                this.notificationService.showNotification("Erreur", "Une erreur est survenue lors de la suppression de votre compte.");
            }
        });
    }

    changePp() {
        if (!this.pp) return;
        this.accountService.setProfilePicture(this.pp).subscribe((result) => {

            if (result.success) {
                this.notificationService.showNotification("Photo de profil modifiée !", "Votre photo de profil a bien été modifiée.");
            } else {
                this.notificationService.showNotification("Erreur", result.error || "Une erreur est survenue.");
            }
        });
    }

    deletePp() {
        this.accountService.deleteProfilePicture().subscribe((success) => {
            if (success) {
                this.notificationService.showNotification("Photo de profil supprimée !", "Votre photo de profil a bien été supprimée.");
            } else {
                this.notificationService.showNotification("Erreur", "Une erreur est survenue lors de la suppression de votre photo de profile.");
            }
        });
    }

    disconnect() {
        this.authService.logout().subscribe(() => {
            this.router.navigateByUrl("/");
            this.notificationService.showNotification("Déconnexion", "Vous avez bien été déconnecté.");
            }
        );
    }
}
