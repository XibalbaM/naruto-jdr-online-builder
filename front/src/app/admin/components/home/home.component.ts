import {Component, Injector, OnInit} from '@angular/core';
import {DataService} from "../../../app/services/data.service";
import Auth from "../../../app/models/auth.model";
import {NgIf, NgOptimizedImage} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HomeButtonComponent} from '../home-button/home-button.component';
import {SpacerComponent} from '../../../utils/components/spacer/spacer.component';
import {AdminLogoComponent} from '../../../utils/components/admin-logo/admin-logo.component';
import {Router} from "@angular/router";
import AdminService from "../../services/admin.service";
import {ToggleComponent} from "../../../utils/components/toggle/toggle.component";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [AdminLogoComponent, SpacerComponent, HomeButtonComponent, FormsModule, NgIf, NgOptimizedImage, ToggleComponent]
})
export class HomeComponent implements OnInit {

    constructor(private auth: Auth, protected dataService: DataService, private injector: Injector, private router: Router,
                protected adminService: AdminService) {
    }

    ngOnInit() {
        this.auth.userObservableOnceLoaded(this.injector).subscribe(user => {
            if (user.isAdmin) {

            } else {
                this.router.navigate(['/']);
            }
        });
    }
}