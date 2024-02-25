import {Component, OnInit} from "@angular/core";
import Auth from "../../models/auth.model";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {IdToDataPipe} from "../../../utils/pipes/id-to-data.pipe";
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

    onAccount: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    onList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    onCreate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    onAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    $user = this.auth.userObservableOnceLoaded();

    constructor(protected auth: Auth, private router: Router, private idToData: IdToDataPipe) {
    }

    ngOnInit() {
        this.auth.userObservableOnceLoaded().subscribe((user) => {
            this.onCreate.next(this.router.url.startsWith('/personnages/creation'));
            this.onList.next(!!this.router.url.match(/^\/personnages(?!\/creation\/).*$/));
            this.onAccount.next(this.router.url.startsWith("/compte"));
            this.onAdmin.next(this.router.url.startsWith("/admin"));
        });
    }
}
