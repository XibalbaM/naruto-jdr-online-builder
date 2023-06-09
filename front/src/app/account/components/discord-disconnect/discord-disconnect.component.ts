import {Component, OnInit} from "@angular/core";
import {AccountService} from "../../../app/services/account.service";
import {ActivatedRoute} from "@angular/router";
import Auth from "../../../app/models/auth.model";

@Component({
  selector: 'app-discord-disconnect',
  templateUrl: './discord-disconnect.component.html',
  styleUrls: ['./discord-disconnect.component.scss']
})
export class DiscordDisconnectComponent implements OnInit {

  text: string = "Déconnexion en cours...";

  constructor(private accountService: AccountService, private auth: Auth) { }

  ngOnInit() {
    this.accountService.removeDiscordAccount().subscribe((data) => {
      if (data.succeed) {
        this.text = "Déconnecté avec succès de votre compte discord";
      } else {
        if (data.error === "User does not have a discord account") {
          this.text = "Vous n'avez pas encore de compte discord liée a votre compte."
        } else {
          this.text = "Une erreur inconnue est survenue.";
        }
      }
    });
  }
}
