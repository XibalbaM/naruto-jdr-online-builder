import {Component, OnInit} from "@angular/core";
import Auth from "../../models/auth.model";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {IdToDataPipe} from "../../../shared/pipes/id-to-data.pipe";

@Component({
    selector: 'app-normal-navbar',
    templateUrl: './normal-navbar.component.html',
    styleUrls: ['./normal-navbar.component.scss']
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
