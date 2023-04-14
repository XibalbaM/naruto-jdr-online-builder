import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../../app/services/auth.service";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  userEmail?: string;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {

    console.log(this.userEmail);

    this.authService.sendEmailRequest(this.userEmail!).subscribe((response) => {
      this.router.navigate(['/connexion/reponse'], {queryParams: {isRegistration: response.isRegistration, error: response.error, email: this.userEmail}});
    });
  }
}
