import { Component } from '@angular/core';
import Auth from "../../models/auth.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(public auth: Auth, public router: Router) { }

}
