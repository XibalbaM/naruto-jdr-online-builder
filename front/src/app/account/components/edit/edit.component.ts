import {Component} from "@angular/core";
import Auth from "../../../app/models/auth.model";
import {AccountService} from "../../../app/services/account.service";
import {Router, RouterLink} from "@angular/router";
import {NotificationService} from "../../../app/services/notification.service";
import {AuthService} from "../../../app/services/auth.service";
import Environment from "../../../../environments/environment.interface";
import {RolesPipe} from "../../../utils/pipes/roles.pipe";
import {SpacerComponent} from "../../../utils/components/spacer/spacer.component";
import {ArrowRightComponent} from "../../../utils/components/arrow-right/arrow-right.component";
import {DefaultProfilePictureComponent} from "../../../utils/components/default-profile-picture/default-profile-picture.component";
import {SpacerGraphicalComponent} from "../../../utils/components/spacer-graphical/spacer-graphical.component";
import {FormsModule} from "@angular/forms";
import {ModalComponent} from "../../../utils/components/modal/modal.component";
import {AsyncPipe, NgFor, NgIf} from "@angular/common";

@Component({
    selector: "app-edit",
    templateUrl: "./edit.component.html",
    styleUrls: ["./edit.component.scss"],
    standalone: true,
    imports: [
        NgIf,
        ModalComponent,
        FormsModule,
        RouterLink,
        NgFor,
        SpacerGraphicalComponent,
        DefaultProfilePictureComponent,
        ArrowRightComponent,
        SpacerComponent,
        AsyncPipe,
        RolesPipe,
    ],
})
export class EditComponent {

    pp?: string;
    deleteNameConfirm = "";
    newEmail?: string = undefined;
    newEmailConfirm = "";
    protected readonly console = console;

    constructor(public auth: Auth, private accountService: AccountService, private router: Router,
                private notificationService: NotificationService, private authService: AuthService, protected env: Environment) {
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

    changeEmail() {
        if (this.newEmail === this.newEmailConfirm) {
            this.accountService.setEmail(this.newEmail).subscribe((result) => {
                if (result.success) {
                    this.notificationService.showNotification("Adresse email modifié !", "Votre adresse email a bien été modifié.");
                } else {
                    this.notificationService.showNotification("Erreur", result.error || "Une erreur est survenue.");
                }
            });
        }
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
