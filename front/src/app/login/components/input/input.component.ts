import {Component, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  emailForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      userEmail: [null,  [Validators.required, Validators.email]],
    });
  }

  onSubmit() {

    console.log(this.emailForm.value.userEmail);

    this.authService.sendEmailRequest(this.emailForm.value.userEmail).subscribe((response) => {
      if (response.succeed) {
        this.router.navigate(['/connexion/reponse'], {queryParams: {isRegistration: response.isRegistration}});
      } else {
        if (response.error === 'Too many requests') {
        } else {
        }
      }
    });
  }
}
