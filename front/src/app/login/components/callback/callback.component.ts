import {AfterContentInit, Component, ContentChild, ElementRef, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import Environment from "../../../../environments/environment.interface";
import {AuthService} from "../../../app/services/auth.service";
import {NotificationService} from "../../../app/services/notification.service";

@Component({
  selector: "app-callback",
  templateUrl: "./callback.component.html",
  styleUrls: ["./callback.component.scss"],
})
/**
 * The component that handles the callback from the server after a login or registration request and from email link.
 */
export class CallbackComponent implements AfterContentInit {

  viewMode: "text" | "registration" = "text";
  email: string = "";
  text: string = "";
  showBack: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private environment: Environment, private authService: AuthService, private notificationService: NotificationService) {}

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
      if (params["token"]) {
        this.text = "Connexion en cours...";
        this.authService.login(params["token"]).subscribe((response) => {
          if (response.succeed) {
            this.router.navigate(["/"]);
            this.notificationService.showNotification("Félicitations", response.isRegistration ? "Compte crée avec succès !" : "Vous êtes maintenant connecté.");
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
      } else {
        this.showBack = true;
        this.route.queryParams.subscribe(params => {
          this.email = params["email"];
          const email = `<span class="text-purple">${this.email}</span>`;
          if (params["error"] || !this.email) {
            switch (params["error"]) {
              case "Too many requests":
                this.text = `Un email a déjà été envoyé récemment à l'adresse ${email}. Veuillez réessayer plus tard.`;
                break;
              case "Invalid email":
                this.text = `L'email que vous avez fourni (${email}) n'est pas valide. Veuillez réessayer apres l'avoir vérifié, ou <a class='default-link' href='${this.environment.contactUrl}'>nous contacter</a> si le problème persiste.`;
                break;
              case "Internal server error":
                this.text = `Une erreur interne est survenue lors du traitement de votre requete. <br />Veuillez réessayer plus tard ou nous contacter à <a class='default-link' href='${this.environment.contactUrl}'>ce lien</a>.`;
                break;
              default:
                this.text = "Erreur lors de la connexion au serveur. Aucune donnée reçue.";
            }
          } else {
            if (params["isRegistration"] === "true") {
              this.viewMode = 'registration'
            } else {
              this.text = `Votre demande de connexion a bien été enregistrée. Vous avez reçu un lien sur votre email ${email} permettant de vous connecter.`;
            }
          }
        });
      }
    });
  }
}
