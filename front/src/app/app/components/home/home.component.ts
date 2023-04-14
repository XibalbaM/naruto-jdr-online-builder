import { Component } from '@angular/core';
import Auth from "../../models/auth.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public auth: Auth) {}
}
