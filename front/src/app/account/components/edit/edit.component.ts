import { Component } from '@angular/core';
import Auth from "../../../app/models/auth.model";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

  constructor(public auth: Auth) { }
}
