import { Component } from '@angular/core';
import Auth from "../../models/auth.model";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public auth: Auth, private notificationService: NotificationService) {}

  addNotif() {
    this.notificationService.showNotification('Hello World', 'This is a test notification');
  }
}
