import {Component, OnInit} from "@angular/core";
import {AccountService} from "../../../app/services/account.service";
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
    selector: 'app-discord',
    templateUrl: './discord.component.html',
    styleUrls: ['./discord.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class DiscordComponent implements OnInit {

    text: string = "Validation en cours...";

    constructor(private accountService: AccountService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params["code"]) {
                this.accountService.addDiscordAccount(params["code"]).subscribe((data) => {
                    if (data.succeed) {
                        this.text = `Votre compte a bien été lié au compte discord ${data.username}.`;
                    } else {
                        switch (data.error) {
                            case "Invalid code":
                                this.text = "Le code de validation est invalide.";
                                break;
                            case "User already has a discord account":
                                this.text = "Vous avez déjà lié un compte discord à votre compte.";
                                break;
                            case "Discord account already linked to another user":
                                this.text = "Ce compte discord est déjà lié à un compte.";
                                break;
                            default:
                                this.text = "Une erreur inconnue est survenue.";
                        }
                    }
                });
            } else {
                this.text = "Une erreur est survenue lors de la connexion à Discord. Réessayez plus tard ou contactez-nous.";
            }
        });
    }
}
