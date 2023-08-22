import { Component } from '@angular/core';
import Auth from "../../../app/models/auth.model";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  constructor(protected auth: Auth) {
  }
}
