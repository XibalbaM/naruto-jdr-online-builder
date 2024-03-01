import {Component, inject, Injector, OnInit, signal} from "@angular/core";
import Auth from "../../models/auth.model";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AdminLogoComponent} from "../../../utils/components/admin-logo/admin-logo.component";
import {DefaultProfilePictureComponent} from "../../../utils/components/default-profile-picture/default-profile-picture.component";
import {AsyncPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {PlusLogoComponent} from "../../../utils/components/plus-logo/plus-logo.component";
import {CharactersLogoComponent} from "../../../utils/components/characters-logo/characters-logo.component";

@Component({
    selector: 'app-normal-navbar',
    templateUrl: './normal-navbar.component.html',
    styleUrls: ['./normal-navbar.component.scss'],
    standalone: true,
    imports: [RouterLink, CharactersLogoComponent, RouterLinkActive, PlusLogoComponent, NgIf, NgOptimizedImage, DefaultProfilePictureComponent, AdminLogoComponent, AsyncPipe]
})
export class NormalNavbarComponent implements OnInit {

    onAccount = signal(false);
    onList = signal(false);
    onCreate = signal(false);
    onAdmin = signal(false);
    $user = this.auth.userObservableOnceLoaded(inject(Injector));

    constructor(protected auth: Auth, private router: Router) {
    }

    ngOnInit() {
        this.$user.subscribe((user) => {
            this.onCreate.set(this.router.url.startsWith('/personnages/creation'));
            this.onList.set(!!this.router.url.match(/^\/personnages(?!\/creation\/).*$/));
            this.onAccount.set(this.router.url.startsWith("/compte"));
            this.onAdmin.set(this.router.url.startsWith("/admin"));
        });
    }
}
