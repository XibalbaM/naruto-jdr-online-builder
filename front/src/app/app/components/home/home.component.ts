import { Component } from '@angular/core';
import Auth from "../../models/auth.model";
import Environment from "../../../../environments/environment.interface";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public auth: Auth, public env: Environment, public dataService: DataService) {}

  protected readonly console = console;
}
