import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import Environment from "../../../../environments/environment.interface";

@Component({
  selector: "app-callback",
  templateUrl: "./callback.component.html",
  styleUrls: ["./callback.component.scss"],
})
export class CallbackComponent implements OnInit {

  text!: string;

  constructor(private route: ActivatedRoute, private environment: Environment) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const email = `<span class="text-purple">${params["email"]}</span>`;
      if (params["error"]) {
        switch (params["error"]) {
          case "Too many requests":
            this.text = `Un email a déjà été envoyé récemment à l'adresse ${email}. Veuillez réessayer plus tard.`;
            break;
          case "Invalid email":
            this.text = `L'email que vous avez fourni (${email}) n'est pas valide. Veuillez réessayer apres l'avoir vérifié, ou <a href='${this.environment.contactUrl}'>nous contacter</a> si le problème persiste.`
            break;
          case "Internal server error":
            this.text = `Une erreur interne est survenue lors du traitement de votre requete. Veuillez réessayer plus tard ou nous contacter à <a href='${this.environment.contactUrl}'>ce lien</a>`
            break;
          default:
            this.text = "Erreur lors de la connexion au serveur. Aucune donnée reçue.";
        }
      } else {
        if (params["isRegistration"] === "true") {
          this.text = `Votre compte a bien été créé.<br />Vous avez reçu un lien sur votre email ${email} pour finaliser la validation du compte.`;
        } else {
          this.text = `Votre demande de connexion a bien été enregistrée. Vous avez reçu un lien sur votre email ${email} permettant de vous connecter.`;
        }
      }
    });
  }
}
