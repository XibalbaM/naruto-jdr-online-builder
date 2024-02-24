import {Component, inject} from '@angular/core';
import {Location, NgIf} from "@angular/common";
import {NAVBAR_DATA_TOKEN} from "../../app.component";
import {BackNavbarService} from "../../services/back-navbar.service";
import {LongArrowLeftComponent} from '../../../shared/components/long-arrow-left/long-arrow-left.component';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-back-navbar',
    templateUrl: './back-navbar.component.html',
    styleUrls: ['./back-navbar.component.scss'],
    standalone: true,
    imports: [RouterLink, LongArrowLeftComponent, NgIf]
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