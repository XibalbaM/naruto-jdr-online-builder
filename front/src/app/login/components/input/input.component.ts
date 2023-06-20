import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../../app/services/auth.service";
import {ReCaptchaV3Service} from "ngx-captcha";
import Environment from "../../../../environments/environment.interface";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
/**
 * The component where th user can log in or create his account.
 */
export class InputComponent {

  userEmail?: string;

  constructor(private router: Router, private authService: AuthService, private recaptchaV3Service: ReCaptchaV3Service, private environment: Environment) {}

  /**
   * Once the form is submitted, call the api to send the connection email then send the user to the callback view.
   *
   * @see CallbackComponent
   */
  onSubmit() {
    if (this.userEmail) {
      this.recaptchaV3Service.execute(this.environment.recaptchaSiteKey, 'login', (token) => {
        this.authService.sendEmailRequest(this.userEmail!, token).subscribe((response) => {
          this.router.navigate(['/connexion/reponse'], {queryParams: {isRegistration: response.isRegistration, error: response.error, email: this.userEmail}});
        });
      }, {}, (error) => {
        console.error(error)
      });
    }
  }
}
