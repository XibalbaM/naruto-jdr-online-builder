import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../../app/services/auth.service";
import {ReCaptchaV3Service} from "ngx-captcha";
import Environment from "../../../../environments/environment.interface";
import Auth from "../../../app/models/auth.model";
import {FooterComponent} from "../footer/footer.component";
import {SpinnerComponent} from "../../../shared/components/spinner/spinner.component";
import {ArrowRightComponent} from "../../../shared/components/arrow-right/arrow-right.component";
import {NgIf} from "@angular/common";
import {LogoComponent} from "../logo/logo.component";
import {ModalComponent} from "../../../shared/components/modal/modal.component";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    standalone: true,
    imports: [FormsModule, ModalComponent, LogoComponent, NgIf, ArrowRightComponent, SpinnerComponent, FooterComponent]
})
/**
 * The component where the user can log in or create his account.
 */
export class InputComponent implements OnInit {

    userEmail: string = "";
    sent = false;
    popupText = ""
    popupTitle = ""
    @ViewChild("dialog") dialog!: ElementRef<HTMLDialogElement>;

    constructor(private router: Router, private authService: AuthService, private recaptchaV3Service: ReCaptchaV3Service, private environment: Environment) {
    }

    ngOnInit() {
        if (Auth.checkTokenCookie()) {
            this.router.navigateByUrl('/personnages');
        }
    }

    /**
     * Once the form is submitted, call the api to send the connection email then send the user to the callback view.
     *
     * @see CallbackComponent
     */
    onSubmit() {
        if (this.userEmail && !this.sent) {
            this.sent = true;
            this.recaptchaV3Service.execute(this.environment.recaptchaSiteKey, 'login', (token) => {
                this.authService.sendEmailRequest(this.userEmail!, token).subscribe((response) => {
                    const email = `<span class="text-pink">${this.userEmail}</span>`;
                    if (response.error) {
                        this.popupTitle = "Erreur";
                        switch (response.error) {
                            case "Too many requests":
                                this.popupText = `Un email a déjà été envoyé récemment à l'adresse ${email}. Veuillez réessayer plus tard.`;
                                break;
                            case "Invalid email":
                                this.popupText = `L'email que vous avez fourni (${email}) n'est pas valide. Veuillez réessayer apres l'avoir vérifié, ou <a class='default-link' href='${this.environment.contactUrl}'>nous contacter</a> si le problème persiste.`;
                                break;
                            case "Internal server error":
                                this.popupText = `Une erreur interne est survenue lors du traitement de votre requete. <br />Veuillez réessayer plus tard ou nous contacter à <a class='default-link' href='${this.environment.contactUrl}'>ce lien</a>.`;
                                break;
                            default:
                                this.popupText = "Erreur lors de la connexion au serveur. Aucune donnée reçue.";
                        }
                    } else {
                        if (response.isRegistration) {
                            this.popupTitle = "Pas de compte";
                            this.popupText = `
                                <p class="text-13 text-light-gray">Votre email n’est rattaché à aucun compte existant</p>
                                <br>
                                <p class="text-16">Afin d’utiliser Ninja Builder, un compte personnel est nécessaire.<br><br>
Si vous souhaitez créer un compte sur l’application, vous avez déjà reçu un lien de validation sur votre email : <br>
${email}<br>
Il suffit de cliquer dessus et le tour est joué :)</p>
<br>
                                <p class="text-16 text-blue">Ce lien est valide seulement 5mn</p>  
                            `
                        } else {
                            this.popupTitle = "Connexion";
                            this.popupText = `Votre demande de connexion a bien été enregistrée. Vous avez reçu un lien sur votre email ${email} permettant de vous connecter.`;
                        }
                    }
                    this.dialog.nativeElement.show();
                    this.sent = false;
                });
            }, {}, (error) => {
                console.error(error)
                this.sent = false;
            });
        }
    }
}
