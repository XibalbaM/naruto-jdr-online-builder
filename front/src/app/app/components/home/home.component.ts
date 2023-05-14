import { Component } from '@angular/core';
import Auth from "../../models/auth.model";
import {NotificationService} from "../../services/notification.service";
import Environment from "../../../../environments/environment.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public auth: Auth, private notificationService: NotificationService, public env: Environment) {}

  addNotif() {
    this.notificationService.showNotification('Hello World', 'This is a test notification');
  }
}
