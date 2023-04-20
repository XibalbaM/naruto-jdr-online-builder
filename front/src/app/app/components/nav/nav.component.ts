import { Component } from '@angular/core';
import Auth from "../../models/auth.model";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(public auth: Auth) { }

}
