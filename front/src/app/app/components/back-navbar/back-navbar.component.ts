import {Component, inject} from '@angular/core';
import {Location} from "@angular/common";
import {NAVBAR_DATA_TOKEN} from "../../app.component";
import {BackNavbarService} from "../../services/back-navbar.service";

@Component({
  selector: 'app-back-navbar',
  templateUrl: './back-navbar.component.html',
  styleUrls: ['./back-navbar.component.scss']
})
export class BackNavbarComponent {

    navbarData = inject(NAVBAR_DATA_TOKEN);
    backAmount = this.navbarData?.currentRoute.data["backAmount"] || 1;
    backUrl = this.navbarData?.currentRoute.data["navbarBackUrl"] || inject(Location).path().split('/').slice(0, -this.backAmount).join('/');
    text?: string = this.navbarData?.currentRoute.data["navbarText"];

    constructor(private backNavbarService: BackNavbarService) {
        if (this.backUrl === "service") {
            this.backUrl = this.backNavbarService.backUrl || '/';
        }
        if (this.text === "service") {
            this.text = this.backNavbarService.text;
        }
    }
}