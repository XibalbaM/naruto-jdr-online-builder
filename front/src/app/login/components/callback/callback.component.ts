import {AfterContentInit, Component} from "@angular/core";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import Environment from "../../../../environments/environment.interface";
import {AuthService} from "../../../app/services/auth.service";
import {NotificationService} from "../../../app/services/notification.service";
import {FooterComponent} from "../footer/footer.component";
import {LogoComponent} from "../logo/logo.component";

@Component({
    selector: "app-callback",
    templateUrl: "./callback.component.html",
    styleUrls: ["./callback.component.scss"],
    standalone: true,
    imports: [
        RouterLink,
        LogoComponent,
        FooterComponent,
    ],
})
/**
 * The component that handles the callback from the server after a login or registration request and from email link.
 */
export class CallbackComponent implements AfterContentInit {

    text: string = "";

    constructor(private route: ActivatedRoute, private router: Router, private environment: Environment, private authService: AuthService, private notificationService: NotificationService) {
    }

    /**
     * Checks if the user has been redirected from the login page or from an email link.
     *
     * If the user has been redirected from the login page, the component will show a message depending on the query parameters, witch tell if the login request was successful or not.
     *
     * Else, the component will try to log in the user with the token in the url, and show a message depending on the response.
     * If the response is successful, the user will be redirected to the home page and a notification will be shown.
     */
    ngAfterContentInit(): void {
        this.route.params.subscribe(params => {
            this.text = "Connexion en cours...";
            this.authService.login(params["token"]).subscribe((response) => {
                if (response.succeed) {
                    this.router.navigate(["/"]);
                    this.notificationService.showNotification("Félicitations", (response.isRegistration ? "Compte crée avec succès ! " : "Vous êtes maintenant connecté. ") + (response.discordUsername ? "De plus, le compte discord " + response.discordUsername + " a bien été lié à votre compte !" : ""));
                } else {
                    switch (response.error) {
                        case "Invalid token":
                            this.text = "Le lien que vous avez utilisé n'est pas valide. Veuillez réessayer ou, si le problème persiste, nous contacter à <a class='default-link' href='" + this.environment.contactUrl + "'>ce lien</a>.";
                            break;
                        case "Code expired":
                            this.text = "Le lien que vous avez utilisé a expiré. Veuillez réessayer ou, si le problème persiste, nous contacter à <a class='default-link' href='" + this.environment.contactUrl + "'>ce lien</a>.";
                            break;
                        case "Internal server error":
                            this.text = `Une erreur interne est survenue lors du traitement de votre requete. <br />Veuillez réessayer plus tard ou nous contacter à <a class='default-link' href='${this.environment.contactUrl}'>ce lien</a>.`;
                            break;
                        default:
                            this.text = "Erreur lors de la connexion au serveur. Aucune donnée reçue.";
                    }
                }
            });
        });
    }
}
